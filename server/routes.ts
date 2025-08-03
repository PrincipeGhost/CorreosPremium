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

  // Package tracking endpoint
  app.get("/api/track/:trackingNumber", async (req, res) => {
    const { trackingNumber } = req.params;
    
    // Simulate different tracking scenarios based on tracking number
    const mockTrackingDatabase = {
      "EP001234567ES": {
        trackingNumber,
        status: "Entregado",
        location: "Entregado en destino",
        estimatedDelivery: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        history: [
          {
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            status: "Servicio iniciado",
            location: "Oficina EnvíosPro Madrid"
          },
          {
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            status: "En tránsito",
            location: "Centro de distribución Madrid"
          },
          {
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            status: "Entregado",
            location: "Entregado en destino"
          }
        ]
      },
      "EP987654321ES": {
        trackingNumber,
        status: "En tránsito",
        location: "Centro de distribución Barcelona",
        estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        history: [
          {
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            status: "Servicio iniciado",
            location: "Oficina EnvíosPro Barcelona"
          },
          {
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            status: "En proceso",
            location: "Centro de clasificación Barcelona"
          },
          {
            date: new Date().toISOString(),
            status: "En tránsito",
            location: "Centro de distribución Barcelona"
          }
        ]
      },
      "EP456789123ES": {
        trackingNumber,
        status: "En proceso",
        location: "Centro de clasificación Valencia",
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        history: [
          {
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            status: "Servicio iniciado",
            location: "Oficina EnvíosPro Valencia"
          },
          {
            date: new Date().toISOString(),
            status: "En proceso",
            location: "Centro de clasificación Valencia"
          }
        ]
      }
    };
    
    const trackingData = mockTrackingDatabase[trackingNumber as keyof typeof mockTrackingDatabase];
    
    if (trackingData) {
      res.json(trackingData);
    } else {
      res.status(404).json({ 
        message: "Número de seguimiento no encontrado",
        trackingNumber 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
