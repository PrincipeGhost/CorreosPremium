import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function InsuranceHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image with curved bottom */}
      <div className="relative h-96">
        <img 
          src="/attached_assets/image_1754310350481.png"
          alt="Casa tradicional española con trabajador de Correos"
          className="w-full h-96 object-cover"
        />
        {/* SVG curved cut overlay - deeper curve to match reference */}
        <svg 
          className="absolute bottom-0 left-0 w-full" 
          height="80" 
          viewBox="0 0 400 80" 
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          <path 
            d="M0,80 C100,20 300,20 400,80 L400,80 L0,80 Z" 
            fill="white"
          />
        </svg>
      </div>
      {/* Content Container - positioned after curved section */}
      <div className="bg-white px-6 pt-6 pb-8">
        <div className="max-w-md">
          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-2">
              Allá donde está Correos, AXA te protege
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Seguros AXA
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Ahora Correos se une a AXA en una misión: la de 
              llegar a ti, estés donde estés. Porque gracias a la 
              amplia red de agentes de Correos, podrás 
              contratar los seguros de AXA en cualquier sitio 
              de España.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button 
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 text-sm rounded-md"
              data-testid="insurance-cta-button"
            >
              SEGURO, TE LLAMAMOS
            </Button>
            
            <Button 
              variant="ghost" 
              className="text-blue-700 hover:text-blue-800 font-bold p-0 h-auto text-sm flex items-center gap-1"
              data-testid="insurance-more-info-button"
            >
              MÁS INFO
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}