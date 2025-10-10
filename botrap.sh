#!/bin/bash

echo "Iniciando bot de Telegram..."

# Navegar al directorio del bot
cd bot

# Iniciar el bot de Telegram en segundo plano
python3 bot.py > /tmp/telegram_bot.log 2>&1 &
BOT_PID=$!

echo "Bot de Telegram iniciado con PID: $BOT_PID"
echo "Para ver los logs: tail -f /tmp/telegram_bot.log"
echo "Para detener el bot: kill $BOT_PID"
