"""
Database connection and operations for the tracking system
"""

import os
import psycopg2
import psycopg2.extras
from typing import List, Optional, Tuple
import logging
from datetime import datetime

from models import Tracking, ShippingRoute, StatusHistory, CREATE_TABLES_SQL

logger = logging.getLogger(__name__)

class DatabaseManager:
    """Handle all database operations"""
    
    def __init__(self):
        self.database_url = os.getenv('DATABASE_URL')
        if not self.database_url:
            raise ValueError("DATABASE_URL environment variable is required")
        
        # Clean database URL for psycopg2 (remove SQLAlchemy async driver prefix)
        if self.database_url.startswith('postgresql+asyncpg://'):
            self.database_url = self.database_url.replace('postgresql+asyncpg://', 'postgresql://')
    
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
    
    def save_tracking(self, tracking: Tracking) -> bool:
        """Save a new tracking to database"""
        try:
            with self.get_connection() as conn:
                with conn.cursor() as cur:
                    sql = """
                    INSERT INTO trackings (
                        tracking_id, recipient_name, delivery_address, country_postal,
                        date_time, package_weight, product_name, sender_name,
                        sender_address, sender_country, sender_state, product_price,
                        status, estimated_delivery_date, user_telegram_id, username
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """
                    cur.execute(sql, (
                        tracking.tracking_id, tracking.recipient_name, tracking.delivery_address,
                        tracking.country_postal, tracking.date_time, tracking.package_weight,
                        tracking.product_name, tracking.sender_name, tracking.sender_address,
                        tracking.sender_country, tracking.sender_state, tracking.product_price,
                        tracking.status, tracking.estimated_delivery_date, tracking.user_telegram_id,
                        tracking.username
                    ))
                    conn.commit()
            logger.info(f"Tracking {tracking.tracking_id} saved successfully")
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
    
    def get_trackings_by_status(self, status: str) -> List[Tracking]:
        """Get all trackings with specific status"""
        try:
            with self.get_connection() as conn:
                with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                    cur.execute(
                        "SELECT * FROM trackings WHERE status = %s ORDER BY created_at DESC",
                        (status,)
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
    
    def get_tracking_history(self, tracking_id: str) -> List[StatusHistory]:
        """Get status change history for tracking"""
        try:
            with self.get_connection() as conn:
                with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                    cur.execute(
                        "SELECT * FROM status_history WHERE tracking_id = %s ORDER BY changed_at DESC",
                        (tracking_id,)
                    )
                    rows = cur.fetchall()
                    return [StatusHistory(**dict(row)) for row in rows]
        except Exception as e:
            logger.error(f"Error getting tracking history: {e}")
            return []
    
    def get_statistics(self) -> dict:
        """Get tracking statistics"""
        try:
            with self.get_connection() as conn:
                with conn.cursor() as cur:
                    stats = {}
                    
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
                    
                    return stats
        except Exception as e:
            logger.error(f"Error getting statistics: {e}")
            return {}
    
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
    
    def get_all_trackings(self) -> List[Tracking]:
        """Get all trackings"""
        try:
            with self.get_connection() as conn:
                with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                    cur.execute("SELECT * FROM trackings ORDER BY created_at DESC")
                    rows = cur.fetchall()
                    return [Tracking(**dict(row)) for row in rows]
        except Exception as e:
            logger.error(f"Error getting all trackings: {e}")
            return []

# Global database manager instance
db_manager = DatabaseManager()