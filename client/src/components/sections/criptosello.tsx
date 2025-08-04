import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function Criptosello() {
  return (
    <section className="bg-white py-6">
      <div className="max-w-md mx-auto px-6">
        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Criptosello -
              <br />
              Mortadelo 2024
            </h2>
            
            <p className="text-sm text-gray-700 leading-relaxed mb-6">
              Descubre el primer criptosello de Correos 
              dedicado a Francisco Ibañez y su 
              personaje de los mil disfraces, Mortadelo. 
              Consíguelo ya en Correos Market.
            </p>
            
            <Button 
              variant="ghost" 
              className="text-blue-700 hover:text-blue-800 font-bold p-0 h-auto text-sm flex items-center gap-1"
              data-testid="button-mas-info-criptosello"
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