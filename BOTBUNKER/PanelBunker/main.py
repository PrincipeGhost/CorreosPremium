import os
import logging
import uuid
import re
import random
import string
from datetime import datetime
from typing import Optional
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes, MessageHandler, ConversationHandler, filters
from telegram.error import TelegramError, Forbidden, BadRequest
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

# Import tracking modules
from tracking.database import db_manager
from tracking.models import Tracking, STATUS_RETENIDO
from tracking.shipping_calculator import shipping_calc
from tracking.admin_panel import admin_panel

# Configurar logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Configurar nivel de logging para httpx para evitar exponer el token en logs
logging.getLogger('httpx').setLevel(logging.WARNING)
logging.getLogger('telegram').setLevel(logging.WARNING)

# Variables de entorno - Bot Principal
BOT_TOKEN = os.getenv('BOT_TOKEN')
CHANNEL_ID = os.getenv('CHANNEL_ID')
CHANNEL_USERNAME = os.getenv('CHANNEL_USERNAME')

# Variables de entorno - Tracking
OWNER_TELEGRAM_ID = None
_owner_id_str = os.getenv('OWNER_TELEGRAM_ID')
if _owner_id_str:
    try:
        OWNER_TELEGRAM_ID = int(_owner_id_str.strip())
    except (ValueError, AttributeError):
        logger.warning("OWNER_TELEGRAM_ID is not a valid integer, owner permissions disabled")

# Convertir CHANNEL_ID a int si es numérico
if CHANNEL_ID and CHANNEL_ID.lstrip('-').isdigit():
    CHANNEL_ID = int(CHANNEL_ID)

