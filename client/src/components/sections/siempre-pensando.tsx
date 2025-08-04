import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function SiemprePensando() {
  // Componentes SVG basados exactamente en las imágenes proporcionadas
  const GestionAduaneraIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {/* Fondo elíptico amarillo */}
      <ellipse cx="24" cy="36" rx="20" ry="8" fill="#FED500" opacity="0.7"/>
      <ellipse cx="24" cy="34" rx="18" ry="6" fill="#FEC800"/>
      
      {/* Barco izquierda */}
      <rect x="8" y="20" width="8" height="4" fill="#4A90E2" rx="1"/>
      <rect x="10" y="18" width="4" height="2" fill="#2B5CB8"/>
      <line x1="12" y1="18" x2="12" y2="14" stroke="#333" strokeWidth="1"/>
      <rect x="11" y="14" width="2" height="1" fill="#E5A100"/>
      
      {/* Avión centro-derecha */}
      <ellipse cx="32" cy="16" rx="8" ry="3" fill="#4A90E2"/>
      <circle cx="28" cy="16" r="1" fill="#fff"/>
      <path d="M36 15L40 13L40 19L36 17Z" fill="#2B5CB8"/>
      
      {/* Camión parte inferior */}
      <rect x="18" y="28" width="12" height="4" fill="#2B5CB8"/>
      <rect x="14" y="30" width="4" height="2" fill="#1E3A8A"/>
      <circle cx="20" cy="32" r="1" fill="#333"/>
      <circle cx="26" cy="32" r="1" fill="#333"/>
      
      {/* Líneas de conexión punteadas */}
      <path d="M16 22L28 16" stroke="#FEC800" strokeWidth="1" strokeDasharray="2,2" opacity="0.7"/>
      <path d="M32 20L22 28" stroke="#FEC800" strokeWidth="1" strokeDasharray="2,2" opacity="0.7"/>
    </svg>
  );

  const TramitesDgtIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {/* Fondo circular blanco */}
      <circle cx="24" cy="24" r="20" fill="white" stroke="#ddd" strokeWidth="1"/>
      
      {/* Logo DGT circular */}
      <circle cx="24" cy="24" r="16" fill="#4A90E2"/>
      
      {/* Texto DGT en el centro */}
      <text x="24" y="28" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="Arial">DGT</text>
      
      {/* Elementos decorativos (estrellas o puntos) */}
      <circle cx="16" cy="20" r="1.5" fill="#FED500"/>
      <circle cx="32" cy="20" r="1.5" fill="#FED500"/>
      <circle cx="20" cy="32" r="1.5" fill="#FED500"/>
      <circle cx="28" cy="32" r="1.5" fill="#FED500"/>
    </svg>
  );

  const TramitesAdminIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {/* Fondo circular */}
      <circle cx="24" cy="24" r="20" fill="white" stroke="#ddd" strokeWidth="1"/>
      
      {/* Edificio gubernamental */}
      <rect x="10" y="30" width="28" height="6" fill="#4A90E2"/>
      
      {/* Columnas */}
      <rect x="12" y="18" width="3" height="12" fill="#2B5CB8"/>
      <rect x="17" y="18" width="3" height="12" fill="#2B5CB8"/>
      <rect x="22" y="18" width="3" height="12" fill="#2B5CB8"/>
      <rect x="27" y="18" width="3" height="12" fill="#2B5CB8"/>
      <rect x="32" y="18" width="3" height="12" fill="#2B5CB8"/>
      
      {/* Techo triangular */}
      <polygon points="8,18 24,10 40,18" fill="#1E3A8A"/>
      
      {/* Puerta */}
      <rect x="21" y="24" width="6" height="6" fill="#E5A100"/>
      <circle cx="25" cy="27" r="0.5" fill="#333"/>
      
      {/* Elementos verdes en la base */}
      <circle cx="14" cy="36" r="2" fill="#4CAF50"/>
      <circle cx="34" cy="36" r="2" fill="#4CAF50"/>
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