import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon
            points="0,0 100,0 85,100 0,100"
            fill="white"
            opacity="0.1"
          />
          <polygon points="90,0 100,0 100,50" fill="white" opacity="0.05" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Donde estés, nosotros te protegemos
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Servicios profesionales de calidad. Ahora nuestra empresa se
              asocia con los mejores para ofrecerte la mejor experiencia, estés
              donde estés.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="corporate-accent hover:bg-orange-600 text-white font-semibold"
                data-testid="hero-contact-button"
              >
                CONTACTA CON NOSOTROS
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold"
                data-testid="hero-info-button"
              >
                MÁS INFORMACIÓN
              </Button>
            </div>
          </div>
          <div className="lg:flex justify-center">
            <div className="w-full max-w-md h-80 bg-white bg-opacity-10 rounded-2xl flex items-center justify-center">
              <Shield className="w-32 h-32 text-white opacity-30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
