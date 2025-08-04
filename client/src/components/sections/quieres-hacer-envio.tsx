import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function QuieresHacerEnvio() {
  return (
    <section className="bg-white py-6">
      <div className="max-w-md mx-auto px-6">
        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              ¿Quieres hacer un envío?
            </h2>
            
            <p className="text-sm text-gray-700 leading-relaxed mb-6">
              Todo lo que necesitas saber para realizar
              un envío del tipo que sea.
            </p>
            
            <Button 
              variant="ghost" 
              className="text-blue-600 hover:text-blue-700 font-semibold p-0 h-auto text-sm flex items-center gap-1"
              data-testid="button-mas-info-envio"
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