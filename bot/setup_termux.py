#!/usr/bin/env python3
"""
Script de configuración interactivo para Termux
Este script te guía en la configuración inicial del bot
"""
import os
import sys

def print_header():
    print("\n" + "="*50)
    print("🤖 CONFIGURACIÓN DEL BOT DE TELEGRAM")
    print("="*50 + "\n")

def print_section(title):
    print(f"\n{'─'*50}")
    print(f"📌 {title}")
    print('─'*50)

def get_input(prompt, required=True, default=None):
    """Obtiene input del usuario con validación"""
    while True:
        if default:
            value = input(f"{prompt} [{default}]: ").strip()
            if not value:
                return default
        else:
            value = input(f"{prompt}: ").strip()
        
        if value or not required:
            return value
        
        if required:
            print("❌ Este campo es obligatorio. Por favor ingresa un valor.\n")

def validate_telegram_id(telegram_id):
    """Valida que el ID de Telegram sea un número"""
    try:
        int(telegram_id)
        return True
    except ValueError:
        return False

def create_env_file(config):
    """Crea el archivo .env con la configuración"""
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    
    with open(env_path, 'w') as f:
        f.write("# Configuración del Bot de Telegram\n")
        f.write("# Generado automáticamente por setup_termux.py\n\n")
        
        for key, value in config.items():
            f.write(f"{key}={value}\n")
    
    return env_path

def main():
    print_header()
    
    print("👋 Bienvenido! Este asistente te ayudará a configurar tu bot.\n")
    print("Necesitarás tener a mano:")
    print("  • Token del bot (de @BotFather)")
    print("  • ID del canal (de @userinfobot)")
    print("  • Tu ID de Telegram (de @userinfobot)")
    print("  • API Key de OpenRouteService")
    print("  • URL de tu base de datos PostgreSQL")
    print("\n¿Estás listo? Presiona Enter para continuar...")
    input()
    
    config = {}
    
    # BOT_TOKEN
    print_section("1. TOKEN DEL BOT")
    print("📱 Abre Telegram y habla con @BotFather")
    print("   Usa /newbot para crear un bot o /mybots para ver tus bots")
    print("   El token se ve así: 1234567890:ABCdefGHIjklMNOpqrsTUVwxyz\n")
    config['BOT_TOKEN'] = get_input("Ingresa el token del bot", required=True)
    
    # CHANNEL_ID
    print_section("2. ID DEL CANAL")
    print("📢 Puedes usar el ID numérico o el username del canal")
    print("   • ID numérico: Agrega @userinfobot a tu canal como admin")
    print("     (ejemplo: -1001234567890)")
    print("   • Username: Usa @ seguido del nombre (ejemplo: @micanal)\n")
    config['CHANNEL_ID'] = get_input("Ingresa el ID o username del canal", required=True)
    
    # OWNER_TELEGRAM_ID
    print_section("3. TU ID DE TELEGRAM")
    print("👤 Habla con @userinfobot en Telegram")
    print("   Te enviará tu ID personal (ejemplo: 123456789)\n")
    
    while True:
        owner_id = get_input("Ingresa tu ID de Telegram", required=True)
        if validate_telegram_id(owner_id):
            config['OWNER_TELEGRAM_ID'] = owner_id
            break
        else:
            print("❌ El ID debe ser un número. Inténtalo de nuevo.\n")
    
    # ORS_API_KEY
    print_section("4. API KEY DE OPENROUTESERVICE")
    print("🗺️  Ve a: https://openrouteservice.org/")
    print("   1. Crea una cuenta gratuita")
    print("   2. Ve a tu dashboard")
    print("   3. Genera un API Token\n")
    config['ORS_API_KEY'] = get_input("Ingresa tu ORS API Key", required=True)
    
    # DATABASE_URL
    print_section("5. URL DE LA BASE DE DATOS")
    print("🗄️  Necesitas una base de datos PostgreSQL")
    print("   Puedes usar servicios como:")
    print("   • Neon (https://neon.tech) - Gratis")
    print("   • Supabase (https://supabase.com) - Gratis")
    print("   • Render (https://render.com) - Gratis")
    print("\n   El formato es:")
    print("   postgresql://usuario:password@host:5432/nombre_db?sslmode=require\n")
    config['DATABASE_URL'] = get_input("Ingresa la URL de la base de datos", required=True)
    
    # ADMIN_TOKEN
    print_section("6. TOKEN DE ADMINISTRACIÓN")
    print("🔐 Este es un token de seguridad que tú creas")
    print("   Puede ser cualquier texto aleatorio seguro")
    print("   (ejemplo: mi_token_super_secreto_123xyz)\n")
    config['ADMIN_TOKEN'] = get_input("Ingresa un token de administración", required=True)
    
    # API_BASE_URL (opcional)
    print_section("7. URL DE LA API (OPCIONAL)")
    print("🌐 URL base de tu servidor web")
    print("   Si no tienes servidor web, presiona Enter para omitir\n")
    api_url = get_input("URL de la API", required=False, default="http://localhost:5000")
    if api_url:
        config['API_BASE_URL'] = api_url
    
    # Resumen
    print_section("RESUMEN DE CONFIGURACIÓN")
    print("\n✅ Los siguientes valores serán guardados:\n")
    for key, value in config.items():
        if key in ['BOT_TOKEN', 'ORS_API_KEY', 'DATABASE_URL', 'ADMIN_TOKEN']:
            # Ocultar valores sensibles
            display_value = value[:10] + "..." if len(value) > 10 else "***"
        else:
            display_value = value
        print(f"   {key}: {display_value}")
    
    print("\n¿Es correcta esta configuración? (s/n): ", end="")
    confirm = input().strip().lower()
    
    if confirm != 's' and confirm != 'si' and confirm != 'y' and confirm != 'yes':
        print("\n❌ Configuración cancelada. Ejecuta el script nuevamente.")
        sys.exit(0)
    
    # Crear archivo .env
    env_path = create_env_file(config)
    
    print(f"\n✅ ¡Configuración guardada exitosamente en {env_path}!")
    
    # Instrucciones finales
    print("\n" + "="*50)
    print("🎉 CONFIGURACIÓN COMPLETA")
    print("="*50)
    print("\n📋 PRÓXIMOS PASOS:\n")
    print("1. Instala las dependencias:")
    print("   pip install -r requirements.txt\n")
    print("2. Configura la base de datos:")
    print("   python3 setup_db.py\n")
    print("3. Inicia el bot:")
    print("   python3 bot.py\n")
    print("   O usa el script de inicio:")
    print("   bash run_bot.sh\n")
    print("🚀 ¡Tu bot está listo para funcionar!")
    print("="*50 + "\n")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n❌ Configuración cancelada por el usuario.")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ Error: {e}")
        sys.exit(1)
