import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertTrackingSchema,
  updateTrackingStatusSchema,
  TRACKING_STATUS,
  STATUS_DISPLAY,
  type TrackingLookupRequest,
  type TrackingLookupResponse,
  type TrackingCreateRequest,
  type TrackingUpdateStatusRequest,
  type TrackingListResponse,
  type TrackingStatsResponse,
  type TrackingWithStatus,
  type TrackingStatusType
} from "@shared/schema";
import { insertContactRequestSchema, insertServiceQuoteSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact request endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactRequestSchema.parse(req.body);
      const contactRequest = await storage.createContactRequest(data);
      res.json({ success: true, id: contactRequest.id });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          details: validationError.message 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Service quote request endpoint
  app.post("/api/quote", async (req, res) => {
    try {
      const data = insertServiceQuoteSchema.parse(req.body);
      const serviceQuote = await storage.createServiceQuote(data);
      res.json({ success: true, id: serviceQuote.id });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          details: validationError.message 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all contact requests (for admin purposes)
  app.get("/api/contact-requests", async (req, res) => {
    try {
      const requests = await storage.getAllContactRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all service quotes (for admin purposes)
  app.get("/api/service-quotes", async (req, res) => {
    try {
      const quotes = await storage.getAllServiceQuotes();
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Tracking lookup endpoint with proper TypeScript interfaces
  app.get("/api/track/:trackingId", async (req, res) => {
    const { trackingId } = req.params;
    
    try {
      const tracking = await storage.getTracking(trackingId);
      const history = await storage.getTrackingHistory(trackingId);

      const response: TrackingLookupResponse = {
        tracking: tracking || null,
        history,
        found: !!tracking
      };

      if (!tracking) {
        return res.status(404).json(response);
      }

      res.json(response);
    } catch (error) {
      console.error("Error looking up tracking:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });

  // Legacy tracking endpoint for existing frontend compatibility
  app.get("/api/track-legacy/:trackingNumber", async (req, res) => {
    const { trackingNumber } = req.params;
    
    try {
      const tracking = await storage.getTracking(trackingNumber);
      
      if (!tracking) {
        return res.status(404).json({ 
          message: "Número de seguimiento no encontrado",
          trackingNumber 
        });
      }

      const history = await storage.getTrackingHistory(trackingNumber);

      // Format response to match legacy frontend expectations
      const trackingData = {
        trackingNumber: tracking.trackingId,
        status: tracking.status,
        location: tracking.deliveryAddress,
        estimatedDelivery: tracking.estimatedDeliveryDate || null,
        recipient: tracking.recipientName,
        sender: tracking.senderName,
        product: tracking.productName,
        weight: tracking.packageWeight,
        price: tracking.productPrice,
        country: tracking.countryPostal,
        senderCountry: tracking.senderCountry,
        created: tracking.createdAt,
        updated: tracking.updatedAt,
        history: history.map(h => ({
          date: h.changedAt?.toISOString() || '',
          status: h.newStatus,
          location: h.notes || tracking.deliveryAddress
        }))
      };

      res.json(trackingData);
    } catch (error) {
      console.error("Error getting tracking:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });

  // Get all trackings with enhanced response format
  app.get("/api/trackings", async (req, res) => {
    try {
      const trackings = await storage.getAllTrackings();
      
      // Calculate statistics
      const byStatus = trackings.reduce((acc, tracking) => {
        acc[tracking.status] = (acc[tracking.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const response: TrackingListResponse = {
        trackings,
        total: trackings.length,
        byStatus
      };

      res.json(response);
    } catch (error) {
      console.error("Error getting trackings:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Tracking statistics endpoint
  app.get("/api/trackings/stats", async (req, res) => {
    try {
      const allTrackings = await storage.getAllTrackings();
      
      // Calculate today's trackings
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayTrackings = allTrackings.filter(t => {
        const createdDate = new Date(t.createdAt || 0);
        createdDate.setHours(0, 0, 0, 0);
        return createdDate.getTime() === today.getTime();
      });

      // Calculate by status
      const byStatus = allTrackings.reduce((acc, tracking) => {
        const status = tracking.status as keyof typeof TRACKING_STATUS;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {} as Record<keyof typeof TRACKING_STATUS, number>);

      const response: TrackingStatsResponse = {
        total: allTrackings.length,
        today: todayTrackings.length,
        byStatus
      };

      res.json(response);
    } catch (error) {
      console.error("Error getting tracking stats:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  // Update tracking status (for admin/bot purposes) - Protected endpoint
  app.patch("/api/trackings/:trackingId/status", async (req, res) => {
    const { trackingId } = req.params;
    
    // Require ADMIN_TOKEN to be explicitly set - no default fallback
    const adminToken = process.env.ADMIN_TOKEN;
    if (!adminToken) {
      console.error("ADMIN_TOKEN environment variable not set");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const authToken = req.headers.authorization;
    if (!authToken || authToken !== `Bearer ${adminToken}`) {
      return res.status(401).json({ message: "No autorizado - Token requerido" });
    }

    try {
      // Validate request body using proper schema
      const validatedData = updateTrackingStatusSchema.parse(req.body);
      const { newStatus, notes } = validatedData;

      const success = await storage.updateTrackingStatus(trackingId, newStatus, notes);
      if (success) {
        res.json({ 
          success: true, 
          message: "Estado actualizado correctamente",
          trackingId,
          newStatus
        });
      } else {
        res.status(404).json({ message: "Tracking no encontrado" });
      }
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          details: validationError.message 
        });
      }
      console.error("Error updating tracking status:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
