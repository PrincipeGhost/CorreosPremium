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
      <main className="space-y-0">
        <InsuranceHero />
        <TrackingHero />
        
        {/* Agrupadas en grid para desktop */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-0">
          <EligeCorreos />
          <PremiumExpress />
        </div>
        
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
