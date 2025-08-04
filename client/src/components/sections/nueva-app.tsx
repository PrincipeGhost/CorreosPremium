import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function NuevaApp() {
  return (
    <section className="bg-white py-6">
      <div className="max-w-md mx-auto px-6">
        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Ya disponible la
              <br />
              nueva App de
              <br />
              Correos
            </h2>
            
            <p className="text-sm text-gray-700 leading-relaxed mb-6">
              Descarga la nueva App de Correos y 
              disfruta de una experiencia mejorada. 
              Gestiona tus envíos con nuestra App de 
              manera rápida, sencilla e intuitiva.
            </p>
            
            <div className="space-y-4">
              <Button 
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 text-sm rounded-md"
                data-testid="button-descarga-app"
              >
                DESCARGA LA APP
              </Button>
              
              <Button 
                variant="ghost" 
                className="text-blue-600 hover:text-blue-700 font-semibold p-0 h-auto text-sm flex items-center gap-1"
                data-testid="button-mas-info-app"
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