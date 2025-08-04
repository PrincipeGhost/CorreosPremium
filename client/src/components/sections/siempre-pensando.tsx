import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function SiemprePensando() {
  // Iconos SVG personalizados basados en las imágenes proporcionadas
  const GestionAduaneraIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="24" cy="36" rx="20" ry="8" fill="#FED500"/>
      <path d="M8 20C8 18 10 16 20 16C30 16 32 18 32 20L30 28C30 30 28 32 20 32C12 32 10 30 10 28L8 20Z" fill="#FECB00" stroke="#E5A100" strokeWidth="1"/>
      <path d="M28 12C28 10 30 8 38 8C42 8 44 10 44 12L42 16C42 18 40 20 38 20C30 20 28 18 28 12Z" fill="#4A90E2" stroke="#2B5CB8" strokeWidth="1"/>
      <rect x="14" y="18" width="8" height="1" fill="#E5A100"/>
      <circle cx="38" cy="14" r="1" fill="#fff"/>
      <path d="M12 26L16 24L20 26L24 24L28 26" stroke="#E5A100" strokeWidth="1" fill="none"/>
    </svg>
  );

  const TramitesDgtIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" fill="#fff" stroke="#4A90E2" strokeWidth="2"/>
      <circle cx="24" cy="24" r="16" fill="#4A90E2"/>
      <text x="24" y="20" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">DGT</text>
      <circle cx="16" cy="28" r="2" fill="#FED500"/>
      <circle cx="24" cy="30" r="2" fill="#FED500"/>
      <circle cx="32" cy="28" r="2" fill="#FED500"/>
    </svg>
  );

  const TramitesAdminIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="32" width="32" height="8" fill="#4A90E2"/>
      <rect x="12" y="16" width="4" height="16" fill="#2B5CB8"/>
      <rect x="18" y="16" width="4" height="16" fill="#2B5CB8"/>
      <rect x="24" y="16" width="4" height="16" fill="#2B5CB8"/>
      <rect x="30" y="16" width="4" height="16" fill="#2B5CB8"/>
      <polygon points="10,16 24,8 38,16" fill="#1E3A8A"/>
      <circle cx="24" cy="36" r="2" fill="#FED500"/>
      <rect x="22" y="20" width="4" height="6" fill="#E5A100"/>
    </svg>
  );

  const services = [
    {
      id: "gestion-aduanera",
      icon: GestionAduaneraIcon,
      title: "Gestión Aduanera",
      description: "Infórmate sobre cómo realizar los trámites aduaneros que necesitas.",
      color: "bg-white",
      iconColor: ""
    },
    {
      id: "tramites-dgt",
      icon: TramitesDgtIcon,
      title: "Trámites de la DGT",
      description: "Realiza tus trámites de la DGT online de forma fácil y sencilla o acércate a",
      color: "bg-white", 
      iconColor: ""
    },
    {
      id: "tramites-administracion",
      icon: TramitesAdminIcon,
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
            const IconComponent = service.icon;
            return (
              <Card key={service.id} className="border border-gray-200 rounded-lg">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <IconComponent />
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