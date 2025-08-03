import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function InsuranceHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="h-96 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400')"
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8">
          <div className="bg-white rounded-lg p-6 max-w-sm shadow-xl">
            <div className="mb-4">
              <p className="text-xs text-gray-600 mb-2">
                Allá donde está EnvíosPro, AXA te protege
              </p>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Seguros AXA
              </h2>
              <p className="text-gray-700 text-xs leading-relaxed mb-4">
                Ahora EnvíosPro se une a AXA en una misión: la de 
                llegar a ti, estés donde estés. Porque gracias a la 
                amplia red de agentes de EnvíosPro, podrás 
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