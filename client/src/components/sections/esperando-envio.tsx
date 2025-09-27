import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function EsperandoEnvio() {
  return (
    <section className="bg-gray-100 py-6">
      <div className="max-w-md mx-auto px-6">
        <Card className="bg-white border-0 rounded-lg shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              ¿Estás esperando un envío?
            </h2>
            
            <p className="text-sm text-gray-700 leading-relaxed mb-6">
              Aquí encontrarás todo lo que necesitas 
              saber sobre el envío que estás esperando.
            </p>
            
            <Button 
              variant="ghost" 
              className="text-blue-700 hover:text-blue-800 font-bold p-0 h-auto text-sm flex items-center gap-1"
              data-testid="button-mas-info-esperando"
            >
              MÁS INFO
              <ChevronRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}