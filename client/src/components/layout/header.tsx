import { useState } from "react";
import { Menu, X, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Servicios", href: "#servicios" },
    { name: "Empresa", href: "#empresa" },
    { name: "Particulares", href: "#particulares" },
    { name: "Ayuda", href: "#ayuda" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <>
      {/* Yellow top bar like Correos.es */}
      <div className="bg-yellow-400 h-1"></div>
      
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Correos style */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                {/* Logo icon similar to Correos */}
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white">
                  <svg 
                    className="w-8 h-8" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Center - Menu icon like Correos.es */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-700 hover:text-blue-800"
                data-testid="menu-button"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>

            {/* Right side - Search and User like Correos.es */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-700 hover:text-blue-800"
                data-testid="search-button"
              >
                <Search className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-700 hover:text-blue-800"
                data-testid="user-button"
              >
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
