import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function ServicesGrid() {
  const services = [
    {
      id: "gestion-aduanera",
      title: "Gestión Aduanera",
      description:
        "Infórmate sobre cómo realizar los trámites aduaneros que necesitas.",
      image:
        "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
      alt: "Customs and international shipping management",
    },
    {
      id: "tramites-dgt",
      title: "Trámites de la DGT",
      description:
        "Realiza tus trámites de la DGT online de forma fácil y sencilla o acércate a cualquiera de nuestras oficinas.",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
      alt: "DGT administrative procedures and vehicle documentation",
    },
    {
      id: "administracion-publica",
      title: "Trámites con la Administración Pública",
      description:
        "Haz tus trámites de forma rápida y segura.",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
      alt: "Public administration services and procedures",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Siempre pensando en ti
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className="overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={service.image}
                alt={service.alt}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center"
                  data-testid={`service-link-${service.id}`}
                >
                  MÁS INFO <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
