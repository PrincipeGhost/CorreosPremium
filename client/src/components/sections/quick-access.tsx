import { useState } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";

export default function QuickAccess() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [, setLocation] = useLocation();

  const handleTrackingSearch = () => {
    if (trackingNumber.trim()) {
      setLocation(`/tracking?number=${encodeURIComponent(trackingNumber)}`);
    }
  };

  return (
    <section className="corporate-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Sigue tu envío
            </h2>

            {/* Package Tracking */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">
                Nº de seguimiento de envío
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="text"
                  placeholder="Introduce tu número de seguimiento"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleTrackingSearch()}
                  className="flex-1"
                  data-testid="tracking-input"
                />
                <Button
                  onClick={handleTrackingSearch}
                  className="corporate-blue hover:bg-blue-700 text-white font-semibold"
                  data-testid="tracking-search-button"
                >
                  BUSCAR
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="#"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all"
                data-testid="quick-link-offices"
              >
                <img 
                  src="/attached_assets/image_1754314540403.png" 
                  alt="Localiza oficinas"
                  className="w-8 h-8 mr-4 object-contain"
                />
                <div>
                  <h4 className="font-semibold">Localiza oficinas, buzones y Citypaq</h4>
                  <p className="text-sm text-gray-600">
                    Encuentra nuestras ubicaciones
                  </p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all"
                data-testid="quick-link-contact"
              >
                <img 
                  src="/attached_assets/image_1754314575709.png" 
                  alt="Códigos postales"
                  className="w-8 h-8 mr-4 object-contain"
                />
                <div>
                  <h4 className="font-semibold">Encuentra códigos postales</h4>
                  <p className="text-sm text-gray-600">
                    Busca códigos postales
                  </p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all"
                data-testid="quick-link-email-verify"
              >
                <img 
                  src="/attached_assets/image_1754314594642.png" 
                  alt="Verificador de email"
                  className="w-8 h-8 mr-4 object-contain"
                />
                <div>
                  <h4 className="font-semibold">Verificador de email</h4>
                  <p className="text-sm text-gray-600">
                    Verifica comunicaciones
                  </p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
