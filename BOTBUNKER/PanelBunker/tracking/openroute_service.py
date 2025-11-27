"""
OpenRouteService API integration for geocoding and routing
"""

import os
import logging
import json
import asyncio
import httpx
import random
from typing import Optional, Dict, Tuple, List
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

def decode_polyline(encoded: str, precision: int = 5) -> List[Tuple[float, float]]:
    """
    Decode an encoded polyline string into a list of (lon, lat) tuples.
    ORS uses precision=5 by default.
    """
    coordinates = []
    index = 0
    lat = 0
    lon = 0
    
    while index < len(encoded):
        # Decode latitude
        shift = 0
        result = 0
        while True:
            b = ord(encoded[index]) - 63
            index += 1
            result |= (b & 0x1f) << shift
            shift += 5
            if b < 0x20:
                break
        
        dlat = ~(result >> 1) if result & 1 else result >> 1
        lat += dlat
        
        # Decode longitude
        shift = 0
        result = 0
        while True:
            b = ord(encoded[index]) - 63
            index += 1
            result |= (b & 0x1f) << shift
            shift += 5
            if b < 0x20:
                break
        
        dlon = ~(result >> 1) if result & 1 else result >> 1
        lon += dlon
        
        # Convert to actual coordinates
        coordinates.append((lon / (10 ** precision), lat / (10 ** precision)))
    
    return coordinates


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
                "size": 1
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
                    props = feature["properties"]
                    
                    return {
                        "lon": coords[0],
                        "lat": coords[1],
                        "formatted_address": props.get("label", address),
                        "confidence": props.get("confidence", 0),
                        "country": props.get("country", ""),
                        "region": props.get("region", ""),
                        "county": props.get("county", ""),
                        "city": props.get("locality", "") or props.get("localadmin", "")
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
                    
                    distance_km = summary["distance"]
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
                            recipient_address: str, recipient_country: str,
                            sender_postal_code: str = "", sender_province: str = "",
                            recipient_postal_code: str = "", recipient_province: str = "") -> Optional[Dict]:
        """
        Get complete route information from sender to recipient
        """
        try:
            complete_sender_address = sender_address
            if sender_postal_code or sender_province:
                parts = [sender_address]
                if sender_postal_code:
                    parts.append(sender_postal_code)
                if sender_province:
                    parts.append(sender_province)
                complete_sender_address = ", ".join(parts)
            
            complete_recipient_address = recipient_address
            if recipient_postal_code or recipient_province:
                parts = [recipient_address]
                if recipient_postal_code:
                    parts.append(recipient_postal_code)
                if recipient_province:
                    parts.append(recipient_province)
                complete_recipient_address = ", ".join(parts)
            
            logger.info(f"Geocoding sender address: {complete_sender_address}, {sender_country}")
            sender_geo = await self.geocode_address(complete_sender_address, sender_country)
            
            if not sender_geo:
                logger.error(f"Could not geocode sender address: {complete_sender_address}")
                return None
            
            logger.info(f"Geocoding recipient address: {complete_recipient_address}, {recipient_country}")
            recipient_geo = await self.geocode_address(complete_recipient_address, recipient_country)
            
            if not recipient_geo:
                logger.error(f"Could not geocode recipient address: {recipient_address}")
                return None
            
            logger.info("Calculating route...")
            route = await self.calculate_route(
                (sender_geo["lon"], sender_geo["lat"]),
                (recipient_geo["lon"], recipient_geo["lat"])
            )
            
            if not route:
                logger.error("Could not calculate route")
                return None
            
            estimated_days = max(3, min(7, int(route["distance_km"] / 400) + 2))
            
            if sender_geo.get("country") != recipient_geo.get("country"):
                estimated_days = min(10, estimated_days + 3)
            
            return {
                "sender": {
                    "address": sender_geo["formatted_address"],
                    "lat": sender_geo["lat"],
                    "lon": sender_geo["lon"],
                    "country": sender_geo.get("country", ""),
                    "region": sender_geo.get("region", ""),
                    "city": sender_geo.get("city", "")
                },
                "recipient": {
                    "address": recipient_geo["formatted_address"],
                    "lat": recipient_geo["lat"],
                    "lon": recipient_geo["lon"],
                    "country": recipient_geo.get("country", ""),
                    "region": recipient_geo.get("region", ""),
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

    async def reverse_geocode(self, lat: float, lon: float) -> Optional[Dict]:
        """
        Reverse geocode coordinates to get location details including state/region
        """
        try:
            params = {
                "api_key": self.api_key,
                "point.lat": lat,
                "point.lon": lon,
                "size": 1
            }
            
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(
                    f"{self.base_url}/geocode/reverse",
                    params=params
                )
                response.raise_for_status()
                
                data = response.json()
                
                if data.get("features") and len(data["features"]) > 0:
                    feature = data["features"][0]
                    props = feature["properties"]
                    
                    return {
                        "country": props.get("country", ""),
                        "region": props.get("region", ""),
                        "locality": props.get("locality", "") or props.get("localadmin", ""),
                        "county": props.get("county", ""),
                        "label": props.get("label", "")
                    }
                
                return None
                
        except Exception as e:
            logger.error(f"Error reverse geocoding ({lat}, {lon}): {e}")
            return None
    
    async def get_route_states(self, geometry_encoded: str, total_distance_km: float, 
                               sender_region: str, recipient_region: str,
                               estimated_days: int = 3,
                               min_sample_points: int = 10) -> List[Dict]:
        """
        Sample points along route and get localities/cities via reverse geocoding.
        Returns a list of unique locations along the route with their details.
        Guarantees minimum checkpoints based on estimated_days for realistic tracking.
        
        Args:
            geometry_encoded: Encoded polyline geometry from route
            total_distance_km: Total route distance in km
            sender_region: Origin region/province name
            recipient_region: Destination region/province name
            estimated_days: Number of estimated delivery days (used to calculate min checkpoints)
            min_sample_points: Minimum number of points to sample along the route
        
        Returns:
            List of dicts with location info: [{"name": "Madrid", "type": "origin|transit|destination"}]
        """
        states = []
        seen_locations = set()
        all_found_locations = []
        
        min_checkpoints = max(4, estimated_days + 2)
        
        try:
            if sender_region:
                states.append({"name": sender_region, "type": "origin"})
                seen_locations.add(sender_region.upper().strip())
            
            coordinates = []
            if isinstance(geometry_encoded, str):
                try:
                    geom_data = json.loads(geometry_encoded)
                    if isinstance(geom_data, dict) and "coordinates" in geom_data:
                        coordinates = geom_data["coordinates"]
                    elif isinstance(geom_data, list):
                        coordinates = geom_data
                except (json.JSONDecodeError, ValueError):
                    try:
                        coordinates = decode_polyline(geometry_encoded)
                        logger.info(f"Decoded polyline with {len(coordinates)} points")
                    except Exception as decode_error:
                        logger.error(f"Could not decode polyline: {decode_error}")
                        
            elif isinstance(geometry_encoded, dict):
                coordinates = geometry_encoded.get("coordinates", [])
            elif isinstance(geometry_encoded, list):
                coordinates = geometry_encoded
            
            if not coordinates or len(coordinates) < 2:
                logger.warning("No valid coordinates found in geometry")
                states = self._generate_interpolated_checkpoints(
                    sender_region, recipient_region, total_distance_km, min_checkpoints
                )
                return states
            
            logger.info(f"Processing route with {len(coordinates)} coordinate points")
            
            num_samples = max(min_sample_points, min(25, len(coordinates) // 30))
            
            total_points = len(coordinates)
            step = max(1, total_points // (num_samples + 1))
            
            sample_indices = []
            for i in range(1, num_samples + 1):
                idx = min(i * step, total_points - 1)
                sample_indices.append(idx)
            
            logger.info(f"Sampling {len(sample_indices)} points along route for localities")
            
            for i, idx in enumerate(sample_indices):
                if idx >= len(coordinates):
                    continue
                
                if i > 0:
                    await asyncio.sleep(0.4)
                    
                coord = coordinates[idx]
                lon, lat = coord[0], coord[1]
                
                location = await self.reverse_geocode(lat, lon)
                
                if location:
                    locality = location.get("locality") or location.get("county") or location.get("region")
                    region = location.get("region") or location.get("county")
                    
                    if locality:
                        location_key = locality.upper().strip()
                        if location_key not in seen_locations:
                            all_found_locations.append({
                                "name": locality,
                                "region": region,
                                "type": "transit",
                                "index": idx
                            })
                            seen_locations.add(location_key)
                            logger.info(f"Found transit locality: {locality} ({region})")
                    elif region:
                        region_key = region.upper().strip()
                        if region_key not in seen_locations:
                            all_found_locations.append({
                                "name": region,
                                "region": region,
                                "type": "transit",
                                "index": idx
                            })
                            seen_locations.add(region_key)
                            logger.info(f"Found transit region: {region}")
            
            if len(all_found_locations) > 0:
                needed_transit = min_checkpoints - 2
                
                if len(all_found_locations) >= needed_transit:
                    step_size = len(all_found_locations) / needed_transit
                    selected = []
                    for i in range(needed_transit):
                        idx = int(i * step_size)
                        if idx < len(all_found_locations):
                            selected.append(all_found_locations[idx])
                    
                    for loc in selected:
                        states.append({"name": loc["name"], "type": "transit"})
                else:
                    for loc in all_found_locations:
                        states.append({"name": loc["name"], "type": "transit"})
            
            current_checkpoints = len(states) + 1
            if current_checkpoints < min_checkpoints:
                extra_needed = min_checkpoints - current_checkpoints
                extra_states = self._generate_transit_names(
                    sender_region, recipient_region, extra_needed, seen_locations
                )
                
                insert_positions = []
                if len(states) > 1:
                    for i in range(1, len(states)):
                        insert_positions.append(i)
                else:
                    insert_positions = [1] * extra_needed
                
                for i, extra in enumerate(extra_states):
                    pos = insert_positions[i % len(insert_positions)] if insert_positions else 1
                    states.insert(pos, extra)
            
            if recipient_region:
                recipient_key = recipient_region.upper().strip()
                already_exists = False
                for state in states:
                    if state["name"].upper().strip() == recipient_key:
                        state["type"] = "destination"
                        already_exists = True
                        break
                
                if not already_exists:
                    states.append({"name": recipient_region, "type": "destination"})
            
            logger.info(f"Total route checkpoints: {len(states)} - {[s['name'] for s in states]}")
            return states
            
        except Exception as e:
            logger.error(f"Error getting route states: {e}")
            return self._generate_interpolated_checkpoints(
                sender_region, recipient_region, total_distance_km, min_checkpoints
            )
    
    def _generate_interpolated_checkpoints(self, sender_region: str, recipient_region: str, 
                                           distance_km: float, min_checkpoints: int) -> List[Dict]:
        """
        Generate interpolated checkpoints when reverse geocoding fails or returns too few results.
        Creates realistic-looking transit points based on distance.
        """
        states = []
        
        if sender_region:
            states.append({"name": sender_region, "type": "origin"})
        
        transit_needed = max(2, min_checkpoints - 2)
        
        transit_names = [
            "Centro de Distribución Regional",
            "Oficina de Tránsito",
            "Hub Logístico",
            "Centro de Clasificación",
            "Almacén de Paso"
        ]
        
        for i in range(transit_needed):
            name_idx = i % len(transit_names)
            zone_num = i + 1
            states.append({
                "name": f"{transit_names[name_idx]} - Zona {zone_num}",
                "type": "transit"
            })
        
        if recipient_region:
            states.append({"name": recipient_region, "type": "destination"})
        
        return states
    
    def _generate_transit_names(self, sender_region: str, recipient_region: str, 
                                count: int, seen_locations: set) -> List[Dict]:
        """
        Generate additional transit checkpoint names when not enough localities found.
        """
        transit_templates = [
            "Centro Logístico",
            "Hub de Distribución", 
            "Oficina de Tránsito",
            "Centro de Clasificación",
            "Almacén Regional"
        ]
        
        results = []
        for i in range(count):
            template = transit_templates[i % len(transit_templates)]
            zone = random.randint(1, 9)
            name = f"{template} - Zona {zone}"
            
            if name.upper() not in seen_locations:
                results.append({"name": name, "type": "transit"})
                seen_locations.add(name.upper())
        
        return results

    async def get_full_route_with_checkpoints(self, sender_address: str, sender_country: str,
                                              recipient_address: str, recipient_country: str,
                                              sender_postal_code: str = "", sender_province: str = "",
                                              recipient_postal_code: str = "", recipient_province: str = "") -> Optional[Dict]:
        """
        Get complete route information with all checkpoints/localities along the way.
        This is the main function to call when shipping a package.
        Guarantees minimum checkpoints based on estimated delivery days.
        
        Returns:
            Dict with route info and list of checkpoints with scheduled times
        """
        try:
            route_info = await self.get_route_info(
                sender_address, sender_country,
                recipient_address, recipient_country,
                sender_postal_code, sender_province,
                recipient_postal_code, recipient_province
            )
            
            if not route_info:
                logger.error("Could not get route info")
                return None
            
            geometry = route_info["route"].get("geometry")
            distance_km = route_info["route"]["distance_km"]
            estimated_days = route_info["route"]["estimated_days"]
            
            sender_region = route_info["sender"].get("region") or sender_province or route_info["sender"].get("city")
            recipient_region = route_info["recipient"].get("region") or recipient_province or route_info["recipient"].get("city")
            
            logger.info(f"Getting route states from {sender_region} to {recipient_region} (estimated {estimated_days} days)")
            
            route_states = []
            if geometry:
                route_states = await self.get_route_states(
                    geometry, 
                    distance_km,
                    sender_region,
                    recipient_region,
                    estimated_days=estimated_days,
                    min_sample_points=12
                )
            
            if len(route_states) < 2:
                min_checkpoints = max(4, estimated_days + 2)
                route_states = self._generate_interpolated_checkpoints(
                    sender_region, recipient_region, distance_km, min_checkpoints
                )
            
            return {
                "sender": route_info["sender"],
                "recipient": route_info["recipient"],
                "route": {
                    "distance_km": distance_km,
                    "duration_hours": route_info["route"]["duration_hours"],
                    "estimated_days": estimated_days,
                    "geometry": geometry
                },
                "checkpoints": route_states
            }
            
        except Exception as e:
            logger.error(f"Error getting full route with checkpoints: {e}")
            return None


try:
    if os.getenv('ORS_API_KEY'):
        ors_service = OpenRouteService()
    else:
        ors_service = None
        logger.warning("ORS_API_KEY not set, OpenRouteService not initialized")
except Exception as e:
    ors_service = None
    logger.error(f"Could not initialize OpenRouteService: {e}")
