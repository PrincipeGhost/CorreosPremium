import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function SegurosAXA() {
  return (
    <section className="bg-white py-6">
      <div className="max-w-md mx-auto px-6">
        <Card className="bg-white border-0 rounded-lg shadow-sm overflow-hidden">
          {/* Hero image with curved bottom */}
          <div className="relative">
            <div 
              className="h-48 bg-cover bg-center bg-no-repeat relative"
              style={{
                backgroundImage: "url('/attached_assets/image_1754305323847.jpeg')"
              }}
              data-testid="img-seguros-axa"
            >
              {/* Curved bottom overlay */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-6 bg-white"
                style={{
                  borderRadius: '50% 50% 0 0 / 100% 100% 0 0'
                }}
              ></div>
            </div>
          </div>
          
          <CardContent className="p-6">
            <p className="text-sm text-gray-700 mb-2">
              Allá donde está Correos, AXA te protege
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
              Seguros AXA
            </h2>
            
            <p className="text-sm text-gray-700 leading-relaxed mb-6">
              Ahora Correos se une a AXA en una misión: la de 
              llegar a ti, estés donde estés. Porque gracias a la 
              amplia red de agentes de Correos, podrás 
              contratar los seguros de AXA en cualquier sitio 
              de España.
            </p>
            
            <div className="space-y-3 mb-6">
              <Button 
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 text-sm rounded-md"
                data-testid="button-seguro-llamamos"
              >
                SEGURO, TE LLAMAMOS
              </Button>
              
              <Button 
                variant="ghost" 
                className="text-blue-700 hover:text-blue-800 font-bold p-0 h-auto text-sm flex items-center gap-1"
                data-testid="button-mas-info-seguros"
              >
                MÁS INFO
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}