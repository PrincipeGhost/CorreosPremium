"""
Database connection and operations for the tracking system
"""

import os
import psycopg2
import psycopg2.extras
from typing import List, Optional, Tuple
import logging
from datetime import datetime
from urllib.parse import quote_plus

from .models import Tracking, ShippingRoute, StatusHistory, CREATE_TABLES_SQL

logger = logging.getLogger(__name__)

class DatabaseManager:
    """Handle all database operations"""
    
    def __init__(self):
        # Use DATABASE_URL directly - it's the most reliable source
        self.database_url = os.getenv('DATABASE_URL')
        
        if not self.database_url:
            raise ValueError("DATABASE_URL not found in environment variables")
        
        # Clean the URL (strip whitespace/newlines and handle async driver prefix)
        self.database_url = self.database_url.strip()
        
        # Clean database URL for psycopg2 (remove SQLAlchemy async driver prefix)
        if self.database_url.startswith('postgresql+asyncpg://'):
            self.database_url = self.database_url.replace('postgresql+asyncpg://', 'postgresql://')
        
        # Ensure sslmode=require is present for Neon databases
        if 'sslmode=' not in self.database_url:
            separator = '&' if '?' in self.database_url else '?'
            self.database_url = f"{self.database_url}{separator}sslmode=require"
        
        logger.info("Database connection configured using DATABASE_URL")
    
    def get_connection(self):
        """Get database connection"""
        try:
            conn = psycopg2.connect(self.database_url)
            return conn
        except Exception as e:
            logger.error(f"Database connection error: {e}")
            raise
    
    def initialize_database(self):
        """Initialize database connection and verify tables exist"""
        try:
            with self.get_connection() as conn:
                with conn.cursor() as cur:
                    # Just verify that the required tables exist
                    cur.execute("""
                        SELECT table_name 
                        FROM information_schema.tables 
                        WHERE table_schema = 'public' 
                        AND table_name IN ('trackings', 'shipping_routes', 'status_history')
                    """)
                    tables = cur.fetchall()
                    if len(tables) < 3:
                        logger.warning(f"Some tables missing. Found: {[t[0] for t in tables]}")
                        logger.warning("Expected: trackings, shipping_routes, status_history")
                    else:
                        logger.info("All required database tables found")
            logger.info("Database connection verified successfully")
        except Exception as e:
            logger.error(f"Database initialization error: {e}")
            raise
    
    def save_tracking(self, tracking: Tracking, created_by_admin_id: Optional[int] = None) -> bool:
        """Save a new tracking to database and create initial history entries"""
        try:
            with self.get_connection() as conn:
                with conn.cursor() as cur:
                    # Parse the date_time to use as created_at
                    try:
                        parsed_datetime = datetime.strptime(tracking.date_time, "%d/%m/%Y %H:%M")
                    except ValueError:
                        logger.warning(f"Could not parse date_time '{tracking.date_time}', using current timestamp")
                        parsed_datetime = None
                    
                    if parsed_datetime:
                        sql = """
                        INSERT INTO trackings (
                            tracking_id, delivery_address, date_time, package_weight, product_name,
                            sender_address, product_price, recipient_postal_code, recipient_province,
                            recipient_country, sender_postal_code, sender_province, sender_country,
                            status, estimated_delivery_date, user_telegram_id, username,
                            created_by_admin_id, created_at, updated_at
                        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        """
                        cur.execute(sql, (
                            tracking.tracking_id, tracking.delivery_address, tracking.date_time,
                            tracking.package_weight, tracking.product_name, tracking.sender_address,
                            tracking.product_price, tracking.recipient_postal_code, tracking.recipient_province,
                            tracking.recipient_country, tracking.sender_postal_code, tracking.sender_province,
                            tracking.sender_country, tracking.status, tracking.estimated_delivery_date,
                            tracking.user_telegram_id, tracking.username, created_by_admin_id,
                            parsed_datetime, parsed_datetime
                        ))
                    else:
                        sql = """
                        INSERT INTO trackings (
                            tracking_id, delivery_address, date_time, package_weight, product_name,
                            sender_address, product_price, recipient_postal_code, recipient_province,
                            recipient_country, sender_postal_code, sender_province, sender_country,
                            status, estimated_delivery_date, user_telegram_id, username,
                            created_by_admin_id
                        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        """
                        cur.execute(sql, (
                            tracking.tracking_id, tracking.delivery_address, tracking.date_time,
                            tracking.package_weight, tracking.product_name, tracking.sender_address,
                            tracking.product_price, tracking.recipient_postal_code, tracking.recipient_province,
                            tracking.recipient_country, tracking.sender_postal_code, tracking.sender_province,
                            tracking.sender_country, tracking.status, tracking.estimated_delivery_date,
                            tracking.user_telegram_id, tracking.username, created_by_admin_id
                        ))
                    
                    # Create initial history entries with the same timestamp
                    # 1. Paquete recibido en oficinas
                    sender_location = tracking.sender_province if tracking.sender_province else tracking.sender_country
                    if parsed_datetime:
                        cur.execute(
                            "INSERT INTO status_history (tracking_id, old_status, new_status, notes, changed_at) VALUES (%s, %s, %s, %s, %s)",
                            (tracking.tracking_id, None, "RECIBIDO", f"Paquete recibido en oficinas de {sender_location}", parsed_datetime)
                        )
                    else:
                        cur.execute(
                            "INSERT INTO status_history (tracking_id, old_status, new_status, notes) VALUES (%s, %s, %s, %s)",
                            (tracking.tracking_id, None, "RECIBIDO", f"Paquete recibido en oficinas de {sender_location}")
                        )
                    
                    # 2. Esperando confirmación de pago
                    if parsed_datetime:
                        cur.execute(
                            "INSERT INTO status_history (tracking_id, old_status, new_status, notes, changed_at) VALUES (%s, %s, %s, %s, %s)",
                            (tracking.tracking_id, "RECIBIDO", "ESPERANDO_PAGO", "Esperando confirmación de pago", parsed_datetime)
                        )
                    else:
                        cur.execute(
                            "INSERT INTO status_history (tracking_id, old_status, new_status, notes) VALUES (%s, %s, %s, %s)",
                            (tracking.tracking_id, "RECIBIDO", "ESPERANDO_PAGO", "Esperando confirmación de pago")
                        )
                    
                    conn.commit()
            logger.info(f"Tracking {tracking.tracking_id} saved successfully with initial history")
            return True
        except Exception as e:
            logger.error(f"Error saving tracking: {e}")
            return False
    
    def get_tracking(self, tracking_id: str) -> Optional[Tracking]:
        """Get tracking by ID"""
        try:
            with self.get_connection() as conn:
                with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                    cur.execute("SELECT * FROM trackings WHERE tracking_id = %s", (tracking_id,))
                    row = cur.fetchone()
                    if row:
                        return Tracking(**dict(row))
            return None
        except Exception as e:
            logger.error(f"Error getting tracking {tracking_id}: {e}")
            return None
    
    def can_access_tracking(self, tracking_id: str, admin_id: int, is_owner: bool = False) -> bool:
        """Check if admin can access this tracking"""
        if is_owner:
            return True  # Owner can access everything
        
        try:
            with self.get_connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        "SELECT created_by_admin_id, user_telegram_id FROM trackings WHERE tracking_id = %s",
                        (tracking_id,)
                    )
                    row = cur.fetchone()
                    if not row:
                        return False  # Tracking doesn't exist
                    
                    created_by, user_id = row
                    # Admin can access if they created it OR if it's for them
                    return created_by == admin_id or user_id == admin_id
        except Exception as e:
            logger.error(f"Error checking access for tracking {tracking_id}: {e}")
            return False
    
    def get_trackings_by_status(self, status: str, admin_id: int, is_owner: bool = False) -> List[Tracking]:
        """Get all trackings with specific status, filtered by admin if not owner"""
        try:
            with self.get_connection() as conn:
                with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                    if is_owner:
                        # Owner sees everything
                        cur.execute(
                            "SELECT * FROM trackings WHERE status = %s ORDER BY created_at DESC",
                            (status,)
                        )
                    else:
                        # Admin sees trackings they created OR trackings created for them
                        cur.execute(
                            "SELECT * FROM trackings WHERE status = %s AND (created_by_admin_id = %s OR user_telegram_id = %s) ORDER BY created_at DESC",
                            (status, admin_id, admin_id)
                        )
                    rows = cur.fetchall()
                    return [Tracking(**dict(row)) for row in rows]
        except Exception as e:
            logger.error(f"Error getting trackings by status {status}: {e}")
            return []
    
    def update_tracking_status(self, tracking_id: str, new_status: str, notes: Optional[str] = None) -> bool:
        """Update tracking status and log the change"""
        try:
            with self.get_connection() as conn:
                with conn.cursor() as cur:
                    # Get current status
                    cur.execute("SELECT status FROM trackings WHERE tracking_id = %s", (tracking_id,))
                    result = cur.fetchone()
                    if not result:
                        return False
                    
                    old_status = result[0] if result else None
                    if not old_status:
                        return False
                    
                    # Update status
                    cur.execute(
                        "UPDATE trackings SET status = %s, updated_at = CURRENT_TIMESTAMP WHERE tracking_id = %s",
                        (new_status, tracking_id)
                    )
                    
                    # Log status change
                    cur.execute(
                        "INSERT INTO status_history (tracking_id, old_status, new_status, notes) VALUES (%s, %s, %s, %s)",
                        (tracking_id, old_status, new_status, notes)
                    )
                    
                    conn.commit()
            logger.info(f"Tracking {tracking_id} status updated from {old_status} to {new_status}")
            return True
        except Exception as e:
            logger.error(f"Error updating tracking status: {e}")
            return False
    
    def add_delay_to_tracking(self, tracking_id: str, delay_days: int, reason: str) -> bool:
        """Add delay to tracking and update estimated delivery"""
        try:
            with self.get_connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        "UPDATE trackings SET actual_delay_days = actual_delay_days + %s, updated_at = CURRENT_TIMESTAMP WHERE tracking_id = %s",
                        (delay_days, tracking_id)
                    )
                    
                    # Log the delay
                    cur.execute(
                        "INSERT INTO status_history (tracking_id, old_status, new_status, notes) VALUES (%s, %s, %s, %s)",
                        (tracking_id, "DELAY_ADDED", "DELAY_ADDED", f"Retraso de {delay_days} días: {reason}")
                    )
                    
                    conn.commit()
            logger.info(f"Added {delay_days} days delay to tracking {tracking_id}")
            return True
        except Exception as e:
            logger.error(f"Error adding delay to tracking: {e}")
            return False
    
    def get_shipping_route(self, origin: str, destination: str) -> Optional[ShippingRoute]:
        """Get shipping route between countries"""
        try:
            with self.get_connection() as conn:
                with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                    cur.execute(
                        "SELECT * FROM shipping_routes WHERE origin_country = %s AND destination_country = %s",
                        (origin, destination)
                    )
                    row = cur.fetchone()
                    if row:
                        return ShippingRoute(**dict(row))
            return None
        except Exception as e:
            logger.error(f"Error getting shipping route: {e}")
            return None
    
    def generate_route_history_events(self, tracking_id: str, checkpoints: List) -> bool:
        """
        Generate history events for each checkpoint along the route.
        Creates 'Salió de' and 'Llegó a' events for each province/state.
        
        Args:
            tracking_id: Tracking ID
            checkpoints: List of checkpoint dicts [{"name": "Madrid", "type": "origin|transit|destination"}]
                        OR list of strings (legacy format) ["Madrid", "Toledo", "Ourense"]
        
        Returns:
            True if successful
        """
        try:
            if not checkpoints or len(checkpoints) == 0:
                logger.warning(f"No checkpoints provided for tracking {tracking_id}")
                return False
            
            if isinstance(checkpoints[0], dict):
                state_names = [cp.get("name", "") for cp in checkpoints if cp.get("name")]
            else:
                state_names = [str(cp) for cp in checkpoints if cp]
            
            if len(state_names) == 0:
                logger.warning(f"No valid state names in checkpoints for tracking {tracking_id}")
                return False
            
            with self.get_connection() as conn:
                with conn.cursor() as cur:
                    if len(state_names) >= 1:
                        cur.execute(
                            "INSERT INTO status_history (tracking_id, old_status, new_status, notes) VALUES (%s, %s, %s, %s)",
                            (tracking_id, "EN_TRANSITO", "SALIO_ORIGEN", f"Salió de oficinas de {state_names[0]}")
                        )
                    
                    for i in range(1, len(state_names)):
                        state = state_names[i]
                        is_last = (i == len(state_names) - 1)
                        
                        if is_last:
                            cur.execute(
                                "INSERT INTO status_history (tracking_id, old_status, new_status, notes) VALUES (%s, %s, %s, %s)",
                                (tracking_id, "EN_RUTA", "LLEGO_DESTINO", f"Llegó a oficina de {state}")
                            )
                        else:
                            cur.execute(
                                "INSERT INTO status_history (tracking_id, old_status, new_status, notes) VALUES (%s, %s, %s, %s)",
                                (tracking_id, "EN_RUTA", "LLEGO_A", f"Llegó a oficina de {state}")
                            )
                            cur.execute(
                                "INSERT INTO status_history (tracking_id, old_status, new_status, notes) VALUES (%s, %s, %s, %s)",
                                (tracking_id, "LLEGO_A", "SALIO_DE", f"Salió de oficinas de {state}")
                            )
                    
                    conn.commit()
            
            logger.info(f"Generated route history events for tracking {tracking_id} with {len(state_names)} states: {state_names}")
            return True
        except Exception as e:
            logger.error(f"Error generating route history: {e}")
            return False
    
    def get_tracking_history(self, tracking_id: str) -> List[StatusHistory]:
        """Get status change history for tracking"""
        try:
            with self.get_connection() as conn:
                with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                    cur.execute(
                        "SELECT * FROM status_history WHERE tracking_id = %s ORDER BY changed_at ASC, id ASC",
                        (tracking_id,)
                    )
                    rows = cur.fetchall()
                    return [StatusHistory(**dict(row)) for row in rows]
        except Exception as e:
            logger.error(f"Error getting tracking history: {e}")
            return []
    
    def get_statistics(self, admin_id: int, is_owner: bool = False) -> dict:
        """Get tracking statistics, filtered by admin if not owner"""
        try:
            with self.get_connection() as conn:
                with conn.cursor() as cur:
                    stats = {}
                    
                    if is_owner:
                        # Owner sees all statistics
                        # Count by status
                        cur.execute("SELECT status, COUNT(*) FROM trackings GROUP BY status")
                        status_counts = cur.fetchall()
                        stats['by_status'] = {status: count for status, count in status_counts}
                        
                        # Total trackings
                        cur.execute("SELECT COUNT(*) FROM trackings")
                        total_result = cur.fetchone()
                        stats['total'] = total_result[0] if total_result else 0
                        
                        # Today's trackings
                        cur.execute("SELECT COUNT(*) FROM trackings WHERE DATE(created_at) = CURRENT_DATE")
                        today_result = cur.fetchone()
                        stats['today'] = today_result[0] if today_result else 0
                    else:
                        # Admin sees statistics for trackings they created OR trackings created for them
                        # Count by status
                        cur.execute(
                            "SELECT status, COUNT(*) FROM trackings WHERE created_by_admin_id = %s OR user_telegram_id = %s GROUP BY status",
                            (admin_id, admin_id)
                        )
                        status_counts = cur.fetchall()
                        stats['by_status'] = {status: count for status, count in status_counts}
                        
                        # Total trackings
                        cur.execute("SELECT COUNT(*) FROM trackings WHERE created_by_admin_id = %s OR user_telegram_id = %s", (admin_id, admin_id))
                        total_result = cur.fetchone()
                        stats['total'] = total_result[0] if total_result else 0
                        
                        # Today's trackings
                        cur.execute(
                            "SELECT COUNT(*) FROM trackings WHERE (created_by_admin_id = %s OR user_telegram_id = %s) AND DATE(created_at) = CURRENT_DATE",
                            (admin_id, admin_id)
                        )
                        today_result = cur.fetchone()
                        stats['today'] = today_result[0] if today_result else 0
                    
                    return stats
        except Exception as e:
            logger.error(f"Error getting statistics: {e}")
            return {}
    
    def get_user_statistics(self) -> List[dict]:
        """Get statistics grouped by user (owner only)"""
        try:
            with self.get_connection() as conn:
                with conn.cursor() as cur:
                    # Get statistics grouped by username with user info
                    cur.execute("""
                        SELECT 
                            COALESCE(username, 'Usuario Desconocido') as username,
                            user_telegram_id,
                            COUNT(*) as total_trackings,
                            COUNT(CASE WHEN status = 'RETENIDO' THEN 1 END) as retenidos,
                            COUNT(CASE WHEN status = 'CONFIRMAR_PAGO' THEN 1 END) as confirmar_pago,
                            COUNT(CASE WHEN status = 'EN_TRANSITO' THEN 1 END) as en_transito,
                            COUNT(CASE WHEN status = 'ENTREGADO' THEN 1 END) as entregados,
                            MAX(created_at) as last_tracking_date
                        FROM trackings
                        WHERE username IS NOT NULL OR user_telegram_id IS NOT NULL
                        GROUP BY username, user_telegram_id
                        ORDER BY total_trackings DESC, username
                    """)
                    rows = cur.fetchall()
                    
                    user_stats = []
                    for row in rows:
                        user_stats.append({
                            'username': row[0],
                            'user_telegram_id': row[1],
                            'total_trackings': row[2],
                            'retenidos': row[3],
                            'confirmar_pago': row[4],
                            'en_transito': row[5],
                            'entregados': row[6],
                            'last_tracking_date': row[7]
                        })
                    
                    return user_stats
        except Exception as e:
            logger.error(f"Error getting user statistics: {e}")
            return []
    
    def get_trackings_by_user(self, user_id: int) -> List[Tracking]:
        """Get all trackings created by or for a specific user"""
        try:
            with self.get_connection() as conn:
                with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                    cur.execute(
                        "SELECT * FROM trackings WHERE user_telegram_id = %s ORDER BY created_at DESC",
                        (user_id,)
                    )
                    rows = cur.fetchall()
                    return [Tracking(**dict(row)) for row in rows]
        except Exception as e:
            logger.error(f"Error getting trackings for user {user_id}: {e}")
            return []
    
    def delete_tracking(self, tracking_id: str) -> bool:
        """Delete a tracking and its related records"""
        try:
            with self.get_connection() as conn:
                with conn.cursor() as cur:
                    # Delete status history first (foreign key constraint)
                    cur.execute("DELETE FROM status_history WHERE tracking_id = %s", (tracking_id,))
                    
                    # Delete the tracking
                    cur.execute("DELETE FROM trackings WHERE tracking_id = %s", (tracking_id,))
                    
                    if cur.rowcount == 0:
                        logger.warning(f"No tracking found with ID {tracking_id}")
                        return False
                    
                    conn.commit()
            logger.info(f"Tracking {tracking_id} deleted successfully")
            return True
        except Exception as e:
            logger.error(f"Error deleting tracking {tracking_id}: {e}")
            return False
    
    def get_all_trackings(self, admin_id: int, is_owner: bool = False) -> List[Tracking]:
        """Get all trackings, filtered by admin if not owner"""
        try:
            with self.get_connection() as conn:
                with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                    if is_owner:
                        # Owner sees everything
                        cur.execute("SELECT * FROM trackings ORDER BY created_at DESC")
                    else:
                        # Admin sees trackings they created OR trackings created for them
                        cur.execute(
                            "SELECT * FROM trackings WHERE created_by_admin_id = %s OR user_telegram_id = %s ORDER BY created_at DESC",
                            (admin_id, admin_id)
                        )
                    rows = cur.fetchall()
                    return [Tracking(**dict(row)) for row in rows]
        except Exception as e:
            logger.error(f"Error getting all trackings: {e}")
            return []

# Global database manager instance
db_manager = DatabaseManager()