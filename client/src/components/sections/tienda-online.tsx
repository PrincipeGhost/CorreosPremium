import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function TiendaOnline() {
  return (
    <section className="bg-yellow-400 py-8 relative overflow-hidden">
      <div className="max-w-md mx-auto px-6 relative z-10">
        {/* Illustration */}
        <div className="flex justify-center mb-8">
          <div className="w-56 h-40 relative flex items-center justify-center">
            <img 
              src="/tienda-online.png" 
              alt="Tienda online - Compras y envíos"
              className="w-56 h-40 object-contain"
              onError={(e) => {
                console.log('Error loading tienda-online image');
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
          Compra en nuestra tienda online
        </h2>
        
        <p className="text-sm text-gray-800 leading-relaxed mb-6">
          Compra online todo lo necesario para tus envíos 
          postales (sobres, embalajes, sellos, etc.). Además, 
          disponemos de artículos para amantes de la filatelia, 
          productos de Correos y regalos para sorprender a los 
          que más quieres.
        </p>
        
        <Button 
          variant="ghost" 
          className="text-blue-700 hover:text-blue-800 font-bold p-0 h-auto text-sm flex items-center gap-1"
          data-testid="button-mas-info-tienda"
        >
          MÁS INFO
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}