# 🤖 Bot de Telegram - Guía para Termux

Esta guía te ayudará a configurar y ejecutar el bot de Telegram en **Termux** (Android).

## 📱 Requisitos Previos

1. **Termux** instalado desde F-Droid (NO desde Google Play)
2. Conexión a internet
3. Al menos 500MB de espacio libre

## 🚀 Instalación Paso a Paso

### 1. Actualizar Termux

```bash
pkg update && pkg upgrade -y
```

### 2. Instalar Dependencias del Sistema

```bash
pkg install -y python git postgresql libpq
```

### 3. Clonar o Descargar el Proyecto

Si tienes el código en un repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd [NOMBRE_DEL_PROYECTO]/bot
```

Si descargaste los archivos, navega al directorio:
```bash
cd storage/downloads/bot
```

### 4. Instalar Dependencias de Python

```bash
pip install -r requirements.txt
```

## ⚙️ Configuración del Bot

### Opción A: Configuración Interactiva (RECOMENDADO)

Ejecuta el script de configuración que te pedirá todos los datos necesarios:

```bash
python3 setup_termux.py
```

El script te guiará paso a paso para obtener y configurar:

1. **BOT_TOKEN** - Token de @BotFather
2. **CHANNEL_ID** - ID de tu canal
3. **OWNER_TELEGRAM_ID** - Tu ID de Telegram
4. **ORS_API_KEY** - API Key de OpenRouteService
5. **DATABASE_URL** - URL de PostgreSQL
6. **ADMIN_TOKEN** - Token de seguridad

### Opción B: Configuración Manual

Crea un archivo `.env` en el directorio `bot`:

```bash
nano .env
```

Agrega lo siguiente (reemplaza con tus valores):

```env
BOT_TOKEN=tu_token_de_botfather
CHANNEL_ID=-1001234567890
OWNER_TELEGRAM_ID=123456789
ORS_API_KEY=tu_api_key_de_openrouteservice
DATABASE_URL=postgresql://usuario:password@host:5432/db?sslmode=require
ADMIN_TOKEN=tu_token_secreto_123xyz
```

Guarda con `Ctrl + X`, luego `Y` y `Enter`.

## 📋 Cómo Obtener los Valores Necesarios

### 1. BOT_TOKEN (Token del Bot)

1. Abre Telegram
2. Busca **@BotFather**
3. Envía `/newbot` o `/mybots`
4. Sigue las instrucciones
5. Copia el token que te da (ejemplo: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 2. CHANNEL_ID (ID del Canal)

**Opción 1 - Usar ID numérico:**
1. Agrega **@userinfobot** a tu canal como administrador
2. El bot te enviará el ID del canal (ejemplo: `-1001234567890`)

**Opción 2 - Usar username:**
1. Si tu canal tiene username, úsalo con @ (ejemplo: `@micanal`)

### 3. OWNER_TELEGRAM_ID (Tu ID Personal)

1. Abre Telegram
2. Busca **@userinfobot**
3. Inicia una conversación
4. Te enviará tu ID (ejemplo: `123456789`)

### 4. ORS_API_KEY (API de OpenRouteService)

1. Ve a https://openrouteservice.org/
2. Crea una cuenta gratuita
3. Ve a tu Dashboard
4. Genera un Token/API Key
5. Cópialo

### 5. DATABASE_URL (Base de Datos PostgreSQL)

Puedes usar servicios gratuitos:

**Opción 1 - Neon (Recomendado):**
1. Ve a https://neon.tech
2. Crea una cuenta
3. Crea un proyecto
4. Copia la Connection String
5. Asegúrate de que termine con `?sslmode=require`

**Opción 2 - Supabase:**
1. Ve a https://supabase.com
2. Crea un proyecto
3. Ve a Settings > Database
4. Copia la URI de conexión
5. Usa el modo "Session pooler"

**Opción 3 - Render:**
1. Ve a https://render.com
2. Crea una base de datos PostgreSQL gratuita
3. Copia la External Database URL

### 6. ADMIN_TOKEN (Token de Seguridad)

Este lo creas tú. Puede ser cualquier texto seguro aleatorio:
- Ejemplo: `mi_token_super_secreto_xyz123`
- O genera uno: `openssl rand -hex 32` (si tienes openssl)

## 🗄️ Configurar la Base de Datos

Una vez que tengas el `.env` configurado:

```bash
python3 setup_db.py
```

Este comando creará las tablas necesarias en la base de datos.

## ▶️ Ejecutar el Bot

### Método 1: Ejecución Simple

```bash
python3 bot.py
```

### Método 2: Con Auto-reinicio (RECOMENDADO)

```bash
bash run_bot.sh
```

Este script reinicia el bot automáticamente si se detiene por error.

### Método 3: En Segundo Plano

```bash
nohup python3 bot.py > bot.log 2>&1 &
```

Para ver los logs:
```bash
tail -f bot.log
```

Para detener el bot:
```bash
pkill -f bot.py
```

## 🔍 Verificar que el Bot Funciona

1. Abre Telegram
2. Busca tu bot por su username
3. Envía `/start`
4. Deberías ver el mensaje de bienvenida

## 🛠️ Solución de Problemas

### Error: "BOT_TOKEN environment variable is required"

- Verifica que el archivo `.env` existe en el directorio `bot`
- Asegúrate de que el archivo contiene `BOT_TOKEN=...`
- Ejecuta: `cat .env` para verificar el contenido

### Error: "DATABASE_URL not found"

- Verifica que `DATABASE_URL` está en el archivo `.env`
- Asegúrate de que la URL es correcta y tiene `?sslmode=require` al final

### Error de conexión a la base de datos

- Verifica tu conexión a internet
- Confirma que la URL de la base de datos es correcta
- Si usas Neon, asegúrate de que el proyecto esté activo

### El bot no responde en Telegram

- Verifica que el BOT_TOKEN es correcto
- Asegúrate de que el bot está ejecutándose: `pgrep -f bot.py`
- Revisa los logs para ver errores

### Error con ORS_API_KEY

- Verifica que copiaste la API Key correctamente
- Asegúrate de que tu cuenta en OpenRouteService está activa
- Verifica los límites de uso de tu plan gratuito

## 📝 Comandos Útiles

```bash
# Ver si el bot está ejecutándose
pgrep -f bot.py

