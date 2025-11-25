# 🚀 GUÍA RÁPIDA - BOT DE TELEGRAM

## ✅ PROYECTO REORGANIZADO

Tu proyecto ahora está perfectamente organizado y listo para usar.

---

## 📂 NUEVA ESTRUCTURA

```
📁 / (Raíz del Proyecto)
│
├── 🤖 main.py                    ← Bot principal (menú + tracking)
│
├── 📁 tracking/                  ← Módulos del sistema de tracking
│   ├── __init__.py               ← Configuración del paquete
│   ├── admin_panel.py            ← Panel de administración
│   ├── database.py               ← Base de datos PostgreSQL
│   ├── models.py                 ← Modelos de datos
│   ├── shipping_calculator.py   ← Cálculos de envío
│   └── openroute_service.py     ← API de rutas
│
├── 🚀 start_bot.sh               ← ⭐ EJECUTA ESTO para iniciar
├── 🔧 instalar.sh                ← Instalador de dependencias
│
├── 📦 requirements.txt           ← Dependencias Python
├── ⚙️  Procfile                  ← Config para Render
├── 📖 replit.md                  ← Documentación original
├── 📖 ESTRUCTURA.md              ← Estructura del proyecto
├── 📖 GUIA_RAPIDA.md             ← Esta guía
│
└── 🖼️ bunker_island_logo.png    ← Logo del bot
```

---

## ⚡ INICIO RÁPIDO (TERMUX)

### 1️⃣ Iniciar el bot:
```bash
bash start_bot.sh
```

### 2️⃣ Detener el bot:
```bash
pkill -f main.py
```

### 3️⃣ Ver si está corriendo:
```bash
pgrep -f main.py
```

### 4️⃣ Ver logs en tiempo real:
```bash
tail -f bot.log
```

---

## 🔧 CONFIGURACIÓN INICIAL

### Instalar dependencias:
```bash
bash instalar.sh
```

### Crear archivo .env:
```bash
cp .env.example .env
nano .env
```

### Variables necesarias en .env:
```env
# Bot de Telegram
BOT_TOKEN=tu_token_aqui              # De @BotFather
CHANNEL_ID=-1001234567890            # ID del canal
CHANNEL_USERNAME=@tu_canal           # Username del canal
OWNER_TELEGRAM_ID=123456789          # Tu ID (@userinfobot)

# Base de datos
DATABASE_URL=postgresql://...        # Neon.tech

# Servicios externos
ORS_API_KEY=tu_api_key              # OpenRouteService
ADMIN_TOKEN=token_seguro_123        # Token de seguridad
```

---

## 📱 FUNCIONALIDADES DEL BOT

### Menú Principal:
1. **🤖 BOT** → Sistema de Tracking completo
2. **💰 Trading** → Próximamente
3. **⚠️ Soporte** → Ayuda e información
4. **⚜️ Grupo** → Acceso al grupo privado

### Sistema de Tracking:
- ✅ Crear trackings paso a paso
- ✅ Ver paquetes retenidos
- ✅ Confirmar pagos
- ✅ Gestionar envíos en tránsito
- ✅ Estadísticas completas
- ✅ Buscar trackings por ID
- ✅ Cálculo automático de rutas
- ✅ Historial de estados

---

## 📊 ARQUITECTURA

```
Usuario → Telegram → main.py
                        ↓
              tracking/__init__.py
                        ↓
        ┌───────────────┼───────────────┐
        ↓               ↓               ↓
  admin_panel    database.py    shipping_calculator
                        ↓               ↓
                  models.py    openroute_service
```

---

## 🔑 DIFERENCIAS CLAVE

### ✅ ANTES (desorganizado):
```
/ (raíz)
├── main.py
├── admin_panel.py      ← Todos mezclados
├── database.py         ← en la raíz
├── models.py
├── shipping_calculator.py
├── openroute_service.py
└── tracking_bot_code/  ← Carpeta vieja
```

### ✅ AHORA (organizado):
```
/ (raíz)
├── main.py             ← Bot principal
├── tracking/           ← Todo el tracking aquí
│   ├── admin_panel.py
│   ├── database.py
│   ├── models.py
│   ├── shipping_calculator.py
│   └── openroute_service.py
└── start_bot.sh        ← Fácil de encontrar
```

---

## 💡 VENTAJAS DE LA NUEVA ESTRUCTURA

✅ **Más claro**: Sabes que `tracking/` es todo el sistema de tracking
✅ **Mejor organizado**: `main.py` es solo el bot principal
✅ **Fácil de mantener**: Cada módulo en su lugar
✅ **Escalable**: Puedes agregar más módulos fácilmente
✅ **start_bot.sh en raíz**: Fácil de ejecutar siempre

---

## 🎯 COMANDOS MÁS USADOS

```bash
# Iniciar bot
bash start_bot.sh

# Detener bot
pkill -f main.py

# Ver logs
tail -f bot.log

# Instalar/actualizar
bash instalar.sh

# Verificar que está corriendo
ps aux | grep main.py
```

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### ❌ "No module named 'tracking'"
```bash
# Asegúrate de estar en la raíz del proyecto
cd /ruta/al/proyecto
python3 main.py
```

### ❌ "BOT_TOKEN not found"
```bash
# Crea el archivo .env
cp .env.example .env
nano .env
```

### ❌ El bot no responde
```bash
# Verifica que esté corriendo
pgrep -f main.py

# Si no está corriendo, inícialo
bash start_bot.sh
```

---

## 📚 DOCUMENTACIÓN COMPLETA

- `ESTRUCTURA.md` → Descripción detallada de cada archivo
- `replit.md` → Documentación original del proyecto
- `GUIA_RAPIDA.md` → Esta guía

---

## ✅ TODO LISTO

Tu proyecto está **100% funcional** y **perfectamente organizado**.

**Para iniciar el bot:**
```bash
bash start_bot.sh
```

🎉 **¡Disfruta tu bot!** 🎉
