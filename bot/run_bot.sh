#!/bin/bash

echo "🤖 Iniciando Bot de Telegram..."
cd "$(dirname "$0")"

# Función para limpiar al salir
cleanup() {
    echo "Deteniendo bot..."
    exit 0
}

trap cleanup SIGINT SIGTERM

# Ejecutar bot con reinicio automático si falla
while true; do
    echo "$(date): Iniciando bot..."
    python3 -u bot.py
    EXIT_CODE=$?
    
    if [ $EXIT_CODE -eq 0 ]; then
        echo "Bot detenido normalmente"
        break
    else
        echo "Bot terminó con código $EXIT_CODE. Reiniciando en 5 segundos..."
        sleep 5
    fi
done
