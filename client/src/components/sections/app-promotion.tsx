import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";

export default function AppPromotion() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center text-white">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Ya disponible la nueva App de EnvíosPro
            </h2>
            <p className="text-blue-100 mb-6">
              Descarga la nueva App de EnvíosPro y disfruta de una experiencia
              mejorada. Gestiona tus envíos con nuestra App de manera rápida,
              sencilla e intuitiva.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-white text-blue-600 font-semibold hover:bg-gray-100"
                size="lg"
                data-testid="app-download-button"
              >
                DESCARGAR APP
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold"
                data-testid="app-info-button"
              >
                MÁS INFO
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <Smartphone className="w-32 h-32 opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
}
