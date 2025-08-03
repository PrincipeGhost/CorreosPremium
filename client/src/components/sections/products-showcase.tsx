import { Card, CardContent } from "@/components/ui/card";

export default function ProductsShowcase() {
  const products = [
    {
      id: "integral-solutions",
      title: "Soluciones empresariales integrales",
      description:
        "En nuestra empresa te acompañamos en toda tu experiencia de crecimiento empresarial para que puedas disfrutar al máximo. Descubre todo tipo de servicios, consultoría y soluciones que tenemos para ti.",
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      alt: "Professional team collaboration in modern workspace",
    },
    {
      id: "specialized-services",
      title: "¿Necesitas servicios especializados?",
      description:
        "Tenemos todo tipo de servicios especializados que te ayudarán a realizar tus proyectos más fácilmente y con mayor eficiencia.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      alt: "Modern office building representing professional business services",
    },
  ];

  return (
    <section className="corporate-light py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden shadow-lg">
              <img
                src={product.image}
                alt={product.alt}
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">{product.title}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
