import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function NuevaApp() {
  return (
    <section className="bg-white py-6 lg:py-12">
      <div className="max-w-md lg:max-w-3xl mx-auto px-6 lg:px-8">
        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <CardContent className="p-6 lg:p-10">
            <h2 className="text-xl lg:text-3xl font-bold text-gray-800 mb-6 lg:mb-8">
              Ya disponible la nueva App de Correos
            </h2>
            
            <p className="text-sm lg:text-lg text-gray-700 leading-relaxed mb-6 lg:mb-8">
              Descarga la nueva App de Correos y 
              disfruta de una experiencia mejorada. 
              Gestiona tus envíos con nuestra App de 
              manera rápida, sencilla e intuitiva.
            </p>
            
            <div className="space-y-4 lg:flex lg:space-y-0 lg:space-x-4">
              <Button 
                className="w-full lg:w-auto lg:px-8 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 lg:py-4 text-sm lg:text-base rounded-md"
                data-testid="button-descarga-app"
              >
                DESCARGA LA APP
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full lg:w-auto text-blue-700 hover:text-blue-800 font-bold p-0 lg:px-4 h-auto text-sm lg:text-base flex items-center justify-center gap-1"
                data-testid="button-mas-info-app"
              >
                MÁS INFO
                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}