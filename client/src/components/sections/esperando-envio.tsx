import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function EsperandoEnvio() {
  return (
    <section className="bg-gray-100 py-6 lg:h-full lg:flex lg:items-center">
      <div className="max-w-md lg:max-w-full mx-auto px-6 lg:px-8 w-full">
        <Card className="bg-white border-0 rounded-lg shadow-sm lg:h-full">
          <CardContent className="p-6 lg:p-8 lg:flex lg:flex-col lg:justify-between lg:h-full">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-6">
                ¿Estás esperando un envío?
              </h2>
              
              <p className="text-sm lg:text-base text-gray-700 leading-relaxed mb-6">
                Aquí encontrarás todo lo que necesitas 
                saber sobre el envío que estás esperando.
              </p>
            </div>
            
            <Button 
              variant="ghost" 
              className="text-blue-700 hover:text-blue-800 font-bold p-0 h-auto text-sm lg:text-base flex items-center gap-1"
              data-testid="button-mas-info-esperando"
            >
              MÁS INFO
              <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}