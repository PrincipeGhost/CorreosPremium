import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function InsuranceHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image with curved bottom */}
      <div className="relative h-96">
        <img 
          src="/attached_assets/image_1754305484021.jpeg"
          alt="Casa tradicional española con trabajador de Correos"
          className="w-full h-96 object-cover"
        />
        {/* SVG curved cut overlay */}
        <svg 
          className="absolute bottom-0 left-0 w-full" 
          height="30" 
          viewBox="0 0 400 30" 
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          <path 
            d="M0,30 C200,0 200,0 400,30 L400,30 L0,30 Z" 
            fill="white"
          />
        </svg>
      </div>
      <div className="relative">
        {/* Content */}
        <div className="absolute bottom-8 left-0 right-0 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-6 max-w-sm shadow-xl">
            <div className="mb-4">
              <p className="text-xs text-gray-600 mb-2">
                Allá donde está Correos, AXA te protege
              </p>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Seguros AXA
              </h2>
              <p className="text-gray-700 text-xs leading-relaxed mb-4">
                Ahora Correos se une a AXA en una misión: la de 
                llegar a ti, estés donde estés. Porque gracias a la 
                amplia red de agentes de Correos, podrás 
                contratar los seguros de AXA en cualquier sitio 
                de España.
              </p>
            </div>
            
            <div className="space-y-2">
              <Button 
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 text-sm rounded-md"
                data-testid="insurance-cta-button"
              >
                SEGURO, TE LLAMAMOS
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full text-blue-600 hover:text-blue-700 font-semibold flex items-center justify-center gap-1 text-sm"
                data-testid="insurance-more-info-button"
              >
                MÁS INFO
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}