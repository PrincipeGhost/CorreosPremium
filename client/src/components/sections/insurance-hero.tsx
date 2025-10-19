import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function InsuranceHero() {
  return (
    <section className="relative overflow-hidden" style={{ margin: 0, padding: 0 }}>
      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Background Image with curved bottom - matching Correos.es proportions */}
        <div className="relative h-48">
          <img 
            src="/attached_assets/image_1754310350481.png"
            alt="Casa tradicional española con trabajador de Correos"
            className="w-full h-48 object-cover"
            style={{ objectPosition: '50% 35%' }}
          />
          {/* SVG curved cut overlay - curve downward like Correos.es */}
          <svg 
            className="absolute bottom-0 left-0 w-full" 
            height="20" 
            viewBox="0 0 400 20" 
            preserveAspectRatio="none"
            style={{ display: 'block' }}
          >
            <path 
              d="M0,0 C200,15 200,15 400,0 L400,20 L0,20 Z" 
              fill="white"
            />
          </svg>
        </div>
        {/* Content Container - exact replica of reference image */}
        <div className="bg-white px-8 pt-6 pb-0 relative overflow-visible">
          {/* Triángulos amarillos decorativos - esquina superior derecha */}
          <div className="absolute top-6 right-4">
            {/* Primera fila de triángulos */}
            <div className="flex gap-1 mb-1">
              <div className="w-0 h-0 border-t-[24px] border-t-yellow-400 border-r-[24px] border-r-transparent"></div>
              <div className="w-0 h-0 border-t-[24px] border-t-yellow-400 border-r-[24px] border-r-transparent"></div>
              <div className="w-0 h-0 border-t-[24px] border-t-yellow-400 border-r-[24px] border-r-transparent"></div>
            </div>
            {/* Segunda fila de triángulos */}
            <div className="flex gap-1">
              <div className="w-0 h-0 border-t-[24px] border-t-yellow-400 border-r-[24px] border-r-transparent"></div>
              <div className="w-0 h-0 border-t-[24px] border-t-yellow-400 border-r-[24px] border-r-transparent"></div>
              <div className="w-0 h-0 border-t-[24px] border-t-yellow-400 border-r-[24px] border-r-transparent"></div>
            </div>
          </div>

          {/* Barras azules decorativas - lado derecho */}
          <div className="absolute right-0 bottom-20 flex flex-col gap-2">
            <div className="w-20 h-3 bg-blue-900"></div>
            <div className="w-20 h-3 bg-blue-900"></div>
            <div className="w-20 h-3 bg-blue-900"></div>
          </div>

          <div className="max-w-lg ml-6">
            <p className="text-xs text-black mb-3 font-medium">
              Allá donde está Correos, AXA te protege
            </p>
            
            <h2 className="text-2xl text-black mb-4 font-normal">
              Seguros AXA
            </h2>
            
            <p className="text-sm text-gray-600 mb-6 leading-relaxed font-normal max-w-xs">
              Ahora Correos se une a AXA en una misión: la de 
              llegar a ti, estés donde estés. Porque gracias a la 
              amplia red de agentes de Correos, podrás 
              contratar los seguros de AXA en cualquier sitio 
              de España.
            </p>
            
            <div className="space-y-6 mb-4">
              <Button 
                className="w-52 bg-yellow-400 hover:bg-yellow-500 text-blue-900 py-3 px-4 text-sm font-bold rounded-md border-0 transition-colors duration-200 block text-center flex items-center justify-center"
                data-testid="insurance-cta-button"
              >
                SEGURO, TE LLAMAMOS
              </Button>
              
              <Button 
                variant="ghost" 
                className="text-blue-800 hover:text-blue-900 p-0 h-auto text-sm font-bold flex items-center gap-2 transition-colors duration-200 ml-4"
                data-testid="insurance-more-info-button"
              >
                MÁS INFO
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Grid 2x2 */}
      <div className="hidden lg:block bg-white" style={{ margin: 0, padding: 0 }}>
        <div className="grid grid-cols-[50%_50%] max-w-full">
          {/* Columna izquierda - Imagen del edificio */}
          <div className="relative h-[360px] overflow-hidden">
            <img 
              src="/attached_assets/image_1754310350481.png"
              alt="Casa tradicional española con trabajador de Correos"
              className="w-full h-full object-cover"
              style={{ objectPosition: '50% 15%', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 60px 100%, 0 calc(100% - 60px))' }}
            />
          </div>
          
          {/* Columna derecha - Contenido de Seguros AXA */}
          <div className="px-12 py-8 flex flex-col justify-center bg-white relative overflow-visible h-[360px]">
            {/* Triángulos amarillos decorativos - esquina superior derecha */}
            <div className="absolute top-8 right-8">
              {/* Primera fila de triángulos */}
              <div className="flex gap-1 mb-1">
                <div className="w-0 h-0 border-t-[32px] border-t-yellow-400 border-r-[32px] border-r-transparent"></div>
                <div className="w-0 h-0 border-t-[32px] border-t-yellow-400 border-r-[32px] border-r-transparent"></div>
                <div className="w-0 h-0 border-t-[32px] border-t-yellow-400 border-r-[32px] border-r-transparent"></div>
              </div>
              {/* Segunda fila de triángulos */}
              <div className="flex gap-1">
                <div className="w-0 h-0 border-t-[32px] border-t-yellow-400 border-r-[32px] border-r-transparent"></div>
                <div className="w-0 h-0 border-t-[32px] border-t-yellow-400 border-r-[32px] border-r-transparent"></div>
                <div className="w-0 h-0 border-t-[32px] border-t-yellow-400 border-r-[32px] border-r-transparent"></div>
              </div>
            </div>

            {/* Barras azules decorativas - lado derecho */}
            <div className="absolute right-0 bottom-16 flex flex-col gap-3">
              <div className="w-24 h-4 bg-blue-900"></div>
              <div className="w-24 h-4 bg-blue-900"></div>
              <div className="w-24 h-4 bg-blue-900"></div>
            </div>

            <p className="text-sm text-black mb-4 font-medium">
              Allá donde está Correos, AXA te protege
            </p>
            
            <h2 className="text-3xl text-black mb-6 font-normal">
              Seguros AXA
            </h2>
            
            <p className="text-base text-gray-600 mb-8 leading-relaxed font-normal max-w-lg">
              Ahora Correos se une a AXA en una misión: la de llegar a<br />
              ti, estés donde estés. Porque gracias a la amplia red de agentes de Correos, podrás contratar los seguros de<br />
              AXA en cualquier sitio de España.
            </p>
            
            <div className="flex gap-20 items-center ml-10 ">
              <Button 
                className="w-60 bg-yellow-400 hover:bg-yellow-500 text-blue-900 py-7 px-2 text-sm font-bold rounded-md border-0 transition-colors duration-200 flex items-center justify-center"
                data-testid="insurance-cta-button"
              >
                SEGURO, TE<br />
                LLAMAMOS
              </Button>
              
              <Button 
                variant="ghost" 
                className="text-blue-800 hover:text-blue-900 p-0 h-auto text-sm font-bold flex items-center gap-2 transition-colors duration-200"
                data-testid="insurance-more-info-button"
              >
                MÁS INFO
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
