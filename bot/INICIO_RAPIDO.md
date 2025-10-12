# 🚀 INICIO RÁPIDO - Bot de Telegram en Termux

## 📱 Guía Express (5 minutos)

### 1️⃣ Instalar lo Básico

Abre Termux y ejecuta:

```bash
pkg update && pkg upgrade -y
pkg install -y python git postgresql libpq
```

### 2️⃣ Ir al Directorio del Bot

```bash
cd bot
```

### 3️⃣ Instalar Dependencias

```bash
pip install -r requirements.txt
```

### 4️⃣ Configurar el Bot (IMPORTANTE)

Ejecuta el asistente de configuración:

```bash
python3 setup_termux.py
```

**Te pedirá 6 cosas:**

1. **BOT_TOKEN** → Ve a @BotFather en Telegram
2. **CHANNEL_ID** → Usa @userinfobot en tu canal
3. **OWNER_TELEGRAM_ID** → Habla con @userinfobot
4. **ORS_API_KEY** → Regístrate en https://openrouteservice.org/
5. **DATABASE_URL** → Crea DB gratis en https://neon.tech
6. **ADMIN_TOKEN** → Inventa uno (ej: "miTokenSecreto123")

### 5️⃣ Preparar la Base de Datos

```bash
python3 setup_db.py
```

### 6️⃣ Iniciar el Bot

```bash
python3 bot.py
```

¡Listo! Abre Telegram y busca tu bot.

---

## 📍 Ubicación de Archivos Importantes

```
bot/
├── setup_termux.py       ← Script de configuración
├── verificar_config.py   ← Verifica tu configuración
├── bot.py                ← Código del bot
├── run_bot.sh            ← Ejecutar con auto-reinicio
├── .env                  ← TUS SECRETOS (se crea al configurar)
└── README_TERMUX.md      ← Guía completa
```

---

## 🔍 Comandos Útiles

### Verificar Configuración
```bash
python3 verificar_config.py
```

### Iniciar Bot (con auto-reinicio)
```bash
bash run_bot.sh
```

### Ver si el Bot Está Corriendo
```bash
pgrep -f bot.py
```

### Detener el Bot
```bash
pkill -f bot.py
```

---

## 🆘 Problemas Comunes

### "BOT_TOKEN is required"
→ Ejecuta: `python3 setup_termux.py`

### "DATABASE_URL not found"
→ Verifica: `cat .env`

### El bot no responde
→ Verifica que esté corriendo: `pgrep -f bot.py`

---

## 📚 Más Ayuda

Para instrucciones detalladas, lee: **README_TERMUX.md**

```bash
cat README_TERMUX.md
```

---

## ⚡ Resumen Ultra Rápido

```bash
# 1. Instalar
pkg update && pkg upgrade -y
pkg install -y python git postgresql libpq

# 2. Ir al directorio
cd bot

# 3. Dependencias
pip install -r requirements.txt

# 4. Configurar (INTERACTIVO)
python3 setup_termux.py

# 5. Base de datos
python3 setup_db.py

# 6. ¡Iniciar!
python3 bot.py
```

---

**💡 Tip:** Mantén Termux abierto para que el bot siga funcionando.
Para ejecutar en segundo plano, usa `tmux` o `screen`.
