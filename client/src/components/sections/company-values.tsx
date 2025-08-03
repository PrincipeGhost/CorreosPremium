import { Button } from "@/components/ui/button";

export default function CompanyValues() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            #EligeTuEmpresa
          </h2>
          <div className="text-xl text-gray-600 max-w-3xl mx-auto space-y-2">
            <p>
              <strong>De: profesionales comprometidos</strong>
            </p>
            <p>
              <strong>Para: clientes que buscan excelencia</strong>
            </p>
            <p className="mt-4">
              Todo servicio tiene un origen y un destino. Lo que nos diferencia
              es que somos profesionales comprometidos para servir a clientes
              que buscan la excelencia.
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
