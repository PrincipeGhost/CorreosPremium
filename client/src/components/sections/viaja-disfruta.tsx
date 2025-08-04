import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function ViajaDisfruta() {
  return (
    <section className="bg-white py-6">
      <div className="max-w-md mx-auto px-6">
        <Card className="bg-white border-0 rounded-lg shadow-sm overflow-hidden">
          {/* Hero image */}
          <div 
            className="h-48 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200')"
            }}
          />
          
          <CardContent className="p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Viaja y disfruta con Correos
            </h2>
            
            <p className="text-sm text-gray-700 leading-relaxed mb-6">
              En Correos te acompañamos en toda tu experiencia 
              del Camino de Santiago para que puedas disfrutar al 
              máximo. Descubre todo tipo de experiencias, viajes y 
              regalos que tenemos para ti, además te llevamos a 
              casa los productos que compres en nuestra web.
            </p>
            
            <Button 
              variant="ghost" 
              className="text-blue-700 hover:text-blue-800 font-bold p-0 h-auto text-sm flex items-center gap-1"
              data-testid="button-mas-info-viaja"
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