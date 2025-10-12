# 🌐 Configurar Bot (Termux) + Web (Render)

Esta guía te explica cómo conectar tu bot de Telegram en Termux con tu página web en Render.

## 🔄 Arquitectura del Sistema

```
┌─────────────────────┐         ┌──────────────────────┐
│   Bot en Termux     │◄───────►│  PostgreSQL (Neon)   │
│   (Android)         │         │  Base de Datos       │
└─────────────────────┘         └──────────────────────┘
          │                               ▲
          │ API REST                      │
          │ (Opcional)                    │
          ▼                               │
┌─────────────────────┐                   │
│   Web en Render     │───────────────────┘
│   (Cloud)           │
└─────────────────────┘
```

## 📋 Variables Necesarias

### Variables Compartidas (IGUALES en ambos)

Estas deben ser **EXACTAMENTE IGUALES** en Termux y Render:

| Variable | Descripción | Dónde se usa |
|----------|-------------|--------------|
| `DATABASE_URL` | URL de PostgreSQL | Bot + Web |
| `ADMIN_TOKEN` | Token de seguridad | Bot + Web |

### Variables Solo para el Bot (Termux)

| Variable | Descripción |
|----------|-------------|
| `BOT_TOKEN` | Token de @BotFather |
| `CHANNEL_ID` | ID del canal |
| `OWNER_TELEGRAM_ID` | Tu ID de Telegram |
| `ORS_API_KEY` | API de OpenRouteService |
| `API_BASE_URL` | URL de tu web en Render |

## 🚀 Paso a Paso: Configuración Completa

### 1️⃣ Crear Base de Datos (Una sola para ambos)

**Opción A: Neon (Recomendado - Gratis)**

1. Ve a https://neon.tech
2. Crea una cuenta
3. Crea un proyecto nuevo
4. Copia la **Connection String**
   ```
   postgresql://usuario:pass@host.neon.tech/dbname?sslmode=require
   ```
5. **GUARDA ESTA URL** - la usarás en ambos lados

**Opción B: Supabase**

1. Ve a https://supabase.com
2. Crea un proyecto
3. Settings → Database → Connection String (Session pooler)
4. Copia la URL

### 2️⃣ Configurar Web en Render

1. Ve a tu proyecto en Render
2. Click en **Environment**
3. Agrega estas variables:

```env
DATABASE_URL=postgresql://tu-url-de-neon...
ADMIN_TOKEN=tu_token_secreto_123xyz
```

4. Click **Save Changes**
5. Espera que Render redeploy tu app
6. **COPIA LA URL DE TU APP** (ejemplo: `https://tu-app.onrender.com`)

### 3️⃣ Configurar Bot en Termux

**Opción A: Usando el instalador (Recomendado)**

```bash
cd bot
bash instalar.sh
```

Cuando te pida los datos, ingresa:

- **DATABASE_URL**: La MISMA URL que pusiste en Render
- **ADMIN_TOKEN**: EL MISMO token que pusiste en Render
- **API_BASE_URL**: La URL de tu app en Render (ej: `https://tu-app.onrender.com`)
- **BOT_TOKEN**: Tu token de @BotFather
- **CHANNEL_ID**: ID de tu canal
- **OWNER_TELEGRAM_ID**: Tu ID de Telegram
- **ORS_API_KEY**: Tu API key de OpenRouteService

**Opción B: Manual**

Crea el archivo `.env` en Termux:

```bash
cd bot
nano .env
```

Pega esto (reemplaza con tus valores):

```env
# DEBEN SER IGUALES A RENDER
DATABASE_URL=postgresql://usuario:pass@host.neon.tech/dbname?sslmode=require
ADMIN_TOKEN=tu_token_secreto_123xyz

# ESPECÍFICOS DEL BOT
BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
CHANNEL_ID=-1001234567890
OWNER_TELEGRAM_ID=123456789
ORS_API_KEY=tu_ors_api_key
API_BASE_URL=https://tu-app.onrender.com
```

Guarda: `Ctrl + X` → `Y` → `Enter`

### 4️⃣ Preparar Base de Datos

**En Termux:**

```bash
cd bot
python3 setup_db.py
```

Esto crea las tablas necesarias en tu base de datos de Neon.

### 5️⃣ Iniciar el Bot

```bash
python3 bot.py
```

O con auto-reinicio:

```bash
bash run_bot.sh
```

## ✅ Verificar que Funciona

### Prueba 1: Crear Tracking en Telegram

1. Abre Telegram
2. Busca tu bot
3. Envía `/start`
4. Crea un nuevo tracking
5. **Verifica en tu web** → Debería aparecer instantáneamente

### Prueba 2: Ver Tracking en Web

1. Abre tu web en Render
2. Deberías ver el tracking que creaste en Telegram
3. **¡Mismo dato en ambos lados!** ✨

### Prueba 3: Actualizar desde Bot

1. En Telegram, actualiza el estado del tracking
2. **Verifica en la web** → El estado debe cambiar
3. Si usas la API, verás logs en el bot

## 🔍 Cómo Funciona la Sincronización

### Método 1: Base de Datos Compartida (Automático)

