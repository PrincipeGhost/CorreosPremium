#!/bin/bash

# Script de inicio para el bot de Telegram
# Incluye auto-reinicio en caso de error

echo "🤖 Iniciando Bot de Telegram..."
echo "================================"
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar que existe .env
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: No se encontró el archivo .env${NC}"
    echo ""
    echo "Por favor ejecuta primero:"
    echo "  bash instalar.sh"
    echo ""
    exit 1
fi

# Función para ejecutar el bot
run_bot() {
    echo -e "${GREEN}▶️  Iniciando bot...${NC}"
    python3 main.py
}

# Contador de reinicios
restart_count=0
max_restarts=10

# Loop principal con auto-reinicio
while true; do
    # Ejecutar el bot
    run_bot
    
    # Si llegamos aquí, el bot se detuvo
    exit_code=$?
    restart_count=$((restart_count + 1))
    
    echo ""
    echo -e "${YELLOW}⚠️  El bot se detuvo (código: $exit_code)${NC}"
    
    # Verificar límite de reinicios
    if [ $restart_count -ge $max_restarts ]; then
        echo -e "${RED}❌ Se alcanzó el límite de reinicios ($max_restarts)${NC}"
        echo "El bot tiene errores críticos. Revisa los logs."
        exit 1
    fi
    
    # Esperar antes de reiniciar
    echo -e "${YELLOW}🔄 Reiniciando en 5 segundos... (intento $restart_count/$max_restarts)${NC}"
    sleep 5
    
    # Resetear contador si han pasado suficientes reinicios exitosos
    if [ $restart_count -eq 3 ]; then
        echo "✅ Reseteando contador de reinicios"
        restart_count=0
    fi
done
