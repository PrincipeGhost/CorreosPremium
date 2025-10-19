import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function ServiceCalculator() {
  const [selectedSize, setSelectedSize] = useState<string>("");

  // Iconos SVG personalizados para cada tamaño
  const PackageIcon2kg = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="12" width="24" height="16" rx="2" fill="#FED500" stroke="#E5A100" strokeWidth="2"/>
      <rect x="10" y="14" width="20" height="12" fill="#FECB00"/>
      <rect x="12" y="16" width="16" height="2" fill="#E5A100"/>
      <rect x="12" y="20" width="12" height="2" fill="#E5A100"/>
    </svg>
  );

  const PackageIcon5kg = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="26" rx="16" ry="6" fill="#FED500"/>
      <path d="M8 18C8 16 10 14 20 14C30 14 32 16 32 18L30 26C30 28 28 30 20 30C12 30 10 28 10 26L8 18Z" fill="#FECB00" stroke="#E5A100" strokeWidth="2"/>
      <rect x="14" y="16" width="12" height="2" fill="#E5A100"/>
      <rect x="16" y="20" width="8" height="2" fill="#E5A100"/>
      <circle cx="12" cy="22" r="2" fill="#4A90E2"/>
      <circle cx="28" cy="22" r="2" fill="#4A90E2"/>
    </svg>
  );

  const PackageIcon10kg = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="16" fill="#FED500" stroke="#E5A100" strokeWidth="2"/>
      <circle cx="20" cy="20" r="12" fill="#FECB00"/>
      <rect x="12" y="18" width="16" height="4" rx="2" fill="#4A90E2"/>
      <circle cx="20" cy="14" r="3" fill="#E5A100"/>
      <rect x="18" y="24" width="4" height="6" fill="#E5A100"/>
    </svg>
  );

  const PackageIcon20kg = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="14" width="28" height="18" rx="3" fill="#FED500" stroke="#E5A100" strokeWidth="2"/>
      <rect x="8" y="16" width="24" height="14" fill="#FECB00"/>
      <rect x="10" y="18" width="20" height="2" fill="#4A90E2"/>
      <rect x="10" y="22" width="20" height="2" fill="#4A90E2"/>
      <rect x="10" y="26" width="20" height="2" fill="#4A90E2"/>
      <circle cx="12" cy="10" r="2" fill="#E5A100"/>
      <rect x="14" y="8" width="12" height="4" rx="2" fill="#E5A100"/>
      <circle cx="28" cy="10" r="2" fill="#E5A100"/>
    </svg>
  );

  const serviceSizes = [
    {
      id: "xs",
      icon: PackageIcon2kg,
      title: "XS",
      subtitle: "Hasta 2kg",
      description: "Dimensión: 30x20x20",
    },
    {
      id: "s",
      icon: PackageIcon5kg,
      title: "S",
      subtitle: "Hasta 5kg",
      description: "Dimensión: 35x35x24",
    },
    {
      id: "m",
      icon: PackageIcon10kg,
      title: "M",
      subtitle: "Hasta 10kg",
      description: "Dimensión: 40x40x37",
    },
    {
      id: "l",
      icon: PackageIcon20kg,
      title: "L",
      subtitle: "Hasta 20kg",
      description: "Dimensión: 55x55x39",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-2 border-gray-300 shadow-lg bg-white rounded-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Servicio especial de paquetería
            </h2>
            <p className="text-gray-600 mb-8">
              Envíos rápidos y baratos para todo el mundo{" "}
              <span className="text-orange-500 font-semibold">Desde 5.63€</span>
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Indica el producto que quieres enviar
                  </label>
                  <Select>
                    <SelectTrigger data-testid="service-type-select">
                      <SelectValue placeholder="Paquetería" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paqueteria">Paquetería</SelectItem>
                      <SelectItem value="documentos">Documentos</SelectItem>
                      <SelectItem value="cartas">Cartas</SelectItem>
                      <SelectItem value="otros">Otros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Código postal origen
                  </label>
                  <div className="flex gap-2">
                    <Select>
                      <SelectTrigger className="w-32" data-testid="country-select">
                        <SelectValue placeholder="España" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spain">España</SelectItem>
                        <SelectItem value="portugal">Portugal</SelectItem>
                        <SelectItem value="france">Francia</SelectItem>
                        <SelectItem value="other">Otros países</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input 
                      placeholder="Código postal" 
                      className="flex-1"
                      data-testid="postal-code-input"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código postal destino
                </label>
                <div className="flex gap-2 mb-6">
                  <Select>
                    <SelectTrigger className="w-32" data-testid="destination-country-select">
                      <SelectValue placeholder="España" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spain">España</SelectItem>
                      <SelectItem value="portugal">Portugal</SelectItem>
                      <SelectItem value="france">Francia</SelectItem>
                      <SelectItem value="other">Otros países</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input 
                    placeholder="Código postal" 
                    className="flex-1"
                    data-testid="destination-postal-code-input"
                  />
                </div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  ¿Qué tamaño y peso tiene tu paquete?
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {serviceSizes.map((size) => {
                    return (
                      <div
                        key={size.id}
                        className="text-center cursor-pointer transition-all duration-200"
                        onClick={() => setSelectedSize(size.id)}
                        data-testid={`service-size-${size.id}`}
                      >
                        {/* Círculo de selección */}
                        <div className="relative mb-3">
                          <div 
                            className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center transition-all duration-200 ${
                              selectedSize === size.id
                                ? "bg-yellow-400 shadow-lg"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                          >
                            {selectedSize === size.id && (
                              <div className="w-8 h-8 rounded-full bg-blue-900"></div>
                            )}
                            {selectedSize !== size.id && (
                              <span className="text-gray-600 font-bold text-lg">{size.title}</span>
                            )}
                          </div>
                        </div>
                        
                        {/* Información del tamaño */}
                        <h4 className="font-bold text-lg text-gray-800 mb-1">{size.title}</h4>
                        <h5 className="font-semibold text-sm text-gray-600 mb-1">{size.subtitle}</h5>
                        <p className="text-xs text-gray-500">
                          {size.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Button
                type="button"
                className="corporate-blue hover:bg-blue-700 text-white font-semibold"
                data-testid="quote-request-button"
              >
COMENZAR ENVÍO
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
