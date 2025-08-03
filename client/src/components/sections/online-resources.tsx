import { Button } from "@/components/ui/button";
import { Laptop } from "lucide-react";

export default function OnlineResources() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Recursos y herramientas online
              </h2>
              <p className="text-gray-600 mb-6">
                Accede a nuestros recursos digitales, herramientas
                especializadas y materiales de apoyo. Todo lo que necesitas para
                optimizar tu trabajo y estar al día con las últimas tendencias
                del sector.
              </p>
              <Button
                className="corporate-blue hover:bg-blue-700 text-white font-semibold"
                size="lg"
                data-testid="online-resources-button"
              >
                ACCEDER A RECURSOS
              </Button>
            </div>
            <div className="flex justify-center">
              <Laptop className="w-32 h-32 text-blue-600 opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
