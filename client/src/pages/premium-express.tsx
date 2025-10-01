import { useEffect, useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Check, Plus, Info, ChevronLeft, ChevronRight, User, Users, CreditCard, FileText, Package, Scale, Shield, AlertTriangle } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
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
      description: "",
      image: step1Image
    },
    {
      number: 2,
      title: "",
      description: "Registra el conjunto de destinatarios a los que quieres enviar los paquetes e indica si deseas incluir algún servicio añadido.",
      image: step2Image
    },
    {
      number: 3,
      title: "Realiza el pago",
      description: "con transferencia Bancaria o Sepa, PayPal, a través de una de nuestras oficinas, mediante un contrato con Correos o enviando el paquete en un sobre prepagado.",
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
            <div className="mt-8 ml-8 w-40 text-center">
              <p className="text-base mb-1 font-bold" style={{ color: '#000000' }} data-testid="text-desde">Desde</p>
              <p className="text-3xl font-bold text-gray-900 mb-6" data-testid="price-premium">14,88 €</p>
              <Button 
                className="w-24 bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-bold py-3 text-base rounded-md mx-auto"
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
        <section className="bg-gray-100 pt-12 pb-4 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6" data-testid="title-como-enviar">
              Como enviar un Paq Premium, paso a paso
            </h2>
            
            {/* Video explicativo */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-4">
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
        <section className="bg-yellow-400 pt-2 pb-6" data-testid="steps-carousel">
          <div className="max-w-3xl mx-auto grid grid-cols-[auto_1fr_auto] items-start gap-2 px-4 h-[500px] md:h-[520px] lg:h-[560px]">
            {/* Botón anterior */}
            <button
              onClick={prevStep}
              className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow mt-[75px] md:mt-[125px] lg:mt-[155px] ${currentStep === 0 ? 'invisible' : ''}`}
              data-testid="button-prev-step"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            {/* Contenido del paso actual */}
            <div className="text-center">
              {/* Ilustración sin fondo */}
              <div className="mx-auto mb-0 mt-2 md:mt-0 flex items-center justify-center overflow-hidden w-[360px] h-[145px] md:w-[620px] md:h-[245px] lg:w-[750px] lg:h-[300px]">
                <img 
                  src={steps[currentStep].image} 
                  alt={steps[currentStep].title}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Número del paso */}
              <div className="text-xl font-bold text-black mb-0 mt-2" data-testid={`step-number-${steps[currentStep].number}`}>
                {steps[currentStep].number}
              </div>

              {/* Título */}
              {steps[currentStep].title && (
                <h3 className="text-xl font-bold text-black mb-0 leading-tight" data-testid={`step-title-${steps[currentStep].number}`}>
                  {steps[currentStep].title}
                </h3>
              )}

              {/* Descripción */}
              <p className="text-black text-base leading-relaxed max-w-lg mx-auto" data-testid={`step-description-${steps[currentStep].number}`}>
                {steps[currentStep].number === 2 ? (
                  <>
                    <span className="font-bold">Registra el conjunto de destinatarios</span> a los que quieres enviar los paquetes e indica si deseas incluir algún servicio añadido.
                  </>
                ) : (
                  steps[currentStep].description
                )}
              </p>

              {/* Indicadores de puntos */}
              <div className="flex justify-center mt-2 space-x-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`rounded-full transition-all ${
                      index === currentStep 
                        ? 'w-8 h-3 bg-blue-950' 
                        : 'w-3 h-3 bg-gray-600'
                    }`}
                    data-testid={`dot-indicator-${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Botón siguiente */}
            <button
              onClick={nextStep}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow mt-[75px] md:mt-[125px] lg:mt-[155px]"
              data-testid="button-next-step"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </section>

        {/* Información del producto */}
        <section className="bg-white py-12">
          <div className="w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6 px-4" data-testid="title-informacion-producto">
              Información del producto
            </h2>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="descripcion" className="border border-blue-950">
                <AccordionTrigger className="px-4 text-blue-900 hover:no-underline" data-testid="accordion-descripcion">
                  Descripción
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-700">
                  <div className="space-y-4">
                    <p>Sabemos que necesitas entregas urgentes y eficientes, por eso el Paq Premium es la opción perfecta para la distribución de tus envíos:</p>
                    
                    <div>
                      <p><strong>A medida:</strong> adaptado a tus necesidades, aseguramos la entrega cuándo y dónde necesite.</p>
                    </div>
                    
                    <div>
                      <p><strong>Con garantías:</strong> dos intentos de entrega en domicilio bajo firma y en plazo garantizado. También disponible entrega en oficinas de Correos o Citypaq. Si no puede realizarse, dejaremos un aviso en el buzón con la oficina indicada para recogerlo durante 15 días. Si no cumplimos los plazos, te devolvemos la tarifa abonada.</p>
                    </div>
                    
                    <div>
                      <p><strong>Incluye Modify:</strong> modifica fácilmente la entrega de tu envío desde un ordenador o móvil para ajustarla a tus necesidades en tiempo real. Además, elige si el destinatario también puede hacer cambios y qué modificaciones puede realizar. Esta opción está disponible para todos los envíos de paquetería nacional con entrega domiciliaria.</p>
                    </div>
                    
                    <div>
                      <p><strong>Por tu tranquilidad:</strong> incluye aviso de llegada vía APP de Correos, email y/o SMS a los destinatarios.</p>
                    </div>
                    
                    <div>
                      <p><strong>Cerca de ti:</strong> para envíos nacionales, Andorra y Portugal (peninsular).</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="detalles-envio" className="border border-blue-950">
                <AccordionTrigger className="px-4 text-blue-900 hover:no-underline" data-testid="accordion-detalles-envio">
                  Detalles de envío
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-700">
                  <div className="space-y-4">
                    <p>Tú eliges el embalaje perfecto. ¡Puedes comprar un montón de productos disponibles en nuestra Tienda Online y en todas las oficinas de Correos!</p>
                    
                    <p>Eso sí, necesitamos que el tamaño se ajuste a estas medidas:</p>
                    
                    <div>
                      <p><strong>Como máximo:</strong></p>
                      <ul className="ml-4 space-y-2 mt-2">
                        <li>• <strong>Caja:</strong> Largo + Alto + Ancho = 240 cm, sin que ninguna supere los 120 cm.</li>
                        <li>• <strong>Rollo o tubo:</strong> el largo no puede superar los 120 cm y el diámetro 30 cm.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p>Si quieres enviar algo más grande, no te preocupes, añade un Máximo Extra por un poco más de coste:</p>
                      <ul className="ml-4 space-y-2 mt-2">
                        <li>• Largo + Alto + Ancho = 300 cm por un 35% más.</li>
                        <li>• Ninguna de las medidas puede superar los 240 cm por un 35% más.</li>
                        <li>• O añade las dos dimensiones extra por un 70% más.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p><strong>Como mínimo:</strong></p>
                      <ul className="ml-4 space-y-2 mt-2">
                        <li>• <strong>Caja:</strong> 10 x 14,5 cm.</li>
                        <li>• <strong>Rollo o tubo:</strong> las dimensiones que permitan adherir una etiqueta de 10 x 14,5 cm.</li>
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-900">¡Y que no supere los 2 kg!</p>
                      <p className="font-semibold text-gray-900">¡Y que no supere los 30 kg de peso real!</p>
                    </div>
                    
                    <div>
                      <p>El peso volumétrico ya lo calculamos nosotros.</p>
                    </div>
                    
                    <div>
                      <p>Ya solo queda que nos digas dónde quieres que lo llevemos:</p>
                      
                      <div className="ml-4 space-y-3 mt-3">
                        <div>
                          <p><strong>Domicilio:</strong> dos intentos de entrega bajo firma. Si no puede realizarse, estará disponible durante 15 días en la oficina más cercana.</p>
                        </div>
                        
                        <div>
                          <p><strong>Oficina elegida:</strong> envío a la oficina que elijas y que debe tener punto de entrega de paquetería, donde estará disponible durante 15 días. Avisamos al destinatario de su llegada mediante la APP de Correos, email y/o SMS y enviamos varios recordatorios en caso de no producirse la recogida.</p>
                        </div>
                        
                        <div>
                          <p><strong>Citypaq:</strong> entrega en una de las taquillas inteligentes de Correos situadas por toda la ciudad y disponibles a cualquier hora del día (consultar horarios en web y APP).</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm">Es importante que tus datos y los del destinatario estén en un lugar visible sobre el embalaje.</p>
                    </div>
                    
                    <div>
                      <p className="font-medium">Y recuerda que puedes generar la etiqueta y pagar el envío para agilizar el trámite</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="garantias-plazos" className="border border-blue-950">
                <AccordionTrigger className="px-4 text-blue-900 hover:no-underline" data-testid="accordion-garantias-plazos">
                  Garantías y plazos de entrega
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-700">
                  <div className="space-y-4">
                    <p>Si tu envío sufre alguna incidencia al llegar a su destino, desde Correos te indemnizamos. Si prefieres que la compensación sea cobrada por el destinatario, deberás presentarnos una autorización firmada.</p>
                    
                    <p>Sabemos que confías en nosotros y esta es nuestra manera de agradecértelo:</p>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Garantías Nacionales:</h4>
                      
                      <div className="mb-4">
                        <p className="font-medium mb-2">Por demora:</p>
                        <ul className="ml-4 space-y-2">
                          <li>• <strong>Plazos para que la reclamación pueda dar lugar a indemnización:</strong> mínimo 3 días y máximo 21 días, desde la fecha de entrega del envío.</li>
                          <li>• <strong>Indemnización:</strong> se devuelve la tarifa abonada.</li>
                          <li>• <strong>Condiciones:</strong> los plazos de entrega solo se cumplirán si la admisión se ha realizado antes de las 16:00. En caso de no ser así, el plazo podrá incrementarse en 1 día.</li>
                        </ul>
                        <p className="ml-4 mt-2 text-sm">En los envíos con destino u origen a Andorra, Canarias, Ceuta y Melilla, no se contabilizará el tiempo destinado a la tramitación aduanera.</p>
                      </div>

                      <div className="mb-4">
                        <p className="font-medium mb-2">Por deterioro:</p>
                        <ul className="ml-4 space-y-2">
                          <li>• <strong>Plazos para que la reclamación pueda dar lugar a indemnización:</strong> se deberá poner de manifiesto en el momento de la entrega o dentro de los siguientes 7 días naturales a la entrega.</li>
                          <li>• <strong>Indemnización:</strong> 6,67€ por kg facturado (6,43€ por kg facturado para envíos admitidos en 2022).</li>
                          <li>• La indemnización mínima es de 40€ solo para el Paq Premium y clientes sin contrato. Es decir, si el cálculo de la suma de la indemnización (según la formula anterior) más la tarifa es inferior a 40€, la indemnización ascenderá a 40€.</li>
                          <li>• <strong>Condiciones:</strong> para este tipo de incidencias se realizará un peritaje con el fin de determinar el importe a pagar por el deterioro sufrido.</li>
                          <li>• <strong>Documentos a aportar:</strong> podemos solicitarte fotos del embalaje y el contenido deteriorado para comprobar el daño y si el embalaje es adecuado para garantizar la integridad del mismo. Durante la admisión, nuestro personal puede asesorarte sobre cómo preparar tu envío y ofrecerte el embalaje más adecuado.</li>
                        </ul>
                        <p className="ml-4 mt-2 text-sm">En caso de reclamación de un envío deteriorado o con falta de contenido que cuente con Seguro o Valor Declarado, podremos solicitar un documento justificativo del valor de la mercancía, factura de reparación o de reposición.</p>
                        <p className="ml-4 mt-1 text-sm">Los clientes con contrato recibirán las indemnizaciones según las condiciones fijadas en el mismo.</p>
                      </div>

                      <div className="mb-4">
                        <p className="font-medium mb-2">Por extravío:</p>
                        <ul className="ml-4 space-y-2">
                          <li>• <strong>Plazos para que la reclamación pueda dar lugar a indemnización:</strong> mínimo 3 días y máximo 1 año, desde la fecha de admisión del envío.</li>
                          <li>• <strong>Indemnización:</strong> 6,67€ por kg facturado (6,43€ por kg facturado para envíos admitidos en 2022) más la devolución de la tarifa.</li>
                          <li>• La indemnización mínima es de 40€ sólo para el Paq Premium y clientes sin contrato.</li>
                          <li>• Si el envío lleva Valor Declarado o Seguro a todo riesgo, cuya cobertura máxima son 6.000€, la indemnización consistirá en la devolución de la tarifa más el Valor Declarado o Seguro.</li>
                          <li>• Los envíos regulados por la LCTTM (Ley de Contratación de Transporte Terrestre de Mercancías) llevan seguro asociado por lo que, en caso de siniestro, se abonará la menor de las siguientes cantidades: Por el valor declarado. Por reposición del objeto extraviado. Por reparación del objeto dañado.</li>
                          <li>• <strong>Documentos a aportar:</strong> en caso de reclamación de un envío extraviado, deteriorado o con falta de contenido que cuente con Seguro o Valor Declarado, podremos solicitar un documento justificativo del valor de la mercancía, factura de reparación o de reposición.</li>
                        </ul>
                        <p className="ml-4 mt-2 text-sm">Los clientes con contrato recibirán las indemnizaciones según las condiciones fijadas en el mismo.</p>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-medium mb-2">Eso y entregar tu envío lo más rápido que podamos.</p>
                      <p className="mb-3">Localiza tu oficina de Correos más cercana y tráenos tu envío, lo llevamos en 1 - 2 días dependiendo del origen y destino.</p>
                      
                      <div className="mb-3">
                        <p className="font-medium mb-2">Elige la franja horaria en la que quieres que entreguemos tu paquete:</p>
                        <ul className="ml-4 space-y-1">
                          <li>• De 9:00 a 12:00</li>
                          <li>• De 12:00 a 15:00</li>
                          <li>• De 15:00 a 18:00</li>
                          <li>• De 18:00 a 21:00</li>
                        </ul>
                        <p className="text-sm mt-2">(No olvides que esta opción solo está disponible en capitales de provincia y poblaciones que disponen de turno de reparto de tarde).</p>
                      </div>
                      
                      <div>
                        <p className="font-medium">Para que esté entregado el día que lo necesites.</p>
                        <p className="text-sm mt-1">Tú pones la fecha en nuestro calendario y guardamos el envío hasta que llegue el momento de llevarlo a su destino.</p>
                      </div>
                    </div>
                    
                    <div className="text-center mt-4">
                      <a 
                        href="#" 
                        className="text-blue-900 hover:text-blue-700 underline font-medium"
                        data-testid="link-condiciones-paqueteria"
                      >
                        Condiciones de los servicios paquetería Nacional
                      </a>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="precio" className="border border-blue-950">
                <AccordionTrigger className="px-4 text-blue-900 hover:no-underline" data-testid="accordion-precio">
                  Precio
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-700">
                  <p>Consulta tu tarifa aquí o en las oficinas de Correos</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Lo que necesitas saber para enviar un paquete */}
        <section className="bg-gray-100 py-12 px-4">
          <div className="max-w-[350px] ml-[calc(50%-168px)]">
            <h2 className="text-xl font-bold text-gray-900 mb-8" data-testid="title-necesitas-saber">
              Lo que necesitas saber para enviar un paquete
            </h2>
            
            <div className="space-y-6">
              {/* Artículos prohibidos */}
              <div className="bg-white rounded-lg shadow-md p-6" data-testid="info-articulos-prohibidos">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-lg flex items-center justify-center">
                      <img 
                        src="/attached_assets/IMG_8316_1759149029028.png" 
                        alt="Artículos prohibidos"
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Artículos prohibidos y mercancías peligrosas
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      ¿Vas a preparar tu próximo envío?
                    </p>
                    <Button 
                      className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-6 py-2 rounded-lg"
                      data-testid="button-mas-info-prohibidos"
                    >
                      MÁS INFO
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Guía de peso y medidas */}
              <div className="bg-white rounded-lg shadow-md p-6" data-testid="info-peso-medidas">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-lg flex items-center justify-center">
                      <img 
                        src="/attached_assets/IMG_8317_1759149029029.png" 
                        alt="Guía de peso y medidas"
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Guía de peso y medidas
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Antes de realizar tu envío, revisa aquí que cumpla con las medidas y pesos
                    </p>
                    <Button 
                      className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-6 py-2 rounded-lg"
                      data-testid="button-mas-info-peso"
                    >
                      MÁS INFO
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Consejos embalaje */}
              <div className="bg-white rounded-lg shadow-md p-6" data-testid="info-embalaje">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-lg flex items-center justify-center">
                      <img 
                        src="/attached_assets/IMG_8318_1759149029029.png" 
                        alt="Consejos para embalaje"
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Consejos para un buen embalaje
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      ¿Tienes dudas sobre cómo preparar tu
                    </p>
                    <Button 
                      className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-6 py-2 rounded-lg"
                      data-testid="button-mas-info-embalaje"
                    >
                      MÁS INFO
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Coberturas y garantías */}
              <div className="bg-white rounded-lg shadow-md p-6" data-testid="info-coberturas">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-lg flex items-center justify-center">
                      <img 
                        src="/attached_assets/IMG_8320_1759149029029.png" 
                        alt="Coberturas y garantías"
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Coberturas y garantías del envío
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Aquí podrás consultar las garantías y coberturas que incluye tu envío.
                    </p>
                    <Button 
                      className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-6 py-2 rounded-lg"
                      data-testid="button-mas-info-coberturas"
                    >
                      MÁS INFO
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Banner inferior fijo */}
      <div className="fixed bottom-0 left-0 right-0 bg-yellow-400 p-4 shadow-lg" data-testid="banner-bottom">
        <div className="flex justify-between items-center max-w-full pl-1 pr-1">
          <div>
            <p className="font-bold text-blue-900 text-sm">Paq Premium</p>
            <p className="text-blue-900 text-sm">
              <span className="font-normal">Desde </span>
              <span className="font-bold">14,88 €</span>
            </p>
          </div>
          <Button 
            className="bg-blue-950 hover:bg-blue-900 text-white font-bold px-6 py-5"
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