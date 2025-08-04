import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Package, Smartphone } from "lucide-react";

export default function TiendaOnline() {
  return (
    <section className="bg-yellow-400 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center">
          {/* Illustration area - using simple icons to represent the store illustration */}
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto bg-white bg-opacity-20 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                <Smartphone className="w-12 h-12 text-blue-600" />
              </div>
              <ShoppingBag className="absolute top-2 right-6 w-8 h-8 text-teal-500" />
              <Package className="absolute bottom-4 left-4 w-6 h-6 text-orange-500" />
              <Package className="absolute bottom-2 right-8 w-5 h-5 text-gray-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Compra en nuestra tienda
          </h2>
        </div>
      </div>
    </section>
  );
}