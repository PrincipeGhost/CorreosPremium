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
      <div className="bg-yellow-400 h-2"></div>
      
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            {/* Logo - Left side */}
            <div className="flex items-center">
              <img 
                src="/attached_assets/image_1754313473527.png"
                alt="Correos"
                className="h-12 w-12 object-contain"
              />
            </div>

            {/* Menu hamburger - positioned left of center like Correos.es */}
            <div className="flex items-center ml-16">
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-700 hover:text-blue-600 p-2"
                data-testid="menu-button"
              >
                <Menu className="w-8 h-8" />
              </Button>
            </div>

            {/* Spacer to push right items to the end */}
            <div className="flex-grow"></div>

            {/* Right side - Search and User icons */}
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-700 hover:text-blue-600 p-2"
                data-testid="search-button"
              >
                <Search className="w-6 h-6" />
              </Button>
              <div className="w-px h-8 bg-gray-300 mx-2"></div>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-700 hover:text-blue-600 p-2"
                data-testid="user-button"
              >
                <User className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
