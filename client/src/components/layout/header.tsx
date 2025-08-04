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
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center h-16">
            {/* Left spacing */}
            <div className="w-4"></div>
            
            {/* Logo - Left side with proper spacing */}
            <div className="flex items-center">
              <img 
                src="/attached_assets/IMG_6692_1754313882088.png"
                alt="Correos"
                className="h-9 w-9 object-contain"
              />
            </div>

            {/* Vertical divider */}
            <div className="w-px h-8 bg-gray-300 mx-4"></div>

            {/* Menu hamburger - positioned close to logo like Correos.es */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-800 hover:text-blue-900 p-2"
                data-testid="menu-button"
              >
                <Menu className="w-7 h-7" />
              </Button>
            </div>

            {/* Spacer to push right items to the end */}
            <div className="flex-grow"></div>

            {/* Right side - Search and User icons with proper spacing */}
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-800 hover:text-blue-900 p-2"
                data-testid="search-button"
              >
                <Search className="w-5 h-5" />
              </Button>
              <div className="w-px h-8 bg-gray-300 mx-2"></div>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-800 hover:text-blue-900 p-2"
                data-testid="user-button"
              >
                <User className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Right spacing */}
            <div className="w-4"></div>
          </div>
        </div>
      </header>
    </>
  );
}
