import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EligeCorreos() {
  return (
    <section className="bg-gray-100 py-6">
      <div className="max-w-md mx-auto px-6">
        <Card className="bg-white border-0 rounded-lg shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              #EligeCorreos
            </h2>
            
            <div className="space-y-3 mb-6">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  De: todos y todas
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  Para: todos y todas
                </p>
              </div>
              
              <p className="text-sm text-gray-700 leading-relaxed">
                Todo envío tiene un "de" y un "para". 
                Pero, ¿qué nos diferencia? Que somos de 
                todos y todas para servir a todos y todas.
              </p>
            </div>
            
            <Button 
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 text-sm rounded-md"
              data-testid="button-mas-info-elige"
            >
              MÁS INFO
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}