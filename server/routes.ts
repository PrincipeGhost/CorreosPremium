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

  // Service tracking endpoint (placeholder)
  app.get("/api/track/:trackingNumber", async (req, res) => {
    const { trackingNumber } = req.params;
    
    // Mock tracking data for demonstration
    const mockTrackingData = {
      trackingNumber,
      status: "En tránsito",
      location: "Centro de distribución Madrid",
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      history: [
        {
          date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          status: "Servicio iniciado",
          location: "Oficina central"
        },
        {
          date: new Date().toISOString(),
          status: "En proceso",
          location: "Centro de distribución Madrid"
        }
      ]
    };
    
    res.json(mockTrackingData);
  });

  const httpServer = createServer(app);
  return httpServer;
}
