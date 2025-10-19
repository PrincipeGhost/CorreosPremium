import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EligeCorreos() {
  return (
    <>
      <Card className="bg-white border-0 rounded-none shadow-none">
        <CardContent className="p-3 lg:p-7">
        <h2 className="text-base lg:text-lg font-bold text-gray-800 mb-2 lg:mb-3">
          #EligeCorreos
        </h2>
        
        <div className="space-y-1 mb-3">
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
    </>
  );
}