#!/bin/bash

echo "=========================================="
echo "     INICIANDO BOT DE TELEGRAM"
echo "=========================================="
echo ""

# Ir al directorio raíz del proyecto
cd ..

echo "🔍 Verificando variables de entorno..."
echo ""

# Verificar variables obligatorias
MISSING_VARS=0

if [ -z "$BOT_TOKEN" ]; then
    echo "❌ Falta: BOT_TOKEN"
    MISSING_VARS=1
fi

if [ -z "$CHANNEL_ID" ] && [ -z "$CHANNEL_USERNAME" ]; then
    echo "❌ Falta: CHANNEL_ID o CHANNEL_USERNAME"
    MISSING_VARS=1
fi

if [ -z "$OWNER_TELEGRAM_ID" ]; then
    echo "❌ Falta: OWNER_TELEGRAM_ID"
    MISSING_VARS=1
fi

if [ -z "$DATABASE_URL" ]; then
    echo "❌ Falta: DATABASE_URL"
    MISSING_VARS=1
fi

if [ -z "$ORS_API_KEY" ]; then
    echo "❌ Falta: ORS_API_KEY"
    MISSING_VARS=1
fi

if [ -z "$ADMIN_TOKEN" ]; then
    echo "❌ Falta: ADMIN_TOKEN"
    MISSING_VARS=1
fi

if [ $MISSING_VARS -eq 1 ]; then
    echo ""
    echo "⚠️  FALTAN VARIABLES DE ENTORNO"
    echo ""
    echo "Por favor, configura las variables faltantes en los Secrets de Replit."
    echo "Ve a la pestaña 'Tools' > 'Secrets' y agrega las variables necesarias."
    echo ""
    echo "Consulta INSTRUCCIONES.md para más detalles."
    exit 1
fi

echo "✅ Todas las variables configuradas"
echo ""
echo "🚀 Iniciando el bot..."
echo ""
echo "=========================================="
echo ""

# Ejecutar el bot
python main.py
