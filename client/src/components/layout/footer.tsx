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
    <footer className="bg-gray-50">
      <div className="max-w-md mx-auto px-6">
        {/* Collapsible Menu Sections */}
        <div className="space-y-0 border-b border-gray-200">
          {/* Para ti */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleSection('para-ti')}
              className="w-full flex items-center justify-between py-5 text-left font-normal text-gray-900 text-base"
              data-testid="footer-toggle-para-ti"
            >
              Para ti
              <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${openSections.includes('para-ti') ? 'rotate-180' : ''}`} />
            </button>
            {openSections.includes('para-ti') && (
              <div className="pb-4 pl-4 space-y-2 text-sm text-gray-600">
                <a href="#" className="block hover:text-blue-600" data-testid="footer-link-tracking">Seguimiento de envío</a>
                <a href="#" className="block hover:text-blue-600" data-testid="footer-link-recibir">Recibir</a>
                <a href="#" className="block hover:text-blue-600" data-testid="footer-link-enviar">Enviar</a>
              </div>
            )}
          </div>

          {/* Para tu empresa */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleSection('para-empresa')}
              className="w-full flex items-center justify-between py-5 text-left font-normal text-gray-900 text-base"
              data-testid="footer-toggle-para-empresa"
            >
              Para tu empresa
              <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${openSections.includes('para-empresa') ? 'rotate-180' : ''}`} />
            </button>
            {openSections.includes('para-empresa') && (
              <div className="pb-4 pl-4 space-y-2 text-sm text-gray-600">
                <a href="#" className="block hover:text-blue-600" data-testid="footer-link-business-enviar">Enviar</a>
                <a href="#" className="block hover:text-blue-600" data-testid="footer-link-ecommerce">Ecommerce</a>
                <a href="#" className="block hover:text-blue-600" data-testid="footer-link-marketing">Marketing</a>
              </div>
            )}
          </div>

          {/* Para tu interés */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleSection('para-interes')}
              className="w-full flex items-center justify-between py-5 text-left font-normal text-gray-900 text-base"
              data-testid="footer-toggle-para-interes"
            >
              Para tu interés
              <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${openSections.includes('para-interes') ? 'rotate-180' : ''}`} />
            </button>
            {openSections.includes('para-interes') && (
              <div className="pb-4 pl-4 space-y-2 text-sm text-gray-600">
                <a href="#" className="block hover:text-blue-600" data-testid="footer-link-filatelia">Filatelia</a>
                <a href="#" className="block hover:text-blue-600" data-testid="footer-link-tienda">Tienda online</a>
                <a href="#" className="block hover:text-blue-600" data-testid="footer-link-atencion">Atención al cliente</a>
              </div>
            )}
          </div>

          {/* Headphones section */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleSection('auriculares')}
              className="w-full flex items-center justify-between py-5 text-left font-normal text-gray-900 text-base"
              data-testid="footer-toggle-auriculares"
            >
              <Headphones className="w-5 h-5 text-gray-900" />
              <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${openSections.includes('auriculares') ? 'rotate-180' : ''}`} />
            </button>
            {openSections.includes('auriculares') && (
              <div className="pb-4 pl-4 space-y-2 text-sm text-gray-600">
                <a href="#" className="block hover:text-blue-600">Atención telefónica</a>
                <a href="#" className="block hover:text-blue-600">Soporte técnico</a>
              </div>
            )}
          </div>
        </div>

        {/* Social Media */}
        <div className="py-5">
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
        <div className="py-4 border-b border-gray-200">
          <p className="text-sm text-gray-700 mb-4">Descarga la App de Correos</p>
          <div className="flex space-x-3">
            <div className="bg-black text-white px-3 py-2 rounded-lg text-xs flex items-center space-x-2">
              <div className="text-white text-lg">🍎</div>
              <div>
                <div className="text-xs opacity-80">Descárgalo en el</div>
                <div className="font-bold text-sm">App Store</div>
              </div>
            </div>
            <div className="bg-black text-white px-3 py-2 rounded-lg text-xs flex items-center space-x-2">
              <div className="text-white text-lg">▶️</div>
              <div>
                <div className="text-xs opacity-80">DISPONIBLE EN</div>
                <div className="font-bold text-sm">Google Play</div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="py-4">
          <p className="text-sm text-gray-700 mb-4">Métodos de pago</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Mastercard */}
            <div className="w-14 h-8 bg-gradient-to-r from-red-500 to-orange-400 rounded flex items-center justify-center">
              <div className="flex">
                <div className="w-3 h-3 bg-red-600 rounded-full opacity-80"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full -ml-1"></div>
              </div>
            </div>
            
            {/* PayPal */}
            <div className="w-14 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
              PayPal
            </div>
            
            {/* Maestro */}
            <div className="w-14 h-8 bg-red-600 rounded flex items-center justify-center">
              <div className="flex">
                <div className="w-2 h-2 bg-red-700 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full -ml-0.5"></div>
              </div>
            </div>
            
            {/* Visa */}
            <div className="w-14 h-8 bg-blue-700 rounded flex items-center justify-center text-white text-xs font-bold">
              VISA
            </div>
            
            {/* American Express */}
            <div className="w-14 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
              AMEX
            </div>
          </div>
          
          {/* Trust certificate */}
          <div className="mt-4">
            <div className="w-16 h-20 bg-orange-500 rounded-lg flex flex-col items-center justify-center text-white text-center p-1">
              <div className="text-yellow-300 text-lg mb-1">★</div>
              <div className="text-[8px] font-bold leading-tight">
                <div>EMPRESA</div>
                <div>CONFIABLE</div>
                <div>CERTIFICADA</div>
              </div>
              <div className="text-[6px] mt-1 opacity-80">CONFIANZA</div>
            </div>
          </div>
        </div>

        {/* Footer company info and legal */}
        <div className="bg-gray-800 text-white -mx-6 px-6 py-6">
          <div className="flex items-center mb-4">
            <img 
              src="/correos-logo.png" 
              alt="Logo Correos"
              className="w-12 h-12 object-contain"
            />
          </div>
          
          <div className="space-y-3 text-sm text-gray-300">
            <a href="#" className="block hover:text-white">Política de cookies</a>
            <a href="#" className="block hover:text-white">Aviso legal</a>
            <a href="#" className="block hover:text-white">Privacidad web</a>
            <a href="#" className="block hover:text-white">Alerta seguridad</a>
            <a href="#" className="block hover:text-white">Accesibilidad</a>
            <a href="#" className="block hover:text-white">Configurador de cookies</a>
          </div>
          
          <p className="text-xs text-gray-400 mt-6">
            ©Sociedad Estatal Correos y Telégrafos, S.A., S.M.E. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
