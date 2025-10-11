#!/usr/bin/env python3
"""
Script para crear un tracking de prueba ya entregado
Madrid -> Barcelona
"""
import os
import sys
from datetime import datetime, timedelta
from database import DatabaseManager
from models import Tracking

def create_test_tracking():
    """Crear tracking de prueba con historial completo"""
    
    # Inicializar base de datos
    db = DatabaseManager()
    
    # ID de tracking de prueba
    tracking_id = "TEST-MAD-BCN-001"
    
    # Verificar si ya existe
    existing = db.get_tracking(tracking_id)
    if existing:
        print(f"❌ El tracking {tracking_id} ya existe. Eliminándolo primero...")
        with db.get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("DELETE FROM status_history WHERE tracking_id = %s", (tracking_id,))
                cur.execute("DELETE FROM trackings WHERE tracking_id = %s", (tracking_id,))
                conn.commit()
        print(f"✅ Tracking anterior eliminado")
    
    # Crear tracking de prueba
    tracking = Tracking(
        tracking_id=tracking_id,
        recipient_name="Juan Pérez García",
        delivery_address="Carrer de Balmes, 123, 08008 Barcelona",
        country_postal="Barcelona, España",
        date_time=(datetime.now() - timedelta(days=5)).strftime("%Y-%m-%d %H:%M:%S"),
        package_weight="2.5 kg",
        product_name="Documentos importantes y libros",
        sender_name="María López Rodríguez",
        sender_address="Calle Gran Vía, 45, 28013 Madrid",
        sender_country="España",
        sender_state="Madrid",
        product_price="€45.00",
        status="ENTREGADO",
        estimated_delivery_date=(datetime.now() - timedelta(days=2)).strftime("%Y-%m-%d")
    )
    
    # Guardar tracking básico (sin historial automático)
    with db.get_connection() as conn:
        with conn.cursor() as cur:
            sql = """
            INSERT INTO trackings (
                tracking_id, recipient_name, delivery_address, country_postal,
                date_time, package_weight, product_name, sender_name,
                sender_address, sender_country, sender_state, product_price,
                status, estimated_delivery_date
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            cur.execute(sql, (
                tracking.tracking_id, tracking.recipient_name, tracking.delivery_address,
                tracking.country_postal, tracking.date_time, tracking.package_weight,
                tracking.product_name, tracking.sender_name, tracking.sender_address,
                tracking.sender_country, tracking.sender_state, tracking.product_price,
                tracking.status, tracking.estimated_delivery_date
            ))
            conn.commit()
    
    print(f"✅ Tracking {tracking_id} creado")
    
    # Crear historial completo del viaje
    base_time = datetime.now() - timedelta(days=5)
    
    history_events = [
        # Día 1: Recepción en Madrid
        {
            "old_status": None,
            "new_status": "RECIBIDO",
            "notes": "Paquete recibido en oficinas de Madrid",
            "time_offset": timedelta(hours=0)
        },
        {
            "old_status": "RECIBIDO",
            "new_status": "ESPERANDO_PAGO",
            "notes": "Esperando confirmación de pago",
            "time_offset": timedelta(hours=1)
        },
        {
            "old_status": "ESPERANDO_PAGO",
            "new_status": "PAGO_CONFIRMADO",
            "notes": "Pago confirmado - Preparando envío",
            "time_offset": timedelta(hours=3)
        },
        # Día 2: Salida de Madrid
        {
            "old_status": "PAGO_CONFIRMADO",
            "new_status": "SALIO_ORIGEN",
            "notes": "Salió de oficinas de Madrid",
            "time_offset": timedelta(days=1, hours=2)
        },
        # Día 2: Paso por Zaragoza
        {
            "old_status": "SALIO_ORIGEN",
            "new_status": "LLEGO_A",
            "notes": "Llegó a oficina de Zaragoza",
            "time_offset": timedelta(days=1, hours=6)
        },
        {
            "old_status": "LLEGO_A",
            "new_status": "SALIO_DE",
            "notes": "Salió de oficinas de Zaragoza",
            "time_offset": timedelta(days=1, hours=8)
        },
        # Día 3: Llegada a Barcelona
        {
            "old_status": "SALIO_DE",
            "new_status": "LLEGO_DESTINO",
            "notes": "Llegó a oficina de Barcelona",
            "time_offset": timedelta(days=2, hours=2)
        },
        {
            "old_status": "LLEGO_DESTINO",
            "new_status": "EN_TRANSITO",
            "notes": "En reparto - Asignado a mensajero local",
            "time_offset": timedelta(days=2, hours=10)
        },
        # Día 3: Entrega final
        {
            "old_status": "EN_TRANSITO",
            "new_status": "ENTREGADO",
            "notes": "Paquete entregado - Firmado por el destinatario",
            "time_offset": timedelta(days=2, hours=14)
        }
    ]
    
    # Insertar eventos de historial
    with db.get_connection() as conn:
        with conn.cursor() as cur:
            for event in history_events:
                event_time = base_time + event["time_offset"]
                cur.execute(
                    """INSERT INTO status_history 
                       (tracking_id, old_status, new_status, notes, changed_at) 
                       VALUES (%s, %s, %s, %s, %s)""",
                    (tracking_id, event["old_status"], event["new_status"], 
                     event["notes"], event_time)
                )
            conn.commit()
    
    print(f"✅ Historial completo creado con {len(history_events)} eventos")
    
    # Mostrar resumen
    print("\n" + "="*60)
    print("📦 TRACKING DE PRUEBA CREADO")
    print("="*60)
    print(f"ID: {tracking_id}")
    print(f"Origen: {tracking.sender_address} ({tracking.sender_state})")
    print(f"Destino: {tracking.delivery_address}")
    print(f"Destinatario: {tracking.recipient_name}")
    print(f"Estado actual: ENTREGADO ✅")
    print("\n📜 HISTORIAL:")
    
    history = db.get_tracking_history(tracking_id)
    for h in history:
        old = h.old_status if h.old_status else "Inicio"
        print(f"  • {h.changed_at.strftime('%d/%m/%Y %H:%M')} - {old} → {h.new_status}")
        if h.notes:
            print(f"    {h.notes}")
    
    print("\n" + "="*60)
    print(f"✅ Usa el ID '{tracking_id}' para consultar este seguimiento")
    print("="*60)

if __name__ == "__main__":
    try:
        create_test_tracking()
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
