import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import InsuranceHero from "@/components/sections/insurance-hero";
import TrackingHero from "@/components/sections/tracking-hero";
import EligeCorreos from "@/components/sections/elige-correos";
import PremiumExpress from "@/components/sections/premium-express";
import SiemprePensando from "@/components/sections/siempre-pensando";
import EsperandoEnvio from "@/components/sections/esperando-envio";
import QuieresHacerEnvio from "@/components/sections/quieres-hacer-envio";
import TiendaOnline from "@/components/sections/tienda-online";
import ViajaDisfruta from "@/components/sections/viaja-disfruta";
import ComprarTiendas from "@/components/sections/comprar-tiendas";
import BlogCorreos from "@/components/sections/blog-correos";
import Criptosello from "@/components/sections/criptosello";
import NuevaApp from "@/components/sections/nueva-app";

import QuickAccess from "@/components/sections/quick-access";
import ServiceCalculator from "@/components/sections/service-calculator";
import CompanyValues from "@/components/sections/company-values";
import ServicesGrid from "@/components/sections/services-grid";
import InfoSections from "@/components/sections/info-sections";
import OnlineResources from "@/components/sections/online-resources";
import ProductsShowcase from "@/components/sections/products-showcase";
import BlogSection from "@/components/sections/blog-section";
import AppPromotion from "@/components/sections/app-promotion";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <title>EnvíosPro - Envíos y Paquetería</title>
      <meta
        name="description"
        content="Servicios de paquetería y envíos de calidad para toda España. Seguimiento en tiempo real, gestión aduanera y trámites oficiales. Envía tus paquetes con nosotros."
      />
      <meta property="og:title" content="EnvíosPro - Envíos y Paquetería" />
      <meta
        property="og:description"
        content="Servicios de paquetería y envíos de calidad para toda España. Seguimiento en tiempo real y gestión aduanera."
      />
      <meta property="og:type" content="website" />
      
      <Header />
      <main style={{ display: 'block' }}>
        <div style={{ margin: 0, padding: 0 }}>
          <InsuranceHero />
        </div>
        <div style={{ margin: 0, padding: 0 }}>
          <TrackingHero />
        </div>
        
        {/* Sección con imagen a la derecha y contenido a la izquierda */}
        <section className="bg-white py-6 lg:py-0">
          <div className="max-w-md lg:max-w-none mx-auto lg:mx-0 px-6 lg:px-0 lg:grid lg:grid-cols-[60%_40%] lg:min-h-[600px]">
            {/* Columna izquierda - Secciones apiladas */}
            <div className="lg:flex lg:flex-col lg:justify-start lg:gap-0 space-y-6 lg:space-y-0 lg:pl-8 lg:pr-12 lg:pt-10">
              <div className="hidden lg:block lg:border-t-[2px] lg:border-gray-300 lg:-mx-12"></div>
              <EligeCorreos />
              <div className="lg:border-t lg:border-gray-300 lg:my-4"></div>
              <PremiumExpress />
            </div>
            
            {/* Columna derecha - Imagen pegada al borde */}
            <div className="hidden lg:block lg:relative lg:mt-10">
              <img 
                src="/attached_assets/Captura_1760880797169.PNG"
                alt="Trabajador de delivery con moto amarilla"
                className="w-full h-[480px] object-cover"
                data-testid="img-delivery-worker"
              />
            </div>
          </div>
        </section>
        
        <SiemprePensando />
        
        {/* Agrupadas en grid para desktop */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-0">
          <EsperandoEnvio />
          <QuieresHacerEnvio />
        </div>
        
        <TiendaOnline />
        <ViajaDisfruta />
        <ComprarTiendas />
        <BlogCorreos />
        <Criptosello />
        <NuevaApp />
      </main>
      <Footer />
    </div>
  );
}
