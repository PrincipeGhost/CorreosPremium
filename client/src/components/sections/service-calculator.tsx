import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import icon2kg from "@assets/image_1754337530908.png";
import icon5kg from "@assets/image_1754337539610.png"; 
import icon10kg from "@assets/image_1754337546712.png";
import icon20kg from "@assets/image_1754337554743.png";

export default function ServiceCalculator() {
  const [selectedSize, setSelectedSize] = useState<string>("");

  const serviceSizes = [
    {
      id: "xs",
      icon: icon2kg,
      title: "XS",
      subtitle: "Hasta 2kg",
      description: "Dimensión: 30x20x20",
    },
    {
      id: "s",
      icon: icon5kg,
      title: "S",
      subtitle: "Hasta 5kg",
      description: "Dimensión: 35x35x24",
    },
    {
      id: "m",
      icon: icon10kg,
      title: "M",
      subtitle: "Hasta 10kg",
      description: "Dimensión: 40x40x37",
    },
    {
      id: "l",
      icon: icon20kg,
      title: "L",
      subtitle: "Hasta 20kg",
      description: "Dimensión: 55x55x39",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border shadow-lg">
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
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {serviceSizes.map((size) => {
                    return (
                      <div
                        key={size.id}
                        className={`border rounded-lg p-4 text-center cursor-pointer transition-colors ${
                          selectedSize === size.id
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300 hover:border-blue-600"
                        }`}
                        onClick={() => setSelectedSize(size.id)}
                        data-testid={`service-size-${size.id}`}
                      >
                        <div className="w-12 h-12 mb-2 mx-auto flex items-center justify-center">
                          <img 
                            src={size.icon} 
                            alt={`${size.subtitle} icon`}
                            className="w-10 h-10 object-contain"
                          />
                        </div>
                        <h4 className="font-bold text-lg">{size.title}</h4>
                        <h5 className="font-semibold text-sm">{size.subtitle}</h5>
                        <p className="text-xs text-gray-600">
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
