import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function PremiumExpress() {
  const [, setLocation] = useLocation();

  const handleNavigateToPremium = () => {
    setLocation("/premium-express");
  };

  return (
    <Card className="bg-white border border-gray-200 rounded-none shadow-none">
      <CardContent className="p-6 lg:p-8">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-6">
          No mides distancia, dónde estés correos te protege.
        </h2>
        
        <div className="space-y-3 mb-6">
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