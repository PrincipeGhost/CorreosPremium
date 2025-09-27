import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function PremiumExpress() {
  const [, setLocation] = useLocation();

  const handleNavigateToPremium = () => {
    setLocation("/premium-express");
  };

  return (
    <section className="bg-gray-100 py-6">
      <div className="max-w-md mx-auto px-6">
        <Card className="bg-white border-0 rounded-lg shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              No mides distancia, dónde estés correos te protege.
            </h2>
            
            <div className="space-y-3 mb-6">
              <div>
                <p className="text-sm font-bold text-gray-900">
                  PREMIUM EXPRESS
                </p>
              </div>
              
              <p className="text-sm text-gray-700 leading-relaxed">
                Ahora correos garantiza la posibilidad de estar más cerca de ti
                de forma segura, rápida y garantizada, ya sea que quieras enviar
                un regalo, un documento importante o finiquitar tu venta online
                gestiona de forma segura en toda España.
              </p>
            </div>
            
            <Button 
              onClick={handleNavigateToPremium}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 text-sm rounded-md"
              data-testid="button-mas-info-premium"
            >
              MÁS INFO
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}