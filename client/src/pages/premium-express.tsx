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
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pb-20">
        {/* Sección Principal Paq Premium */}
        <section className="bg-gray-100 py-12 px-4 elliptical-bottom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-2" data-testid="title-paq-premium">
              Paq Premium
            </h1>
            <p className="text-gray-700 mb-6" data-testid="subtitle-paq-premium">
              Envío adaptado a ti, donde y cuando lo necesites.
            </p>
            
            {/* Línea divisoria */}
            <div className="border-b border-gray-300 mb-6"></div>
            
            {/* Características con checkmarks */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3" data-testid="feature-agil">
                <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">Ágil: </span>
                  <span className="text-gray-700">entrega urgente con todas las garantías.</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-3" data-testid="feature-cualquier-lugar">
                <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">Cualquier lugar: </span>
                  <span className="text-gray-700">entregas en domicilio, oficinas de Correos y Citypaq.</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-3" data-testid="feature-dinero-seguro">
                <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">Tu dinero está seguro con nosotros: </span>
                  <span className="text-gray-700">evita transacciones inseguras, correos se comunica contigo antes de realizar cualquier operación</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-3" data-testid="feature-abrir-paquete">
                <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-gray-700">Puedes abrir el paquete y probarlo con una garantía de 48 horas antes de firmar el folleto.</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-3" data-testid="feature-cerca-de-ti">
                <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">Cerca de ti: </span>
                  <span className="text-gray-700">para envíos nacionales, Andorra, Portugal, Italia y Francia.</span>
                </div>
              </div>
            </div>
            
            {/* Precio y botón */}
            <div className="text-center mt-8">
              <p className="text-base mb-1" style={{ color: '#000000' }} data-testid="text-desde">Desde</p>
              <p className="text-3xl font-bold text-gray-900 mb-6" data-testid="price-premium">14,88 €</p>
              <Button 
                className="w-32 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 text-base rounded-md"
                data-testid="button-enviar-main"
              >
                ENVIAR
              </Button>
            </div>
          </div>
        </section>

        {/* Servicios adicionales */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto">
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

        {/* Como enviar un Paq Premium, paso a paso */}
        <section className="bg-gray-100 py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6" data-testid="title-como-enviar">
              Como enviar un Paq Premium, paso a paso
            </h2>
            
            {/* Proceso paso a paso */}
            <div className="grid md:grid-cols-2 gap-8" data-testid="proceso-completo">
              {/* Video explicativo */}
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <iframe
                  className="w-full h-64 md:h-80"
                  src="https://www.youtube.com/embed/AOGTZhWWwNo"
                  title="Cómo enviar un Paq Premium - Video explicativo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  data-testid="video-tutorial"
                ></iframe>
              </div>
              
              {/* Pasos del proceso */}
              <div className="space-y-6">
                {/* Paso 1 */}
                <div className="flex items-start space-x-4" data-testid="step-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Describe tus envíos</h3>
                    <p className="text-gray-600 text-sm">Completa los datos del origen, destino y características de tu paquete</p>
                  </div>
                </div>
                
                {/* Paso 2 */}
                <div className="flex items-start space-x-4" data-testid="step-2">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Elige servicios adicionales</h3>
                    <p className="text-gray-600 text-sm">Selecciona PEE, seguros o reembolso según tus necesidades</p>
                  </div>
                </div>
                
                {/* Paso 3 */}
                <div className="flex items-start space-x-4" data-testid="step-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Confirma y paga</h3>
                    <p className="text-gray-600 text-sm">Revisa los datos y realiza el pago de forma segura</p>
                  </div>
                </div>
                
                {/* Paso 4 */}
                <div className="flex items-start space-x-4" data-testid="step-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Imprime etiqueta</h3>
                    <p className="text-gray-600 text-sm">Descarga e imprime la etiqueta para tu envío</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lo que necesitas saber para enviar un paquete */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6" data-testid="title-necesitas-saber">
              Lo que necesitas saber para enviar un paquete
            </h2>
            
            {/* Artículos prohibidos */}
            <div className="border-b border-gray-200 pb-6 mb-6" data-testid="info-articulos-prohibidos">
              <h3 className="font-semibold text-gray-900 mb-2">
                Artículos prohibidos y mercancías peligrosas
              </h3>
              <p className="text-gray-700 text-sm mb-3">
                ¿Vas a preparar tu próximo envío? Consulta aquí los artículos que no puedes enviar.
              </p>
              <Button 
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
                data-testid="button-mas-info-prohibidos"
              >
                MÁS INFO
              </Button>
            </div>
            
            {/* Guía de peso y medidas */}
            <div className="border-b border-gray-200 pb-6 mb-6" data-testid="info-peso-medidas">
              <h3 className="font-semibold text-gray-900 mb-2">
                Guía de peso y medidas
              </h3>
              <p className="text-gray-700 text-sm mb-3">
                Antes de realizar tu envío, revisa aquí que cumpla con las medidas y pesos adecuados.
              </p>
              <Button 
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
                data-testid="button-mas-info-peso"
              >
                MÁS INFO
              </Button>
            </div>
            
            {/* Consejos embalaje */}
            <div className="border-b border-gray-200 pb-6 mb-6" data-testid="info-embalaje">
              <h3 className="font-semibold text-gray-900 mb-2">
                Consejos para un buen embalaje
              </h3>
              <p className="text-gray-700 text-sm mb-3">
                ¿Tienes dudas sobre cómo preparar tu paquete para enviarlo? 
                Aquí te contamos todo para que consigas un embalaje perfecto.
              </p>
              <Button 
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
                data-testid="button-mas-info-embalaje"
              >
                MÁS INFO
              </Button>
            </div>
            
            {/* Coberturas y garantías */}
            <div className="pb-6" data-testid="info-coberturas">
              <h3 className="font-semibold text-gray-900 mb-2">
                Coberturas y garantías del envío
              </h3>
              <p className="text-gray-700 text-sm mb-3">
                Aquí podrás consultar las garantías y coberturas que incluye tu envío.
              </p>
              <Button 
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
                data-testid="button-mas-info-coberturas"
              >
                MÁS INFO
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Banner inferior fijo */}
      <div className="fixed bottom-0 left-0 right-0 bg-yellow-400 p-4 shadow-lg" data-testid="banner-bottom">
        <div className="flex justify-between items-center max-w-3xl mx-auto px-4">
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