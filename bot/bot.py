import os
import logging
import uuid
import re
import httpx
import asyncio
from datetime import datetime
from typing import Optional
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, ConversationHandler, ContextTypes, filters, CallbackQueryHandler
from telegram.error import TelegramError
from telegram.helpers import escape_markdown

# Import our custom modules
from database import db_manager
from models import Tracking, STATUS_RETENIDO
from shipping_calculator import shipping_calc
from admin_panel import admin_panel

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Prevent token leakage in logs
logging.getLogger("httpx").setLevel(logging.WARNING)
logging.getLogger("telegram").setLevel(logging.WARNING)

# Bot configuration
BOT_TOKEN = os.getenv('BOT_TOKEN')
CHANNEL_ID = os.getenv('CHANNEL_ID')  # Can be channel ID or username (with @)
ADMIN_TOKEN = os.getenv('ADMIN_TOKEN')  # For secure API communication
API_BASE_URL = os.getenv('API_BASE_URL', 'http://localhost:5000')  # Default to local server

# Owner ID - normalize to integer for consistent comparisons
OWNER_TELEGRAM_ID = None
_owner_id_str = os.getenv('OWNER_TELEGRAM_ID')
if _owner_id_str:
    try:
        OWNER_TELEGRAM_ID = int(_owner_id_str.strip())
    except (ValueError, AttributeError):
        logger.warning("OWNER_TELEGRAM_ID is not a valid integer, owner permissions disabled")

# Conversation states
(RECIPIENT_NAME, DELIVERY_ADDRESS, COUNTRY_POSTAL, DATE_TIME, PACKAGE_WEIGHT, 
 PRODUCT_NAME, SENDER_NAME, SENDER_ADDRESS, SENDER_COUNTRY, SENDER_STATE, 
 PRODUCT_PRICE) = range(11)

