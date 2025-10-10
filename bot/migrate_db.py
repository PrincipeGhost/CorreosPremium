#!/usr/bin/env python3
"""
Script to migrate database with new OpenRouteService fields
"""
import os
import psycopg2

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

MIGRATION_SQL = """
-- Add new columns for OpenRouteService data
ALTER TABLE trackings 
ADD COLUMN IF NOT EXISTS sender_lat DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS sender_lon DECIMAL(11, 8),
ADD COLUMN IF NOT EXISTS sender_formatted_address TEXT,
ADD COLUMN IF NOT EXISTS recipient_lat DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS recipient_lon DECIMAL(11, 8),
ADD COLUMN IF NOT EXISTS recipient_formatted_address TEXT,
ADD COLUMN IF NOT EXISTS route_distance_km DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS route_duration_hours DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS route_geometry TEXT;
"""

try:
    # Connect to database
    print("Conectando a la base de datos...")
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    # Run migration
    print("Ejecutando migración para agregar campos de OpenRouteService...")
    cur.execute(MIGRATION_SQL)
    conn.commit()
    
    # Verify columns
    cur.execute("""
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'trackings' 
        AND column_name IN ('sender_lat', 'sender_lon', 'recipient_lat', 'recipient_lon', 'route_distance_km')
    """)
    columns = cur.fetchall()
    
    print(f"✅ Columnas agregadas/verificadas: {[c[0] for c in columns]}")
    
    cur.close()
    conn.close()
    
    print("\n✅ Migración completada exitosamente!")
    
except Exception as e:
    print(f"❌ Error en migración: {e}")
    exit(1)
