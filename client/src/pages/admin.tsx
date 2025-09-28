import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { STATUS_DISPLAY, TRACKING_STATUS } from '@shared/schema';
import type { Tracking, TrackingStatsResponse, TrackingListResponse, TrackingStatusType } from '@shared/schema';
import { Package, TrendingUp, Clock, CheckCircle, AlertCircle, Search, Edit3 } from 'lucide-react';

interface UpdateStatusData {
  newStatus: TrackingStatusType;
  notes?: string;
}

export default function AdminPage() {
  const { toast } = useToast();
  const [adminToken, setAdminToken] = useState('');
  const [selectedTracking, setSelectedTracking] = useState<Tracking | null>(null);
  const [newStatus, setNewStatus] = useState<TrackingStatusType | ''>('');
  const [statusNotes, setStatusNotes] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch tracking statistics
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/trackings/stats'],
    enabled: !!adminToken
  });

  // Fetch all trackings
  const { data: trackingsData, isLoading: trackingsLoading } = useQuery({
    queryKey: ['/api/trackings'],
    enabled: !!adminToken
  });

  // Update tracking status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ trackingId, updateData }: { trackingId: string; updateData: UpdateStatusData }) => {
      if (!adminToken) throw new Error('Admin token required');
      
      const response = await fetch(`/api/trackings/${trackingId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update tracking status');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Estado actualizado",
        description: "El estado del tracking se ha actualizado correctamente."
      });
      queryClient.invalidateQueries({ queryKey: ['/api/trackings'] });
      queryClient.invalidateQueries({ queryKey: ['/api/trackings/stats'] });
      setSelectedTracking(null);
      setNewStatus('');
      setStatusNotes('');
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "No se pudo actualizar el estado",
        variant: "destructive"
      });
    }
  });

  const handleStatusUpdate = () => {
    if (!selectedTracking || !newStatus) return;
    
    updateStatusMutation.mutate({
      trackingId: selectedTracking.trackingId,
      updateData: {
        newStatus,
        notes: statusNotes || undefined
      }
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case TRACKING_STATUS.RETENIDO:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case TRACKING_STATUS.CONFIRMAR_PAGO:
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case TRACKING_STATUS.EN_TRANSITO:
        return <Package className="h-4 w-4 text-blue-500" />;
      case TRACKING_STATUS.ENTREGADO:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case TRACKING_STATUS.RETENIDO:
        return 'destructive';
      case TRACKING_STATUS.CONFIRMAR_PAGO:
        return 'secondary';
      case TRACKING_STATUS.EN_TRANSITO:
        return 'default';
      case TRACKING_STATUS.ENTREGADO:
        return 'default';
      default:
        return 'outline';
    }
  };

  const filteredTrackings = (trackingsData as TrackingListResponse)?.trackings?.filter((tracking: Tracking) =>
    tracking.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tracking.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tracking.productName.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (!adminToken) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-md mx-auto mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Panel Administrativo</CardTitle>
              <CardDescription>
                Introduce el token de administrador para acceder al panel de control del bot de Telegram.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="admin-token">Token de Administrador</Label>
                  <Input
                    id="admin-token"
                    type="password"
                    placeholder="Introduce el token de admin..."
                    value={adminToken}
                    onChange={(e) => setAdminToken(e.target.value)}
                    data-testid="input-admin-token"
                  />
                </div>
                <Button 
                  onClick={() => setAdminToken(adminToken)}
                  className="w-full"
                  data-testid="button-access-admin"
                >
                  Acceder al Panel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Panel Administrativo del Bot</h1>
        <p className="text-muted-foreground mt-2">
          Gestiona los trackings del bot de Telegram y controla el estado de los envíos.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview" data-testid="tab-overview">Resumen</TabsTrigger>
          <TabsTrigger value="trackings" data-testid="tab-trackings">Trackings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {statsLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-8 w-12 bg-gray-200 rounded animate-pulse" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Trackings</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-total-trackings">{(stats as TrackingStatsResponse)?.total || 0}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hoy</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-today-trackings">{(stats as TrackingStatsResponse)?.today || 0}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Retenidos</CardTitle>
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-retenidos">
                    {(stats as TrackingStatsResponse)?.byStatus?.[TRACKING_STATUS.RETENIDO] || 0}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Entregados</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-entregados">
                    {(stats as TrackingStatsResponse)?.byStatus?.[TRACKING_STATUS.ENTREGADO] || 0}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="trackings" className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por tracking ID, destinatario o producto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
                data-testid="input-search-trackings"
              />
            </div>
          </div>

          {trackingsLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTrackings.map((tracking: Tracking) => (
                <Card key={tracking.trackingId} data-testid={`card-tracking-${tracking.trackingId}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{tracking.trackingId}</CardTitle>
                        <CardDescription>
                          {tracking.recipientName} • {tracking.productName}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(tracking.status)}
                        <Badge variant={getStatusBadgeVariant(tracking.status) as any}>
                          {STATUS_DISPLAY[tracking.status as keyof typeof STATUS_DISPLAY] || tracking.status}
                        </Badge>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedTracking(tracking);
                                setNewStatus('');
                                setStatusNotes('');
                              }}
                              data-testid={`button-edit-${tracking.trackingId}`}
                            >
                              <Edit3 className="h-4 w-4 mr-1" />
                              Cambiar Estado
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Actualizar Estado del Tracking</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tracking ID: {selectedTracking?.trackingId}<br/>
                                Destinatario: {selectedTracking?.recipientName}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Nuevo Estado</Label>
                                <Select value={newStatus} onValueChange={(value: TrackingStatusType) => setNewStatus(value)}>
                                  <SelectTrigger data-testid="select-new-status">
                                    <SelectValue placeholder="Selecciona el nuevo estado" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value={TRACKING_STATUS.RETENIDO}>
                                      {STATUS_DISPLAY[TRACKING_STATUS.RETENIDO]}
                                    </SelectItem>
                                    <SelectItem value={TRACKING_STATUS.CONFIRMAR_PAGO}>
                                      {STATUS_DISPLAY[TRACKING_STATUS.CONFIRMAR_PAGO]}
                                    </SelectItem>
                                    <SelectItem value={TRACKING_STATUS.EN_TRANSITO}>
                                      {STATUS_DISPLAY[TRACKING_STATUS.EN_TRANSITO]}
                                    </SelectItem>
                                    <SelectItem value={TRACKING_STATUS.ENTREGADO}>
                                      {STATUS_DISPLAY[TRACKING_STATUS.ENTREGADO]}
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Notas (Opcional)</Label>
                                <Textarea
                                  placeholder="Añadir notas sobre el cambio de estado..."
                                  value={statusNotes}
                                  onChange={(e) => setStatusNotes(e.target.value)}
                                  data-testid="textarea-status-notes"
                                />
                              </div>
                            </div>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => {
                                setSelectedTracking(null);
                                setNewStatus('');
                                setStatusNotes('');
                              }}>
                                Cancelar
                              </AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={handleStatusUpdate}
                                disabled={!newStatus || updateStatusMutation.isPending}
                                data-testid="button-confirm-update"
                              >
                                {updateStatusMutation.isPending ? 'Actualizando...' : 'Actualizar Estado'}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      <div>Dirección: {tracking.deliveryAddress}</div>
                      <div>País: {tracking.countryPostal}</div>
                      <div>Peso: {tracking.packageWeight}</div>
                      <div>Precio: {tracking.productPrice}</div>
                      {tracking.estimatedDeliveryDate && (
                        <div>Entrega estimada: {tracking.estimatedDeliveryDate}</div>
                      )}
                      {tracking.createdAt && (
                        <div>Creado: {new Date(tracking.createdAt).toLocaleString('es-ES')}</div>
                      )}
                    </div>
                  </CardHeader>
                </Card>
              ))}
              
              {filteredTrackings.length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {searchQuery ? 'No se encontraron trackings que coincidan con tu búsqueda.' : 'No hay trackings disponibles.'}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}