import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
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
      <main>
        <Hero />
        <QuickAccess />
        <ServiceCalculator />
        <CompanyValues />
        <ServicesGrid />
        <InfoSections />
        <OnlineResources />
        <ProductsShowcase />
        <BlogSection />
        <AppPromotion />
      </main>
      <Footer />
    </div>
  );
}
