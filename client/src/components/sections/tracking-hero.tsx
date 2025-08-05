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
      <div className="max-w-md mx-auto px-8 space-y-8">
        {/* Main tracking section */}
        <Card className="bg-yellow-400 border-0 rounded-lg">
          <CardContent className="p-6 space-y-5">
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
                className="flex-1 h-14 text-base border-0 rounded-md shadow-sm bg-white px-4"
                data-testid="tracking-hero-input"
              />
              <Button
                onClick={handleTrackingSearch}
                className="h-14 px-4 bg-blue-600 hover:bg-blue-700 rounded-md"
                data-testid="tracking-hero-search-button"
              >
                <Search className="w-4 h-4 text-white" />
              </Button>
            </div>

            {/* Quick access buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start bg-white border-0 h-16 text-gray-800 hover:bg-gray-50"
                data-testid="locate-offices-button"
              >
                <div className="w-8 h-8 rounded flex items-center justify-center mr-3">
                  <img 
                    src="/attached_assets/image_1754314540403.png" 
                    alt="Localiza oficinas"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                Localiza oficinas, buzones y Citypaq
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start bg-white border-0 h-16 text-blue-600 hover:bg-gray-50 underline"
                data-testid="postal-codes-button"
              >
                <div className="w-8 h-8 rounded flex items-center justify-center mr-3">
                  <img 
                    src="/attached_assets/image_1754314575709.png" 
                    alt="Códigos postales"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                Encuentra códigos postales
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start bg-white border-0 h-16 text-gray-800 hover:bg-gray-50"
                data-testid="email-verifier-button"
              >
                <div className="w-8 h-8 rounded flex items-center justify-center mr-3">
                  <img 
                    src="/attached_assets/image_1754314594642.png" 
                    alt="Verificador de email"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                Verificador de email
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Special package service */}
        <Card className="border-0 rounded-lg">
          <CardContent className="p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Servicio especial de paquetería
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              Envíos rápidos y baratos para todo el mundo
            </p>
            <p className="text-lg font-bold text-gray-900 mb-4">
              Desde 5.63€
            </p>
            
            <p className="text-sm text-gray-600 mb-3">
              Indica el producto que quieres enviar
            </p>
            
            <div className="flex gap-4 mb-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="service"
                  value="paqueteria"
                  checked={selectedService === "paqueteria"}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-4 h-4 text-yellow-400 border-gray-300 focus:ring-yellow-400"
                />
                <span className="ml-2 text-sm text-gray-900">Paquetería</span>
              </label>
              
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="service"
                  value="camino"
                  checked={selectedService === "camino"}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-4 h-4 text-yellow-400 border-gray-300 focus:ring-yellow-400"
                />
                <span className="ml-2 text-sm text-gray-900">Camino de Santiago</span>
              </label>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  Código postal origen
                </label>
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      value="España"
                      disabled
                      className="w-full h-12 bg-gray-100 text-gray-700 border border-gray-300 rounded-md pr-10"
                    />
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Código postal*"
                    value={originPostalCode}
                    onChange={(e) => setOriginPostalCode(e.target.value)}
                    className="w-full h-12 border border-gray-300 rounded-md"
                    data-testid="origin-postal-code"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  Código postal destino
                </label>
                <div className="space-y-2">
                  <Select value={destinationCountry} onValueChange={setDestinationCountry}>
                    <SelectTrigger className="w-full h-12 border border-gray-300 rounded-md">
                      <SelectValue placeholder="País*" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="españa">España</SelectItem>
                      <SelectItem value="francia">Francia</SelectItem>
                      <SelectItem value="portugal">Portugal</SelectItem>
                      <SelectItem value="alemania">Alemania</SelectItem>
                      <SelectItem value="italia">Italia</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="text"
                    placeholder="Código postal"
                    value={destinationPostalCode}
                    onChange={(e) => setDestinationPostalCode(e.target.value)}
                    className="w-full h-12 border border-gray-300 rounded-md"
                    data-testid="destination-postal-code"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-3">
                  ¿Qué tamaño y peso tiene tu paquete?
                </label>
                <div className="space-y-2">
                  <div 
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedPackageSize === '2kg' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300 bg-white'}`}
                    onClick={() => setSelectedPackageSize('2kg')}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded flex items-center justify-center mr-3">
                        <img src={icon2kg} alt="2kg package" className="w-8 h-8 object-contain" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Hasta 2kg</div>
                        <div className="text-sm text-gray-600">Dimensión: 30x20x20</div>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedPackageSize === '5kg' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300 bg-white'}`}
                    onClick={() => setSelectedPackageSize('5kg')}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded flex items-center justify-center mr-3">
                        <img src={icon5kg} alt="5kg package" className="w-8 h-8 object-contain" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Hasta 5kg</div>
                        <div className="text-sm text-gray-600">Dimensión: 35x35x24</div>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedPackageSize === '10kg' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300 bg-white'}`}
                    onClick={() => setSelectedPackageSize('10kg')}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded flex items-center justify-center mr-3">
                        <img src={icon10kg} alt="10kg package" className="w-8 h-8 object-contain" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Hasta 10kg</div>
                        <div className="text-sm text-gray-600">Dimensión: 40x40x37</div>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedPackageSize === '20kg' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300 bg-white'}`}
                    onClick={() => setSelectedPackageSize('20kg')}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded flex items-center justify-center mr-3">
                        <img src={icon20kg} alt="20kg package" className="w-8 h-8 object-contain" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Hasta 20kg</div>
                        <div className="text-sm text-gray-600">Dimensión: 55x55x39</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-3 mt-6">
                <Button 
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 h-12 rounded-lg"
                  data-testid="comenzar-envio-button"
                >
                  COMENZAR ENVÍO
                </Button>
                
                <div className="flex items-center justify-center">
                  <button className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:text-blue-700">
                    MÁS INFO
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}