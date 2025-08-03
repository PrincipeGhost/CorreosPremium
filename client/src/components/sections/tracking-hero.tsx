import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function TrackingHero() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [, setLocation] = useLocation();

  const handleTrackingSearch = () => {
    if (trackingNumber.trim()) {
      setLocation(`/tracking?number=${encodeURIComponent(trackingNumber)}`);
    }
  };

  return (
    <section className="bg-yellow-400 py-8">
      <div className="max-w-sm mx-auto px-4">
        <div className="text-left mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Sigue tu envío
          </h2>
        </div>
        
        <div className="relative">
          <Input
            type="text"
            placeholder="Nº de seguimiento de envío..."
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleTrackingSearch()}
            className="w-full h-12 pl-4 pr-12 text-base border-0 rounded-md shadow-sm"
            data-testid="tracking-hero-input"
          />
          <Button
            onClick={handleTrackingSearch}
            className="absolute right-2 top-2 h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700 rounded-md"
            data-testid="tracking-hero-search-button"
          >
            <Search className="w-4 h-4 text-white" />
          </Button>
        </div>
      </div>
    </section>
  );
}