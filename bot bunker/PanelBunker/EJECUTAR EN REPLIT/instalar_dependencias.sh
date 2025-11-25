#!/bin/bash

echo "=========================================="
echo "   INSTALANDO DEPENDENCIAS DEL BOT"
echo "=========================================="
echo ""

# Ir al directorio raíz del proyecto
cd ..

echo "📦 Verificando requirements.txt..."
if [ -f requirements.txt ]; then
    echo "✅ requirements.txt encontrado"
    echo ""
    echo "📥 Instalando dependencias de Python..."
    pip install -r requirements.txt
    echo ""
    echo "✅ Dependencias instaladas correctamente"
else
    echo "❌ No se encontró requirements.txt"
    exit 1
fi

echo ""
echo "=========================================="
echo "   ✅ INSTALACIÓN COMPLETA"
echo "=========================================="
echo ""
echo "Ahora puedes ejecutar el bot con:"
echo "  bash 'EJECUTAR EN REPLIT/ejecutar_bot.sh'"
echo ""
