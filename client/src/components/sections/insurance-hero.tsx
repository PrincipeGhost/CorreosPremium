import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function InsuranceHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image with curved bottom - exactly like Correos.es */}
      <div className="relative h-80">
        <img 
          src="/attached_assets/image_1754310350481.png"
          alt="Casa tradicional española con trabajador de Correos"
          className="w-full h-80 object-cover object-center"
        />
        {/* SVG curved cut overlay - subtle curve like reference */}
        <svg 
          className="absolute bottom-0 left-0 w-full" 
          height="30" 
          viewBox="0 0 400 30" 
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          <path 
            d="M0,30 C200,8 200,8 400,30 L400,30 L0,30 Z" 
            fill="white"
          />
        </svg>
      </div>
      
      {/* Content Container - positioned after curved section with exact spacing */}
      <div className="bg-white px-6 pt-8 pb-16">
        <div className="max-w-sm mx-auto">
          <p className="text-base text-gray-600 mb-4 font-normal">
            Allá donde está Correos, AXA te protege
          </p>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
            Seguros AXA
          </h2>
          
          <p className="text-base text-gray-700 leading-relaxed mb-8">
            Ahora Correos se une a AXA en una misión: la de 
            llegar a ti, estés donde estés. Porque gracias a la 
            amplia red de agentes de Correos, podrás 
            contratar los seguros de AXA en cualquier sitio 
            de España.
          </p>
          
          <div className="space-y-6">
            <Button 
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 text-base rounded-lg shadow-none"
              data-testid="insurance-cta-button"
            >
              SEGURO, TE LLAMAMOS
            </Button>
            
            <Button 
              variant="ghost" 
              className="text-blue-700 hover:text-blue-800 font-bold p-0 h-auto text-base flex items-center gap-2"
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