```
Bot crea tracking → Guarda en PostgreSQL ← Web lee de PostgreSQL
```

- **No necesita configuración extra**
- Funciona con solo compartir `DATABASE_URL`
- **Sincronización instantánea**

### Método 2: API REST (Opcional)

```
Bot actualiza → Llama API web → Web actualiza BD → Todos ven cambios
```

- Requiere `API_BASE_URL` y `ADMIN_TOKEN`
- Útil para validaciones adicionales
- Permite webhooks y notificaciones

## 🛠️ Solución de Problemas

### ❌ "Los trackings no aparecen en la web"

**Causa:** DATABASE_URL diferente en bot y web

**Solución:**
```bash
# En Termux, verifica tu DATABASE_URL
cat .env | grep DATABASE_URL

# Compara con la URL en Render Environment
# DEBEN SER EXACTAMENTE IGUALES
```

### ❌ "API communication error"

**Causa:** API_BASE_URL incorrecta o ADMIN_TOKEN diferente

**Solución:**
```bash
# Verifica API_BASE_URL
cat .env | grep API_BASE_URL
# Debe ser: https://tu-app.onrender.com (sin / al final)

# Verifica ADMIN_TOKEN
# Debe ser IGUAL en Termux y Render
```

### ❌ "Database connection failed"

**Causa:** DATABASE_URL incorrecta o BD inactiva

**Solución:**
1. Verifica que tu proyecto en Neon esté activo
2. Revisa que la URL termine en `?sslmode=require`
3. Prueba la conexión:
   ```bash
   python3 -c "import psycopg2; psycopg2.connect('$DATABASE_URL')"
   ```

### ❌ "El bot se detiene después de un tiempo"

**Causa:** Termux suspende procesos en segundo plano

**Solución:**

**Opción 1: Usar tmux**
```bash
pkg install tmux
tmux new -s bot
cd bot && python3 bot.py
# Presiona: Ctrl+B, luego D (para desconectar)

# Para reconectar:
tmux attach -t bot
```

**Opción 2: Termux:Boot** (requiere app adicional)
```bash
# Instala Termux:Boot desde F-Droid
mkdir -p ~/.termux/boot
nano ~/.termux/boot/start-bot.sh
```

Pega:
```bash
#!/data/data/com.termux/files/usr/bin/bash
cd ~/bot
bash run_bot.sh
```

Hazlo ejecutable:
```bash
chmod +x ~/.termux/boot/start-bot.sh
```

## 📊 Variables por Plataforma

### En RENDER (Environment Variables):

```env
DATABASE_URL=postgresql://...  # Base de datos compartida
ADMIN_TOKEN=mi_token_123       # Token compartido
```

### En TERMUX (.env):

```env
# Compartidas (IGUALES a Render)
DATABASE_URL=postgresql://...  # LA MISMA que Render
ADMIN_TOKEN=mi_token_123       # EL MISMO que Render

# Solo para el bot
BOT_TOKEN=...
CHANNEL_ID=...
OWNER_TELEGRAM_ID=...
ORS_API_KEY=...
API_BASE_URL=https://tu-app.onrender.com
```

## 🔐 Seguridad

### ⚠️ IMPORTANTE:

- **NUNCA** compartas tu archivo `.env`
- **NUNCA** subas `.env` a GitHub
- El `ADMIN_TOKEN` debe ser secreto y complejo
- Usa `?sslmode=require` en DATABASE_URL

### Generar ADMIN_TOKEN seguro:

En Termux:
```bash
openssl rand -hex 32
```

O simplemente usa algo como:
```
mi_token_super_secreto_xyz_789_abc
```

## 📝 Checklist Final

- [ ] Base de datos PostgreSQL creada (Neon/Supabase)
- [ ] DATABASE_URL configurada en Render
- [ ] ADMIN_TOKEN configurado en Render
- [ ] Web desplegada en Render (con la URL)
- [ ] Bot configurado en Termux con `.env`
- [ ] DATABASE_URL en bot = DATABASE_URL en Render
- [ ] ADMIN_TOKEN en bot = ADMIN_TOKEN en Render
- [ ] API_BASE_URL apunta a Render
- [ ] Base de datos inicializada (`setup_db.py`)
- [ ] Bot corriendo en Termux
- [ ] Prueba: Crear tracking en bot → Ver en web ✅

## 🎉 ¡Listo!

Ahora tu bot en Termux y tu web en Render están **perfectamente sincronizados** a través de la base de datos compartida.

**Cualquier cambio en uno se refleja automáticamente en el otro** 🚀

---

## 💡 Tips Adicionales

### Mantener el Bot Activo 24/7

Si quieres que el bot funcione todo el tiempo:

1. **Opción A:** Deja Termux abierto (consume batería)
2. **Opción B:** Usa `tmux` + Termux:Wake Lock
3. **Opción C:** Despliega el bot también en Render/Railway

### Ver Logs en Tiempo Real

```bash
# En Termux
tail -f bot.log
```

### Reiniciar el Bot Rápido

```bash
pkill -f bot.py && python3 bot.py
```

---

**Última actualización:** 2025
**Versión:** 2.0
