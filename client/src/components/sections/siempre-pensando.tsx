import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function SiemprePensando() {
  const services = [
    {
      id: "gestion-aduanera",
      iconUrl: "/gestion-aduanera.png",
      title: "Gestión Aduanera",
      description: "Infórmate sobre cómo realizar los trámites aduaneros que necesitas.",
      color: "bg-white",
      iconColor: ""
    },
    {
      id: "tramites-dgt",
      iconUrl: "/tramites-dgt.png",
      title: "Trámites de la DGT",
      description: "Realiza tus trámites de la DGT online de forma fácil y sencilla o acércate a",
      color: "bg-white", 
      iconColor: ""
    },
    {
      id: "tramites-administracion",
      iconUrl: "/tramites-admin.png",
      title: "Trámites con la Administración Pública",
      description: "Haz tus trámites de forma rápida y",
      color: "bg-white",
      iconColor: ""
    }
  ];

  return (
    <section className="bg-white py-6">
      <div className="max-w-md mx-auto px-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Siempre pensando en ti
        </h2>
        
        <div className="space-y-4">
          {services.map((service) => {
            return (
              <Card key={service.id} className="border border-gray-200 rounded-lg">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 ${service.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <img 
                        src={service.iconUrl} 
                        alt={`${service.title} icon`}
                        className="w-16 h-16 object-contain"
                        onError={(e) => {
                          // Fallback si la imagen no carga
                          console.log('Error loading image:', service.iconUrl);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                        {service.description}
                      </p>
                      
                      <Button 
                        variant="ghost" 
                        className="text-blue-600 hover:text-blue-700 font-semibold p-0 h-auto text-sm flex items-center gap-1"
                        data-testid={`button-mas-info-${service.id}`}
                      >
                        MÁS INFO
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}