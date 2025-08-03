import { Card, CardContent } from "@/components/ui/card";

export default function ProductsShowcase() {
  const products = [
    {
      id: "travel-packages",
      title: "Viaja y disfruta con nosotros",
      description:
        "En nuestra empresa te acompañamos en toda tu experiencia del Camino de Santiago para que puedas disfrutar al máximo. Descubre todo tipo de experiencias, viajes y regalos que tenemos para ti, además te llevamos a casa los productos que compres en nuestra web.",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      alt: "Travel and tourism services including Camino de Santiago",
    },
    {
      id: "store-services",
      title: "¿Quieres comprar en nuestras tiendas o enviar dinero?",
      description:
        "Tenemos todo tipo de productos que te ayudarán a realizar estas gestiones más fácilmente.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      alt: "Store and financial services including money transfers",
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
