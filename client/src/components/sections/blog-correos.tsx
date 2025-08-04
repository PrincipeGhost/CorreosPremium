import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function BlogCorreos() {
  return (
    <section className="bg-white py-6">
      <div className="max-w-md mx-auto px-6">
        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Descubre
              <br />
              Actualidad, el Blog
              <br />
              de Correos
            </h2>
            
            <p className="text-sm text-gray-700 leading-relaxed mb-6">
              Noticias, lanzamientos, servicios, 
              curiosidades, consejos... En Correos no 
              queremos que te pierdas nada, así que 
              hemos pensado mucho lo que más puede 
              ayudarte en tu día a día para que nuestro 
              blog tenga una utilidad real. ¿Te apuntas 
              a leerlo?
            </p>
            
            <Button 
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 text-sm rounded-md flex items-center gap-1"
              data-testid="button-quiero-leerlo"
            >
              ¡QUIERO LEERLO!
              <ChevronRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}