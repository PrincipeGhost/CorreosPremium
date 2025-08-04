import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function InsuranceHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image with curved bottom - matching Correos.es proportions */}
      <div className="relative h-72">
        <img 
          src="/attached_assets/image_1754310350481.png"
          alt="Casa tradicional española con trabajador de Correos"
          className="w-full h-72 object-cover"
          style={{ objectPosition: 'center 65%' }}
        />
        {/* SVG curved cut overlay - curve downward like Correos.es */}
        <svg 
          className="absolute bottom-0 left-0 w-full" 
          height="40" 
          viewBox="0 0 400 40" 
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          <path 
            d="M0,0 C200,30 200,30 400,0 L400,40 L0,40 Z" 
            fill="white"
          />
        </svg>
      </div>
      {/* Content Container - tighter spacing like Correos.es */}
      <div className="bg-white px-6 pt-4 pb-6">
        <div className="max-w-sm">
          <p className="text-base text-gray-600 mb-3">
            Allá donde está Correos, AXA te protege
          </p>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            Seguros AXA
          </h2>
          
          <p className="text-base text-gray-700 leading-relaxed mb-6">
            Ahora Correos se une a AXA en una misión: la de 
            llegar a ti, estés donde estés. Porque gracias a la 
            amplia red de agentes de Correos, podrás 
            contratar los seguros de AXA en cualquier sitio 
            de España.
          </p>
          
          <div className="space-y-4 mb-8">
            <Button 
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 text-base rounded-lg"
              data-testid="insurance-cta-button"
            >
              SEGURO, TE LLAMAMOS
            </Button>
            
            <Button 
              variant="ghost" 
              className="text-blue-700 hover:text-blue-800 font-bold p-0 h-auto text-base flex items-center gap-1"
              data-testid="insurance-more-info-button"
            >
              MÁS INFO
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}