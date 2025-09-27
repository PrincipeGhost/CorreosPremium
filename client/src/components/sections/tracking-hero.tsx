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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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
                placeholder="Nº de seguimiento de envío"
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

            {/* Quick access buttons - responsive grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="w-full justify-start bg-white border-0 h-16 text-gray-800 hover:bg-gray-50"
                data-testid="locate-offices-button"
              >
                <div className="w-8 h-8 rounded flex items-center justify-center mr-3">
                  <img 
                    src="/attached_assets/image_1754314540403.png" 
                    alt="Localiza oficinas"
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <span className="text-sm lg:text-xs xl:text-sm">Localiza oficinas, buzones y Citypaq</span>
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
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <span className="text-sm lg:text-xs xl:text-sm">Encuentra códigos postales</span>
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
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <span className="text-sm lg:text-xs xl:text-sm">Verificador de email</span>
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
              <label 
                className="flex items-center cursor-pointer"
                onClick={() => setSelectedService("paqueteria")}
              >
                <div 
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                    selectedService === "paqueteria"
                      ? "bg-yellow-400"
                      : "bg-gray-300"
                  }`}
                >
                  {selectedService === "paqueteria" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-900"></div>
                  )}
                </div>
                <span className="ml-2 text-sm text-gray-900">Paquetería</span>
              </label>
              
              <label 
                className="flex items-center cursor-pointer"
                onClick={() => setSelectedService("camino")}
              >
                <div 
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                    selectedService === "camino"
                      ? "bg-yellow-400"
                      : "bg-gray-300"
                  }`}
                >
                  {selectedService === "camino" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-900"></div>
                  )}
                </div>
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
                      className="w-full h-12 bg-gray-100 text-gray-700 border border-gray-300 rounded-md pr-10 border-b-2 border-b-yellow-400"
                      style={{ borderBottomColor: '#FFD700' }}
                    />
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Código postal*"
                    value={originPostalCode}
                    onChange={(e) => setOriginPostalCode(e.target.value)}
                    className="w-full h-12 border border-gray-300 rounded-md border-b-2 border-b-yellow-400"
                    style={{ borderBottomColor: '#FFD700' }}
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
                    <SelectTrigger className="w-full h-12 border border-gray-300 rounded-md border-b-2 border-b-yellow-400" style={{ borderBottomColor: '#FFD700' }}>
                      <SelectValue placeholder="País*" />
                    </SelectTrigger>
                    <SelectContent side="bottom" className="correos-select-content">
                      <SelectItem value="afganistan" className="correos-select-item">Afganistán</SelectItem>
                      <SelectItem value="albania" className="correos-select-item">Albania</SelectItem>
                      <SelectItem value="alemania" className="correos-select-item">Alemania</SelectItem>
                      <SelectItem value="andorra" className="correos-select-item">Andorra</SelectItem>
                      <SelectItem value="angola" className="correos-select-item">Angola</SelectItem>
                      <SelectItem value="argentina" className="correos-select-item">Argentina</SelectItem>
                      <SelectItem value="armenia" className="correos-select-item">Armenia</SelectItem>
                      <SelectItem value="australia" className="correos-select-item">Australia</SelectItem>
                      <SelectItem value="austria" className="correos-select-item">Austria</SelectItem>
                      <SelectItem value="azerbaiyan" className="correos-select-item">Azerbaiyán</SelectItem>
                      <SelectItem value="bahamas" className="correos-select-item">Bahamas</SelectItem>
                      <SelectItem value="bangladesh" className="correos-select-item">Bangladesh</SelectItem>
                      <SelectItem value="barbados" className="correos-select-item">Barbados</SelectItem>
                      <SelectItem value="belgica" className="correos-select-item">Bélgica</SelectItem>
                      <SelectItem value="belice" className="correos-select-item">Belice</SelectItem>
                      <SelectItem value="bolivia" className="correos-select-item">Bolivia</SelectItem>
                      <SelectItem value="bosnia" className="correos-select-item">Bosnia y Herzegovina</SelectItem>
                      <SelectItem value="brasil" className="correos-select-item">Brasil</SelectItem>
                      <SelectItem value="bulgaria" className="correos-select-item">Bulgaria</SelectItem>
                      <SelectItem value="canada" className="correos-select-item">Canadá</SelectItem>
                      <SelectItem value="chile" className="correos-select-item">Chile</SelectItem>
                      <SelectItem value="china" className="correos-select-item">China</SelectItem>
                      <SelectItem value="chipre" className="correos-select-item">Chipre</SelectItem>
                      <SelectItem value="colombia" className="correos-select-item">Colombia</SelectItem>
                      <SelectItem value="corea_del_sur" className="correos-select-item">Corea del Sur</SelectItem>
                      <SelectItem value="costa_rica" className="correos-select-item">Costa Rica</SelectItem>
                      <SelectItem value="croacia" className="correos-select-item">Croacia</SelectItem>
                      <SelectItem value="cuba" className="correos-select-item">Cuba</SelectItem>
                      <SelectItem value="dinamarca" className="correos-select-item">Dinamarca</SelectItem>
                      <SelectItem value="ecuador" className="correos-select-item">Ecuador</SelectItem>
                      <SelectItem value="egipto" className="correos-select-item">Egipto</SelectItem>
                      <SelectItem value="el_salvador" className="correos-select-item">El Salvador</SelectItem>
                      <SelectItem value="emiratos_arabes" className="correos-select-item">Emiratos Árabes Unidos</SelectItem>
                      <SelectItem value="eslovaquia" className="correos-select-item">Eslovaquia</SelectItem>
                      <SelectItem value="eslovenia" className="correos-select-item">Eslovenia</SelectItem>
                      <SelectItem value="españa" className="correos-select-item">España</SelectItem>
                      <SelectItem value="estados_unidos" className="correos-select-item">Estados Unidos</SelectItem>
                      <SelectItem value="estonia" className="correos-select-item">Estonia</SelectItem>
                      <SelectItem value="etiopia" className="correos-select-item">Etiopía</SelectItem>
                      <SelectItem value="filipinas" className="correos-select-item">Filipinas</SelectItem>
                      <SelectItem value="finlandia" className="correos-select-item">Finlandia</SelectItem>
                      <SelectItem value="francia" className="correos-select-item">Francia</SelectItem>
                      <SelectItem value="georgia" className="correos-select-item">Georgia</SelectItem>
                      <SelectItem value="ghana" className="correos-select-item">Ghana</SelectItem>
                      <SelectItem value="grecia" className="correos-select-item">Grecia</SelectItem>
                      <SelectItem value="guatemala" className="correos-select-item">Guatemala</SelectItem>
                      <SelectItem value="guinea" className="correos-select-item">Guinea</SelectItem>
                      <SelectItem value="haiti" className="correos-select-item">Haití</SelectItem>
                      <SelectItem value="honduras" className="correos-select-item">Honduras</SelectItem>
                      <SelectItem value="hongkong" className="correos-select-item">Hong Kong</SelectItem>
                      <SelectItem value="hungria" className="correos-select-item">Hungría</SelectItem>
                      <SelectItem value="india" className="correos-select-item">India</SelectItem>
                      <SelectItem value="indonesia" className="correos-select-item">Indonesia</SelectItem>
                      <SelectItem value="iran" className="correos-select-item">Irán</SelectItem>
                      <SelectItem value="iraq" className="correos-select-item">Iraq</SelectItem>
                      <SelectItem value="irlanda" className="correos-select-item">Irlanda</SelectItem>
                      <SelectItem value="islandia" className="correos-select-item">Islandia</SelectItem>
                      <SelectItem value="israel" className="correos-select-item">Israel</SelectItem>
                      <SelectItem value="italia" className="correos-select-item">Italia</SelectItem>
                      <SelectItem value="jamaica" className="correos-select-item">Jamaica</SelectItem>
                      <SelectItem value="japon" className="correos-select-item">Japón</SelectItem>
                      <SelectItem value="jordania" className="correos-select-item">Jordania</SelectItem>
                      <SelectItem value="kazajistan" className="correos-select-item">Kazajistán</SelectItem>
                      <SelectItem value="kenia" className="correos-select-item">Kenia</SelectItem>
                      <SelectItem value="kuwait" className="correos-select-item">Kuwait</SelectItem>
                      <SelectItem value="letonia" className="correos-select-item">Letonia</SelectItem>
                      <SelectItem value="libano" className="correos-select-item">Líbano</SelectItem>
                      <SelectItem value="lituania" className="correos-select-item">Lituania</SelectItem>
                      <SelectItem value="luxemburgo" className="correos-select-item">Luxemburgo</SelectItem>
                      <SelectItem value="macedonia" className="correos-select-item">Macedonia del Norte</SelectItem>
                      <SelectItem value="malasia" className="correos-select-item">Malasia</SelectItem>
                      <SelectItem value="malta" className="correos-select-item">Malta</SelectItem>
                      <SelectItem value="marruecos" className="correos-select-item">Marruecos</SelectItem>
                      <SelectItem value="mexico" className="correos-select-item">México</SelectItem>
                      <SelectItem value="moldova" className="correos-select-item">Moldova</SelectItem>
                      <SelectItem value="monaco" className="correos-select-item">Mónaco</SelectItem>
                      <SelectItem value="montenegro" className="correos-select-item">Montenegro</SelectItem>
                      <SelectItem value="nicaragua" className="correos-select-item">Nicaragua</SelectItem>
                      <SelectItem value="nigeria" className="correos-select-item">Nigeria</SelectItem>
                      <SelectItem value="noruega" className="correos-select-item">Noruega</SelectItem>
                      <SelectItem value="nueva_zelanda" className="correos-select-item">Nueva Zelanda</SelectItem>
                      <SelectItem value="paises_bajos" className="correos-select-item">Países Bajos</SelectItem>
                      <SelectItem value="pakistan" className="correos-select-item">Pakistán</SelectItem>
                      <SelectItem value="panama" className="correos-select-item">Panamá</SelectItem>
                      <SelectItem value="paraguay" className="correos-select-item">Paraguay</SelectItem>
                      <SelectItem value="peru" className="correos-select-item">Perú</SelectItem>
                      <SelectItem value="polonia" className="correos-select-item">Polonia</SelectItem>
                      <SelectItem value="portugal" className="correos-select-item">Portugal</SelectItem>
                      <SelectItem value="qatar" className="correos-select-item">Qatar</SelectItem>
                      <SelectItem value="reino_unido" className="correos-select-item">Reino Unido</SelectItem>
                      <SelectItem value="republica_checa" className="correos-select-item">República Checa</SelectItem>
                      <SelectItem value="republica_dominicana" className="correos-select-item">República Dominicana</SelectItem>
                      <SelectItem value="rumania" className="correos-select-item">Rumania</SelectItem>
                      <SelectItem value="rusia" className="correos-select-item">Rusia</SelectItem>
                      <SelectItem value="serbia" className="correos-select-item">Serbia</SelectItem>
                      <SelectItem value="singapur" className="correos-select-item">Singapur</SelectItem>
                      <SelectItem value="sudafrica" className="correos-select-item">Sudáfrica</SelectItem>
                      <SelectItem value="suecia" className="correos-select-item">Suecia</SelectItem>
                      <SelectItem value="suiza" className="correos-select-item">Suiza</SelectItem>
                      <SelectItem value="tailandia" className="correos-select-item">Tailandia</SelectItem>
                      <SelectItem value="taiwan" className="correos-select-item">Taiwán</SelectItem>
                      <SelectItem value="tunez" className="correos-select-item">Túnez</SelectItem>
                      <SelectItem value="turquia" className="correos-select-item">Turquía</SelectItem>
                      <SelectItem value="ucrania" className="correos-select-item">Ucrania</SelectItem>
                      <SelectItem value="uruguay" className="correos-select-item">Uruguay</SelectItem>
                      <SelectItem value="venezuela" className="correos-select-item">Venezuela</SelectItem>
                      <SelectItem value="vietnam" className="correos-select-item">Vietnam</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="text"
                    placeholder="Código postal"
                    value={destinationPostalCode}
                    onChange={(e) => setDestinationPostalCode(e.target.value)}
                    className="w-full h-12 border border-gray-300 rounded-md border-b-2 border-b-yellow-400"
                    style={{ borderBottomColor: '#FFD700' }}
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