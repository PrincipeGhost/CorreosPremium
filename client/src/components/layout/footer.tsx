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
    <footer className="bg-gray-900 text-white">
      <div className="max-w-md mx-auto px-6">
        {/* Social Media */}
        <div className="py-5 border-b border-gray-700">
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
        <div className="py-4 border-b border-gray-700">
          <p className="text-sm text-gray-300 mb-4">Descarga la App de Correos</p>
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
          <p className="text-sm text-gray-300 mb-4">Métodos de pago</p>
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
        <div className="border-t border-gray-700 py-6">
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
