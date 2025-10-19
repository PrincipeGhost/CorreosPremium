import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EligeCorreos() {
  return (
    <Card className="bg-white border-0 rounded-none shadow-none mt-10 lg:border-t-2 lg:border-gray-300 lg:pt-10">
      <CardContent className="p-6 lg:p-8">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-6">
          #EligeCorreos
        </h2>
        
        <div className="space-y-3 mb-6">
          <div>
            <p className="text-sm lg:text-base font-bold text-gray-900">
              De: todos y todas
            </p>
            <p className="text-sm lg:text-base font-bold text-gray-900">
              Para: todos y todas
            </p>
          </div>
          
          <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
            Todo envío tiene un "de" y un "para". 
            Pero, ¿qué nos diferencia? Que somos de 
            todos y todas para servir a todos y todas.
          </p>
        </div>
        
        <Button 
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 lg:py-4 text-sm lg:text-base rounded-md"
          data-testid="button-mas-info-elige"
        >
          MÁS INFO
        </Button>
      </CardContent>
    </Card>
  );
}