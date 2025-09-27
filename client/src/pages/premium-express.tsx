import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PremiumExpress from "@/components/sections/premium-express";

export default function PremiumExpressPage() {
  useEffect(() => {
    // Set page title
    document.title = "Premium Express - Envíos Seguros y Rápidos";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Premium Express de Correos - Envíos seguros, rápidos y garantizados en toda España. Gestiona documentos importantes y ventas online de forma segura.');
    }
    
    // Set Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Premium Express - Envíos Seguros y Rápidos');
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Premium Express de Correos - Envíos seguros, rápidos y garantizados en toda España.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      
      <Header />
      <main>
        <PremiumExpress />
        {/* Aquí agregaremos contenido específico de Premium Express */}
        <section className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Premium Express
              </h1>
              <p className="text-lg text-gray-600">
                El servicio más avanzado para tus envíos más importantes
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Garantía Total
                </h3>
                <p className="text-gray-700">
                  Todos nuestros envíos Premium Express incluyen garantía completa 
                  y seguimiento en tiempo real desde el origen hasta el destino.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Entrega Rápida
                </h3>
                <p className="text-gray-700">
                  Comprometidos con la velocidad sin comprometer la seguridad. 
                  Entrega garantizada en 24-48 horas en toda España.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Documentos Importantes
                </h3>
                <p className="text-gray-700">
                  Ideal para contratos, documentos legales y papelería oficial 
                  que requiere máxima seguridad y trazabilidad.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Ventas Online
                </h3>
                <p className="text-gray-700">
                  Perfecto para e-commerce y tiendas online que buscan ofrecer 
                  el mejor servicio de entrega a sus clientes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}