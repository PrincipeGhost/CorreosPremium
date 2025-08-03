import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 corporate-blue rounded flex items-center justify-center text-white font-bold">
                EP
              </div>
              <span className="ml-2 text-lg font-semibold">EnvíosPro</span>
            </div>
            <p className="text-gray-400 text-sm">
              Servicios de paquetería y envíos de calidad para empresas y 
              particulares en toda España.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Para ti</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  data-testid="footer-link-tracking"
                >
                  Seguimiento de envío
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  data-testid="footer-link-services"
                >
                  Recibir
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  data-testid="footer-link-request"
                >
                  Enviar
                </a>
              </li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <h4 className="font-semibold mb-4">Para tu empresa</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  data-testid="footer-link-business-solutions"
                >
                  Enviar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  data-testid="footer-link-consulting"
                >
                  Ecommerce
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  data-testid="footer-link-training"
                >
                  Marketing
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  data-testid="footer-link-blog"
                >
                  Filatelia
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  data-testid="footer-link-online-resources"
                >
                  Tienda online
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  data-testid="footer-link-support"
                >
                  Atención al cliente
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media and Apps */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            {/* Social Media */}
            <div className="flex space-x-4 mb-4 lg:mb-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="social-facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="social-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="social-twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="social-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="social-youtube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* App Downloads */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors text-sm"
                data-testid="app-store-link"
              >
                📱 App Store
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors text-sm"
                data-testid="google-play-link"
              >
                🤖 Google Play
              </a>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="flex flex-wrap justify-center space-x-6 text-sm text-gray-400 mb-4">
            <a
              href="#"
              className="hover:text-white transition-colors"
              data-testid="legal-cookies"
            >
              Política de cookies
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors"
              data-testid="legal-terms"
            >
              Aviso legal
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors"
              data-testid="legal-privacy"
            >
              Privacidad web
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors"
              data-testid="legal-accessibility"
            >
              Accesibilidad
            </a>
          </div>
          <p className="text-xs text-gray-500">
            ©EnvíosPro S.L. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
