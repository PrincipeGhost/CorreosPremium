import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Navigation, Mail, Package, ChevronDown, Lock } from "lucide-react";
import icon2kg from "@assets/image_1754337530908.png";
import icon5kg from "@assets/image_1754337539610.png"; 
import icon10kg from "@assets/image_1754337546712.png";
import icon20kg from "@assets/image_1754337554743.png";

export default function TrackingHero() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [selectedService, setSelectedService] = useState("paqueteria");
  const [originCountry, setOriginCountry] = useState("España");
  const [originPostalCode, setOriginPostalCode] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [destinationPostalCode, setDestinationPostalCode] = useState("");
  const [selectedPackageSize, setSelectedPackageSize] = useState("");
  const [, setLocation] = useLocation();

  const handleTrackingSearch = () => {
    if (trackingNumber.trim()) {
      setLocation(`/tracking?number=${encodeURIComponent(trackingNumber)}`);
    }
  };

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-md mx-auto px-4 space-y-8">
        {/* Main tracking section */}
        <Card className="bg-yellow-400 border-0 rounded-lg">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">
              Sigue tu envío
            </h2>
            
            {/* Tracking input */}
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Nº de seguimiento de en..."
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTrackingSearch()}
                className="flex-1 h-12 text-base border-0 rounded-md shadow-sm bg-white"
                data-testid="tracking-hero-input"
              />
              <Button
                onClick={handleTrackingSearch}
                className="h-12 px-4 bg-blue-600 hover:bg-blue-700 rounded-md"
                data-testid="tracking-hero-search-button"
              >
                <Search className="w-4 h-4 text-white" />
              </Button>
            </div>

            {/* Quick access buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start bg-white border-0 h-12 text-gray-800 hover:bg-gray-50"
                data-testid="locate-offices-button"
              >
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                  <img 
                    src="/attached_assets/image_1754314540403.png" 
                    alt="Localiza oficinas"
                    className="w-6 h-6 object-contain"
                  />
                </div>
                Localiza oficinas, buzones y Citypaq
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start bg-white border-0 h-12 text-blue-600 hover:bg-gray-50 underline"
                data-testid="postal-codes-button"
              >
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                  <img 
                    src="/attached_assets/image_1754314575709.png" 
                    alt="Códigos postales"
                    className="w-6 h-6 object-contain"
                  />
                </div>
                Encuentra códigos postales
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start bg-white border-0 h-12 text-gray-800 hover:bg-gray-50"
                data-testid="email-verifier-button"
              >
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                  <img 
                    src="/attached_assets/image_1754314594642.png" 
                    alt="Verificador de email"
                    className="w-6 h-6 object-contain"
                  />
                </div>
                Verificador de email
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Special package service */}
        <Card className="border-0 rounded-lg">
          <CardContent className="p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Servicio especial de paquetería
            </h3>
            <p className="text-gray-600 text-sm mb-1">
              Envíos rápidos y baratos para todo el mundo
            </p>
            <p className="text-lg font-bold text-gray-900">
              Desde 5.63€
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}