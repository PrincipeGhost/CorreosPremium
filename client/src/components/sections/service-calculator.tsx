import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, Settings, Rocket, Crown } from "lucide-react";

export default function ServiceCalculator() {
  const [selectedSize, setSelectedSize] = useState<string>("");

  const serviceSizes = [
    {
      id: "basic",
      icon: Zap,
      title: "Básico",
      description: "Hasta 1 semana",
    },
    {
      id: "standard",
      icon: Settings,
      title: "Estándar",
      description: "Hasta 1 mes",
    },
    {
      id: "advanced",
      icon: Rocket,
      title: "Avanzado",
      description: "Hasta 3 meses",
    },
    {
      id: "premium",
      icon: Crown,
      title: "Premium",
      description: "Proyectos largos",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Servicio especial profesional
            </h2>
            <p className="text-gray-600 mb-8">
              Servicios rápidos y eficientes para todo tipo de necesidades{" "}
              <span className="text-orange-500 font-semibold">Desde 99€</span>
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de servicio
                  </label>
                  <Select>
                    <SelectTrigger data-testid="service-type-select">
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultoria">Consultoría</SelectItem>
                      <SelectItem value="auditoria">Auditoría</SelectItem>
                      <SelectItem value="formacion">Formación</SelectItem>
                      <SelectItem value="soporte">Soporte técnico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ubicación
                  </label>
                  <Select>
                    <SelectTrigger data-testid="location-select">
                      <SelectValue placeholder="Selecciona ubicación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="madrid">Madrid</SelectItem>
                      <SelectItem value="barcelona">Barcelona</SelectItem>
                      <SelectItem value="valencia">Valencia</SelectItem>
                      <SelectItem value="sevilla">Sevilla</SelectItem>
                      <SelectItem value="otras">Otras ubicaciones</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  ¿Qué tamaño de proyecto necesitas?
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {serviceSizes.map((size) => {
                    const Icon = size.icon;
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
                        <Icon className="w-8 h-8 text-blue-600 mb-2 mx-auto" />
                        <h4 className="font-semibold">{size.title}</h4>
                        <p className="text-sm text-gray-600">
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
                SOLICITAR COTIZACIÓN
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
