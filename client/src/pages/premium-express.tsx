import { useEffect, useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Check, Plus, Info, ChevronLeft, ChevronRight, User, Users, CreditCard, FileText } from "lucide-react";
// Importaciones de imágenes - usando las rutas directas por compatibilidad
const step1Image = "/attached_assets/IMG_8294_1759057963621.PNG";
const step2Image = "/attached_assets/IMG_8295_1759057963621.PNG";
const step3Image = "/attached_assets/IMG_8296_1759057963621.PNG";
const step4Image = "/attached_assets/IMG_8297_1759057985910.PNG";

export default function PremiumExpressPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      number: 1,
      title: "Describe tus envíos",
      description: "Completa los datos del origen, destino y características de tu paquete",
      image: step1Image
    },
    {
      number: 2,
      title: "Registra el conjunto de destinatarios",
      description: "a los que quieres enviar los paquetes e indica si deseas incluir algún servicio añadido.",
      image: step2Image
    },
    {
      number: 3,
      title: "Realiza el pago",
      description: "con tarjeta bancaria, PayPal, a través de una de nuestras oficinas, mediante un contrato con Correos o enviando el paquete en un sobre prepagado.",
      image: step3Image
    },
    {
      number: 4,
      title: "Imprime las etiquetas",
      description: "que identifican los paquetes antes de gestionar su recogida o de llevarlos a una de nuestras oficinas.",
      image: step4Image
    }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

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
                <Plus className="w-8 h-8 text-blue-950 mt-0.5 flex-shrink-0" strokeWidth={7} strokeLinecap="square" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Prueba de Entrega Electrónica (PEE)</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    Justificante digital de la entrega certificada.
                  </p>
                </div>
              </div>
              <div className="ml-11">
                <a 
                  href="#"
                  className="text-blue-950 hover:text-blue-800 font-semibold text-sm flex items-center space-x-1"
                  data-testid="button-mas-info-pee"
                >
                  <span>MÁS INFO</span>
                  <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </div>
            
            {/* Entrega exclusiva */}
            <div className="mb-6" data-testid="service-entrega-exclusiva">
              <div className="flex items-start space-x-3">
                <Plus className="w-8 h-8 text-blue-950 mt-0.5 flex-shrink-0" strokeWidth={7} strokeLinecap="square" />
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
                <Plus className="w-8 h-8 text-blue-950 mt-0.5 flex-shrink-0" strokeWidth={7} strokeLinecap="square" />
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
                <Plus className="w-8 h-8 text-blue-950 mt-0.5 flex-shrink-0" strokeWidth={7} strokeLinecap="square" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Seguros</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    Asegura todavía más los documentos o mercancías más importantes.
                  </p>
                </div>
              </div>
              <div className="ml-11">
                <a 
                  href="#"
                  className="text-blue-950 hover:text-blue-800 font-semibold text-sm flex items-center space-x-1"
                  data-testid="button-mas-info-seguros"
                >
                  <span>MÁS INFO</span>
                  <ChevronRight className="w-3 h-3" />
                </a>
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
            
            {/* Video explicativo */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-8">
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
          </div>
        </section>

        {/* Carrusel de pasos - Fondo amarillo completo */}
        <section className="bg-yellow-400 py-12 relative overflow-hidden" data-testid="steps-carousel">
          {/* Botón anterior */}
          <button
            onClick={prevStep}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-10"
            data-testid="button-prev-step"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/* Botón siguiente */}
          <button
            onClick={nextStep}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-10"
            data-testid="button-next-step"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Contenido del paso actual */}
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mx-12">
              {/* Ilustración sin fondo */}
              <div className="mx-auto mb-6 flex items-center justify-center">
                <img 
                  src={steps[currentStep].image} 
                  alt={steps[currentStep].title}
                  className="w-64 h-48 object-contain"
                />
              </div>

              {/* Número del paso */}
              <div className="text-4xl font-bold text-black mb-4" data-testid={`step-number-${steps[currentStep].number}`}>
                {steps[currentStep].number}
              </div>

              {/* Título */}
              <h3 className="text-xl font-bold text-black mb-4 leading-tight" data-testid={`step-title-${steps[currentStep].number}`}>
                {steps[currentStep].title}
              </h3>

              {/* Descripción */}
              <p className="text-black text-base leading-relaxed max-w-md mx-auto" data-testid={`step-description-${steps[currentStep].number}`}>
                {steps[currentStep].description}
              </p>
            </div>

            {/* Indicadores de puntos */}
            <div className="flex justify-center mt-8 space-x-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentStep ? 'bg-black' : 'bg-black bg-opacity-30'
                  }`}
                  data-testid={`dot-indicator-${index + 1}`}
                />
              ))}
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