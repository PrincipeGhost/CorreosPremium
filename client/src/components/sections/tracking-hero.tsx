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
                    className="w-6 h-6 object-contain"
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
                    className="w-6 h-6 object-contain"
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
                    <SelectContent className="max-h-[300px] bg-white border border-gray-200 rounded-md shadow-lg p-0 overflow-y-auto w-full min-w-[var(--radix-select-trigger-width)]">
                      <SelectItem value="afganistan" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Afganistán</SelectItem>
                      <SelectItem value="albania" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Albania</SelectItem>
                      <SelectItem value="alemania" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Alemania</SelectItem>
                      <SelectItem value="andorra" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Andorra</SelectItem>
                      <SelectItem value="angola" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Angola</SelectItem>
                      <SelectItem value="argentina" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Argentina</SelectItem>
                      <SelectItem value="armenia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Armenia</SelectItem>
                      <SelectItem value="australia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Australia</SelectItem>
                      <SelectItem value="austria" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Austria</SelectItem>
                      <SelectItem value="azerbaiyan" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Azerbaiyán</SelectItem>
                      <SelectItem value="bahamas" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Bahamas</SelectItem>
                      <SelectItem value="bangladesh" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Bangladesh</SelectItem>
                      <SelectItem value="barbados" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Barbados</SelectItem>
                      <SelectItem value="belgica" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Bélgica</SelectItem>
                      <SelectItem value="belice" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Belice</SelectItem>
                      <SelectItem value="bolivia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Bolivia</SelectItem>
                      <SelectItem value="bosnia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Bosnia y Herzegovina</SelectItem>
                      <SelectItem value="brasil" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Brasil</SelectItem>
                      <SelectItem value="bulgaria" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Bulgaria</SelectItem>
                      <SelectItem value="canada" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Canadá</SelectItem>
                      <SelectItem value="chile" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Chile</SelectItem>
                      <SelectItem value="china" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">China</SelectItem>
                      <SelectItem value="chipre" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Chipre</SelectItem>
                      <SelectItem value="colombia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Colombia</SelectItem>
                      <SelectItem value="corea_del_sur" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Corea del Sur</SelectItem>
                      <SelectItem value="costa_rica" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Costa Rica</SelectItem>
                      <SelectItem value="croacia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Croacia</SelectItem>
                      <SelectItem value="cuba" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Cuba</SelectItem>
                      <SelectItem value="dinamarca" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Dinamarca</SelectItem>
                      <SelectItem value="ecuador" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Ecuador</SelectItem>
                      <SelectItem value="egipto" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Egipto</SelectItem>
                      <SelectItem value="el_salvador" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">El Salvador</SelectItem>
                      <SelectItem value="emiratos_arabes" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Emiratos Árabes Unidos</SelectItem>
                      <SelectItem value="eslovaquia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Eslovaquia</SelectItem>
                      <SelectItem value="eslovenia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Eslovenia</SelectItem>
                      <SelectItem value="españa" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">España</SelectItem>
                      <SelectItem value="estados_unidos" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Estados Unidos</SelectItem>
                      <SelectItem value="estonia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Estonia</SelectItem>
                      <SelectItem value="etiopia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Etiopía</SelectItem>
                      <SelectItem value="filipinas" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Filipinas</SelectItem>
                      <SelectItem value="finlandia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Finlandia</SelectItem>
                      <SelectItem value="francia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Francia</SelectItem>
                      <SelectItem value="georgia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Georgia</SelectItem>
                      <SelectItem value="ghana" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Ghana</SelectItem>
                      <SelectItem value="grecia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Grecia</SelectItem>
                      <SelectItem value="guatemala" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Guatemala</SelectItem>
                      <SelectItem value="guinea" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Guinea</SelectItem>
                      <SelectItem value="haiti" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Haití</SelectItem>
                      <SelectItem value="honduras" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Honduras</SelectItem>
                      <SelectItem value="hongkong" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Hong Kong</SelectItem>
                      <SelectItem value="hungria" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Hungría</SelectItem>
                      <SelectItem value="india" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">India</SelectItem>
                      <SelectItem value="indonesia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Indonesia</SelectItem>
                      <SelectItem value="iran" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Irán</SelectItem>
                      <SelectItem value="iraq" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Iraq</SelectItem>
                      <SelectItem value="irlanda" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Irlanda</SelectItem>
                      <SelectItem value="islandia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Islandia</SelectItem>
                      <SelectItem value="israel" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Israel</SelectItem>
                      <SelectItem value="italia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Italia</SelectItem>
                      <SelectItem value="jamaica" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Jamaica</SelectItem>
                      <SelectItem value="japon" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Japón</SelectItem>
                      <SelectItem value="jordania" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Jordania</SelectItem>
                      <SelectItem value="kazajistan" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Kazajistán</SelectItem>
                      <SelectItem value="kenia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Kenia</SelectItem>
                      <SelectItem value="kuwait" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Kuwait</SelectItem>
                      <SelectItem value="letonia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Letonia</SelectItem>
                      <SelectItem value="libano" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Líbano</SelectItem>
                      <SelectItem value="lituania" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Lituania</SelectItem>
                      <SelectItem value="luxemburgo" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Luxemburgo</SelectItem>
                      <SelectItem value="macedonia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Macedonia del Norte</SelectItem>
                      <SelectItem value="malasia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Malasia</SelectItem>
                      <SelectItem value="malta" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Malta</SelectItem>
                      <SelectItem value="marruecos" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Marruecos</SelectItem>
                      <SelectItem value="mexico" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">México</SelectItem>
                      <SelectItem value="moldova" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Moldova</SelectItem>
                      <SelectItem value="monaco" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Mónaco</SelectItem>
                      <SelectItem value="montenegro" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Montenegro</SelectItem>
                      <SelectItem value="nicaragua" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Nicaragua</SelectItem>
                      <SelectItem value="nigeria" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Nigeria</SelectItem>
                      <SelectItem value="noruega" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Noruega</SelectItem>
                      <SelectItem value="nueva_zelanda" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Nueva Zelanda</SelectItem>
                      <SelectItem value="paises_bajos" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Países Bajos</SelectItem>
                      <SelectItem value="pakistan" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Pakistán</SelectItem>
                      <SelectItem value="panama" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Panamá</SelectItem>
                      <SelectItem value="paraguay" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Paraguay</SelectItem>
                      <SelectItem value="peru" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Perú</SelectItem>
                      <SelectItem value="polonia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Polonia</SelectItem>
                      <SelectItem value="portugal" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Portugal</SelectItem>
                      <SelectItem value="qatar" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Qatar</SelectItem>
                      <SelectItem value="reino_unido" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Reino Unido</SelectItem>
                      <SelectItem value="republica_checa" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">República Checa</SelectItem>
                      <SelectItem value="republica_dominicana" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">República Dominicana</SelectItem>
                      <SelectItem value="rumania" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Rumania</SelectItem>
                      <SelectItem value="rusia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Rusia</SelectItem>
                      <SelectItem value="serbia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Serbia</SelectItem>
                      <SelectItem value="singapur" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Singapur</SelectItem>
                      <SelectItem value="sudafrica" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Sudáfrica</SelectItem>
                      <SelectItem value="suecia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Suecia</SelectItem>
                      <SelectItem value="suiza" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Suiza</SelectItem>
                      <SelectItem value="tailandia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Tailandia</SelectItem>
                      <SelectItem value="taiwan" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Taiwán</SelectItem>
                      <SelectItem value="tunez" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Túnez</SelectItem>
                      <SelectItem value="turquia" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Turquía</SelectItem>
                      <SelectItem value="ucrania" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Ucrania</SelectItem>
                      <SelectItem value="uruguay" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Uruguay</SelectItem>
                      <SelectItem value="venezuela" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Venezuela</SelectItem>
                      <SelectItem value="vietnam" className="px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer border-0 focus:bg-gray-50">Vietnam</SelectItem>
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