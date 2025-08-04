import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function ComprarTiendas() {
  return (
    <section className="bg-white py-8">
      <div className="max-w-md mx-auto px-4">
        <Card className="bg-white border-0 rounded-lg shadow-sm overflow-hidden">
          {/* Corporate image */}
          <div 
            className="h-40 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=160')"
            }}
          />
          
          <CardContent className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              ¿Quieres comprar en nuestras tiendas o enviar dinero?
            </h2>
            
            <p className="text-sm text-gray-700 leading-relaxed mb-6">
              Tenemos todo tipo de productos que te ayudarán a 
              realizar estas gestiones más fácilmente.
            </p>
            
            <Button 
              variant="ghost" 
              className="text-blue-600 hover:text-blue-700 font-semibold p-0 h-auto text-sm flex items-center gap-1"
              data-testid="button-mas-info-comprar"
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