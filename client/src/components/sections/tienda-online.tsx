import { Button } from "@/components/ui/button";
import { ChevronRight, ShoppingBag, Package, Smartphone } from "lucide-react";

export default function TiendaOnline() {
  return (
    <section className="bg-yellow-400 py-8">
      <div className="max-w-md mx-auto px-4">
        <div className="text-left">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            online
          </h2>
          
          <p className="text-sm text-gray-900 leading-relaxed mb-6">
            Compra online todo lo necesario para tus envíos 
            postales (sobres, embalajes, sellos, etc.). Además, 
            disponemos de artículos para amantes de la filatelia, 
            productos de Correos y regalos para sorprender a los 
            que más quieres.
          </p>
          
          <Button 
            variant="ghost" 
            className="text-blue-900 hover:text-blue-800 font-semibold p-0 h-auto text-sm flex items-center gap-1 mb-8"
            data-testid="button-mas-info-tienda"
          >
            MÁS INFO
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}