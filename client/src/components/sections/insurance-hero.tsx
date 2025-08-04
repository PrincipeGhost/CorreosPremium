import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function InsuranceHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image with curved bottom */}
      <div className="relative h-96">
        <img 
          src="/attached_assets/image_1754310350481.png"
          alt="Casa tradicional española con trabajador de Correos"
          className="w-full h-96 object-cover"
        />
        {/* SVG curved cut overlay - deeper curve */}
        <svg 
          className="absolute bottom-0 left-0 w-full" 
          height="80" 
          viewBox="0 0 400 80" 
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          <path 
            d="M0,80 C100,20 300,20 400,80 L400,80 L0,80 Z" 
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}