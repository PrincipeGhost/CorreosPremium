import { useState } from "react";
import { Menu, X, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "wouter";

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
            {/* Left spacing */}
            <div className="w-4"></div>
            
            {/* Logo - Left side with proper spacing */}
            <div className="flex items-center">
              <Link href="/" className="cursor-pointer" data-testid="logo-link">
                <img 
                  src="/attached_assets/IMG_6692_1754313882088.png"
                  alt="Correos"
                  className="h-9 w-9 object-contain hover:opacity-80 transition-opacity"
                  style={{ 
                    filter: 'contrast(1.18) saturate(1.1) brightness(0.94)',
                    imageRendering: 'auto'
                  }}
                />
              </Link>
            </div>

            {/* Vertical divider */}
            <div className="w-px h-8 bg-gray-300 mx-4"></div>

            {/* Mobile menu button - visible only on mobile */}
            <div className="lg:hidden flex items-center">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-blue-800 hover:text-blue-900 p-2"
                    data-testid="menu-button"
                  >
                    <Menu className="w-7 h-7" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <nav className="flex flex-col space-y-4 mt-8">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium text-gray-900 hover:text-blue-600 py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop navigation - visible only on desktop */}
            <div className="hidden lg:flex items-center space-x-8 ml-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </a>
              ))}
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
              <Link href="/admin">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-800 hover:text-blue-900 p-2"
                  data-testid="admin-button"
                  title="Panel Administrativo"
                >
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            </div>
            
            {/* Right spacing */}
            <div className="w-4"></div>
          </div>
        </div>
      </header>
    </>
  );
}
