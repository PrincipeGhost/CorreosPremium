import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
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

  // Package tracking endpoint - now uses real database data
  app.get("/api/track/:trackingNumber", async (req, res) => {
    const { trackingNumber } = req.params;
    
    try {
      // Get tracking from database
      const tracking = await storage.getTracking(trackingNumber);
      
      if (!tracking) {
        return res.status(404).json({ 
          message: "Número de seguimiento no encontrado",
          trackingNumber 
        });
      }

      // Get tracking history
      const history = await storage.getTrackingHistory(trackingNumber);

      // Format response to match frontend expectations
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

  // Get all trackings (for admin purposes)
  app.get("/api/trackings", async (req, res) => {
    try {
      const trackings = await storage.getAllTrackings();
      res.json(trackings);
    } catch (error) {
      console.error("Error getting trackings:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update tracking status (for admin/bot purposes) - Protected endpoint
  app.post("/api/track/:trackingNumber/status", async (req, res) => {
    const { trackingNumber } = req.params;
    
    // Basic authentication check - in production, use proper auth tokens
    const authToken = req.headers.authorization;
    if (!authToken || authToken !== `Bearer ${process.env.ADMIN_TOKEN || 'default-admin-token'}`) {
      return res.status(401).json({ message: "No autorizado - Token requerido" });
    }

    try {
      // Validate request body
      const { status, notes } = req.body;
      if (!status || typeof status !== 'string') {
        return res.status(400).json({ message: "Estado requerido" });
      }

      const success = await storage.updateTrackingStatus(trackingNumber, status, notes);
      if (success) {
        res.json({ success: true, message: "Estado actualizado correctamente" });
      } else {
        res.status(404).json({ message: "Tracking no encontrado" });
      }
    } catch (error) {
      console.error("Error updating tracking status:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
