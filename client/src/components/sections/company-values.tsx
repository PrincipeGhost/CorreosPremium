import { Button } from "@/components/ui/button";

export default function CompanyValues() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            #EligeEnvíosPro
          </h2>
          <div className="text-xl text-gray-600 max-w-3xl mx-auto space-y-2">
            <p>
              <strong>De: todos y todas</strong>
            </p>
            <p>
              <strong>Para: todos y todas</strong>
            </p>
            <p className="mt-4">
              Todo envío tiene un "de" y un "para". Pero, ¿qué nos diferencia? 
              Que somos de todos y todas para servir a todos y todas.
            </p>
          </div>
          <Button
            className="mt-6 corporate-accent hover:bg-orange-600 text-white font-semibold"
            size="lg"
            data-testid="company-values-info-button"
          >
            MÁS INFORMACIÓN
          </Button>
        </div>
      </div>
    </section>
  );
}
