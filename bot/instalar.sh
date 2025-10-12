#!/bin/bash

# Colores para la salida
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # Sin Color

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════╗"
echo "║   🤖 INSTALADOR DEL BOT DE TELEGRAM           ║"
echo "║       Para Termux Android                     ║"
echo "╚════════════════════════════════════════════════╝"
echo -e "${NC}\n"

# Función para verificar si un comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Función para mostrar estado
show_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
        return 1
    fi
}

echo -e "${YELLOW}📋 Verificando requisitos del sistema...${NC}\n"

# Verificar Python
if command_exists python3; then
    PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}')
    show_status 0 "Python instalado (v$PYTHON_VERSION)"
else
    show_status 1 "Python NO instalado"
    echo -e "${YELLOW}Instalando Python...${NC}"
    pkg install -y python
fi

# Verificar pip
if command_exists pip; then
    show_status 0 "pip instalado"
else
    show_status 1 "pip NO instalado"
    echo -e "${YELLOW}Instalando pip...${NC}"
    pkg install -y python-pip
fi

# Verificar PostgreSQL
if command_exists psql; then
    show_status 0 "PostgreSQL instalado"
else
    show_status 1 "PostgreSQL NO instalado"
    echo -e "${YELLOW}Instalando PostgreSQL...${NC}"
    pkg install -y postgresql libpq
fi

echo -e "\n${YELLOW}📦 Instalando dependencias de Python...${NC}\n"

# Cambiar al directorio del script
cd "$(dirname "$0")"

# Instalar dependencias
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
    show_status $? "Dependencias de Python instaladas"
else
    show_status 1 "Archivo requirements.txt no encontrado"
    exit 1
fi

echo -e "\n${YELLOW}🔍 Verificando configuración...${NC}\n"

# Verificar si existe .env
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ Archivo .env encontrado${NC}"
    echo -e "${BLUE}📋 Verificando variables...${NC}\n"
    python3 verificar_config.py
    
    echo -e "\n${YELLOW}¿Quieres reconfigurar el bot? (s/n):${NC} "
    read -r respuesta
    if [[ "$respuesta" =~ ^[SsYy]$ ]]; then
        python3 setup_termux.py
    fi
else
    echo -e "${YELLOW}⚠️  No se encontró configuración${NC}"
    echo -e "${BLUE}Iniciando asistente de configuración...${NC}\n"
    python3 setup_termux.py
fi

echo -e "\n${YELLOW}🗄️  ¿Quieres configurar la base de datos ahora? (s/n):${NC} "
read -r setup_db
if [[ "$setup_db" =~ ^[SsYy]$ ]]; then
    python3 setup_db.py
    show_status $? "Base de datos configurada"
fi

echo -e "\n${BLUE}"
echo "╔════════════════════════════════════════════════╗"
echo "║         🎉 ¡INSTALACIÓN COMPLETA!             ║"
echo "╚════════════════════════════════════════════════╝"
echo -e "${NC}\n"

echo -e "${GREEN}✅ El bot está listo para ejecutarse${NC}\n"
echo -e "${YELLOW}📝 COMANDOS ÚTILES:${NC}\n"
echo -e "  ${BLUE}Iniciar bot:${NC}"
echo -e "    python3 bot.py"
echo -e "    ${YELLOW}o${NC}"
echo -e "    bash run_bot.sh ${GREEN}(con auto-reinicio)${NC}\n"

echo -e "  ${BLUE}Verificar configuración:${NC}"
echo -e "    python3 verificar_config.py\n"

echo -e "  ${BLUE}Reconfigurar:${NC}"
echo -e "    python3 setup_termux.py\n"

echo -e "  ${BLUE}Ver logs:${NC}"
echo -e "    tail -f bot.log\n"

echo -e "  ${BLUE}Detener bot:${NC}"
echo -e "    pkill -f bot.py\n"

echo -e "${YELLOW}¿Quieres iniciar el bot ahora? (s/n):${NC} "
read -r start_bot
if [[ "$start_bot" =~ ^[SsYy]$ ]]; then
    echo -e "\n${GREEN}🚀 Iniciando bot...${NC}\n"
    python3 bot.py
else
    echo -e "\n${BLUE}💡 Para iniciar el bot más tarde, ejecuta:${NC}"
    echo -e "   ${GREEN}python3 bot.py${NC}\n"
fi
