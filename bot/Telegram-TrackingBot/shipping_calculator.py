"""
Shipping time calculator with business days logic
"""

from datetime import datetime, timedelta
import re
from typing import Tuple, Optional
import logging

from database import db_manager

logger = logging.getLogger(__name__)

class ShippingCalculator:
    """Calculate shipping times and handle delays"""
    
    def __init__(self):
        self.weekdays_only = True  # Only count business days (Monday-Friday)
    
    def extract_countries(self, sender_country: str, country_postal: str) -> Tuple[str, str]:
        """Extract origin and destination countries from tracking data"""
        # Clean and normalize country names
        origin = self._normalize_country(sender_country)
        destination = self._extract_destination_country(country_postal)
        
        return origin, destination
    
    def _normalize_country(self, country: str) -> str:
        """Normalize country name"""
        country = country.strip().title()
        
        # Common country mappings
        country_mappings = {
            'Spain': 'España',
            'Espana': 'España',
            'Colombia': 'Colombia',
            'Mexico': 'México',
            'Argentina': 'Argentina',
            'Chile': 'Chile',
            'Peru': 'Perú',
            'Ecuador': 'Ecuador',
            'France': 'Francia',
            'Francia': 'Francia',
            'Italy': 'Italia',
            'Germany': 'Alemania',
            'Portugal': 'Portugal',
            'United Kingdom': 'Reino Unido',
            'Uk': 'Reino Unido',
            'Usa': 'Estados Unidos',
            'United States': 'Estados Unidos',
            'Canada': 'Canadá'
        }
        
        return country_mappings.get(country, country)
    
    def _extract_destination_country(self, country_postal: str) -> str:
        """Extract country from country_postal field"""
        # Try to extract country from format like "España, 28001" or "Colombia - Bogotá"
        text = country_postal.strip()
        
        # Split by common separators and take first part
        for separator in [',', '-', '/', '|']:
            if separator in text:
                country = text.split(separator)[0].strip()
                return self._normalize_country(country)
        
        # If no separator, assume entire text is country
        return self._normalize_country(text)
    
    def calculate_estimated_delivery(self, sender_country: str, country_postal: str, 
                                   delay_days: int = 0) -> Tuple[str, int]:
        """Calculate estimated delivery date"""
        origin, destination = self.extract_countries(sender_country, country_postal)
        
        # Get shipping route from database
        route = db_manager.get_shipping_route(origin, destination)
        
        if route:
            estimated_days = route.estimated_days
        else:
            # Default fallback times
            if origin == destination:
                estimated_days = 2  # Domestic shipping
            else:
                estimated_days = 10  # International default
            logger.warning(f"No route found for {origin} -> {destination}, using default {estimated_days} days")
        
        # Add any delays
        total_days = estimated_days + delay_days
        
        # Calculate delivery date (business days only)
        delivery_date = self._add_business_days(datetime.now(), total_days)
        
        # Format date
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
                tracking.sender_country, 
                tracking.country_postal,
                tracking.actual_delay_days + additional_delay_days
            )
            
            return new_date
        except Exception as e:
            logger.error(f"Error recalculating delivery for {tracking_id}: {e}")
            return None
    
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