# Estados de conversación para tracking
(DELIVERY_ADDRESS, RECIPIENT_POSTAL, RECIPIENT_PROVINCE_COUNTRY, 
 SENDER_ADDRESS, SENDER_POSTAL, SENDER_PROVINCE_COUNTRY,
 PACKAGE_WEIGHT, PRODUCT_NAME, PRODUCT_PRICE, DATE_TIME) = range(10)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Manejador del comando /start con validación de canal."""
    user = update.effective_user
    user_id = user.id
    
    logger.info(f"Usuario {user.username} ({user_id}) ejecutó /start")
    
    try:
        # Verificar si el usuario es miembro del canal
        is_member = await check_channel_membership(context.bot, user_id)
        
        if is_member:
            # Usuario autorizado - enviar imagen y mensaje de bienvenida
            username = user.username or user.first_name
            welcome_message = f"¡Hola! 🏴‍☠️{username}🏴‍☠️\n⚜️Verificado⚜️"
            
            # Crear menú con botones
            keyboard = [
                [
                    InlineKeyboardButton("🤖 BOT 🤖", callback_data="bot_menu"),
                    InlineKeyboardButton("💰Trading 💰", callback_data="trading_menu")
                ],
                [
                    InlineKeyboardButton("⚠️Soporte⚠️", callback_data="support_menu"),
                    InlineKeyboardButton("⚜️Grupo⚜️", callback_data="group_menu")
                ]
            ]
            reply_markup = InlineKeyboardMarkup(keyboard)
            
            # Enviar imagen con mensaje y menú
            try:
                with open('bunker_island_logo.png', 'rb') as photo:
                    await context.bot.send_photo(
                        chat_id=update.effective_chat.id,
                        photo=photo,
                        caption=welcome_message,
                        reply_markup=reply_markup
                    )
            except FileNotFoundError:
                # Si no encuentra la imagen, enviar solo texto con menú
                await context.bot.send_message(
                    chat_id=update.effective_chat.id,
                    text=welcome_message,
                    reply_markup=reply_markup
                )
        else:
            # Usuario no autorizado
            channel_ref = f"@{CHANNEL_USERNAME}" if CHANNEL_USERNAME else "el canal privado"
            unauthorized_message = (
                f"❌ Acceso denegado\n\n"
                f"Para usar este bot, primero debes unirte a {channel_ref}.\n\n"
                "Una vez que te unas al canal, vuelve a ejecutar /start para verificar tu acceso."
            )
            await context.bot.send_message(
                chat_id=update.effective_chat.id,
                text=unauthorized_message
            )
            
    except Exception as e:
        logger.error(f"Error al verificar membresía: {e}")
        error_message = (
            "❌ Ocurrió un error al verificar tu acceso.\n"
            "Por favor, intenta nuevamente en unos momentos."
        )
        await context.bot.send_message(
            chat_id=update.effective_chat.id,
            text=error_message
        )

async def check_channel_membership(bot, user_id: int) -> bool:
    """Verificar si el usuario es miembro del canal especificado."""
    try:
        # Usar CHANNEL_ID si está disponible, sino usar CHANNEL_USERNAME
        channel_identifier = CHANNEL_ID if CHANNEL_ID else CHANNEL_USERNAME
        
        if not channel_identifier:
            logger.error("No se ha configurado CHANNEL_ID ni CHANNEL_USERNAME")
            return False
            
        # Obtener información del miembro
        member = await bot.get_chat_member(chat_id=channel_identifier, user_id=user_id)
        
        # Verificar si el usuario es miembro activo
        # Estados válidos: 'member', 'administrator', 'creator'
        valid_statuses = ['member', 'administrator', 'creator']
        is_member = member.status in valid_statuses
        
        logger.info(f"Usuario {user_id} - Estado en canal: {member.status}")
        return is_member
        
    except Forbidden as e:
        logger.warning(f"Bot no tiene permisos para verificar usuario {user_id} en canal: {e}")
        logger.info("Asegúrate de que el bot esté agregado al canal con permisos apropiados")
        return False
    except BadRequest as e:
        if "chat not found" in str(e).lower():
            logger.error(f"Canal no encontrado: {e}")
            logger.info("Verifica que CHANNEL_ID o CHANNEL_USERNAME sea correcto")
        elif "user not found" in str(e).lower():
            logger.info(f"Usuario {user_id} no es miembro del canal")
        else:
            logger.error(f"Error BadRequest al verificar membresía: {e}")
        return False
    except TelegramError as e:
        logger.error(f"Error de Telegram al verificar membresía: {e}")
        return False
    except Exception as e:
        logger.error(f"Error general al verificar membresía: {e}")
        return False

async def handle_bot_menu(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Manejar menú de bots."""
    query = update.callback_query
    await query.answer()
    
    keyboard = [
        [InlineKeyboardButton("⚜️ Tracking", callback_data="tracking_bot")],
        [InlineKeyboardButton("🔙 Volver al menú principal", callback_data="main_menu")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    message = "🤖 <b>bots disponibles</b> 🤖"
    
    # Verificar si el mensaje tiene imagen (caption) o es solo texto
    if query.message.photo:
        await query.edit_message_caption(
            caption=message,
            reply_markup=reply_markup,
            parse_mode='HTML'
        )
    else:
        await query.edit_message_text(
            text=message,
            reply_markup=reply_markup,
            parse_mode='HTML'
        )

async def handle_tracking_bot(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Manejar bot de Tracking - Mostrar panel de administración directamente."""
    query = update.callback_query
    if not query:
        return
    
    await query.answer()
    
    user = update.effective_user
    user_id = user.id
    username = user.username or user.first_name or "Usuario"
    
    # Verificar que el usuario tenga acceso
    is_member = await check_channel_membership(context.bot, user_id)
    
    if not is_member:
        await query.edit_message_text(
            "❌ Acceso denegado. Debes ser miembro del canal para usar esta función."
        )
        return
    
    # Guardar información del usuario en context
    if context.user_data is not None:
        context.user_data['user_id'] = user_id
        context.user_data['username'] = username
    
    # Mostrar panel de administración de tracking
    await admin_panel.admin_main_menu(update, context, username=username)
    logger.info(f"User {username} ({user_id}) accessed tracking bot")

async def handle_trading_menu(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Manejar menú de trading."""
    query = update.callback_query
    await query.answer()
    
    keyboard = [
        [InlineKeyboardButton("🔙 Volver al menú principal", callback_data="main_menu")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    message = (
        "💰 <b>trading</b> 💰\n\n"
        "Esta función estará disponible próximamente.\n"
        "¡Prepárate para navegar los mares del trading!"
    )
    
    # Verificar si el mensaje tiene imagen (caption) o es solo texto
    if query.message.photo:
        await query.edit_message_caption(
            caption=message,
            reply_markup=reply_markup,
            parse_mode='HTML'
        )
    else:
        await query.edit_message_text(
            text=message,
            reply_markup=reply_markup,
            parse_mode='HTML'
        )

async def handle_support_menu(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Manejar menú de ayuda y soporte."""
    query = update.callback_query
    await query.answer()
    
    keyboard = [
        [InlineKeyboardButton("🔙 Volver al menú principal", callback_data="main_menu")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    message = (
        "⚠️ <b>ayuda y soporte</b> ⚠️\n\n"
        "🔧 <b>soporte técnico:</b> Próximamente\n"
        "📚 <b>guías:</b> En desarrollo\n"
        "💬 <b>contacto:</b> Disponible en el grupo\n\n"
        "Para soporte inmediato, únete a nuestro grupo."
    )
    
    # Verificar si el mensaje tiene imagen (caption) o es solo texto
    if query.message.photo:
        await query.edit_message_caption(
            caption=message,
            reply_markup=reply_markup,
            parse_mode='HTML'
        )
    else:
        await query.edit_message_text(
            text=message,
            reply_markup=reply_markup,
            parse_mode='HTML'
        )

async def handle_group_menu(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Manejar menú de grupo - Acceso directo al grupo privado."""
    query = update.callback_query
    await query.answer()
    
    user = query.from_user
    user_id = user.id
    
    logger.info(f"Usuario {user.username} ({user_id}) solicita acceso al grupo")
    
    # Enlace directo al grupo proporcionado por el usuario
    group_invite_link = "https://t.me/+uPi1OrNEMcY3NWU0"
    
    # Crear botón con enlace directo al grupo
    keyboard = [
        [InlineKeyboardButton("🚀 Unirse al Grupo", url=group_invite_link)],
        [InlineKeyboardButton("🔙 Volver al menú principal", callback_data="main_menu")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    message = (
        "⚜️ <b>grupo privado</b> ⚜️\n\n"
        "🎉 ¡Acceso al grupo exclusivo!\n\n"
        "👇 Haz clic en el botón para unirte:\n\n"
        "📢 Una vez dentro podrás:\n"
        "🗣️ Interactuar con otros miembros\n"
        "📰 Recibir actualizaciones exclusivas\n"
        "💬 Participar en las conversaciones\n"
        "🎯 Acceder a contenido premium\n\n"
        "¡Bienvenido a la comunidad!"
    )
    
    # Verificar si el mensaje tiene imagen (caption) o es solo texto
    if query.message.photo:
        await query.edit_message_caption(
            caption=message,
            reply_markup=reply_markup,
            parse_mode='HTML'
        )
    else:
        await query.edit_message_text(
            text=message,
            reply_markup=reply_markup,
            parse_mode='HTML'
        )

async def handle_main_menu(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Volver al menú principal."""
    query = update.callback_query
    await query.answer()
    
    user = query.from_user
    username = user.username or user.first_name
    welcome_message = f"¡Hola! 🏴‍☠️{username}🏴‍☠️\n⚜️Verificado⚜️"
    
    keyboard = [
        [
            InlineKeyboardButton("🤖 BOT 🤖", callback_data="bot_menu"),
            InlineKeyboardButton("💰Trading 💰", callback_data="trading_menu")
        ],
        [
            InlineKeyboardButton("⚠️Soporte⚠️", callback_data="support_menu"),
            InlineKeyboardButton("⚜️Grupo⚜️", callback_data="group_menu")
        ]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    # Verificar si el mensaje tiene imagen (caption) o es solo texto
    if query.message.photo:
        await query.edit_message_caption(
            caption=welcome_message,
            reply_markup=reply_markup,
            parse_mode='HTML'
        )
    else:
        await query.edit_message_text(
            text=welcome_message,
            reply_markup=reply_markup,
            parse_mode='HTML'
        )

# ============ TRACKING CONVERSATION HANDLERS ============

def validate_weight(weight_str: str) -> tuple[bool, str, float]:
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

def validate_price(price_str: str) -> tuple[bool, str, float]:
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

def validate_datetime(datetime_str: str) -> tuple[bool, str]:
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

async def handle_search_input(update: Update, context: ContextTypes.DEFAULT_TYPE):
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

async def check_admin_panel_start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Check if message should start tracking creation from admin panel"""
    if not update.message or not update.message.text or not context.user_data:
        return ConversationHandler.END
        
    # Check if this message is starting a conversation from admin panel
    if context.user_data.get('from_admin_panel'):
        # This is the first message after clicking "Crear Tracking" from admin panel
        # The admin panel already showed the intro message, so just start the flow
        
        # Store the first input as delivery address
        context.user_data['delivery_address'] = update.message.text
        
        # Clear the admin panel flag
        context.user_data.pop('from_admin_panel', None)
        
        # Ask for postal code
        await update.message.reply_text("Dirección de envío guardada✅")
        await update.message.reply_text("Inserte código postal:")
        
        return RECIPIENT_POSTAL
    
    # If not from admin panel, let other handlers deal with it
    return ConversationHandler.END

# Conversation handler methods for collecting tracking information

async def get_delivery_address(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Get delivery address"""
    if not update.message or not update.message.text or not context.user_data:
        return ConversationHandler.END
        
    context.user_data['delivery_address'] = update.message.text
    
    await update.message.reply_text("Dirección de envío guardada✅")
    await update.message.reply_text("Inserte código postal:")
    return RECIPIENT_POSTAL

async def get_recipient_postal(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Get recipient postal code"""
    if not update.message or not update.message.text or not context.user_data:
        return ConversationHandler.END
        
    context.user_data['recipient_postal'] = update.message.text
    
    await update.message.reply_text("Código postal guardado✅")
    await update.message.reply_text("Indique provincia y país:")
    return RECIPIENT_PROVINCE_COUNTRY

async def get_recipient_province_country(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Get recipient province and country"""
    if not update.message or not update.message.text or not context.user_data:
        return ConversationHandler.END
        
    context.user_data['recipient_province_country'] = update.message.text
    
    await update.message.reply_text("Provincia y País guardados✅")
    await update.message.reply_text("📤 Continuemos con los datos del Remitente")
    await update.message.reply_text("Inserte dirección de envío:")
    return SENDER_ADDRESS

async def get_sender_address(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Get sender address"""
    if not update.message or not update.message.text or not context.user_data:
        return ConversationHandler.END
        
    context.user_data['sender_address'] = update.message.text
    
    await update.message.reply_text("Dirección de envío del remitente guardada✅")
    await update.message.reply_text("Inserte código postal:")
    return SENDER_POSTAL

async def get_sender_postal(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Get sender postal code"""
    if not update.message or not update.message.text or not context.user_data:
        return ConversationHandler.END
        
    context.user_data['sender_postal'] = update.message.text
    
    await update.message.reply_text("Código postal del remitente guardado✅")
    await update.message.reply_text("Indique provincia y país:")
    return SENDER_PROVINCE_COUNTRY

async def get_sender_province_country(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Get sender province and country"""
    if not update.message or not update.message.text or not context.user_data:
        return ConversationHandler.END
        
    context.user_data['sender_province_country'] = update.message.text
    
    await update.message.reply_text("Provincia y país del remitente guardadas✅")
    await update.message.reply_text("📤 Datos del Remitente y Destinatario completados 📦")
    await update.message.reply_text("Ahora vamos con el peso oficial del paquete:")
    return PACKAGE_WEIGHT

async def get_package_weight(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Get package weight"""
    if not update.message or not update.message.text or not context.user_data:
        await update.message.reply_text("❌ Error en el sistema. Por favor usa /start para comenzar de nuevo.")
        return ConversationHandler.END
        
    is_valid, result, _ = validate_weight(update.message.text)
    
    if not is_valid:
        await update.message.reply_text(f"❌ {result}\n\nIntenta de nuevo:")
        return PACKAGE_WEIGHT
        
    context.user_data['package_weight'] = result
    
    await update.message.reply_text("Peso oficial del paquete guardado✅")
    await update.message.reply_text("¿Cuál es el producto que envía?:")
    return PRODUCT_NAME

async def get_product_name(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Get product name"""
    if not update.message or not update.message.text or not context.user_data:
        return ConversationHandler.END
        
    context.user_data['product_name'] = update.message.text
    
    await update.message.reply_text("Producto guardado✅")
    await update.message.reply_text("Inserte precio del producto:")
    return PRODUCT_PRICE

async def get_product_price(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Get product price"""
    if not update.message or not update.message.text or not context.user_data:
        await update.message.reply_text("❌ Error en el sistema. Por favor usa /start para comenzar de nuevo.")
        return ConversationHandler.END
        
    is_valid, formatted_price, numeric_price = validate_price(update.message.text)
    
    if not is_valid:
        await update.message.reply_text(f"❌ {formatted_price}\n\nIntenta de nuevo:")
        return PRODUCT_PRICE
        
    context.user_data['product_price'] = formatted_price
    context.user_data['product_price_numeric'] = numeric_price
    
    await update.message.reply_text("Precio del producto guardado✅")
    await update.message.reply_text("Por último indíquenos fecha y hora de ingreso del paquete:")
    return DATE_TIME

async def get_date_time(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Get package entry date and time and create tracking"""
    if not update.message or not update.message.text or not context.user_data:
        await update.message.reply_text("❌ Error en el sistema. Por favor usa /start para comenzar de nuevo.")
        return ConversationHandler.END
        
    is_valid, result = validate_datetime(update.message.text)
    
    if not is_valid:
        await update.message.reply_text(f"❌ {result}\n\nIntenta de nuevo:")
        return DATE_TIME
        
    context.user_data['date_time'] = result
    
    await update.message.reply_text("Fecha y hora guardadas ✅")
    await update.message.reply_text("Su tracking fue procesado con éxito.")
    
    # Generate tracking number
    tracking_id = generate_tracking_id()
    context.user_data['tracking_id'] = tracking_id
    
    # Parse recipient province and country (format: "provincia, país" or just "país")
    recipient_prov_country = context.user_data.get('recipient_province_country', '')
    if ',' in recipient_prov_country:
        recipient_parts = recipient_prov_country.split(',', 1)
        recipient_province = recipient_parts[0].strip()
        recipient_country = recipient_parts[1].strip()
    else:
        recipient_province = ''
        recipient_country = recipient_prov_country.strip()
    
    # Parse sender province and country (format: "provincia, país" or just "país")
    sender_prov_country = context.user_data.get('sender_province_country', '')
    if ',' in sender_prov_country:
        sender_parts = sender_prov_country.split(',', 1)
        sender_province = sender_parts[0].strip()
        sender_country = sender_parts[1].strip()
    else:
        sender_province = ''
        sender_country = sender_prov_country.strip()
    
    # Store parsed data back in context for summary
    context.user_data['recipient_province'] = recipient_province
    context.user_data['recipient_country'] = recipient_country
    context.user_data['sender_province'] = sender_province
    context.user_data['sender_country'] = sender_country
    
    # Calculate estimated delivery date using correct country fields
    delivery_date, total_days = shipping_calc.calculate_estimated_delivery(
        context.user_data.get('sender_address', ''),
        sender_country,
        context.user_data.get('delivery_address', ''),
        recipient_country
    )
    
    # Get separated data
    recipient_postal = context.user_data.get('recipient_postal', '')
    sender_postal = context.user_data.get('sender_postal', '')
    
    # Create tracking object using new separated fields
    tracking = Tracking(
        tracking_id=tracking_id,
        delivery_address=context.user_data.get('delivery_address', ''),
        date_time=context.user_data.get('date_time', ''),
        package_weight=context.user_data.get('package_weight', ''),
        product_name=context.user_data.get('product_name', ''),
        sender_address=context.user_data.get('sender_address', ''),
        product_price=context.user_data.get('product_price', ''),
        # New separated fields
        recipient_postal_code=recipient_postal,
        recipient_province=recipient_province,
        recipient_country=recipient_country,
        sender_postal_code=sender_postal,
        sender_province=sender_province,
        sender_country=sender_country,
        # Status and metadata
        status=STATUS_RETENIDO,
        estimated_delivery_date=delivery_date,
        user_telegram_id=context.user_data.get('user_id'),
        username=context.user_data.get('username')
    )
    
    # Save to database with admin_id
    admin_id = context.user_data.get('user_id')
    save_success = db_manager.save_tracking(tracking, created_by_admin_id=admin_id)
    
    if save_success:
        # Show summary with RETENIDO status
        summary_message = create_tracking_summary_with_status(context.user_data, delivery_date, total_days, tracking_id)
        
        await update.message.reply_text(
            "🎉 *TRACKING CREADO EXITOSAMENTE*\n\n"
            f"{summary_message}"
        )
        
        logger.info(f"Tracking {tracking_id} created and saved to database by user {context.user_data.get('username')}")
    else:
        # If database save fails, still show summary but warn
        summary_message = create_tracking_summary(context.user_data, tracking_id)
        
        await update.message.reply_text(
            "🎉 *TRACKING CREADO EXITOSAMENTE*\n\n"
            f"{summary_message}\n\n"
            "⚠️ *Nota: Hubo un problema guardando en la base de datos. Contacta al administrador.*"
        )
        
        logger.error(f"Failed to save tracking {tracking_id} to database")
    
    return ConversationHandler.END

async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Cancel the conversation"""
    if not update.message:
        return ConversationHandler.END
        
    if context.user_data:
        context.user_data.clear()
        
    await update.message.reply_text(
        "❌ Proceso cancelado.\n\n"
        "Usa el menú para navegar."
    )
    return ConversationHandler.END

def generate_tracking_id() -> str:
    """Generate unique tracking ID"""
    characters = string.ascii_uppercase + string.digits
    random_part = ''.join(random.choices(characters, k=21))
    return f"PK{random_part}"

def create_tracking_summary(user_data: dict, tracking_id: str) -> str:
    """Create formatted tracking summary"""
    summary = f"""
🏷️ TRACKING ID: {tracking_id}

📦 INFORMACIÓN DEL DESTINATARIO:
• Dirección: {user_data.get('delivery_address', 'N/A')}
• Código Postal: {user_data.get('recipient_postal', 'N/A')}
• Provincia y País: {user_data.get('recipient_province_country', 'N/A')}
• Peso: {user_data.get('package_weight', 'N/A')}
• Producto: {user_data.get('product_name', 'N/A')}

📤 INFORMACIÓN DEL REMITENTE:
• Dirección origen: {user_data.get('sender_address', 'N/A')}
• Código Postal: {user_data.get('sender_postal', 'N/A')}
• Provincia y País: {user_data.get('sender_province_country', 'N/A')}
• Precio producto: {user_data.get('product_price', 'N/A')}

• Fecha/Hora ingreso: {user_data.get('date_time', 'N/A')}

✅ Comparte este tracking con tu cliente para que pueda rastrear su paquete.
    """.strip()
    
    return summary

def create_tracking_summary_with_status(user_data: dict, delivery_date: str, total_days: int, tracking_id: str) -> str:
    """Create formatted tracking summary with status information"""
    summary = f"""
🏷️ TRACKING ID: {tracking_id}

📦 INFORMACIÓN DEL DESTINATARIO:
• Dirección: {user_data.get('delivery_address', 'N/A')}
• Código Postal: {user_data.get('recipient_postal', 'N/A')}
• Provincia y País: {user_data.get('recipient_province_country', 'N/A')}
• Peso: {user_data.get('package_weight', 'N/A')}
• Producto: {user_data.get('product_name', 'N/A')}

📤 INFORMACIÓN DEL REMITENTE:
• Dirección origen: {user_data.get('sender_address', 'N/A')}
• Código Postal: {user_data.get('sender_postal', 'N/A')}
• Provincia y País: {user_data.get('sender_province_country', 'N/A')}
• Precio producto: {user_data.get('product_price', 'N/A')}

• Fecha/Hora ingreso: {user_data.get('date_time', 'N/A')}

🔴 ESTADO: PAQUETE RETENIDO
💰 Motivo: Contra reembolso - Esperando confirmación de pago
📅 Estimado: {total_days} días laborables (tras confirmar pago)
🗓️ Entrega estimada: {delivery_date}

✅ Comparte este tracking con tu cliente para que pueda rastrear su paquete.
    """.strip()
    
    return summary

def main() -> None:
    """Función principal del bot."""
    
    # Verificar que el token esté configurado
    if not BOT_TOKEN:
        logger.error("BOT_TOKEN no está configurado en las variables de entorno")
        return
    
    # Verificar que al menos uno de los identificadores del canal esté configurado
    if not CHANNEL_ID and not CHANNEL_USERNAME:
        logger.error("Debe configurar CHANNEL_ID o CHANNEL_USERNAME en las variables de entorno")
        return
    
    # Initialize database
    try:
        db_manager.initialize_database()
        logger.info("Database initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize database: {e}")
        logger.warning("Bot will continue but tracking features may not work")
    
    logger.info("Iniciando bot...")
    logger.info(f"Canal configurado: {CHANNEL_ID or CHANNEL_USERNAME}")
    
    # Crear aplicación
    application = Application.builder().token(BOT_TOKEN).build()
    
    # Conversation handler for tracking creation
    conv_handler = ConversationHandler(
        entry_points=[
            MessageHandler(filters.TEXT & ~filters.COMMAND, check_admin_panel_start)
        ],
        states={
            DELIVERY_ADDRESS: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_delivery_address)],
            RECIPIENT_POSTAL: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_recipient_postal)],
            RECIPIENT_PROVINCE_COUNTRY: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_recipient_province_country)],
            SENDER_ADDRESS: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_sender_address)],
            SENDER_POSTAL: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_sender_postal)],
            SENDER_PROVINCE_COUNTRY: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_sender_province_country)],
            PACKAGE_WEIGHT: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_package_weight)],
            PRODUCT_NAME: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_product_name)],
            PRODUCT_PRICE: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_product_price)],
            DATE_TIME: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_date_time)],
        },
        fallbacks=[CommandHandler("cancel", cancel)],
    )
    
    # Search handler (non-blocking so it doesn't interfere with conversation)
    search_handler = MessageHandler(
        filters.TEXT & ~filters.COMMAND,
        handle_search_input,
        block=False
    )
    
    # Agregar manejadores
    application.add_handler(CommandHandler("start", start))
    application.add_handler(conv_handler)
    application.add_handler(search_handler)
    
    # Agregar handlers para botones del menú principal
    application.add_handler(CallbackQueryHandler(handle_bot_menu, pattern="^bot_menu$"))
    application.add_handler(CallbackQueryHandler(handle_tracking_bot, pattern="^tracking_bot$"))
    application.add_handler(CallbackQueryHandler(handle_trading_menu, pattern="^trading_menu$"))
    application.add_handler(CallbackQueryHandler(handle_support_menu, pattern="^support_menu$"))
    application.add_handler(CallbackQueryHandler(handle_group_menu, pattern="^group_menu$"))
    application.add_handler(CallbackQueryHandler(handle_main_menu, pattern="^main_menu$"))
    
    # Handler para el panel de administración (tracking)
    application.add_handler(CallbackQueryHandler(admin_panel.handle_callback_query))
    
    # Ejecutar el bot
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == '__main__':
    main()
