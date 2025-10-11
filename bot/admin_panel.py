"""
Administrative panel with inline buttons for tracking management
"""

from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ContextTypes, CallbackQueryHandler
import logging
import os
from typing import List, Optional

from database import db_manager
from models import STATUS_RETENIDO, STATUS_CONFIRMAR_PAGO, STATUS_EN_TRANSITO, STATUS_ENTREGADO, STATUS_DISPLAY
from shipping_calculator import shipping_calc

logger = logging.getLogger(__name__)

# Owner ID - normalize to integer for consistent comparisons
OWNER_TELEGRAM_ID = None
_owner_id_str = os.getenv('OWNER_TELEGRAM_ID')
if _owner_id_str:
    try:
        OWNER_TELEGRAM_ID = int(_owner_id_str.strip())
    except (ValueError, AttributeError):
        logger.warning("OWNER_TELEGRAM_ID is not a valid integer, owner permissions disabled")

class AdminPanel:
    """Handle administrative functions with inline buttons"""
    
    def __init__(self):
        self.delay_reasons = shipping_calc.get_delay_reasons()
    
    def is_owner(self, user_id: int) -> bool:
        """Check if user is the owner"""
        return OWNER_TELEGRAM_ID is not None and user_id == OWNER_TELEGRAM_ID
    
    async def admin_main_menu(self, update: Update, context: ContextTypes.DEFAULT_TYPE, username: Optional[str] = None):
        """Show main admin menu"""
        # Clear any active search state when returning to main menu
        if context.user_data is not None:
            context.user_data['searching_tracking'] = False
        
        keyboard = [
            [
                InlineKeyboardButton("📝 Crear Tracking", callback_data="admin_crear_tracking")
            ],
            [
                InlineKeyboardButton("📦 Ver Retenidos", callback_data="admin_retenidos"),
                InlineKeyboardButton("🚚 Confirmar Envío", callback_data="admin_confirmar_pagos")
            ],
            [
                InlineKeyboardButton("🚚 Gestionar Envíos", callback_data="admin_gestionar_envios"),
                InlineKeyboardButton("📊 Estadísticas", callback_data="admin_estadisticas")
            ],
            [
                InlineKeyboardButton("🔍 Buscar Tracking", callback_data="admin_buscar")
            ]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        # Always get username from update if not provided
        if not username and update.effective_user:
            username = update.effective_user.username or update.effective_user.first_name or "Usuario"
        
        # Always show welcome message with username
        text = f"¡Bienvenido al sistema de tracking, {username}! 🏴‍☠️\n\n⚜️ Selecciona una opción:"
        
        try:
            if update.callback_query:
                await update.callback_query.edit_message_text(text, reply_markup=reply_markup)
            elif update.message:
                await update.message.reply_text(text, reply_markup=reply_markup)
        except Exception as e:
            logger.error(f"Error showing admin menu: {e}")
            # Fallback without special characters
            simple_text = f"¡Bienvenido {username}!\n\nSelecciona una opción:"
            if update.callback_query:
                await update.callback_query.edit_message_text(simple_text, reply_markup=reply_markup)
            elif update.message:
                await update.message.reply_text(simple_text, reply_markup=reply_markup)
    
    async def start_tracking_creation(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Start tracking creation from admin panel"""
        if not update.callback_query or not update.effective_user:
            return
            
        user = update.effective_user
        username = user.username or "unknown"
        user_id = user.id
        
        # Initialize user data storage
        if context.user_data is not None:
            context.user_data.clear()
            context.user_data['username'] = username
            context.user_data['user_id'] = user_id
            context.user_data['from_admin_panel'] = True
        
        # Send message to start tracking creation
        tracking_start_message = """
Vamos a crear un nuevo tracking. Te haré unas preguntas paso a paso.

📦 INFORMACIÓN DEL DESTINATARIO

Por favor, ingresa el nombre del destinatario:
        """.strip()
        
        # Add back button like other admin sections
        keyboard = [[InlineKeyboardButton("🔙 Volver", callback_data="admin_main")]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.callback_query.edit_message_text(
            tracking_start_message,
            reply_markup=reply_markup,
            parse_mode='Markdown'
        )
        
        logger.info(f"Tracking creation started from admin panel by user {username} ({user_id})")
    
    async def show_retenidos(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Show packages waiting for payment confirmation"""
        if not update.callback_query or not update.effective_user:
            return
        
        admin_id = update.effective_user.id
        is_owner = self.is_owner(admin_id)
        
        trackings = db_manager.get_trackings_by_status(STATUS_RETENIDO, admin_id=admin_id, is_owner=is_owner)
        
        if not trackings:
            text = "✅ No hay paquetes retenidos actualmente."
            keyboard = [[InlineKeyboardButton("🔙 Volver", callback_data="admin_main")]]
        else:
            text = f"🔴 **PAQUETES RETENIDOS ({len(trackings)}):**\n\n"
            keyboard = []
            
            for tracking in trackings[:10]:  # Show max 10 at a time
                origin, destination = shipping_calc.extract_countries(tracking.sender_country, tracking.country_postal)
                
                summary = f"**{tracking.tracking_id[:15]}...**\n"
                summary += f"👤 {tracking.recipient_name}\n"
                summary += f"📍 {origin} → {destination}\n"
                summary += f"💰 {tracking.product_price}\n"
                summary += f"📅 {tracking.created_at.strftime('%d/%m/%Y %H:%M') if tracking.created_at else 'N/A'}"
                
                text += summary + "\n" + "─" * 30 + "\n"
                
                keyboard.append([
                    InlineKeyboardButton("💰 Confirmar Pago", callback_data=f"confirm_payment_{tracking.tracking_id}"),
                    InlineKeyboardButton("🗑️ Eliminar", callback_data=f"delete_tracking_{tracking.tracking_id}")
                ])
                keyboard.append([
                    InlineKeyboardButton("👁️ Ver Detalles", callback_data=f"view_details_{tracking.tracking_id}")
                ])
            
            keyboard.append([InlineKeyboardButton("🔙 Volver", callback_data="admin_main")])
        
        reply_markup = InlineKeyboardMarkup(keyboard)
        await update.callback_query.edit_message_text(text, reply_markup=reply_markup, parse_mode='Markdown')
    
    async def show_confirmar_pagos(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Show packages ready for shipping (payment confirmed)"""
        if not update.effective_user:
            return
        
        admin_id = update.effective_user.id
        is_owner = self.is_owner(admin_id)
        
        trackings = db_manager.get_trackings_by_status(STATUS_CONFIRMAR_PAGO, admin_id=admin_id, is_owner=is_owner)
        
        if not trackings:
            text = "✅ No hay pagos pendientes de confirmar."
            keyboard = [[InlineKeyboardButton("🔙 Volver", callback_data="admin_main")]]
        else:
            text = f"🟡 **PAGOS CONFIRMADOS - LISTOS PARA ENVÍO ({len(trackings)}):**\n\n"
            keyboard = []
            
            for tracking in trackings[:10]:
                origin, destination = shipping_calc.extract_countries(tracking.sender_country, tracking.country_postal)
                delivery_date, total_days = shipping_calc.calculate_estimated_delivery(
                    tracking.sender_address, 
                    tracking.sender_country,
                    tracking.delivery_address, 
                    tracking.country_postal, 
                    tracking.actual_delay_days
                )
                
                summary = f"**{tracking.tracking_id[:15]}...**\n"
                summary += f"👤 {tracking.recipient_name}\n"
                summary += f"📍 {origin} → {destination}\n"
                summary += f"📅 Estimado: {delivery_date} ({total_days} días)\n"
                summary += f"💰 {tracking.product_price}"
                
                text += summary + "\n" + "─" * 30 + "\n"
                
                keyboard.append([
                    InlineKeyboardButton("🚚 Enviar", callback_data=f"ship_package_{tracking.tracking_id}"),
                    InlineKeyboardButton("🗑️ Eliminar", callback_data=f"delete_tracking_{tracking.tracking_id}")
                ])
                keyboard.append([
                    InlineKeyboardButton("👁️ Ver Detalles", callback_data=f"view_details_{tracking.tracking_id}")
                ])
            
            keyboard.append([InlineKeyboardButton("🔙 Volver", callback_data="admin_main")])
        
        reply_markup = InlineKeyboardMarkup(keyboard)
        await update.callback_query.edit_message_text(text, reply_markup=reply_markup, parse_mode='Markdown')
    
    async def show_gestionar_envios(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Show packages in transit"""
        if not update.effective_user:
            return
        
        admin_id = update.effective_user.id
        is_owner = self.is_owner(admin_id)
        
        trackings = db_manager.get_trackings_by_status(STATUS_EN_TRANSITO, admin_id=admin_id, is_owner=is_owner)
        
        if not trackings:
            text = "✅ No hay paquetes en tránsito actualmente."
            keyboard = [[InlineKeyboardButton("🔙 Volver", callback_data="admin_main")]]
        else:
            text = f"🔵 **PAQUETES EN TRÁNSITO ({len(trackings)}):**\n\n"
            keyboard = []
            
            for tracking in trackings[:10]:
                origin, destination = shipping_calc.extract_countries(tracking.sender_country, tracking.country_postal)
                delivery_date, total_days = shipping_calc.calculate_estimated_delivery(
                    tracking.sender_address,
                    tracking.sender_country,
                    tracking.delivery_address,
                    tracking.country_postal,
                    tracking.actual_delay_days
                )
                
                delay_text = f"⚠️ Retraso: {tracking.actual_delay_days} días" if tracking.actual_delay_days > 0 else "⏰ Sin retrasos"
                
                summary = f"**{tracking.tracking_id[:15]}...**\n"
                summary += f"👤 {tracking.recipient_name}\n"
                summary += f"📍 {origin} → {destination}\n"
                summary += f"📅 Estimado: {delivery_date}\n"
                summary += f"{delay_text}"
                
                text += summary + "\n" + "─" * 30 + "\n"
                
                keyboard.append([
                    InlineKeyboardButton("✅ Entregado", callback_data=f"delivered_{tracking.tracking_id}"),
                    InlineKeyboardButton("⚠️ Agregar Retraso", callback_data=f"add_delay_{tracking.tracking_id}")
                ])
                keyboard.append([
                    InlineKeyboardButton("👁️ Ver Detalles", callback_data=f"view_details_{tracking.tracking_id}")
                ])
            
            keyboard.append([InlineKeyboardButton("🔙 Volver", callback_data="admin_main")])
        
        reply_markup = InlineKeyboardMarkup(keyboard)
        await update.callback_query.edit_message_text(text, reply_markup=reply_markup, parse_mode='Markdown')
    
    async def confirm_payment(self, update: Update, context: ContextTypes.DEFAULT_TYPE, tracking_id: str):
        """Confirm payment for a tracking"""
        if not update.callback_query or not update.effective_user:
            return
        
        # Verify admin has access to this tracking
        admin_id = update.effective_user.id
        is_owner = self.is_owner(admin_id)
        
        tracking = db_manager.get_tracking(tracking_id)
        if not tracking:
            await update.callback_query.answer("❌ Tracking no encontrado")
            return
        
        if not db_manager.can_access_tracking(tracking_id, admin_id, is_owner):
            await update.callback_query.answer("❌ No tienes permiso para modificar este tracking")
            return
        
        text = f"""
💰 **CONFIRMAR PAGO**

🏷️ **Tracking:** {tracking.tracking_id}
👤 **Cliente:** {tracking.recipient_name}
💰 **Monto:** {tracking.product_price}
📍 **Destino:** {tracking.country_postal}

¿Confirmar que se recibió el pago?
        """.strip()
        
        keyboard = [
            [
                InlineKeyboardButton("✅ SÍ, CONFIRMAR", callback_data=f"confirm_yes_{tracking_id}"),
                InlineKeyboardButton("❌ CANCELAR", callback_data="admin_retenidos")
            ]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.callback_query.edit_message_text(text, reply_markup=reply_markup, parse_mode='Markdown')
    
    async def process_payment_confirmation(self, update: Update, context: ContextTypes.DEFAULT_TYPE, tracking_id: str):
        """Process payment confirmation"""
        if not update.effective_user:
            return
        
        # Verify admin has access to this tracking
        admin_id = update.effective_user.id
        is_owner = self.is_owner(admin_id)
        tracking = db_manager.get_tracking(tracking_id)
        
        if not tracking:
            await update.callback_query.answer("❌ Tracking no encontrado")
            return
        
        if not db_manager.can_access_tracking(tracking_id, admin_id, is_owner):
            await update.callback_query.answer("❌ No tienes permiso para modificar este tracking")
            return
        
        success = db_manager.update_tracking_status(tracking_id, STATUS_CONFIRMAR_PAGO, "Pago confirmado por administrador")
        
        if success:
            await update.callback_query.answer("✅ Pago confirmado exitosamente")
            text = f"✅ **PAGO CONFIRMADO**\n\nTracking {tracking_id} listo para envío."
        else:
            await update.callback_query.answer("❌ Error al confirmar pago")
            text = f"❌ **ERROR**\n\nNo se pudo confirmar el pago para {tracking_id}."
        
        keyboard = [[InlineKeyboardButton("🔙 Volver", callback_data="admin_retenidos")]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.callback_query.edit_message_text(text, reply_markup=reply_markup, parse_mode='Markdown')
    
    async def ship_package(self, update: Update, context: ContextTypes.DEFAULT_TYPE, tracking_id: str):
        """Mark package as shipped"""
        if not update.effective_user:
            return
        
        # Verify admin has access to this tracking
        admin_id = update.effective_user.id
        is_owner = self.is_owner(admin_id)
        tracking = db_manager.get_tracking(tracking_id)
        
        if not tracking:
            await update.callback_query.answer("❌ Tracking no encontrado")
            return
        
        if not db_manager.can_access_tracking(tracking_id, admin_id, is_owner):
            await update.callback_query.answer("❌ No tienes permiso para modificar este tracking")
            return
        
        success = db_manager.update_tracking_status(tracking_id, STATUS_EN_TRANSITO, "Paquete enviado")
        
        if success:
            await update.callback_query.answer("✅ Paquete marcado como enviado")
            text = f"✅ **PAQUETE ENVIADO**\n\nTracking {tracking_id} está ahora en tránsito."
        else:
            await update.callback_query.answer("❌ Error al enviar paquete")
            text = f"❌ **ERROR**\n\nNo se pudo marcar como enviado {tracking_id}."
        
        keyboard = [[InlineKeyboardButton("🔙 Volver", callback_data="admin_confirmar_pagos")]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.callback_query.edit_message_text(text, reply_markup=reply_markup, parse_mode='Markdown')
    
    async def mark_delivered(self, update: Update, context: ContextTypes.DEFAULT_TYPE, tracking_id: str):
        """Mark package as delivered"""
        if not update.effective_user:
            return
        
        # Verify admin has access to this tracking
        admin_id = update.effective_user.id
        is_owner = self.is_owner(admin_id)
        tracking = db_manager.get_tracking(tracking_id)
        
        if not tracking:
            await update.callback_query.answer("❌ Tracking no encontrado")
            return
        
        if not db_manager.can_access_tracking(tracking_id, admin_id, is_owner):
            await update.callback_query.answer("❌ No tienes permiso para modificar este tracking")
            return
        
        success = db_manager.update_tracking_status(tracking_id, STATUS_ENTREGADO, "Paquete entregado")
        
        if success:
            await update.callback_query.answer("✅ Paquete marcado como entregado")
            text = f"✅ **PAQUETE ENTREGADO**\n\nTracking {tracking_id} completado exitosamente."
        else:
            await update.callback_query.answer("❌ Error al marcar como entregado")
            text = f"❌ **ERROR**\n\nNo se pudo marcar como entregado {tracking_id}."
        
        keyboard = [[InlineKeyboardButton("🔙 Volver", callback_data="admin_gestionar_envios")]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.callback_query.edit_message_text(text, reply_markup=reply_markup, parse_mode='Markdown')
    
    async def show_delay_options(self, update: Update, context: ContextTypes.DEFAULT_TYPE, tracking_id: str):
        """Show delay options"""
        text = f"⚠️ **AGREGAR RETRASO**\n\nTracking: {tracking_id}\n\n¿Cuántos días de retraso?"
        
        keyboard = [
            [
                InlineKeyboardButton("1 día", callback_data=f"delay_1_{tracking_id}"),
                InlineKeyboardButton("2 días", callback_data=f"delay_2_{tracking_id}"),
                InlineKeyboardButton("3 días", callback_data=f"delay_3_{tracking_id}")
            ],
            [
                InlineKeyboardButton("5 días", callback_data=f"delay_5_{tracking_id}"),
                InlineKeyboardButton("7 días", callback_data=f"delay_7_{tracking_id}")
            ],
            [InlineKeyboardButton("🔙 Cancelar", callback_data="admin_gestionar_envios")]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.callback_query.edit_message_text(text, reply_markup=reply_markup, parse_mode='Markdown')
    
    async def process_delay(self, update: Update, context: ContextTypes.DEFAULT_TYPE, delay_days: int, tracking_id: str):
        """Process delay addition"""
        # Show reason selection
        text = f"⚠️ **AGREGAR RETRASO DE {delay_days} DÍAS**\n\nSelecciona el motivo:"
        
        keyboard = []
        for i, reason in enumerate(self.delay_reasons[:8]):  # Show max 8 reasons
            keyboard.append([InlineKeyboardButton(reason, callback_data=f"reason_{i}_{delay_days}_{tracking_id}")])
        
        keyboard.append([InlineKeyboardButton("🔙 Cancelar", callback_data="admin_gestionar_envios")])
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.callback_query.edit_message_text(text, reply_markup=reply_markup, parse_mode='Markdown')
    
    async def apply_delay(self, update: Update, context: ContextTypes.DEFAULT_TYPE, 
                         reason_index: int, delay_days: int, tracking_id: str):
        """Apply delay with reason"""
        if not update.effective_user:
            return
        
        # Verify admin has access to this tracking
        admin_id = update.effective_user.id
        is_owner = self.is_owner(admin_id)
        tracking = db_manager.get_tracking(tracking_id)
        
        if not tracking:
            await update.callback_query.answer("❌ Tracking no encontrado")
            return
        
        if not db_manager.can_access_tracking(tracking_id, admin_id, is_owner):
            await update.callback_query.answer("❌ No tienes permiso para modificar este tracking")
            return
        
        reason = self.delay_reasons[reason_index] if reason_index < len(self.delay_reasons) else "Otro motivo"
        
        success = db_manager.add_delay_to_tracking(tracking_id, delay_days, reason)
        
        if success:
            await update.callback_query.answer("✅ Retraso agregado exitosamente")
            text = f"✅ **RETRASO AGREGADO**\n\nTracking: {tracking_id}\nRetraso: {delay_days} días\nMotivo: {reason}"
        else:
            await update.callback_query.answer("❌ Error al agregar retraso")
            text = f"❌ **ERROR**\n\nNo se pudo agregar el retraso."
        
        keyboard = [[InlineKeyboardButton("🔙 Volver", callback_data="admin_gestionar_envios")]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.callback_query.edit_message_text(text, reply_markup=reply_markup, parse_mode='Markdown')
    
    async def show_tracking_details(self, update: Update, context: ContextTypes.DEFAULT_TYPE, tracking_id: str):
        """Show detailed tracking information"""
        if not update.effective_user:
            return
        
        # Verify admin has access to this tracking
        admin_id = update.effective_user.id
        is_owner = self.is_owner(admin_id)
        
        tracking = db_manager.get_tracking(tracking_id)
        if not tracking:
            await update.callback_query.answer("❌ Tracking no encontrado")
            return
        
        if not db_manager.can_access_tracking(tracking_id, admin_id, is_owner):
            await update.callback_query.answer("❌ No tienes permiso para ver este tracking")
            return
        
        origin, destination = shipping_calc.extract_countries(tracking.sender_country, tracking.country_postal)
        status_display = STATUS_DISPLAY.get(tracking.status, tracking.status)
        
        text = f"""
📋 **DETALLES DEL TRACKING**

🏷️ **ID:** {tracking.tracking_id}
{status_display}

👤 **DESTINATARIO:**
• Nombre: {tracking.recipient_name}
• Dirección: {tracking.delivery_address}
• País/CP: {tracking.country_postal}

📦 **PAQUETE:**
• Producto: {tracking.product_name}
• Peso: {tracking.package_weight}
• Precio: {tracking.product_price}
• Fecha ingreso: {tracking.date_time}

📤 **REMITENTE:**
• Nombre: {tracking.sender_name}
• Dirección: {tracking.sender_address}
• País: {tracking.sender_country}
• Estado: {tracking.sender_state}

🚚 **ENVÍO:**
• Ruta: {origin} → {destination}
• Estimado: {tracking.estimated_delivery_date or 'Calculando...'}
• Retrasos: {tracking.actual_delay_days} días

📅 **FECHAS:**
• Creado: {tracking.created_at.strftime('%d/%m/%Y %H:%M') if tracking.created_at else 'N/A'}
• Actualizado: {tracking.updated_at.strftime('%d/%m/%Y %H:%M') if tracking.updated_at else 'N/A'}
        """.strip()
        
        keyboard = [[InlineKeyboardButton("🔙 Volver", callback_data="admin_main")]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.callback_query.edit_message_text(text, reply_markup=reply_markup, parse_mode='Markdown')
    
    async def show_statistics(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Show tracking statistics"""
        if not update.effective_user:
            return
        
        admin_id = update.effective_user.id
        is_owner = self.is_owner(admin_id)
        
        stats = db_manager.get_statistics(admin_id=admin_id, is_owner=is_owner)
        
        status_counts = stats.get('by_status', {})
        total = stats.get('total', 0)
        today = stats.get('today', 0)
        
        text = f"""
📊 **ESTADÍSTICAS**

📈 **RESUMEN GENERAL:**
• Total trackings: {total}
• Creados hoy: {today}

📋 **POR ESTADO:**
• 🔴 Retenidos: {status_counts.get(STATUS_RETENIDO, 0)}
• 🟡 Confirmar pago: {status_counts.get(STATUS_CONFIRMAR_PAGO, 0)}
• 🔵 En tránsito: {status_counts.get(STATUS_EN_TRANSITO, 0)}
• 🟢 Entregados: {status_counts.get(STATUS_ENTREGADO, 0)}

💼 **ACTIVIDAD:**
• Paquetes pendientes: {status_counts.get(STATUS_RETENIDO, 0) + status_counts.get(STATUS_CONFIRMAR_PAGO, 0)}
• En proceso: {status_counts.get(STATUS_EN_TRANSITO, 0)}
• Completados: {status_counts.get(STATUS_ENTREGADO, 0)}
        """.strip()
        
        keyboard = [[InlineKeyboardButton("🔙 Volver", callback_data="admin_main")]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.callback_query.edit_message_text(text, reply_markup=reply_markup, parse_mode='Markdown')
    
    async def confirm_delete_tracking(self, update: Update, context: ContextTypes.DEFAULT_TYPE, tracking_id: str):
        """Show confirmation dialog before deleting tracking"""
        if not update.callback_query:
            return
        
        tracking = db_manager.get_tracking(tracking_id)
        if not tracking:
            await update.callback_query.answer("❌ Tracking no encontrado")
            return
        
        text = f"""
🗑️ **CONFIRMAR ELIMINACIÓN**

⚠️ **¿Estás seguro de eliminar este tracking?**

🏷️ **ID:** {tracking.tracking_id}
👤 **Cliente:** {tracking.recipient_name}
📍 **Destino:** {tracking.country_postal}
💰 **Monto:** {tracking.product_price}

**Esta acción no se puede deshacer.**
        """.strip()
        
        keyboard = [
            [
                InlineKeyboardButton("✅ SÍ, ELIMINAR", callback_data=f"delete_yes_{tracking_id}"),
                InlineKeyboardButton("❌ CANCELAR", callback_data=f"delete_cancel_{tracking.status}")
            ]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.callback_query.edit_message_text(text, reply_markup=reply_markup, parse_mode='Markdown')
    
    async def process_delete_tracking(self, update: Update, context: ContextTypes.DEFAULT_TYPE, tracking_id: str):
        """Process tracking deletion"""
        if not update.callback_query or not update.effective_user:
            return
        
        # Get tracking info before deletion for the message
        tracking = db_manager.get_tracking(tracking_id)
        if not tracking:
            await update.callback_query.answer("❌ Tracking no encontrado")
            return
        
        # Verify admin has access to this tracking
        admin_id = update.effective_user.id
        is_owner = self.is_owner(admin_id)
        
        if not db_manager.can_access_tracking(tracking_id, admin_id, is_owner):
            await update.callback_query.answer("❌ No tienes permiso para eliminar este tracking")
            return
        
        # Store the status to know where to return
        return_status = tracking.status
        
        # Delete the tracking
        success = db_manager.delete_tracking(tracking_id)
        
        if success:
            await update.callback_query.answer("✅ Tracking eliminado exitosamente")
            text = f"✅ **TRACKING ELIMINADO**\n\nEl tracking {tracking_id} ha sido eliminado del sistema."
        else:
            await update.callback_query.answer("❌ Error al eliminar tracking")
            text = f"❌ **ERROR**\n\nNo se pudo eliminar el tracking {tracking_id}."
        
        # Return to appropriate list based on status
        if return_status == STATUS_RETENIDO:
            callback_data = "admin_retenidos"
        elif return_status == STATUS_CONFIRMAR_PAGO:
            callback_data = "admin_confirmar_pagos"
        else:
            callback_data = "admin_main"
        
        keyboard = [[InlineKeyboardButton("🔙 Volver", callback_data=callback_data)]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.callback_query.edit_message_text(text, reply_markup=reply_markup, parse_mode='Markdown')
    
    async def start_search(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Start tracking search"""
        text = """
🔍 **BUSCAR TRACKING**

Por favor, ingresa el ID del tracking que deseas buscar:

Puedes escribir el ID completo o parcial.
        """.strip()
        
        # Clear any previous state and set search state
        if context.user_data is not None:
            context.user_data.clear()
            context.user_data['searching_tracking'] = True
        
        keyboard = [[InlineKeyboardButton("🔙 Cancelar", callback_data="admin_main")]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.callback_query.edit_message_text(text, reply_markup=reply_markup, parse_mode='Markdown')
    
    async def process_search(self, update: Update, context: ContextTypes.DEFAULT_TYPE, search_query: str):
        """Process tracking search query"""
        # Ensure search state is cleared
        if context.user_data is not None:
            context.user_data['searching_tracking'] = False
        
        if not update.effective_user:
            return
        
        admin_id = update.effective_user.id
        is_owner = self.is_owner(admin_id)
        
        # Search for tracking by ID
        tracking = db_manager.get_tracking(search_query)
        
        # Verify admin has access to this tracking
        if tracking and not db_manager.can_access_tracking(search_query, admin_id, is_owner):
            tracking = None  # Admin doesn't have access to this tracking
        
        if tracking:
            # Found exact match - show details
            origin, destination = shipping_calc.extract_countries(tracking.sender_country, tracking.country_postal)
            status_display = STATUS_DISPLAY.get(tracking.status, tracking.status)
            
            text = f"""
📋 **TRACKING ENCONTRADO**

🏷️ **ID:** {tracking.tracking_id}
{status_display}

👤 **DESTINATARIO:**
• Nombre: {tracking.recipient_name}
• Dirección: {tracking.delivery_address}
• País/CP: {tracking.country_postal}

📦 **PAQUETE:**
• Producto: {tracking.product_name}
• Peso: {tracking.package_weight}
• Precio: {tracking.product_price}

📤 **REMITENTE:**
• Nombre: {tracking.sender_name}
• País: {tracking.sender_country}

🚚 **ENVÍO:**
• Ruta: {origin} → {destination}
• Estimado: {tracking.estimated_delivery_date or 'Calculando...'}
• Retrasos: {tracking.actual_delay_days} días

📅 **FECHAS:**
• Creado: {tracking.created_at.strftime('%d/%m/%Y %H:%M') if tracking.created_at else 'N/A'}
• Actualizado: {tracking.updated_at.strftime('%d/%m/%Y %H:%M') if tracking.updated_at else 'N/A'}
            """.strip()
            
            keyboard = [
                [InlineKeyboardButton("🔍 Buscar Otro", callback_data="admin_buscar")],
                [InlineKeyboardButton("🔙 Volver al Menú", callback_data="admin_main")]
            ]
        else:
            # Not found - try partial search (filtered by admin)
            all_trackings = db_manager.get_all_trackings(admin_id=admin_id, is_owner=is_owner)
            matches = [t for t in all_trackings if search_query.upper() in t.tracking_id.upper()]
            
            if matches:
                text = f"🔍 **RESULTADOS DE BÚSQUEDA** (encontrados: {len(matches)})\n\n"
                keyboard = []
                
                for tracking in matches[:5]:  # Show max 5 results
                    origin, destination = shipping_calc.extract_countries(tracking.sender_country, tracking.country_postal)
                    status_display = STATUS_DISPLAY.get(tracking.status, tracking.status)
                    
                    text += f"**{tracking.tracking_id[:20]}...**\n"
                    text += f"👤 {tracking.recipient_name}\n"
                    text += f"📍 {origin} → {destination}\n"
                    text += f"{status_display}\n"
                    text += "─" * 30 + "\n"
                    
                    keyboard.append([
                        InlineKeyboardButton(f"📋 Ver {tracking.tracking_id[:15]}...", 
                                           callback_data=f"view_details_{tracking.tracking_id}")
                    ])
                
                if len(matches) > 5:
                    text += f"\n... y {len(matches) - 5} resultados más."
                
                keyboard.append([InlineKeyboardButton("🔍 Buscar Otro", callback_data="admin_buscar")])
                keyboard.append([InlineKeyboardButton("🔙 Volver al Menú", callback_data="admin_main")])
            else:
                text = f"❌ **NO ENCONTRADO**\n\nNo se encontró ningún tracking con: '{search_query}'\n\nIntenta con otro ID."
                keyboard = [
                    [InlineKeyboardButton("🔍 Buscar Otro", callback_data="admin_buscar")],
                    [InlineKeyboardButton("🔙 Volver al Menú", callback_data="admin_main")]
                ]
        
        reply_markup = InlineKeyboardMarkup(keyboard)
        await update.message.reply_text(text, reply_markup=reply_markup, parse_mode='Markdown')
    
    async def handle_callback_query(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle all callback queries from inline buttons"""
        query = update.callback_query
        if not query or not query.data:
            return
            
        await query.answer()
        data = query.data
        
        # Main menu navigation
        if data == "admin_main":
            await self.admin_main_menu(update, context)
        elif data == "admin_crear_tracking":
            await self.start_tracking_creation(update, context)
        elif data == "admin_retenidos":
            await self.show_retenidos(update, context)
        elif data == "admin_confirmar_pagos":
            await self.show_confirmar_pagos(update, context)
        elif data == "admin_gestionar_envios":
            await self.show_gestionar_envios(update, context)
        elif data == "admin_estadisticas":
            await self.show_statistics(update, context)
        elif data == "admin_buscar":
            await self.start_search(update, context)
        
        # Payment confirmation
        elif data.startswith("confirm_payment_"):
            tracking_id = data.replace("confirm_payment_", "")
            await self.confirm_payment(update, context, tracking_id)
        elif data.startswith("confirm_yes_"):
            tracking_id = data.replace("confirm_yes_", "")
            await self.process_payment_confirmation(update, context, tracking_id)
        
        # Shipping
        elif data.startswith("ship_package_"):
            tracking_id = data.replace("ship_package_", "")
            await self.ship_package(update, context, tracking_id)
        
        # Delivery
        elif data.startswith("delivered_"):
            tracking_id = data.replace("delivered_", "")
            await self.mark_delivered(update, context, tracking_id)
        
        # Delays
        elif data.startswith("add_delay_"):
            tracking_id = data.replace("add_delay_", "")
            await self.show_delay_options(update, context, tracking_id)
        elif data.startswith("delay_"):
            parts = data.split("_")
            delay_days = int(parts[1])
            tracking_id = parts[2]
            await self.process_delay(update, context, delay_days, tracking_id)
        elif data.startswith("reason_"):
            parts = data.split("_")
            reason_index = int(parts[1])
            delay_days = int(parts[2])
            tracking_id = parts[3]
            await self.apply_delay(update, context, reason_index, delay_days, tracking_id)
        
        # Delete tracking
        elif data.startswith("delete_tracking_"):
            tracking_id = data.replace("delete_tracking_", "")
            await self.confirm_delete_tracking(update, context, tracking_id)
        elif data.startswith("delete_yes_"):
            tracking_id = data.replace("delete_yes_", "")
            await self.process_delete_tracking(update, context, tracking_id)
        elif data.startswith("delete_cancel_"):
            # Extract status to return to appropriate view
            status = data.replace("delete_cancel_", "")
            if status == STATUS_RETENIDO:
                await self.show_retenidos(update, context)
            elif status == STATUS_CONFIRMAR_PAGO:
                await self.show_confirmar_pagos(update, context)
            else:
                await self.admin_main_menu(update, context)
        
        # View details
        elif data.startswith("view_details_"):
            tracking_id = data.replace("view_details_", "")
            await self.show_tracking_details(update, context, tracking_id)

# Global admin panel instance
admin_panel = AdminPanel()