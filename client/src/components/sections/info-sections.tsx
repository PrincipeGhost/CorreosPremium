import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Handshake } from "lucide-react";

export default function InfoSections() {
  return (
    <section className="corporate-light py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* For Clients */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Users className="w-12 h-12 text-blue-600 mr-4" />
                <h3 className="text-2xl font-bold text-gray-900">
                  ¿Eres nuestro cliente?
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Aquí encontrarás todo lo que necesitas saber sobre nuestros
                servicios y cómo trabajamos contigo.
              </p>
              <Button
                className="corporate-blue hover:bg-blue-700 text-white font-semibold"
                data-testid="client-info-button"
              >
                MÁS INFO
              </Button>
            </CardContent>
          </Card>

          {/* For Partners */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Handshake className="w-12 h-12 text-blue-600 mr-4" />
                <h3 className="text-2xl font-bold text-gray-900">
                  ¿Quieres ser nuestro socio?
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Descubre las oportunidades de colaboración y cómo podemos
                trabajar juntos para crecer.
              </p>
              <Button
                className="corporate-accent hover:bg-orange-600 text-white font-semibold"
                data-testid="partner-info-button"
              >
                MÁS INFO
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