# Detener el bot
pkill -f bot.py

# Ver logs en tiempo real
tail -f bot.log

# Reiniciar el bot
pkill -f bot.py && python3 bot.py

# Verificar variables de entorno
cat .env

# Actualizar dependencias
pip install -r requirements.txt --upgrade
```

## 🔄 Mantener el Bot Ejecutándose

### Opción 1: Usar Termux:Boot

1. Instala Termux:Boot desde F-Droid
2. Crea un script de inicio:

```bash
mkdir -p ~/.termux/boot
nano ~/.termux/boot/start-bot.sh
```

Agrega:
```bash
#!/data/data/com.termux/files/usr/bin/bash
cd ~/bot
bash run_bot.sh
```

Hazlo ejecutable:
```bash
chmod +x ~/.termux/boot/start-bot.sh
```

### Opción 2: Usar screen o tmux

```bash
# Instalar tmux
pkg install tmux

# Iniciar sesión
tmux new -s bot

# Ejecutar bot
cd bot && python3 bot.py

# Desconectar (bot sigue corriendo)
# Presiona: Ctrl+B, luego D

# Reconectar
tmux attach -t bot
```

## 🆘 Soporte

Si tienes problemas:

1. Revisa los logs: `tail -f bot.log`
2. Verifica la configuración: `cat .env`
3. Asegúrate de tener internet: `ping google.com`
4. Verifica que Python funciona: `python3 --version`

## 📄 Archivos Importantes

- `bot.py` - Código principal del bot
- `.env` - Variables de configuración (NO compartir)
- `requirements.txt` - Dependencias de Python
- `setup_db.py` - Script para configurar la base de datos
- `setup_termux.py` - Asistente de configuración interactivo
- `run_bot.sh` - Script para ejecutar el bot con auto-reinicio

## ⚠️ Advertencias

- **NUNCA** compartas tu archivo `.env` con nadie
- **NUNCA** subas tu `.env` a GitHub o repositorios públicos
- Mantén tus tokens y API keys en secreto
- Haz respaldo regular de tu base de datos

## 🎉 ¡Listo!

Tu bot de Telegram debería estar funcionando correctamente en Termux.
Si todo está bien, puedes usar el bot directamente desde Telegram.

---

**Última actualización:** 2025
