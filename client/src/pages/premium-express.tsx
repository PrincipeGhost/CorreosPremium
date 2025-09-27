import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Check, Plus, Info } from "lucide-react";

export default function PremiumExpressPage() {
  useEffect(() => {
    // Set page title
    document.title = "Paq Premium - Envíos Rápidos con Correos";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Paq Premium - Envío adaptado a ti, dónde y cuándo lo necesites. Ágil, flexible y cerca de ti desde 14,88€.');
    }
    
    // Set Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Paq Premium - Envíos Rápidos con Correos');
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Paq Premium - Envío adaptado a ti, dónde y cuándo lo necesites.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="pb-20">
        {/* Sección Principal Paq Premium */}
        <section className="bg-gray-100 py-8 px-4">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-2" data-testid="title-paq-premium">
              Paq Premium
            </h1>
            <p className="text-gray-700 mb-6" data-testid="subtitle-paq-premium">
              Envío adaptado a ti, dónde y cuándo lo necesites.
            </p>
            
            {/* Características con checkmarks */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3" data-testid="feature-agil">
                <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">Ágil:</span>
                  <span className="text-gray-700 ml-1">entrega urgente con todas las garantías.</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-3" data-testid="feature-cualquier-lugar">
                <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">Cualquier lugar:</span>
                  <span className="text-gray-700 ml-1">entregas en domicilio, oficinas de Correos y Citypaq.</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-3" data-testid="feature-flexible">
                <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">Flexible:</span>
                  <span className="text-gray-700 ml-1">envíos de hasta 30 kg con entrega entre 24 y 48 horas, dependiendo del origen y destino.</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-3" data-testid="feature-cerca-de-ti">
                <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">Cerca de ti:</span>
                  <span className="text-gray-700 ml-1">para envíos nacionales, Andorra y Portugal peninsular.</span>
                </div>
              </div>
            </div>
            
            {/* Precio y botón */}
            <div className="text-center mb-8">
              <div className="mb-4">
                <p className="text-gray-600 text-sm mb-1" data-testid="text-desde">Desde</p>
                <p className="text-4xl font-bold text-gray-900" data-testid="price-premium">14,88 €</p>
              </div>
              <Button 
                className="w-40 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-md"
                data-testid="button-enviar-main"
              >
                ENVIAR
              </Button>
            </div>
          </div>
        </section>

        {/* Servicios adicionales */}
        <section className="bg-white py-8 px-4">
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6" data-testid="title-servicios-adicionales">
              Servicios adicionales
            </h2>
            
            {/* PEE */}
            <div className="mb-6" data-testid="service-pee">
              <div className="flex items-start space-x-3 mb-3">
                <Plus className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Prueba de Entrega Electrónica (PEE)</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    Justificante digital de la entrega certificada.
                  </p>
                </div>
              </div>
              <div className="ml-8">
                <Button 
                  variant="outline"
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  data-testid="button-mas-info-pee"
                >
                  MÁS INFO
                </Button>
              </div>
            </div>
            
            {/* Entrega exclusiva */}
            <div className="mb-6" data-testid="service-entrega-exclusiva">
              <div className="flex items-start space-x-3">
                <Plus className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Entrega exclusiva al destinatario</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    El envío solo puede entregarse al destinatario, y siempre tras haber identificado su identidad. 
                    No se admite la entrega a entidades o empresas ni a terceras personas, pese a contar con autorización firmada. 
                    Existe la opción de incluir a dos destinatarios.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Reembolso */}
            <div className="mb-6" data-testid="service-reembolso">
              <div className="flex items-start space-x-3">
                <Plus className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Reembolso</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    Recibe el cobro de tus envíos de manera más segura, sencilla y fiable. 
                    Desde Correos te reembolsamos la cantidad abonada previamente por el destinatario y que aparece en el envío.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Seguros */}
            <div className="mb-6" data-testid="service-seguros">
              <div className="flex items-start space-x-3 mb-3">
                <Plus className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Seguros</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    Asegura todavía más los documentos o mercancías más importantes.
                  </p>
                </div>
              </div>
              <div className="ml-8">
                <Button 
                  variant="outline"
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  data-testid="button-mas-info-seguros"
                >
                  MÁS INFO
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Banner inferior fijo */}
      <div className="fixed bottom-0 left-0 right-0 bg-yellow-400 p-4 shadow-lg" data-testid="banner-bottom">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <div>
            <p className="font-bold text-black text-sm">Paq Premium</p>
            <p className="font-bold text-black text-sm">Desde 14,88 €</p>
          </div>
          <Button 
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-6 py-2"
            data-testid="button-enviar-banner"
          >
            ENVIAR
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}