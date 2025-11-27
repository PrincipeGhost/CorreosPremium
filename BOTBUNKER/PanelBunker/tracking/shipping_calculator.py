"""
Shipping time calculator using OpenRouteService API for real routing
"""

from datetime import datetime, timedelta
import asyncio
from typing import Tuple, Optional
import logging

from .openroute_service import ors_service
from .database import db_manager

logger = logging.getLogger(__name__)

class ShippingCalculator:
    """Calculate shipping times using OpenRouteService real routing"""
    
    def __init__(self):
        self.weekdays_only = True  # Only count business days (Monday-Friday)
    
    def _normalize_country_code(self, country: str) -> str:
        """Convert country name to ISO 2-letter code for geocoding"""
        country = country.strip().upper()
        
        # Common country code mappings
        country_codes = {
            'ESPAÑA': 'ES',
            'SPAIN': 'ES',
            'COLOMBIA': 'CO',
            'MÉXICO': 'MX',
            'MEXICO': 'MX',
            'ARGENTINA': 'AR',
            'CHILE': 'CL',
            'PERÚ': 'PE',
            'PERU': 'PE',
            'ECUADOR': 'EC',
            'FRANCIA': 'FR',
            'FRANCE': 'FR',
            'ITALIA': 'IT',
            'ITALY': 'IT',
            'ALEMANIA': 'DE',
            'GERMANY': 'DE',
            'PORTUGAL': 'PT',
            'REINO UNIDO': 'GB',
            'UNITED KINGDOM': 'GB',
            'UK': 'GB',
            'ESTADOS UNIDOS': 'US',
            'UNITED STATES': 'US',
            'USA': 'US',
            'CANADÁ': 'CA',
            'CANADA': 'CA'
        }
        
        return country_codes.get(country, country[:2] if len(country) > 2 else country)
    
    def _extract_country_from_postal(self, country_postal: str) -> str:
        """Extract country from country_postal field"""
        # Validate input is not None or empty
        if not country_postal:
            return "Desconocido"
        
        # Split by common separators and take first part
        text = country_postal.strip()
        if not text:
            return "Desconocido"
        
        for separator in [',', '-', '/', '|']:
            if separator in text:
                return text.split(separator)[0].strip()
        return text
    
    async def calculate_estimated_delivery_async(self, sender_address: str, sender_country: str,
                                                 recipient_address: str, recipient_country_postal: str,
                                                 delay_days: int = 0) -> Tuple[str, int, Optional[dict]]:
        """
        Calculate estimated delivery using OpenRouteService API
        
        Returns:
            Tuple of (formatted_date, total_days, route_info)
        """
        try:
            # Extract recipient country
            recipient_country = self._extract_country_from_postal(recipient_country_postal)
            
            # Convert to country codes
            sender_country_code = self._normalize_country_code(sender_country)
            recipient_country_code = self._normalize_country_code(recipient_country)
            
            logger.info(f"Calculating route from {sender_address} ({sender_country_code}) to {recipient_address} ({recipient_country_code})")
            
            # Get route info from OpenRouteService
            route_info = await ors_service.get_route_info(
                sender_address, sender_country_code,
                recipient_address, recipient_country_code
            )
            
            if route_info:
                # Use API-calculated estimated days
                estimated_days = route_info["route"]["estimated_days"]
                logger.info(f"Route calculated: {route_info['route']['distance_km']}km, {estimated_days} days")
            else:
                # Fallback to basic estimation
                logger.warning(f"Could not calculate route, using fallback estimation")
                if sender_country == recipient_country:
                    estimated_days = 2  # Domestic
                else:
                    estimated_days = 10  # International default
                route_info = None
            
            # Add delays
            total_days = estimated_days + delay_days
            
            # Calculate delivery date (business days only)
            delivery_date = self._add_business_days(datetime.now(), total_days)
            formatted_date = delivery_date.strftime("%d/%m/%Y")
            
            return formatted_date, total_days, route_info
            
        except Exception as e:
            logger.error(f"Error calculating delivery: {e}")
            # Fallback to basic calculation
            estimated_days = 10
            total_days = estimated_days + delay_days
            delivery_date = self._add_business_days(datetime.now(), total_days)
            formatted_date = delivery_date.strftime("%d/%m/%Y")
            return formatted_date, total_days, None
    
    def calculate_estimated_delivery(self, sender_address: str, sender_country: str,
                                    recipient_address: str, recipient_country_postal: str,
                                    delay_days: int = 0) -> Tuple[str, int]:
        """
        Synchronous wrapper for calculate_estimated_delivery_async
        
        Returns:
            Tuple of (formatted_date, total_days)
        """
        try:
            # Run async function in event loop
            loop = asyncio.get_event_loop()
            if loop.is_running():
                # If already in async context, create new task
                import nest_asyncio
                nest_asyncio.apply()
            
            formatted_date, total_days, route_info = loop.run_until_complete(
                self.calculate_estimated_delivery_async(
                    sender_address, sender_country,
                    recipient_address, recipient_country_postal,
                    delay_days
                )
            )
            return formatted_date, total_days
        except Exception as e:
            logger.error(f"Error in sync calculate_estimated_delivery: {e}")
            # Ultimate fallback
            estimated_days = 10
            total_days = estimated_days + delay_days
            delivery_date = self._add_business_days(datetime.now(), total_days)
            formatted_date = delivery_date.strftime("%d/%m/%Y")
            return formatted_date, total_days
    
    def _add_business_days(self, start_date: datetime, business_days: int) -> datetime:
        """Add business days to a date (skipping weekends)"""
        current_date = start_date
        days_added = 0
        
        while days_added < business_days:
            current_date += timedelta(days=1)
            # Skip weekends (Saturday=5, Sunday=6)
            if current_date.weekday() < 5:  
                days_added += 1
        
        return current_date
    
    def recalculate_delivery_with_delay(self, tracking_id: str, additional_delay_days: int) -> Optional[str]:
        """Recalculate delivery date when adding delay"""
        try:
            tracking = db_manager.get_tracking(tracking_id)
            if not tracking:
                return None
            
            # Calculate new delivery date with total delays
            new_date, total_days = self.calculate_estimated_delivery(
                tracking.sender_address,
                tracking.sender_country, 
                tracking.delivery_address,
                tracking.country_postal,
                tracking.actual_delay_days + additional_delay_days
            )
            
            return new_date
        except Exception as e:
            logger.error(f"Error recalculating delivery for {tracking_id}: {e}")
            return None
    
    def extract_countries(self, sender_country: str, recipient_country_postal: str) -> Tuple[str, str]:
        """
        Extract and format origin and destination countries
        
        Returns:
            Tuple of (origin_country, destination_country)
        """
        # Get sender country (origin)
        origin = sender_country.strip() if sender_country else "Desconocido"
        
        # Extract recipient country from country_postal field
        destination = self._extract_country_from_postal(recipient_country_postal) if recipient_country_postal else "Desconocido"
        
        return origin, destination
    
    def get_delay_reasons(self) -> list:
        """Get list of common delay reasons"""
        return [
            "Problemas logísticos",
            "Condiciones climáticas",
            "Retrasos en aduana",
            "Falta de transporte",
            "Documentación incompleta",
            "Festivos/días no laborables",
            "Problemas en destino",
            "Sobrecarga de paquetes",
            "Otro motivo"
        ]

# Global shipping calculator instance
shipping_calc = ShippingCalculator()
