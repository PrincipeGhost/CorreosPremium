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
    <section className="bg-white py-6 lg:py-12">
      <div className="max-w-md lg:max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6 lg:mb-8">
          Siempre pensando en ti
        </h2>
        
        <div className="space-y-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
          {services.map((service) => {
            return (
              <Card key={service.id} className="border border-gray-200 rounded-lg h-full">
                <CardContent className="p-4 lg:p-6 h-full flex flex-col">
                  <div className="flex lg:flex-col items-start gap-4">
                    <div className={`w-16 h-16 lg:w-20 lg:h-20 ${service.color} rounded-lg flex items-center justify-center flex-shrink-0 lg:mb-4`}>
                      <img 
                        src={service.iconUrl} 
                        alt={`${service.title} icon`}
                        className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
                        onError={(e) => {
                          console.log('Error loading image:', service.iconUrl);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col">
                      <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm lg:text-base text-gray-600 mb-3 leading-relaxed flex-1">
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