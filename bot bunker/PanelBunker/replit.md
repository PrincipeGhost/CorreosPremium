# Bot de Telegram con Sistema de Tracking Integrado

## Descripción
Bot de Telegram multifuncional desarrollado en Python que incluye:
- Validación de membresía de canal privado
- Sistema completo de gestión de tracking de paquetes
- Panel de administración con botones interactivos
- Integración con base de datos PostgreSQL
- Cálculo de rutas usando OpenRouteService API

## Funcionalidades Principales

### 🔐 Seguridad y Acceso
- ✅ Validación de membresía de canal privado
- ✅ Sistema de permisos (Owner vs usuarios regulares)
- ✅ Autenticación mediante Telegram ID

### 🎯 Menú Principal
- ✅ BOT: Acceso al sistema de tracking
- ✅ Trading: Próximamente
- ✅ Soporte: Información y ayuda
- ✅ Grupo: Acceso al grupo privado

### 📦 Sistema de Tracking
- ✅ Creación de trackings con información completa (flujo de 10 pasos)
- ✅ Gestión de estados (Retenido, Confirmar Pago, En Tránsito, Entregado)
- ✅ Cálculo automático de fechas de entrega
- ✅ Gestión de retrasos con motivos
- ✅ Búsqueda de trackings por ID (formato: PK + 21 caracteres)
- ✅ Panel de estadísticas completo
- ✅ Historial de estados por tracking
- ✅ Integración con OpenRouteService para rutas reales
- ✅ **NUEVO**: Datos separados de remitente y destinatario (código postal, provincia, país)
- ✅ **NUEVO**: Geocodificación mejorada con datos completos

## Estructura del Proyecto
```
├── main.py                  # Código principal del bot integrado
├── database.py              # Manejo de PostgreSQL
├── models.py                # Modelos de datos (Tracking, ShippingRoute, etc)
├── admin_panel.py           # Panel de administración con botones
├── shipping_calculator.py   # Cálculo de tiempos de envío
├── openroute_service.py     # Integración con OpenRouteService
├── requirements.txt         # Dependencias Python
├── Procfile                 # Configuración para Render
├── .env.example             # Plantilla de variables de entorno
├── .gitignore               # Archivos a ignorar en git
├── instalar.sh              # Script de instalación para Termux
├── start_bot.sh             # Script de inicio con auto-reinicio
├── bunker_island_logo.png   # Logo del bot
└── replit.md                # Este archivo de documentación
```

## Variables de Entorno Requeridas

### Bot Principal
- `BOT_TOKEN`: Token del bot obtenido desde @BotFather
- `CHANNEL_ID`: ID del canal privado (ej: -1001234567890) 
- `CHANNEL_USERNAME`: Username del canal (alternativa a CHANNEL_ID)

