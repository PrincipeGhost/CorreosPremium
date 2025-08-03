import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";

export default function QuickAccess() {
  return (
    <section className="corporate-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Acceso rápido a servicios
            </h2>

            {/* Service Tracking */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">
                Seguimiento de servicios
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="text"
                  placeholder="Número de referencia del servicio"
                  className="flex-1"
                  data-testid="tracking-input"
                />
                <Button
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
                <MapPin className="text-blue-600 w-8 h-8 mr-4" />
                <div>
                  <h4 className="font-semibold">Localiza oficinas</h4>
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
                <Phone className="text-blue-600 w-8 h-8 mr-4" />
                <div>
                  <h4 className="font-semibold">Contacto directo</h4>
                  <p className="text-sm text-gray-600">
                    Habla con nuestro equipo
                  </p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all"
                data-testid="quick-link-email-verify"
              >
                <Mail className="text-blue-600 w-8 h-8 mr-4" />
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
