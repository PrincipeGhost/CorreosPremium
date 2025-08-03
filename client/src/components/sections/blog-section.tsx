import { Button } from "@/components/ui/button";

export default function BlogSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Descubre Actualidad, el Blog de EnvíosPro
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Noticias, lanzamientos, servicios, curiosidades, consejos... En EnvíosPro 
            no queremos que te pierdas nada, así que hemos pensado mucho lo que más puede 
            ayudarte en tu día a día para que nuestro blog tenga una utilidad real. ¿Te apuntas a leerlo?
          </p>
          <Button
            className="corporate-accent hover:bg-orange-600 text-white font-semibold"
            size="lg"
            data-testid="blog-read-button"
          >
            ¡QUIERO LEERLO!
          </Button>
        </div>
      </div>
    </section>
  );
}
