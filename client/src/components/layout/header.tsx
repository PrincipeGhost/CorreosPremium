import { useState } from "react";
import { Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Servicios", href: "#servicios" },
    { name: "Ayuda", href: "#ayuda" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <>
      {/* Yellow top bar like Correos.es */}
      <div className="bg-yellow-400 h-2"></div>
      
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[69px] gap-4 relative">
            {/* Left section - Logo, Hamburger, Navigation */}
            <div className="flex items-center gap-4 flex-1">
              {/* Logo */}
              <div className="flex items-center flex-shrink-0">
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

              {/* Hamburger menu button */}
              <div className="flex items-center">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-900 hover:text-blue-700 p-2"
                      data-testid="menu-button"
                    >
                      <Menu className="w-6 h-6" />
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

              {/* Navigation links - Particular and Empresa */}
              <nav className="hidden lg:flex items-center space-x-6">
                <a
                  href="#particulares"
                  className="text-2xl font-semibold text-blue-900 hover:text-blue-700 transition-colors"
                  data-testid="link-particular"
                >
                  Particular
                </a>
                <a
                  href="#empresa"
                  className="text-2xl font-semibold text-blue-900 hover:text-blue-700 transition-colors"
                  data-testid="link-empresa"
                >
                  Empresa
                </a>
              </nav>
            </div>

            {/* Search bar - Desktop only - Centered */}
            <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 w-96">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Busca en correos.es"
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xl"
                  data-testid="input-search"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                  <Search className="w-8 h-8" />
                </button>
              </div>
            </div>

            {/* Right section - Login button */}
            <div className="flex items-center justify-end flex-1">
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-blue-900 hover:text-blue-700 font-semibold text-2xl"
                data-testid="button-login"
              >
                <User className="w-8 h-8" />
                <span className="hidden lg:inline">INICIAR SESIÓN</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
