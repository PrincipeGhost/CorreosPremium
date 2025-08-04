import { Card, CardContent } from "@/components/ui/card";

export default function EsperandoEnvio() {
  return (
    <section className="bg-gray-100 py-8">
      <div className="max-w-md mx-auto px-4">
        <Card className="bg-white border-0 rounded-lg shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              ¿Estás esperando un envío?
            </h2>
            
            <p className="text-sm text-gray-700 leading-relaxed">
              Aquí encontrarás todo lo que necesitas 
              saber sobre el envío que estás esperando.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}