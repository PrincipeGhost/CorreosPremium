#!/usr/bin/env python3
"""
Script rápido para verificar la configuración del bot
"""
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

def check_var(name, required=True):
    """Verifica si una variable existe y muestra su estado"""
    value = os.getenv(name)
    if value:
        # Ocultar valores sensibles
        if name in ['BOT_TOKEN', 'ORS_API_KEY', 'DATABASE_URL', 'ADMIN_TOKEN']:
            display = value[:15] + "..." if len(value) > 15 else "***"
        else:
            display = value
        print(f"✅ {name}: {display}")
        return True
    else:
        if required:
            print(f"❌ {name}: NO CONFIGURADO (REQUERIDO)")
        else:
            print(f"⚠️  {name}: NO CONFIGURADO (Opcional)")
        return False

def main():
    print("\n" + "="*60)
    print("🔍 VERIFICACIÓN DE CONFIGURACIÓN DEL BOT")
    print("="*60 + "\n")
    
    # Variables requeridas
    required_vars = [
        'BOT_TOKEN',
        'CHANNEL_ID',
        'OWNER_TELEGRAM_ID',
        'ORS_API_KEY',
        'DATABASE_URL',
        'ADMIN_TOKEN'
    ]
    
    # Variables opcionales
    optional_vars = [
        'API_BASE_URL'
    ]
    
    print("📋 Variables Requeridas:\n")
    all_ok = all(check_var(var) for var in required_vars)
    
    print("\n📋 Variables Opcionales:\n")
    for var in optional_vars:
        check_var(var, required=False)
    
    print("\n" + "="*60)
    
    if all_ok:
        print("✅ CONFIGURACIÓN COMPLETA - El bot está listo para ejecutarse")
        print("\n💡 Para iniciar el bot ejecuta:")
        print("   python3 bot.py")
        print("   o")
        print("   bash run_bot.sh")
    else:
        print("❌ CONFIGURACIÓN INCOMPLETA")
        print("\n💡 Para configurar el bot ejecuta:")
        print("   python3 setup_termux.py")
    
    print("="*60 + "\n")

if __name__ == "__main__":
    main()
