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
                {/* Logo oficial de Correos */}
                <img 
                  src="/attached_assets/image_1754313473527.png"
                  alt="Correos"
                  className="h-10 w-10 object-contain"
                />
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
