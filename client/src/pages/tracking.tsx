import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Package, MapPin, Clock, CheckCircle } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

interface TrackingInfo {
  trackingNumber: string;
  status: string;
  location: string;
  estimatedDelivery: string;
  history: Array<{
    date: string;
    status: string;
    location: string;
  }>;
}

export default function TrackingPage() {
  const [location, setLocation] = useLocation();
  const [trackingNumber, setTrackingNumber] = useState(
    new URLSearchParams(location.split('?')[1] || '').get('number') || ''
  );

  const { data: trackingInfo, isLoading, error, refetch } = useQuery<TrackingInfo>({
    queryKey: ['/api/track', trackingNumber],
    enabled: !!trackingNumber,
  });

  const handleSearch = () => {
    if (trackingNumber.trim()) {
      setLocation(`/tracking?number=${encodeURIComponent(trackingNumber)}`);
      refetch();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'entregado':
        return 'bg-green-500';
      case 'en tránsito':
      case 'en proceso':
        return 'bg-blue-500';
      case 'servicio iniciado':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'entregado':
        return <CheckCircle className="w-5 h-5" />;
      case 'en tránsito':
      case 'en proceso':
        return <Package className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="mb-4"
            data-testid="back-to-home"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Seguimiento de envíos
          </h1>

          {/* Search Form */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="text"
                  placeholder="Introduce tu número de seguimiento"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1"
                  data-testid="tracking-search-input"
                />
                <Button
                  onClick={handleSearch}
                  className="corporate-blue hover:bg-blue-700 text-white font-semibold"
                  data-testid="tracking-search-button"
                >
                  BUSCAR
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Loading State */}
          {isLoading && (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Buscando información del envío...</p>
              </CardContent>
            </Card>
          )}

          {/* Error State */}
          {error && (
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No se encontró el envío
                </h3>
                <p className="text-gray-600">
                  Por favor, verifica que el número de seguimiento sea correcto
                  e intenta de nuevo.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Tracking Results */}
          {trackingInfo && (
            <div className="space-y-6">
              {/* Status Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Envío {trackingInfo.trackingNumber}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                      <Badge className={`${getStatusColor(trackingInfo.status)} text-white`}>
                        {getStatusIcon(trackingInfo.status)}
                        <span className="ml-1">{trackingInfo.status}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{trackingInfo.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>
                        Entrega estimada:{" "}
                        {new Date(trackingInfo.estimatedDelivery).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tracking History */}
              <Card>
                <CardHeader>
                  <CardTitle>Historial del envío</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingInfo.history.map((event, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-b-0"
                      >
                        <div className={`p-2 rounded-full ${getStatusColor(event.status)}`}>
                          {getStatusIcon(event.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h4 className="font-semibold text-gray-900">
                              {event.status}
                            </h4>
                            <span className="text-sm text-gray-500">
                              {new Date(event.date).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <p className="text-gray-600 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}