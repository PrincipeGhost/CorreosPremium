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
      <div className="max-w-md mx-auto px-6">
        {/* Social Media */}
        <div className="py-5 border-b border-gray-200">
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
        <div className="py-4">
          <p className="text-sm text-gray-700 mb-4">Métodos de pago</p>
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="bg-white rounded-lg border border-gray-200 p-2 shadow-sm">
              <img 
                src="/mastercard.png" 
                alt="Mastercard"
                className="h-8 w-auto object-contain"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-2 shadow-sm">
              <img 
                src="/paypal.png" 
                alt="PayPal"
                className="h-8 w-auto object-contain"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-2 shadow-sm">
              <img 
                src="/maestro.png" 
                alt="Maestro"
                className="h-8 w-auto object-contain"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-2 shadow-sm">
              <img 
                src="/visa.png" 
                alt="Visa"
                className="h-8 w-auto object-contain"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-2 shadow-sm">
              <img 
                src="/american-express.png" 
                alt="American Express"
                className="h-8 w-auto object-contain"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
          </div>
          
          {/* Trust certificate */}
          <div className="mt-6">
            <img 
              src="/certificado.png" 
              alt="Junta Arbitral Nacional de Consumo - Empresario Adherido"
              className="h-20 w-auto object-contain"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </div>
        </div>

        {/* Footer company info and legal */}
        <div className="bg-gray-900 text-white -mx-6 px-6 py-6">
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
