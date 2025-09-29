import { useState } from "react";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, ChevronDown, Headphones } from "lucide-react";

export default function Footer() {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Links - Mobile accordions, Desktop grid */}
        <div className="lg:hidden">
          {/* Mobile Collapsible Sections */}
          <div className="border-b border-gray-200">
            <button 
              onClick={() => toggleSection('para-ti')}
              className="w-full flex items-center justify-between py-4 text-left text-gray-700 hover:text-gray-900"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              <span className="text-base font-medium">Para ti</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openSections.includes('para-ti') ? 'rotate-180' : ''}`} />
            </button>
            {openSections.includes('para-ti') && (
              <div className="pb-4 space-y-2">
                <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">Envíos</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">Oficinas</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">Seguimiento</a>
              </div>
            )}
          </div>

          <div className="border-b border-gray-200">
            <button 
              onClick={() => toggleSection('para-empresa')}
              className="w-full flex items-center justify-between py-4 text-left text-gray-700 hover:text-gray-900"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              <span className="text-base font-medium">Para tu empresa</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openSections.includes('para-empresa') ? 'rotate-180' : ''}`} />
            </button>
            {openSections.includes('para-empresa') && (
              <div className="pb-4 space-y-2">
                <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">Soluciones empresariales</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">Logística</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">E-commerce</a>
              </div>
            )}
          </div>

          <div className="border-b border-gray-200">
            <button 
              onClick={() => toggleSection('para-interes')}
              className="w-full flex items-center justify-between py-4 text-left text-gray-700 hover:text-gray-900"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              <span className="text-base font-medium">Para tu interés</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openSections.includes('para-interes') ? 'rotate-180' : ''}`} />
            </button>
            {openSections.includes('para-interes') && (
              <div className="pb-4 space-y-2">
                <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">Filatelia</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">Cultura</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">Sostenibilidad</a>
              </div>
            )}
          </div>

          <div className="border-b border-gray-200">
            <button 
              onClick={() => toggleSection('atencion')}
              className="w-full flex items-center justify-between py-4 text-left text-gray-700 hover:text-gray-900"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              <span className="text-base font-medium">
                <Headphones className="w-4 h-4 inline mr-2" />
                Atención al cliente
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openSections.includes('atencion') ? 'rotate-180' : ''}`} />
            </button>
            {openSections.includes('atencion') && (
              <div className="pb-4 space-y-2">
                <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">Atención al cliente</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">Contacto</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">Quejas y sugerencias</a>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8 lg:py-8 lg:border-b lg:border-gray-200">
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Para ti</h3>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">Envíos</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">Oficinas</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">Seguimiento</a>
            </div>
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Para tu empresa</h3>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">Soluciones empresariales</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">Logística</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">E-commerce</a>
            </div>
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Para tu interés</h3>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">Filatelia</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">Cultura</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">Sostenibilidad</a>
            </div>
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              <Headphones className="w-4 h-4 inline mr-2" />
              Atención al cliente
            </h3>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">Atención al cliente</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">Contacto</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-blue-600">Quejas y sugerencias</a>
            </div>
          </div>
        </div>

        {/* Social media, app downloads and payment methods */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:py-8">
          {/* Social Media */}
          <div className="py-5 border-b border-gray-200 lg:border-b-0 lg:py-0">
            <p className="text-sm text-gray-700 mb-3 lg:mb-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Síguenos</p>
            <div className="flex space-x-5 justify-start">
              <a href="#" className="text-blue-600 hover:text-blue-700" data-testid="social-facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-700" data-testid="social-instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-700" data-testid="social-twitter">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-700" data-testid="social-linkedin">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-700" data-testid="social-youtube">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* App Downloads */}
          <div className="py-4 border-b border-gray-200 lg:border-b-0 lg:py-0">
            <p className="text-sm text-gray-700 mb-3" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Descarga la App de Correos</p>
            <div className="flex space-x-3">
              <img 
                src="/app-store.png" 
                alt="Descargar en App Store"
                className="h-9 w-auto object-contain"
              />
              <img 
                src="/google-play.png" 
                alt="Disponible en Google Play"
                className="h-9 w-auto object-contain"
              />
            </div>
          </div>

          {/* Payment Methods */}
          <div className="py-4 border-b border-gray-200 lg:border-b-0 lg:py-0">
          <p className="text-sm text-gray-700 mb-3" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Métodos de pago</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="bg-white rounded border border-gray-200 px-3 py-2 flex items-center justify-center min-w-[60px] h-9">
              <img 
                src="/mastercard.png" 
                alt="Mastercard"
                className="max-h-6 max-w-full object-contain"
                style={{ 
                  filter: 'brightness(1.05) contrast(1.1)'
                }}
              />
            </div>
            <div className="bg-white rounded border border-gray-200 px-3 py-2 flex items-center justify-center min-w-[60px] h-9">
              <img 
                src="/paypal.png" 
                alt="PayPal"
                className="max-h-6 max-w-full object-contain"
                style={{ 
                  filter: 'brightness(1.05) contrast(1.1)'
                }}
              />
            </div>
            <div className="bg-white rounded border border-gray-200 px-3 py-2 flex items-center justify-center min-w-[60px] h-9">
              <img 
                src="/maestro.png" 
                alt="Maestro"
                className="max-h-6 max-w-full object-contain"
                style={{ 
                  filter: 'brightness(1.05) contrast(1.1)'
                }}
              />
            </div>
            <div className="bg-white rounded border border-gray-200 px-3 py-2 flex items-center justify-center min-w-[60px] h-9">
              <img 
                src="/visa.png" 
                alt="Visa"
                className="max-h-6 max-w-full object-contain"
                style={{ 
                  filter: 'brightness(1.05) contrast(1.1)'
                }}
              />
            </div>
            <div className="bg-white rounded border border-gray-200 px-3 py-2 flex items-center justify-center min-w-[60px] h-9">
              <img 
                src="/american-express.png" 
                alt="American Express"
                className="max-h-6 max-w-full object-contain"
                style={{ 
                  filter: 'brightness(1.05) contrast(1.1)'
                }}
              />
            </div>
          </div>
          
          {/* Trust certificate */}
          <div className="mt-4">
            <img 
              src="/certificado.png" 
              alt="Junta Arbitral Nacional de Consumo - Empresario Adherido"
              className="h-16 w-auto object-contain"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </div>
        </div>
        </div>

        {/* Footer company info and legal */}
        <div className="text-white -mx-6 px-6 py-6" style={{ backgroundColor: '#333333' }}>
          <div className="flex items-center mb-6">
            <img 
              src="/correos-logo.png" 
              alt="Logo Correos"
              className="w-12 h-12 object-contain"
            />
          </div>
          
          <div className="space-y-4 text-sm text-gray-300" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            <a href="#" className="block hover:text-white transition-colors duration-200">Política de cookies</a>
            <a href="#" className="block hover:text-white transition-colors duration-200">Aviso legal</a>
            <a href="#" className="block hover:text-white transition-colors duration-200">Privacidad web</a>
            <a href="#" className="block hover:text-white transition-colors duration-200">Alerta seguridad</a>
            <a href="#" className="block hover:text-white transition-colors duration-200">Accesibilidad</a>
            <a href="#" className="block hover:text-white transition-colors duration-200">Configurador de cookies</a>
          </div>
          
          <p className="text-xs text-gray-400 mt-6 leading-relaxed" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            ©Sociedad Estatal Correos y Telégrafos, S.A., S.M.E. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}