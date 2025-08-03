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
      <title>Tu Empresa - Servicios Profesionales</title>
      <meta
        name="description"
        content="Servicios profesionales de calidad. Consultoría, tecnología y formación para empresas que buscan la excelencia. Contáctanos hoy mismo."
      />
      <meta property="og:title" content="Tu Empresa - Servicios Profesionales" />
      <meta
        property="og:description"
        content="Servicios profesionales de calidad. Consultoría, tecnología y formación para empresas que buscan la excelencia."
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
