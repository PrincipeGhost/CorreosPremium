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
              <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="10" r="8" fill="#EB001B"/>
                <circle cx="20" cy="10" r="8" fill="#F79E1B"/>
                <path d="M16 4.5c1.5 1.2 2.5 3 2.5 5.5s-1 4.3-2.5 5.5c-1.5-1.2-2.5-3-2.5-5.5s1-4.3 2.5-5.5z" fill="#FF5F00"/>
              </svg>
            </div>
            
            {/* PayPal */}
            <div className="bg-white rounded border border-gray-200 px-3 py-2 flex items-center justify-center min-w-[60px] h-9">
              <svg width="36" height="20" viewBox="0 0 36 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 2h6c3 0 5 1.5 5 4.5 0 3.5-2.5 6-6 6H9L8 18H5l2.5-16z" fill="#003087"/>
                <path d="M11 6h6c3 0 5 1.5 5 4.5 0 3.5-2.5 6-6 6h-3.5L11.5 22H8.5L11 6z" fill="#009CDE"/>
                <path d="M14.5 10h6c3 0 5 1.5 5 4.5 0 3.5-2.5 6-6 6H16l-1 6h-3l2.5-16.5z" fill="#012169"/>
              </svg>
            </div>
            
            {/* Maestro */}
            <div className="bg-white rounded border border-gray-200 px-3 py-2 flex items-center justify-center min-w-[60px] h-9">
              <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="10" r="8" fill="#0099DF"/>
                <circle cx="20" cy="10" r="8" fill="#ED0006"/>
                <path d="M16 4.5c1.5 1.2 2.5 3 2.5 5.5s-1 4.3-2.5 5.5c-1.5-1.2-2.5-3-2.5-5.5s1-4.3 2.5-5.5z" fill="#6C6BBD"/>
              </svg>
            </div>
            
            {/* Visa */}
            <div className="bg-white rounded border border-gray-200 px-3 py-2 flex items-center justify-center min-w-[60px] h-9">
              <svg width="36" height="20" viewBox="0 0 36 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 6L12 14h-2.5L8 8.5c-.2-.8-.4-1.1-1-1.4C6.2 6.8 5.3 6.5 4.5 6.3L4.7 6h4.3c.6 0 1.1.4 1.2 1l1.1 5.8L14.5 6zM16 14h2.3L20 6h-2.3L16 14zM24.5 8.2c0-.6.6-1.2 1.9-1.2.6 0 1.4.1 2 .4l.4-1.8c-.7-.2-1.3-.4-2.3-.4-2.5 0-4.2 1.3-4.2 3.2 0 1.4 1.2 2.2 2.2 2.7 1 .6 1.4 1 1.4 1.5 0 .8-.9 1.1-1.8 1.1-1.2 0-1.9-.2-2.9-.6l-.4 1.9c.7.3 1.9.5 3.1.5 2.7 0 4.4-1.3 4.4-3.3 0-2.6-3.5-2.7-3.5-3.9z" fill="#1A1F71"/>
                <path d="M31.5 6c-.5 0-.9.3-1.1.8L27 14h2.5l.5-1.3h3l.3 1.3H36L34.5 6h-3zM30.3 11.2l1.2-3.2.7 3.2h-1.9z" fill="#1A1F71"/>
              </svg>
            </div>
            
            {/* American Express */}
            <div className="bg-white rounded border border-gray-200 px-3 py-2 flex items-center justify-center min-w-[60px] h-9">
              <svg width="36" height="20" viewBox="0 0 36 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="20" rx="2" fill="#006FCF"/>
                <path d="M6.5 7h2.8l.4 1h1.8L10.7 7h2.3l-.8 1.8h1.5L15 7h2v1.2h.5c.4 0 .6-.1.6-.6V7h3.5c.8 0 1.4.3 1.4 1v.2h.3c.9 0 1.7.4 1.7 1.3v.8h1.5v-.8c0-.9.8-1.3 1.7-1.3h.3V8c0-.7.6-1 1.4-1H32v6h-2.5c-.8 0-1.4-.3-1.4-1v-.2h-.3c-.9 0-1.7-.4-1.7-1.3v-.8h-1.5v.8c0 .9-.8 1.3-1.7 1.3h-.3v-.2c0 .7-.6 1-1.4 1h-3.5v-.6c0 .5-.2.6-.6.6h-.5V13h-2L15 11.2h-1.5L14.3 13h-2.3l.8-1.8h-1.8l-.4 1H7.3L6.5 13h-2v-6z" fill="white"/>
                <text x="18" y="12" fill="#006FCF" fontSize="3" textAnchor="middle" fontWeight="bold">AMERICAN EXPRESS</text>
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
