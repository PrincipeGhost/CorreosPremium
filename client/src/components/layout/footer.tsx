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
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Mastercard */}
            <div className="bg-white rounded border border-gray-200 px-3 py-2 flex items-center justify-center min-w-[60px] h-9">
              <svg width="32" height="20" viewBox="0 0 32 20" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="10" r="7" fill="#EB001B"/>
                <circle cx="20" cy="10" r="7" fill="#F79E1B"/>
                <path d="M16 5c1.2 1 2 2.6 2 4.5s-.8 3.5-2 4.5c-1.2-1-2-2.6-2-4.5s.8-3.5 2-4.5z" fill="#FF5F00"/>
              </svg>
            </div>
            
            {/* PayPal */}
            <div className="bg-white rounded border border-gray-200 px-3 py-2 flex items-center justify-center min-w-[60px] h-9">
              <svg width="32" height="20" viewBox="0 0 32 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 3h8c2.5 0 4 1.5 4 3.5 0 2.5-2 4.5-4.5 4.5H10L9 17H6.5L8.5 3z" fill="#003087"/>
                <path d="M9 7h8c2.5 0 4 1.5 4 3.5 0 2.5-2 4.5-4.5 4.5H13L12 21H9.5L11.5 7z" fill="#009CDE"/>
              </svg>
            </div>
            
            {/* Maestro */}
            <div className="bg-white rounded border border-gray-200 px-3 py-2 flex items-center justify-center min-w-[60px] h-9">
              <svg width="32" height="20" viewBox="0 0 32 20" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="10" r="7" fill="#0099DF"/>
                <circle cx="20" cy="10" r="7" fill="#ED0006"/>
                <path d="M16 5c1.2 1 2 2.6 2 4.5s-.8 3.5-2 4.5c-1.2-1-2-2.6-2-4.5s.8-3.5 2-4.5z" fill="#6C6BBD"/>
              </svg>
            </div>
            
            {/* Visa */}
            <div className="bg-white rounded border border-gray-200 px-3 py-2 flex items-center justify-center min-w-[60px] h-9">
              <svg width="32" height="20" viewBox="0 0 32 20" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="20" fill="white"/>
                <text x="16" y="12" fill="#1A1F71" fontSize="8" textAnchor="middle" fontWeight="bold" fontFamily="Arial">VISA</text>
              </svg>
            </div>
            
            {/* American Express */}
            <div className="bg-white rounded border border-gray-200 px-3 py-2 flex items-center justify-center min-w-[60px] h-9">
              <svg width="32" height="20" viewBox="0 0 32 20" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="20" rx="2" fill="#006FCF"/>
                <text x="16" y="8" fill="white" fontSize="4" textAnchor="middle" fontWeight="bold" fontFamily="Arial">AMERICAN</text>
                <text x="16" y="14" fill="white" fontSize="4" textAnchor="middle" fontWeight="bold" fontFamily="Arial">EXPRESS</text>
              </svg>
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