### Sistema de Tracking
- `OWNER_TELEGRAM_ID`: ID de Telegram del propietario (desde @userinfobot)
- `DATABASE_URL`: URL de conexión a PostgreSQL (ej: de neon.tech)
- `ORS_API_KEY`: API Key de OpenRouteService (gratis en https://openrouteservice.org/)
- `ADMIN_TOKEN`: Token de seguridad para API (genera uno aleatorio)
- `API_BASE_URL`: URL base de la API (opcional, default: http://localhost:5000)

## Instalación

### Opción 1: Termux (Android)
```bash
# Clonar o copiar el proyecto
cd bot

# Ejecutar instalador automático
bash instalar.sh

# El script instalará todo automáticamente y te guiará
```

### Opción 2: Render (Recomendado para producción)
1. Conectar el repositorio a Render
2. Configurar como "Worker"
3. Agregar todas las variables de entorno
4. Desplegar

### Opción 3: Manual
```bash
# Instalar dependencias del sistema
pkg install python git postgresql libpq python-pip  # Termux
# o
sudo apt install python3 python3-pip git postgresql libpq-dev  # Linux

# Instalar dependencias de Python
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
nano .env  # Editar y agregar tus credenciales

# Iniciar bot
python3 main.py
```

## Uso

### Iniciar el Bot
```bash
# Inicio simple
python3 main.py

# Con auto-reinicio (recomendado para Termux)
bash start_bot.sh
```

### Comandos del Bot
- `/start` - Iniciar el bot y ver menú principal
- `/cancel` - Cancelar proceso de creación de tracking

### Flujo del Sistema de Tracking
1. Usuario presiona "🤖 BOT" en menú principal
2. Usuario presiona "⚜️ Tracking"
3. Se muestra el panel de administración con opciones:
   - 📝 Crear Tracking
   - 📦 Ver Retenidos
   - 🚚 Confirmar Envío
   - 🚚 Gestionar Envíos
   - 📊 Estadísticas
   - 🔍 Buscar Tracking

### Flujo de Creación de Tracking (10 pasos)
1. **Dirección de envío del destinatario**
2. **Código postal del destinatario**
3. **Provincia y país del destinatario** (formato: "provincia, país")
4. **Dirección de envío del remitente**
5. **Código postal del remitente**
6. **Provincia y país del remitente** (formato: "provincia, país")
7. **Peso oficial del paquete** (ej: "2kg", "500g")
8. **Producto que envía**
9. **Precio del producto** (ej: "$50", "€30")
10. **Fecha y hora de ingreso** (ej: "25/12/2024 14:30")

## Base de Datos

### Configuración con Neon.tech (Gratis)
1. Ir a https://neon.tech
2. Crear cuenta gratuita
3. Crear nuevo proyecto
4. Copiar la connection string
5. Agregar a `DATABASE_URL` en .env

### Tablas Creadas Automáticamente
- `trackings`: Información de paquetes
  - **Campos principales**: tracking_id, delivery_address, sender_address, product_name, package_weight, product_price, date_time
  - **Datos del destinatario**: recipient_postal_code, recipient_province, recipient_country
  - **Datos del remitente**: sender_postal_code, sender_province, sender_country
  - **Geocodificación ORS**: recipient_lat/lon, sender_lat/lon, route_distance_km, route_duration_hours
  - **Estado y metadata**: status, estimated_delivery_date, actual_delay_days, created_at, updated_at
- `shipping_routes`: Rutas de envío predefinidas
- `status_history`: Historial de cambios de estado

## Arquitectura

### Tecnologías
- `python-telegram-bot 21.9`: Framework de Telegram
- `PostgreSQL`: Base de datos (vía psycopg2-binary)
- `httpx`: Cliente HTTP async
- `OpenRouteService`: API de geocodificación y rutas

### Diseño Modular
- **main.py**: Punto de entrada, menú principal y validación
- **database.py**: Abstracción de base de datos
- **admin_panel.py**: Lógica del panel de tracking
- **shipping_calculator.py**: Cálculos de tiempos
- **openroute_service.py**: Integración con API de rutas

## Despliegue

### Render (Recomendado)
- ✅ Configuración mediante Procfile
- ✅ Variables de entorno seguras
- ✅ Ejecución 24/7
- ✅ Logs accesibles

### Termux
- ✅ Scripts de instalación automática
- ✅ Auto-reinicio en caso de error
- ⚠️ Requiere celular encendido
- ⚠️ Consume batería

## Estado del Proyecto
- ✅ Bot principal funcional
- ✅ Sistema de tracking completamente integrado
- ✅ Base de datos PostgreSQL configurada con campos separados (última actualización: 24/11/2025)
- ✅ Panel de administración operativo
- ✅ Cálculo de rutas con OpenRouteService (geocodificación mejorada)
- ✅ Preparado para Render y Termux
- 🔄 Trading (próximamente)

## Cambios Recientes (24/11/2025)
- ✅ **Migración de base de datos**: Agregados campos separados para direcciones
- ✅ **Mejora de geocodificación**: ORS ahora usa código postal + provincia + país para mayor precisión
- ✅ **Flujo de conversación actualizado**: 10 pasos para recopilar datos detallados
- ✅ **Formato de tracking ID**: PK + 21 caracteres alfanuméricos
- ✅ **Compatibilidad**: Campos legacy mantenidos para compatibilidad con datos anteriores

## Soporte
Para problemas o dudas:
1. Revisar los logs: `tail -f bot.log` o revisar logs en Render
2. Verificar configuración: revisar .env
3. Verificar base de datos: conexión a PostgreSQL
4. Contactar al administrador del canal