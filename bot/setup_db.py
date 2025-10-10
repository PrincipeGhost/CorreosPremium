#!/usr/bin/env python3
"""
Script to setup database tables using Replit's PostgreSQL variables
"""
import os
import psycopg2
from models import CREATE_TABLES_SQL

# Build DATABASE_URL from Replit's PostgreSQL environment variables
PGHOST = os.getenv('PGHOST')
PGPORT = os.getenv('PGPORT')
PGUSER = os.getenv('PGUSER')
PGPASSWORD = os.getenv('PGPASSWORD')
PGDATABASE = os.getenv('PGDATABASE')

if all([PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE]):
    DATABASE_URL = f"postgresql://{PGUSER}:{PGPASSWORD}@{PGHOST}:{PGPORT}/{PGDATABASE}?sslmode=require"
    print(f"✅ Usando base de datos de Replit")
else:
    print("❌ Error: Variables de PostgreSQL de Replit no encontradas")
    exit(1)

try:
    # Connect to database
    print("Conectando a la base de datos...")
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    # Create tables
    print("Creando tablas...")
    cur.execute(CREATE_TABLES_SQL)
    conn.commit()
    
    # Verify tables
    cur.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('trackings', 'shipping_routes', 'status_history')
    """)
    tables = cur.fetchall()
    
    print(f"✅ Tablas creadas/verificadas: {[t[0] for t in tables]}")
    
    cur.close()
    conn.close()
    
    print("\n✅ Base de datos configurada correctamente!")
    print(f"\n📝 Para que el bot funcione, necesitas actualizar el secreto DATABASE_URL con:")
    print(f"   postgresql://{PGUSER}:{PGPASSWORD}@{PGHOST}:{PGPORT}/{PGDATABASE}?sslmode=require")
    
except Exception as e:
    print(f"❌ Error: {e}")
    exit(1)
