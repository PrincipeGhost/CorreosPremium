#!/bin/bash

# Script de instalación para Termux
# Bot de Telegram con Sistema de Tracking

set -e  # Exit on error

echo "================================="
echo "🤖 Instalador del Bot de Telegram"
echo "     con Sistema de Tracking"
echo "================================="
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar si estamos en Termux
if [ -n "$TERMUX_VERSION" ]; then
    echo "✅ Detectado: Termux"
    IS_TERMUX=true
else
    echo "ℹ️  No estás en Termux, instalando en sistema Linux"
    IS_TERMUX=false
fi

echo ""
echo "==== Paso 1: Actualizar repositorios ===="
if [ "$IS_TERMUX" = true ]; then
    pkg update -y
    pkg upgrade -y
else
    sudo apt update -y
    sudo apt upgrade -y
fi

echo ""
echo "==== Paso 2: Instalar dependencias del sistema ===="
if [ "$IS_TERMUX" = true ]; then
    pkg install -y python git postgresql python-pip
else
    sudo apt install -y python3 python3-pip git postgresql libpq-dev
fi

echo ""
echo "==== Paso 3: Instalar dependencias de Python ===="
pip install -r requirements.txt

echo ""
echo "==== Paso 4: Configurar variables de entorno ===="
if [ ! -f .env ]; then
    echo "⚠️  No se encontró archivo .env"
    echo "Copiando .env.example a .env..."
    cp .env.example .env
    echo ""
    echo "${YELLOW}IMPORTANTE:${NC} Debes editar el archivo .env y agregar tus credenciales:"
    echo ""
    echo "1. BOT_TOKEN - Token de @BotFather"
    echo "2. CHANNEL_ID o CHANNEL_USERNAME - ID del canal"
    echo "3. OWNER_TELEGRAM_ID - Tu ID de Telegram"
    echo "4. DATABASE_URL - URL de tu base de datos PostgreSQL"
    echo "5. ORS_API_KEY - API key de OpenRouteService"
    echo "6. ADMIN_TOKEN - Token de seguridad (genera uno aleatorio)"
    echo ""
    echo "Puedes editar el archivo con: nano .env"
    echo ""
    read -p "¿Quieres editar el archivo .env ahora? (s/n): " edit_env
    if [ "$edit_env" = "s" ] || [ "$edit_env" = "S" ]; then
        nano .env
    fi
else
    echo "✅ Archivo .env ya existe"
fi

echo ""
echo "==== Paso 5: Verificar base de datos ===="
echo "⚠️  NOTA: Asegúrate de tener tu base de datos PostgreSQL configurada"
echo "   Puedes usar https://neon.tech para obtener una gratis"
echo ""

echo "================================="
echo "✅ ${GREEN}INSTALACIÓN COMPLETADA${NC}"
echo "================================="
echo ""
echo "Para iniciar el bot, ejecuta:"
echo "  ${GREEN}bash start_bot.sh${NC}"
echo ""
echo "O simplemente:"
echo "  ${GREEN}python3 main.py${NC}"
echo ""
echo "Para ayuda y documentación, lee:"
echo "  ${GREEN}cat replit.md${NC}"
echo ""
