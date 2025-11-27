import { 
  type User, type InsertUser, 
  type ContactRequest, type InsertContactRequest, 
  type ServiceQuote, type InsertServiceQuote,
  type Tracking, type InsertTracking,
  type ShippingRoute, type InsertShippingRoute,
  type StatusHistory, type InsertStatusHistory,
  type TrackingStatusType,
  users, contactRequests, serviceQuotes, trackings, shippingRoutes, statusHistory 
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, desc, and, lte, or, isNull } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
  getAllContactRequests(): Promise<ContactRequest[]>;
  
  createServiceQuote(quote: InsertServiceQuote): Promise<ServiceQuote>;
  getAllServiceQuotes(): Promise<ServiceQuote[]>;
  
  // Tracking operations
  getTracking(trackingId: string): Promise<Tracking | undefined>;
  createTracking(tracking: InsertTracking): Promise<Tracking>;
  updateTrackingStatus(trackingId: string, newStatus: TrackingStatusType, notes?: string): Promise<boolean>;
  getTrackingHistory(trackingId: string, includeFuture?: boolean): Promise<StatusHistory[]>;
  getAllTrackings(): Promise<Tracking[]>;
  
  // Shipping routes operations
  getShippingRoute(origin: string, destination: string): Promise<ShippingRoute | undefined>;
  createShippingRoute(route: InsertShippingRoute): Promise<ShippingRoute>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createContactRequest(insertRequest: InsertContactRequest): Promise<ContactRequest> {
    const [request] = await db.insert(contactRequests).values(insertRequest).returning();
    return request;
  }

  async getAllContactRequests(): Promise<ContactRequest[]> {
    return await db.select().from(contactRequests).orderBy(desc(contactRequests.createdAt));
  }

  async createServiceQuote(insertQuote: InsertServiceQuote): Promise<ServiceQuote> {
    const [quote] = await db.insert(serviceQuotes).values(insertQuote).returning();
    return quote;
  }

  async getAllServiceQuotes(): Promise<ServiceQuote[]> {
    return await db.select().from(serviceQuotes).orderBy(desc(serviceQuotes.createdAt));
  }

  // Tracking operations
  async getTracking(trackingId: string): Promise<Tracking | undefined> {
    const [tracking] = await db.select().from(trackings).where(eq(trackings.trackingId, trackingId));
    return tracking || undefined;
  }

  async createTracking(insertTracking: InsertTracking): Promise<Tracking> {
    const [tracking] = await db.insert(trackings).values(insertTracking).returning();
    return tracking;
  }

  async updateTrackingStatus(trackingId: string, newStatus: TrackingStatusType, notes?: string): Promise<boolean> {
    try {
      // Get current tracking to log the change
      const currentTracking = await this.getTracking(trackingId);
      if (!currentTracking) {
        return false;
      }

      // Update tracking status
      await db.update(trackings)
        .set({ status: newStatus, updatedAt: new Date() })
        .where(eq(trackings.trackingId, trackingId));

      // Log status change
      await db.insert(statusHistory).values({
        trackingId,
        oldStatus: currentTracking.status,
        newStatus,
        notes,
      });

      return true;
    } catch (error) {
      console.error("Error updating tracking status:", error);
      return false;
    }
  }

  async getTrackingHistory(trackingId: string, includeFuture: boolean = true): Promise<StatusHistory[]> {
    if (includeFuture) {
      return await db.select().from(statusHistory)
        .where(eq(statusHistory.trackingId, trackingId))
        .orderBy(statusHistory.changedAt, statusHistory.id);
    }
    
    const now = new Date();
    return await db.select().from(statusHistory)
      .where(and(
        eq(statusHistory.trackingId, trackingId),
        or(
          isNull(statusHistory.changedAt),
          lte(statusHistory.changedAt, now)
        )
      ))
      .orderBy(statusHistory.changedAt, statusHistory.id);
  }

  async getAllTrackings(): Promise<Tracking[]> {
    return await db.select().from(trackings).orderBy(desc(trackings.createdAt));
  }

  async getShippingRoute(origin: string, destination: string): Promise<ShippingRoute | undefined> {
    const [route] = await db.select().from(shippingRoutes)
      .where(and(
        eq(shippingRoutes.originCountry, origin),
        eq(shippingRoutes.destinationCountry, destination)
      ));
    return route || undefined;
  }

  async createShippingRoute(insertRoute: InsertShippingRoute): Promise<ShippingRoute> {
    const [route] = await db.insert(shippingRoutes).values(insertRoute).returning();
    return route;
  }
}

export const storage = new DatabaseStorage();
