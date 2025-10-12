#!/usr/bin/env python3
"""
Script para probar la conexión entre el bot y la web
"""
import os
import sys
import httpx
import psycopg2
from dotenv import load_dotenv

# Cargar variables
load_dotenv()

def print_header(text):
    print("\n" + "="*60)
    print(f"  {text}")
    print("="*60)

def print_result(success, message):
    icon = "✅" if success else "❌"
    print(f"{icon} {message}")
    return success

def test_database():
    """Probar conexión a la base de datos"""
    print_header("🗄️  PROBANDO BASE DE DATOS")
    
    database_url = os.getenv('DATABASE_URL')
    if not database_url:
        return print_result(False, "DATABASE_URL no configurada")
    
    # Ocultar password en el mensaje
    safe_url = database_url.split('@')[0].split(':')[0] + ":***@" + database_url.split('@')[1] if '@' in database_url else "***"
    print(f"   URL: {safe_url}")
    
    try:
        # Limpiar URL si es necesario
        if database_url.startswith('postgresql+asyncpg://'):
            database_url = database_url.replace('postgresql+asyncpg://', 'postgresql://')
        
        if 'sslmode=' not in database_url:
            separator = '&' if '?' in database_url else '?'
            database_url = f"{database_url}{separator}sslmode=require"
        
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        # Verificar tablas
        cur.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name IN ('trackings', 'shipping_routes', 'status_history')
        """)
        tables = [t[0] for t in cur.fetchall()]
        
        # Contar trackings
        if 'trackings' in tables:
            cur.execute("SELECT COUNT(*) FROM trackings")
            count = cur.fetchone()[0]
            print_result(True, f"Conexión exitosa - {count} trackings en la BD")
            print(f"   Tablas encontradas: {', '.join(tables)}")
        else:
            print_result(False, "Tablas no encontradas - ejecuta setup_db.py")
        
        cur.close()
        conn.close()
        return True
        
    except Exception as e:
        return print_result(False, f"Error de conexión: {str(e)[:60]}")

def test_api():
    """Probar conexión a la API web"""
    print_header("🌐 PROBANDO CONEXIÓN CON LA WEB API")
    
    api_url = os.getenv('API_BASE_URL')
    admin_token = os.getenv('ADMIN_TOKEN')
    
    if not api_url:
        print_result(False, "API_BASE_URL no configurada")
        print("   ⚠️  El bot funcionará solo con la base de datos")
        return False
    
    print(f"   URL: {api_url}")
    
    if not admin_token:
        print_result(False, "ADMIN_TOKEN no configurado")
        print("   ⚠️  No podrás actualizar via API")
        return False
    
    try:
        # Probar endpoint de stats
        response = httpx.get(
            f"{api_url}/api/trackings/stats",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=10.0
        )
        
        if response.status_code == 200:
            data = response.json()
            print_result(True, f"API funcionando - {data.get('total', 0)} trackings")
            print(f"   Hoy: {data.get('today', 0)} trackings")
            return True
        elif response.status_code == 401:
            return print_result(False, "ADMIN_TOKEN incorrecto")
        else:
            return print_result(False, f"Error HTTP {response.status_code}")
            
    except httpx.ConnectError:
        return print_result(False, "No se puede conectar a la API")
    except httpx.TimeoutException:
        return print_result(False, "Timeout - la API no responde")
    except Exception as e:
        return print_result(False, f"Error: {str(e)[:50]}")

def test_telegram():
    """Verificar configuración de Telegram"""
    print_header("📱 VERIFICANDO CONFIGURACIÓN DE TELEGRAM")
    
    bot_token = os.getenv('BOT_TOKEN')
    channel_id = os.getenv('CHANNEL_ID')
    owner_id = os.getenv('OWNER_TELEGRAM_ID')
    
    all_ok = True
    
    if bot_token and len(bot_token) > 20:
        print_result(True, f"BOT_TOKEN configurado ({bot_token[:10]}...)")
    else:
        print_result(False, "BOT_TOKEN no configurado o inválido")
        all_ok = False
    
    if channel_id:
        print_result(True, f"CHANNEL_ID: {channel_id}")
    else:
        print_result(False, "CHANNEL_ID no configurado")
        all_ok = False
    
    if owner_id:
        try:
            int(owner_id)
            print_result(True, f"OWNER_TELEGRAM_ID: {owner_id}")
        except ValueError:
            print_result(False, "OWNER_TELEGRAM_ID no es un número válido")
            all_ok = False
    else:
        print_result(False, "OWNER_TELEGRAM_ID no configurado")
        all_ok = False
    
    return all_ok

def test_ors():
    """Verificar OpenRouteService"""
    print_header("🗺️  VERIFICANDO OPENROUTESERVICE")
    
    ors_key = os.getenv('ORS_API_KEY')
    
    if not ors_key:
        return print_result(False, "ORS_API_KEY no configurada")
    
    print_result(True, f"ORS_API_KEY configurada ({ors_key[:10]}...)")
    
    # Probar una geocodificación simple
    try:
        response = httpx.get(
            "https://api.openrouteservice.org/geocode/search",
            params={"api_key": ors_key, "text": "Miami, FL", "size": 1},
            timeout=10.0
        )
        
        if response.status_code == 200:
            return print_result(True, "API funcionando correctamente")
        elif response.status_code == 401:
            return print_result(False, "API Key inválida")
        else:
            return print_result(False, f"Error HTTP {response.status_code}")
            
    except Exception as e:
        return print_result(False, f"Error: {str(e)[:50]}")

def main():
    print("\n" + "╔" + "="*58 + "╗")
    print("║  🔍 TEST DE CONEXIÓN: BOT + WEB                         ║")
    print("╚" + "="*58 + "╝")
    
    results = []
    
    # Ejecutar pruebas
    results.append(("Base de Datos", test_database()))
    results.append(("API Web", test_api()))
    results.append(("Telegram", test_telegram()))
    results.append(("OpenRouteService", test_ors()))
    
    # Resumen
    print_header("📊 RESUMEN")
    
    for name, success in results:
        icon = "✅" if success else "❌"
        print(f"  {icon} {name}")
    
    # Verificar si DATABASE_URL y ADMIN_TOKEN están sincronizados
    print_header("🔗 VERIFICACIÓN DE SINCRONIZACIÓN")
    
    db_url = os.getenv('DATABASE_URL')
    admin_token = os.getenv('ADMIN_TOKEN')
    api_url = os.getenv('API_BASE_URL')
    
    print("\n⚠️  IMPORTANTE: Verifica que estas variables sean IGUALES en:")
    print("   • Termux (archivo .env)")
    print("   • Render (Environment Variables)\n")
    
    if db_url:
        safe_db = db_url.split('@')[0].split(':')[0] + ":***@" + db_url.split('@')[1] if '@' in db_url else "***"
        print(f"   DATABASE_URL: {safe_db[:60]}...")
    else:
        print("   DATABASE_URL: ❌ NO CONFIGURADA")
    
    if admin_token:
        print(f"   ADMIN_TOKEN: {admin_token[:15]}...")
    else:
        print("   ADMIN_TOKEN: ❌ NO CONFIGURADO")
    
    # Conclusión
    print("\n" + "="*60)
    
    if all(success for _, success in results[:2]):  # DB y Telegram son críticos
        print("✅ ¡TODO LISTO! El bot puede funcionar correctamente")
        print("\n💡 Para iniciar el bot:")
        print("   python3 bot.py")
        print("   o")
        print("   bash run_bot.sh")
    else:
        print("❌ HAY PROBLEMAS QUE CORREGIR")
        print("\n💡 Ejecuta el asistente de configuración:")
        print("   python3 setup_termux.py")
    
    print("="*60 + "\n")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n❌ Test cancelado")
        sys.exit(0)
