import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function ServicesGrid() {
  const services = [
    {
      id: "consultoria",
      title: "Consultoría Estratégica",
      description:
        "Desarrollamos estrategias personalizadas para impulsar el crecimiento de tu negocio.",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
      alt: "Professional business consultancy meeting",
    },
    {
      id: "tecnologia",
      title: "Soluciones Tecnológicas",
      description:
        "Implementamos tecnología de vanguardia para optimizar tus procesos empresariales.",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
      alt: "Modern office with technology solutions",
    },
    {
      id: "formacion",
      title: "Formación Profesional",
      description:
        "Programas de capacitación diseñados para potenciar las habilidades de tu equipo.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
      alt: "Professional training and development session",
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
