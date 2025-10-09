#!/bin/bash

echo "🤖 Iniciando Bot de Telegram..."

# Cambiar al directorio del bot
cd "$(dirname "$0")"

# Iniciar el bot
exec python3 bot.py
