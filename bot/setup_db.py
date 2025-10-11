#!/usr/bin/env python3
"""
Script to setup database tables using Replit's PostgreSQL variables
"""
import os
import psycopg2
from models import CREATE_TABLES_SQL

# Use DATABASE_URL directly
DATABASE_URL = os.getenv('DATABASE_URL')

if not DATABASE_URL:
    print("❌ Error: DATABASE_URL no encontrado en las variables de entorno")
    exit(1)

print(f"✅ Usando base de datos de Replit")

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
    
except Exception as e:
    print(f"❌ Error: {e}")
    exit(1)