class TelegramBot:
    def __init__(self):
        if not BOT_TOKEN:
            raise ValueError("BOT_TOKEN environment variable is required")
        if not CHANNEL_ID:
            raise ValueError("CHANNEL_ID environment variable is required")
        if not ADMIN_TOKEN:
            logger.warning("ADMIN_TOKEN not set - API communication will be disabled")
        
        # Initialize database
        try:
            db_manager.initialize_database()
            logger.info("Database initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize database: {e}")
            raise
        
        self.application = Application.builder().token(BOT_TOKEN).build()
        self._setup_handlers()
    
    def _setup_handlers(self):
        """Setup command handlers"""
        # Conversation handler for tracking creation
        conv_handler = ConversationHandler(
            entry_points=[
                CommandHandler("start", self.start_command),
                MessageHandler(filters.TEXT & ~filters.COMMAND, self.check_admin_panel_start)
            ],
            states={
                RECIPIENT_NAME: [MessageHandler(filters.TEXT & ~filters.COMMAND, self.get_recipient_name)],
                DELIVERY_ADDRESS: [MessageHandler(filters.TEXT & ~filters.COMMAND, self.get_delivery_address)],
                COUNTRY_POSTAL: [MessageHandler(filters.TEXT & ~filters.COMMAND, self.get_country_postal)],
                DATE_TIME: [MessageHandler(filters.TEXT & ~filters.COMMAND, self.get_date_time)],
                PACKAGE_WEIGHT: [MessageHandler(filters.TEXT & ~filters.COMMAND, self.get_package_weight)],
                PRODUCT_NAME: [MessageHandler(filters.TEXT & ~filters.COMMAND, self.get_product_name)],
                SENDER_NAME: [MessageHandler(filters.TEXT & ~filters.COMMAND, self.get_sender_name)],
                SENDER_ADDRESS: [MessageHandler(filters.TEXT & ~filters.COMMAND, self.get_sender_address)],
                SENDER_COUNTRY: [MessageHandler(filters.TEXT & ~filters.COMMAND, self.get_sender_country)],
                SENDER_STATE: [MessageHandler(filters.TEXT & ~filters.COMMAND, self.get_sender_state)],
                PRODUCT_PRICE: [MessageHandler(filters.TEXT & ~filters.COMMAND, self.get_product_price)],
            },
            fallbacks=[CommandHandler("cancel", self.cancel)],
        )
        
        # Search handler (non-blocking so it doesn't interfere with conversation)
        search_handler = MessageHandler(
            filters.TEXT & ~filters.COMMAND,
            self.handle_search_input,
            block=False
        )
        
        self.application.add_handler(conv_handler)
        self.application.add_handler(search_handler)
        self.application.add_handler(CommandHandler("help", self.help_command))
        self.application.add_handler(CommandHandler("admin", self.admin_command))
        self.application.add_handler(CallbackQueryHandler(admin_panel.handle_callback_query))
    
    def validate_weight(self, weight_str: str) -> tuple[bool, str, float]:
        """Validate weight input"""
        try:
            original = weight_str.lower().strip()
            
            # Check for grams and convert to kg
            if re.search(r'\s*(gr?|gramos?)\s*$', original):
                weight_cleaned = re.sub(r'\s*(gr?|gramos?)\s*$', '', original)
                weight_grams = float(weight_cleaned.replace(',', '.'))
                if weight_grams <= 0:
                    return False, "El peso debe ser mayor a 0.", 0.0
                if weight_grams > 1000000:  # 1000 kg in grams
                    return False, "El peso parece demasiado grande. Ingresa un peso válido.", 0.0
                weight_kg = weight_grams / 1000
                return True, f"{weight_kg:.2f} kg", weight_kg
            
            # Remove kg units and treat as kg
            else:
                weight_cleaned = re.sub(r'\s*(kg|kilos?)\s*$', '', original)
                weight_kg = float(weight_cleaned.replace(',', '.'))
                if weight_kg <= 0:
                    return False, "El peso debe ser mayor a 0.", 0.0
                if weight_kg > 1000:  # Reasonable limit
                    return False, "El peso parece demasiado grande. Ingresa un peso válido.", 0.0
                return True, f"{weight_kg:.2f} kg", weight_kg
                
        except ValueError:
            return False, "Por favor ingresa un peso válido (ejemplo: 2.5kg, 1.2, 500gr).", 0.0
    
    def validate_price(self, price_str: str) -> tuple[bool, str, float]:
        """Validate price input"""
        try:
            # Remove currency symbols and extra spaces
            price_cleaned = re.sub(r'\s*[$€£¥₹]\s*', '', price_str.strip())
            price_cleaned = re.sub(r'\s*(usd|eur|dollars?|euros?|pesos?)\s*$', '', price_cleaned.lower())
            price = float(price_cleaned.replace(',', '.'))
            
            if price < 0:
                return False, "El precio no puede ser negativo.", 0.0
            if price > 100000:  # Reasonable limit
                return False, "El precio parece demasiado alto. Verifica el valor.", 0.0
                
            return True, f"${price:.2f}", price
        except ValueError:
            return False, "Por favor ingresa un precio válido (ejemplo: 25.50, $100, 45.99).", 0.0
    
    def validate_datetime(self, datetime_str: str) -> tuple[bool, str]:
        """Validate date and time input"""
        # Common date/time formats to try
        formats = [
            "%d/%m/%Y %H:%M",
            "%d-%m-%Y %H:%M",
            "%Y-%m-%d %H:%M",
            "%d/%m/%Y",
            "%d-%m-%Y",
            "%Y-%m-%d"
        ]
        
        datetime_str = datetime_str.strip()
        
        for fmt in formats:
            try:
                parsed_dt = datetime.strptime(datetime_str, fmt)
                # If only date provided, assume current time
                if len(fmt.split()) == 1:  # Only date format
                    formatted = parsed_dt.strftime("%d/%m/%Y %H:%M")
                    formatted = formatted.replace(parsed_dt.strftime("%H:%M"), datetime.now().strftime("%H:%M"))
                else:
                    formatted = parsed_dt.strftime("%d/%m/%Y %H:%M")
                return True, formatted
            except ValueError:
                continue
        
        return False, "Por favor ingresa una fecha válida (ejemplos: 25/12/2024 14:30, 2024-12-25, 25-12-2024 09:00)."
    
    async def handle_search_input(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle text input for tracking search"""
        # Only process if user is in search mode
        if context.user_data and context.user_data.get('searching_tracking'):
            if update.message and update.message.text:
                search_query = update.message.text.strip()
                # Clear search state immediately to prevent blocking other flows
                context.user_data['searching_tracking'] = False
                await admin_panel.process_search(update, context, search_query)
            return
        
        # If not in search mode, let other handlers process it
        return
    
    async def _test_api_connection(self):
        """Test secure connection to web API"""
        try:
            await asyncio.sleep(1)  # Brief wait for services to be ready
            async with httpx.AsyncClient(timeout=3.0) as client:
                response = await client.get(
                    f"{API_BASE_URL}/api/trackings/stats",
                    headers={"Authorization": f"Bearer {ADMIN_TOKEN}"} if ADMIN_TOKEN else {}
                )
                if response.status_code == 200:
                    logger.info("✅ API connection test successful")
                else:
                    logger.warning(f"⚠️  API connection test failed: {response.status_code}")
        except asyncio.TimeoutError:
            logger.warning("⚠️  API connection test timed out")
        except Exception as e:
            logger.warning(f"⚠️  API connection test failed: {e}")
    
    async def update_tracking_status_via_api(self, tracking_id: str, new_status: str, notes: Optional[str] = None) -> bool:
        """Update tracking status via secure API call"""
        if not ADMIN_TOKEN:
            logger.error("Cannot update via API - ADMIN_TOKEN not configured")
            return False
            
        try:
            async with httpx.AsyncClient() as client:
                payload = {"newStatus": new_status}
                if notes:
                    payload["notes"] = notes
                    
                response = await client.patch(
                    f"{API_BASE_URL}/api/trackings/{tracking_id}/status",
                    headers={
                        "Authorization": f"Bearer {ADMIN_TOKEN}",
                        "Content-Type": "application/json"
                    },
                    json=payload,
                    timeout=10.0
                )
                
                if response.status_code == 200:
                    logger.info(f"✅ Status updated via API for tracking {tracking_id}: {new_status}")
                    return True
                else:
                    logger.error(f"❌ API status update failed: {response.status_code} - {response.text}")
                    return False
                    
        except Exception as e:
            logger.error(f"❌ API communication error: {e}")
            return False
    
    async def verify_secure_access(self, user_id: int) -> bool:
        """Double verification: channel membership + secure API check"""
        # First check: Channel membership (MANDATORY)
        is_member = await self.is_user_in_channel(user_id)
        
        if not is_member:
            logger.info(f"❌ Access denied: User {user_id} not in channel")
            return False
        
        logger.info(f"✅ User {user_id} verified as channel member")
        
        # Second check: API connectivity with proper authentication (optional)
        if ADMIN_TOKEN:
            try:
                async with httpx.AsyncClient() as client:
                    response = await client.get(
                        f"{API_BASE_URL}/api/trackings/stats",
                        headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
                        timeout=5.0
                    )
                    if response.status_code == 200:
                        logger.info(f"✅ API connectivity verified for user {user_id}")
                    elif response.status_code == 401:
                        logger.warning(f"⚠️  API authentication failed for user {user_id} - invalid ADMIN_TOKEN")
                    else:
                        logger.warning(f"⚠️  API connectivity failed for user {user_id} - status {response.status_code}")
            except Exception as e:
                logger.warning(f"⚠️  API connectivity error for user {user_id}: {e}")
        
        logger.info(f"✅ Complete secure access verified for user {user_id}")
        return True
    
    async def _safe_reply(self, update: Update, text: str):
        """Safe reply with basic formatting"""
        if update.message:
            # Use simple formatting without complex markdown
            return await update.message.reply_text(text)

    async def is_user_in_channel(self, user_id: int) -> bool:
        """Check if user is a member of the specified channel"""
        try:
            if not CHANNEL_ID:
                return False
            member = await self.application.bot.get_chat_member(CHANNEL_ID, user_id)
            # Check if user is member, administrator, or creator
            return member.status in ['member', 'administrator', 'creator']
        except TelegramError as e:
            logger.error(f"Error checking channel membership: {e}")
            return False
    
    async def start_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /start command with channel membership validation"""
        if not update.effective_user or not update.message:
            return ConversationHandler.END
            
        user = update.effective_user
        user_id = user.id
        username = user.username or "unknown"
        first_name = user.first_name or "Usuario"
        
        logger.info(f"User {username} ({user_id}) started the bot")
        
        # Enhanced security check: channel membership + API connectivity
        has_secure_access = await self.verify_secure_access(user_id)
        
        if has_secure_access:
            # User is a channel member - send verification message first
            verification_message = "✅Has sido Verificado como miembro Autorizado."
            await update.message.reply_text(verification_message)
            
            # Show admin panel with welcome message
            await admin_panel.admin_main_menu(update, context, username=username)
            logger.info(f"Access granted to user {username} ({user_id}) - showing admin panel")
            
            return ConversationHandler.END
            
        else:
            # User is not a channel member - access denied
            denial_message = f"""
❌ Acceso denegado

Hola {first_name}, para usar este bot necesitas ser miembro de nuestro canal privado.

Por favor:
1. Únete al canal privado 
2. Asegúrate de ser un miembro activo del canal
3. Vuelve a iniciar el bot con /start

Si el problema persiste, contacta al administrador del canal.
            """.strip()
            
            await update.message.reply_text(denial_message)
            logger.info(f"Access denied to user {username} ({user_id}) - not a channel member")
            return ConversationHandler.END

    async def check_admin_panel_start(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Check if message should start tracking creation from admin panel"""
        if not update.message or not update.message.text or not context.user_data:
            return ConversationHandler.END
            
        # Check if this message is starting a conversation from admin panel
        if context.user_data.get('from_admin_panel'):
            # This is the first message after clicking "Crear Tracking" from admin panel
            # Process it as recipient name
            context.user_data['recipient_name'] = update.message.text
            
            await self._safe_reply(update,
                "✅ Nombre del destinatario guardado.\n\n"
                "Ahora ingresa la dirección de envío completa:"
            )
            
            # Clear the admin panel flag
            context.user_data.pop('from_admin_panel', None)
            
            return DELIVERY_ADDRESS
        
        # If not from admin panel, let other handlers deal with it
        return ConversationHandler.END

    # Conversation handler methods for collecting tracking information
    async def get_recipient_name(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Get recipient name"""
        if not update.message or not update.message.text or not context.user_data:
            return ConversationHandler.END
            
        context.user_data['recipient_name'] = update.message.text
        
        await self._safe_reply(update,
            "✅ Nombre del destinatario guardado.\n\n"
            "Ahora ingresa la dirección de envío completa:"
        )
        return DELIVERY_ADDRESS

    async def get_delivery_address(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Get delivery address"""
        if not update.message or not update.message.text or not context.user_data:
            return ConversationHandler.END
            
        context.user_data['delivery_address'] = update.message.text
        
        await update.message.reply_text(
            "✅ Dirección de envío guardada.\n\n"
            "Ingresa el **país y código postal**:"
        )
        return COUNTRY_POSTAL

    async def get_country_postal(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Get country and postal code"""
        if not update.message or not update.message.text or not context.user_data:
            return ConversationHandler.END
            
        context.user_data['country_postal'] = update.message.text
        
        await update.message.reply_text(
            "✅ País y código postal guardados.\n\n"
            "Ingresa la **hora y fecha de ingreso del paquete**:"
        )
        return DATE_TIME

    async def get_date_time(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Get package entry date and time"""
        if not update.message or not update.message.text or not context.user_data:
            await self._safe_reply(update, "❌ Error en el sistema. Por favor usa /start para comenzar de nuevo.")
            return ConversationHandler.END
            
        is_valid, result = self.validate_datetime(update.message.text)
        
        if not is_valid:
            await self._safe_reply(update, f"❌ {result}\n\nIntenta de nuevo:")
            return DATE_TIME  # Stay in same state for retry
            
        context.user_data['date_time'] = result
        
        await self._safe_reply(update,
            "✅ Fecha y hora guardadas.\n\n"
            "Ingresa el *peso del paquete*:"
        )
        return PACKAGE_WEIGHT

    async def get_package_weight(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Get package weight"""
        if not update.message or not update.message.text or not context.user_data:
            await self._safe_reply(update, "❌ Error en el sistema. Por favor usa /start para comenzar de nuevo.")
            return ConversationHandler.END
            
        is_valid, result, _ = self.validate_weight(update.message.text)
        
        if not is_valid:
            await self._safe_reply(update, f"❌ {result}\n\nIntenta de nuevo:")
            return PACKAGE_WEIGHT  # Stay in same state for retry
            
        context.user_data['package_weight'] = result
        
        await self._safe_reply(update,
            "✅ Peso del paquete guardado.\n\n"
            "Ingresa el *nombre del producto*:"
        )
        return PRODUCT_NAME

    async def get_product_name(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Get product name"""
        if not update.message or not update.message.text or not context.user_data:
            return ConversationHandler.END
            
        context.user_data['product_name'] = update.message.text
        
        await update.message.reply_text(
            "✅ Nombre del producto guardado.\n\n"
            "📤 **INFORMACIÓN DEL REMITENTE**\n\n"
            "Ingresa el **nombre del remitente**:"
        )
        return SENDER_NAME

    async def get_sender_name(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Get sender name"""
        if not update.message or not update.message.text or not context.user_data:
            return ConversationHandler.END
            
        context.user_data['sender_name'] = update.message.text
        
        await update.message.reply_text(
            "✅ Nombre del remitente guardado.\n\n"
            "Ingresa la **dirección de donde se envía**:"
        )
        return SENDER_ADDRESS

    async def get_sender_address(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Get sender address"""
        if not update.message or not update.message.text or not context.user_data:
            return ConversationHandler.END
            
        context.user_data['sender_address'] = update.message.text
        
        await update.message.reply_text(
            "✅ Dirección de origen guardada.\n\n"
            "Ingresa el **país**:"
        )
        return SENDER_COUNTRY

    async def get_sender_country(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Get sender country"""
        if not update.message or not update.message.text or not context.user_data:
            return ConversationHandler.END
            
        context.user_data['sender_country'] = update.message.text
        
        await update.message.reply_text(
            "✅ País guardado.\n\n"
            "Ingresa el **estado**:"
        )
        return SENDER_STATE

    async def get_sender_state(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Get sender state"""
        if not update.message or not update.message.text or not context.user_data:
            return ConversationHandler.END
            
        context.user_data['sender_state'] = update.message.text
        
        await update.message.reply_text(
            "✅ Estado guardado.\n\n"
            "Por último, ingresa el **precio del producto**:"
        )
        return PRODUCT_PRICE

    async def get_product_price(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Get product price and show summary"""
        if not update.message or not update.message.text or not context.user_data:
            await self._safe_reply(update, "❌ Error en el sistema. Por favor usa /start para comenzar de nuevo.")
            return ConversationHandler.END
            
        is_valid, result, _ = self.validate_price(update.message.text)
        
        if not is_valid:
            await self._safe_reply(update, f"❌ {result}\n\nIntenta de nuevo:")
            return PRODUCT_PRICE  # Stay in same state for retry
            
        context.user_data['product_price'] = result
        
        # Generate tracking number
        tracking_id = self.generate_tracking_id()
        context.user_data['tracking_id'] = tracking_id
        
        # Calculate estimated delivery date
        delivery_date, total_days = shipping_calc.calculate_estimated_delivery(
            context.user_data.get('sender_address', ''),
            context.user_data.get('sender_country', ''),
            context.user_data.get('delivery_address', ''),
            context.user_data.get('country_postal', '')
        )
        
        # Create tracking object
        tracking = Tracking(
            tracking_id=tracking_id,
            recipient_name=context.user_data.get('recipient_name', ''),
            delivery_address=context.user_data.get('delivery_address', ''),
            country_postal=context.user_data.get('country_postal', ''),
            date_time=context.user_data.get('date_time', ''),
            package_weight=context.user_data.get('package_weight', ''),
            product_name=context.user_data.get('product_name', ''),
            sender_name=context.user_data.get('sender_name', ''),
            sender_address=context.user_data.get('sender_address', ''),
            sender_country=context.user_data.get('sender_country', ''),
            sender_state=context.user_data.get('sender_state', ''),
            product_price=result,
            status=STATUS_RETENIDO,  # Automatically set as RETENIDO
            estimated_delivery_date=delivery_date,
            user_telegram_id=context.user_data.get('user_id'),
            username=context.user_data.get('username')
        )
        
        # Save to database with admin_id - always set to user_id so users can see their own trackings
        admin_id = context.user_data.get('user_id')
        save_success = db_manager.save_tracking(tracking, created_by_admin_id=admin_id)
        
        if save_success:
            # Show summary with RETENIDO status
            summary_message = self.create_tracking_summary_with_status(context.user_data, delivery_date, total_days)
            
            await self._safe_reply(update,
                "✅ Precio del producto guardado.\n\n"
                "🎉 *TRACKING CREADO EXITOSAMENTE*\n\n"
                f"{summary_message}"
            )
            
            logger.info(f"Tracking {tracking_id} created and saved to database by user {context.user_data.get('username')}")
        else:
            # If database save fails, still show summary but warn
            summary_message = self.create_tracking_summary(context.user_data)
            
            await self._safe_reply(update,
                "✅ Precio del producto guardado.\n\n"
                "🎉 *TRACKING CREADO EXITOSAMENTE*\n\n"
                f"{summary_message}\n\n"
                "⚠️ *Nota: Hubo un problema guardando en la base de datos. Contacta al administrador.*"
            )
            
            logger.error(f"Failed to save tracking {tracking_id} to database")
        
        return ConversationHandler.END

    async def show_summary(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Show tracking summary (fallback method)"""
        if not update.message or not context.user_data:
            return ConversationHandler.END
            
        summary_message = self.create_tracking_summary(context.user_data)
        await update.message.reply_text(f"📋 **RESUMEN DEL TRACKING**\n\n{summary_message}")
        return ConversationHandler.END

    async def cancel(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Cancel the conversation"""
        if not update.message:
            return ConversationHandler.END
            
        if context.user_data:
            context.user_data.clear()
            
        await update.message.reply_text(
            "❌ Proceso cancelado.\n\n"
            "Usa /start para crear un nuevo tracking."
        )
        return ConversationHandler.END

    async def help_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Show help message"""
        if not update.message:
            return
            
        help_text = """
🤖 **COMANDOS DISPONIBLES**

/start - Crear un nuevo tracking
/help - Mostrar esta ayuda
/cancel - Cancelar el proceso actual

📝 **CÓMO USAR EL BOT:**

1. Usa /start para iniciar
2. Responde las preguntas paso a paso
3. Al final recibirás tu tracking único
4. Comparte el tracking con tus clientes

¡Es así de fácil! 🎉
        """.strip()
        
        await update.message.reply_text(help_text)

    def generate_tracking_id(self) -> str:
        """Generate unique tracking ID"""
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        random_suffix = str(uuid.uuid4())[:8].upper()
        return f"TRK{timestamp}{random_suffix}"

    def create_tracking_summary(self, user_data: dict) -> str:
        """Create formatted tracking summary"""
        tracking_id = user_data.get('tracking_id', 'N/A')
        
        summary = f"""
🏷️ TRACKING ID: {tracking_id}

📦 INFORMACIÓN DEL DESTINATARIO:
• Nombre: {user_data.get('recipient_name', 'N/A')}
• Dirección: {user_data.get('delivery_address', 'N/A')}
• País y CP: {user_data.get('country_postal', 'N/A')}
• Fecha/Hora ingreso: {user_data.get('date_time', 'N/A')}
• Peso: {user_data.get('package_weight', 'N/A')}
• Producto: {user_data.get('product_name', 'N/A')}

📤 INFORMACIÓN DEL REMITENTE:
• Nombre: {user_data.get('sender_name', 'N/A')}
• Dirección origen: {user_data.get('sender_address', 'N/A')}
• País: {user_data.get('sender_country', 'N/A')}
• Estado: {user_data.get('sender_state', 'N/A')}
• Precio producto: {user_data.get('product_price', 'N/A')}

✅ Comparte este tracking con tu cliente para que pueda rastrear su paquete.

Usa /start para crear otro tracking.
        """.strip()
        
        return summary
    
    def create_tracking_summary_with_status(self, user_data: dict, delivery_date: str, total_days: int) -> str:
        """Create formatted tracking summary with status information"""
        tracking_id = user_data.get('tracking_id', 'N/A')
        
        summary = f"""
🏷️ TRACKING ID: {tracking_id}

📦 INFORMACIÓN DEL DESTINATARIO:
• Nombre: {user_data.get('recipient_name', 'N/A')}
• Dirección: {user_data.get('delivery_address', 'N/A')}
• País y CP: {user_data.get('country_postal', 'N/A')}
• Fecha/Hora ingreso: {user_data.get('date_time', 'N/A')}
• Peso: {user_data.get('package_weight', 'N/A')}
• Producto: {user_data.get('product_name', 'N/A')}

📤 INFORMACIÓN DEL REMITENTE:
• Nombre: {user_data.get('sender_name', 'N/A')}
• Dirección origen: {user_data.get('sender_address', 'N/A')}
• País: {user_data.get('sender_country', 'N/A')}
• Estado: {user_data.get('sender_state', 'N/A')}
• Precio producto: {user_data.get('product_price', 'N/A')}

🔴 ESTADO: PAQUETE RETENIDO
💰 Motivo: Contra reembolso - Esperando confirmación de pago
📅 Estimado: {total_days} días laborables (tras confirmar pago)
🗓️ Entrega estimada: {delivery_date}

🌐 Tu cliente puede consultar el estado en tu página web.

✅ Comparte este tracking con tu cliente para que pueda rastrear su paquete.

Usa /start para crear otro tracking.
        """.strip()
        
        return summary
    
    async def admin_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Show admin panel"""
        if not update.message:
            return
            
        user_id = update.effective_user.id if update.effective_user else None
        
        # Check if user has admin access (you can customize this check)
        # For now, checking if user is in the required channel
        is_admin = await self.is_user_in_channel(user_id) if user_id else False
        
        if is_admin:
            await admin_panel.admin_main_menu(update, context)
        else:
            await update.message.reply_text(
                "❌ **Acceso denegado**\n\n"
                "No tienes permisos para acceder al panel administrativo.",
                parse_mode='Markdown'
            )

    async def _startup_checks(self, application):
        """Run startup checks when bot starts"""
        logger.info("Running startup checks...")
        if ADMIN_TOKEN:
            # Run API test in background, don't block bot startup
            asyncio.create_task(self._test_api_connection())
            logger.info("✅ Bot started successfully - API test running in background")
        else:
            logger.warning("⚠️  ADMIN_TOKEN not set - API communication disabled")
            logger.info("✅ Bot started successfully")
    
    def run(self):
        """Start the bot"""
        logger.info("Starting Telegram bot...")
        # Add startup callback
        self.application.post_init = self._startup_checks
        self.application.run_polling(allowed_updates=Update.ALL_TYPES)

def main():
    """Main function"""
    try:
        bot = TelegramBot()
        bot.run()
    except Exception as e:
        logger.error(f"Error starting bot: {e}")
        raise

if __name__ == '__main__':
    main()