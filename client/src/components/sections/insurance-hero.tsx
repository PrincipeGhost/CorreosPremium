import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function InsuranceHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image with curved bottom - matching Correos.es proportions */}
      <div className="relative h-32">
        <img 
          src="/attached_assets/image_1754310350481.png"
          alt="Casa tradicional española con trabajador de Correos"
          className="w-full h-32 object-cover"
          style={{ objectPosition: '50% 60%' }}
        />
        {/* SVG curved cut overlay - curve downward like Correos.es */}
        <svg 
          className="absolute bottom-0 left-0 w-full" 
          height="20" 
          viewBox="0 0 400 20" 
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          <path 
            d="M0,0 C200,15 200,15 400,0 L400,20 L0,20 Z" 
            fill="white"
          />
        </svg>
      </div>
      {/* Content Container - exact replica of reference image */}
      <div className="bg-white px-8 pt-6 pb-8">
        <div className="max-w-lg">
          <p className="text-xs text-black mb-2 font-normal">
            Allá donde está Correos, AXA te protege
          </p>
          
          <h2 className="text-xl text-gray-800 mb-3 font-normal">
            Seguros AXA
          </h2>
          
          <p className="text-xs text-gray-700 mb-4 leading-relaxed font-normal">
            Ahora Correos se une a AXA en una misión: la de 
            llegar a ti, estés donde estés. Porque gracias a la 
            amplia red de agentes de Correos, podrás 
            contratar los seguros de AXA en cualquier sitio 
            de España.
          </p>
          
          <div className="space-y-2 mb-4">
            <Button 
              className="w-full max-w-xs bg-yellow-400 hover:bg-yellow-500 text-blue-900 py-2 px-4 text-xs font-bold rounded border-0 transition-colors duration-200"
              data-testid="insurance-cta-button"
            >
              SEGURO, TE LLAMAMOS
            </Button>
            
            <Button 
              variant="ghost" 
              className="text-blue-800 hover:text-blue-900 p-0 h-auto text-xs font-bold flex items-center gap-1 transition-colors duration-200"
              data-testid="insurance-more-info-button"
            >
              MÁS INFO
              <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}