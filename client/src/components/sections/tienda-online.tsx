import { Button } from "@/components/ui/button";
import { ChevronRight, ShoppingBag, Package, Smartphone, ShoppingCart } from "lucide-react";

export default function TiendaOnline() {
  return (
    <section className="bg-yellow-400 py-12 relative overflow-hidden">
      <div className="max-w-md mx-auto px-4 relative z-10">
        {/* Illustration */}
        <div className="flex justify-center mb-8">
          <div className="w-56 h-40 relative">
            {/* Main circular background */}
            <div className="w-full h-full bg-white bg-opacity-30 rounded-full flex items-center justify-center relative">
              <div className="w-44 h-32 bg-white rounded-full flex items-center justify-center relative">
                {/* Phone */}
                <div className="w-16 h-24 bg-gray-800 rounded-lg flex items-center justify-center relative">
                  <div className="w-12 h-16 bg-blue-600 rounded flex items-center justify-center">
                    <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center">
                      <ShoppingCart className="w-3 h-3 text-gray-800" />
                    </div>
                  </div>
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-600 rounded-full"></div>
                </div>
                
                {/* Shopping bags */}
                <div className="absolute -left-4 bottom-2 w-8 h-10 bg-teal-400 rounded-t-lg relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-2 border-2 border-teal-600 rounded-t"></div>
                </div>
                
                <div className="absolute left-6 bottom-2 w-6 h-8 bg-yellow-500 rounded-t-lg relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-1 border-2 border-yellow-700 rounded-t"></div>
                </div>
                
                {/* Packages */}
                <div className="absolute -right-4 bottom-2 w-8 h-6 bg-gray-400 rounded"></div>
                <div className="absolute right-2 bottom-2 w-6 h-4 bg-yellow-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Compra en nuestra tienda online
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
          className="text-blue-900 hover:text-blue-800 font-semibold p-0 h-auto text-sm flex items-center gap-1"
          data-testid="button-mas-info-tienda"
        >
          MÁS INFO
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}