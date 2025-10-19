import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function PremiumExpress() {
  const [, setLocation] = useLocation();

  const handleNavigateToPremium = () => {
    setLocation("/premium-express");
  };

  return (
    <Card className="bg-white border-0 rounded-none shadow-none">
      <CardContent className="p-3 lg:p-7">
        <h2 className="text-base lg:text-lg font-bold text-gray-800 mb-2 lg:mb-3">
          No mides distancia, dónde estés correos te protege.
        </h2>
        
        <div className="space-y-1 mb-3">
          <div>
            <p className="text-sm lg:text-base font-bold text-gray-900">
              PREMIUM EXPRESS
            </p>
          </div>
          
          <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
            Ahora correos garantiza la posibilidad de estar más cerca de ti
            de forma segura, rápida y garantizada, ya sea que quieras enviar
            un regalo, un documento importante o finiquitar tu venta online
            gestiona de forma segura en toda España.
          </p>
        </div>
        
        <Button 
          onClick={handleNavigateToPremium}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 lg:py-4 text-sm lg:text-base rounded-md"
          data-testid="button-mas-info-premium"
        >
          MÁS INFO
        </Button>
      </CardContent>
    </Card>
  );
}