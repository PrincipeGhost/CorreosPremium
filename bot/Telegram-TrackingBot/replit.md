# Telegram Bot with Channel Membership Validation

## Overview
Bot de Telegram que valida si los usuarios pertenecen a un canal privado específico antes de permitir el acceso. Preparado para despliegue en Render.

## Current State
- ✅ Bot funcional con validación de membresía a canal
- ✅ Sistema completo de creación de trackings paso a paso
- ✅ **Sistema de contra reembolso implementado al 100%**
- ✅ **Trackings automáticamente quedan RETENIDOS**
- ✅ **Panel administrativo visual con botones inline**
- ✅ **Base de datos PostgreSQL integrada**
- ✅ **Sistema de gestión de estados completo**
- ✅ **Calculadora de tiempos de envío con días laborables**
- ✅ **Gestión de retrasos y problemas logísticos**
- ✅ Configuración lista para despliegue en Render

## Recent Changes
**2025-09-26**: Mejoras en el flujo de inicio y panel administrativo
- ✅ **Comando /start renovado**: Dos mensajes separados (verificación + bienvenida)
- ✅ **Nuevo botón "📝 Crear Tracking"**: Primera opción en panel administrativo
- ✅ **Integración completa**: Admin panel → ConversationHandler para crear trackings
- ✅ **Bienvenida personalizada**: Formato "🏴‍☠️{username}🏴‍☠️" 
- ✅ **Flujo optimizado**: Usuarios eligen cuándo crear tracking vs automático

**2025-09-24**: Sistema de contra reembolso completamente implementado
- Base de datos PostgreSQL con trackings, shipping_routes, status_history
- Estados automáticos: RETENIDO → CONFIRMAR_PAGO → EN_TRÁNSITO → ENTREGADO
- Panel administrativo con comando /admin y botones inline
- Gestión visual: confirmar pagos, enviar paquetes, manejar retrasos
- Calculadora de tiempos con días laborables y rutas predefinidas
- Sistema de retrasos con motivos y recálculo automático de fechas
- Integración completa con base de datos para consulta web

## User Preferences
- Usuario prefiere comunicación en español
- Enfoque en funcionalidad sin documentación excesiva
- Preparado para agregar funciones adicionales posteriormente

## Project Architecture
**Main Files:**
- `bot.py`: Archivo principal del bot con lógica de validación
- `requirements.txt`: Dependencias para despliegue en Render
- `Procfile`: Configuración para Render deployment
- `replit.md`: Documentación del proyecto

**Key Features:**
1. Validación automática de membresía a canal privado
2. **Sistema de contra reembolso con estados automáticos**
3. Recolección de 11 campos específicos de información:
   - Destinatario: nombre, dirección, país/CP, fecha/hora, peso, producto
   - Remitente: nombre, dirección origen, país, estado, precio
4. **Base de datos PostgreSQL integrada con 3 tablas**
5. **Panel administrativo con botones inline para gestión**
6. **Sistema de gestión de estados con flujo completo**
7. **Calculadora de tiempos de envío con días laborables**
8. **Gestión de retrasos con motivos y recálculo automático**
9. **Comando /admin con control de acceso**
10. **Integración lista para página web de consulta**

**Dependencies:**
- python-telegram-bot==21.9
- python-dotenv==1.1.1  
- psycopg2-binary

**Database Schema:**
- trackings: información completa + estados + tiempos
- shipping_routes: rutas y días estimados de envío  
- status_history: historial de cambios de estado

**Environment Variables:**
- BOT_TOKEN: Token del bot obtenido de @BotFather
- CHANNEL_ID: ID o username del canal privado a validar