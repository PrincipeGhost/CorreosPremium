"""
OpenRouteService API integration for geocoding and routing
"""

import os
import logging
import httpx
from typing import Optional, Dict, Tuple, List
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

class OpenRouteService:
    """Handle OpenRouteService API calls for geocoding and routing"""
    
    def __init__(self):
        self.api_key = os.getenv('ORS_API_KEY')
        if not self.api_key:
            raise ValueError("ORS_API_KEY environment variable is required")
        
        self.base_url = "https://api.openrouteservice.org"
        self.headers = {
            "Authorization": self.api_key,
            "Content-Type": "application/json"
        }
    
    async def geocode_address(self, address: str, country: Optional[str] = None) -> Optional[Dict]:
        """
        Convert address to coordinates using geocoding
        
        Args:
            address: Full address string
            country: Country code to filter results (e.g., 'ES', 'CO', 'MX')
        
        Returns:
            Dict with lat, lon, formatted_address, or None if not found
        """
        try:
            params = {
                "api_key": self.api_key,
                "text": address,
                "size": 1  # Only get best result
            }
            
            if country:
                params["boundary.country"] = country
            
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(
                    f"{self.base_url}/geocode/search",
                    params=params
                )
                response.raise_for_status()
                
                data = response.json()
                
                if data.get("features") and len(data["features"]) > 0:
                    feature = data["features"][0]
                    coords = feature["geometry"]["coordinates"]
                    
                    return {
                        "lon": coords[0],
                        "lat": coords[1],
                        "formatted_address": feature["properties"].get("label", address),
                        "confidence": feature["properties"].get("confidence", 0),
                        "country": feature["properties"].get("country", ""),
                        "city": feature["properties"].get("locality", "")
                    }
                
                logger.warning(f"No geocoding results found for: {address}")
                return None
                
        except httpx.HTTPError as e:
            logger.error(f"HTTP error geocoding address '{address}': {e}")
            return None
        except Exception as e:
            logger.error(f"Error geocoding address '{address}': {e}")
            return None
    
    async def calculate_route(self, origin_coords: Tuple[float, float], 
                             dest_coords: Tuple[float, float],
                             profile: str = "driving-car") -> Optional[Dict]:
        """
        Calculate route between two coordinates
        
        Args:
            origin_coords: (lon, lat) tuple for origin
            dest_coords: (lon, lat) tuple for destination
            profile: Transport mode (driving-car, driving-hgv, cycling-regular, foot-walking)
        
        Returns:
            Dict with distance (km), duration (hours), route_geometry, or None if failed
        """
        try:
            body = {
                "coordinates": [
                    [origin_coords[0], origin_coords[1]],
                    [dest_coords[0], dest_coords[1]]
                ],
                "format": "json",
                "preference": "fastest",
                "units": "km",
                "geometry": True,
                "instructions": True
            }
            
            async with httpx.AsyncClient(timeout=15.0) as client:
                response = await client.post(
                    f"{self.base_url}/v2/directions/{profile}",
                    headers=self.headers,
                    json=body
                )
                response.raise_for_status()
                
                data = response.json()
                
                if data.get("routes") and len(data["routes"]) > 0:
                    route = data["routes"][0]
                    summary = route["summary"]
                    
                    # Convert to more usable units
                    distance_km = summary["distance"]  # Already in km
                    duration_seconds = summary["duration"]
                    duration_hours = duration_seconds / 3600
                    
                    return {
                        "distance_km": round(distance_km, 2),
                        "duration_hours": round(duration_hours, 2),
                        "duration_seconds": duration_seconds,
                        "geometry": route.get("geometry", None),
                        "instructions": route.get("segments", [])
                    }
                
                logger.warning(f"No route found between coordinates")
                return None
                
        except httpx.HTTPError as e:
            logger.error(f"HTTP error calculating route: {e}")
            return None
        except Exception as e:
            logger.error(f"Error calculating route: {e}")
            return None
    
    async def get_route_info(self, sender_address: str, sender_country: str,
                            recipient_address: str, recipient_country: str) -> Optional[Dict]:
        """
        Get complete route information from sender to recipient
        
        Args:
            sender_address: Full sender address
            sender_country: Sender country code (e.g., 'ES')
            recipient_address: Full recipient address
            recipient_country: Recipient country code (e.g., 'CO')
        
        Returns:
            Dict with geocoded addresses, route info, estimated delivery days
        """
        try:
            # Geocode sender address
            logger.info(f"Geocoding sender address: {sender_address}, {sender_country}")
            sender_geo = await self.geocode_address(sender_address, sender_country)
            
            if not sender_geo:
                logger.error(f"Could not geocode sender address: {sender_address}")
                return None
            
            # Geocode recipient address
            logger.info(f"Geocoding recipient address: {recipient_address}, {recipient_country}")
            recipient_geo = await self.geocode_address(recipient_address, recipient_country)
            
            if not recipient_geo:
                logger.error(f"Could not geocode recipient address: {recipient_address}")
                return None
            
            # Calculate route
            logger.info("Calculating route...")
            route = await self.calculate_route(
                (sender_geo["lon"], sender_geo["lat"]),
                (recipient_geo["lon"], recipient_geo["lat"])
            )
            
            if not route:
                logger.error("Could not calculate route")
                return None
            
            # Estimate delivery days based on distance
            # Basic logic: ~500km per day for truck shipping
            estimated_days = max(2, int(route["distance_km"] / 500) + 1)
            
            # Add international shipping buffer
            if sender_geo.get("country") != recipient_geo.get("country"):
                estimated_days += 3  # Add customs/international processing time
            
            return {
                "sender": {
                    "address": sender_geo["formatted_address"],
                    "lat": sender_geo["lat"],
                    "lon": sender_geo["lon"],
                    "country": sender_geo.get("country", ""),
                    "city": sender_geo.get("city", "")
                },
                "recipient": {
                    "address": recipient_geo["formatted_address"],
                    "lat": recipient_geo["lat"],
                    "lon": recipient_geo["lon"],
                    "country": recipient_geo.get("country", ""),
                    "city": recipient_geo.get("city", "")
                },
                "route": {
                    "distance_km": route["distance_km"],
                    "duration_hours": route["duration_hours"],
                    "estimated_days": estimated_days,
                    "geometry": route.get("geometry")
                }
            }
            
        except Exception as e:
            logger.error(f"Error getting route info: {e}")
            return None

# Global instance
ors_service = OpenRouteService()
