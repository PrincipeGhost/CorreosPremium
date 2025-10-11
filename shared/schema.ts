import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, bigint, serial } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactRequests = pgTable("contact_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  serviceType: text("service_type").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const serviceQuotes = pgTable("service_quotes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  serviceType: text("service_type").notNull(),
  location: text("location").notNull(),
  projectSize: text("project_size").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tracking system tables from Telegram bot
export const trackings = pgTable("trackings", {
  trackingId: varchar("tracking_id", { length: 50 }).primaryKey(),
  recipientName: varchar("recipient_name", { length: 255 }).notNull(),
  deliveryAddress: text("delivery_address").notNull(),
  countryPostal: varchar("country_postal", { length: 255 }).notNull(),
  dateTime: varchar("date_time", { length: 255 }).notNull(),
  packageWeight: varchar("package_weight", { length: 100 }).notNull(),
  productName: varchar("product_name", { length: 255 }).notNull(),
  senderName: varchar("sender_name", { length: 255 }).notNull(),
  senderAddress: text("sender_address").notNull(),
  senderCountry: varchar("sender_country", { length: 255 }).notNull(),
  senderState: varchar("sender_state", { length: 255 }).notNull(),
  productPrice: varchar("product_price", { length: 100 }).notNull(),
  status: varchar("status", { length: 50 }).default("RETENIDO").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  estimatedDeliveryDate: varchar("estimated_delivery_date", { length: 255 }),
  actualDelayDays: integer("actual_delay_days").default(0),
  userTelegramId: bigint("user_telegram_id", { mode: "number" }),
  username: varchar("username", { length: 255 }),
  createdByAdminId: bigint("created_by_admin_id", { mode: "number" }),
});

export const shippingRoutes = pgTable("shipping_routes", {
  id: serial("id").primaryKey(),
  originCountry: varchar("origin_country", { length: 255 }).notNull(),
  destinationCountry: varchar("destination_country", { length: 255 }).notNull(),
  estimatedDays: integer("estimated_days").notNull(),
});

export const statusHistory = pgTable("status_history", {
  id: serial("id").primaryKey(),
  trackingId: varchar("tracking_id", { length: 50 }).notNull(),
  oldStatus: varchar("old_status", { length: 50 }),
  newStatus: varchar("new_status", { length: 50 }).notNull(),
  changedAt: timestamp("changed_at").defaultNow(),
  notes: text("notes"),
});

// Relations
export const trackingsRelations = relations(trackings, ({ many }) => ({
  statusHistory: many(statusHistory),
}));

export const statusHistoryRelations = relations(statusHistory, ({ one }) => ({
  tracking: one(trackings, {
    fields: [statusHistory.trackingId],
    references: [trackings.trackingId],
  }),
}));

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactRequestSchema = createInsertSchema(contactRequests).pick({
  name: true,
  email: true,
  phone: true,
  company: true,
  serviceType: true,
  message: true,
});

export const insertServiceQuoteSchema = createInsertSchema(serviceQuotes).pick({
  serviceType: true,
  location: true,
  projectSize: true,
  name: true,
  email: true,
  phone: true,
  company: true,
  description: true,
});

// Status constants matching the Python bot  
export const TRACKING_STATUS = {
  RETENIDO: "RETENIDO",
  CONFIRMAR_PAGO: "CONFIRMAR_PAGO", 
  EN_TRANSITO: "EN_TRANSITO",
  ENTREGADO: "ENTREGADO"
} as const;

export type TrackingStatusType = typeof TRACKING_STATUS[keyof typeof TRACKING_STATUS];

// Tracking system schemas
export const insertTrackingSchema = createInsertSchema(trackings).pick({
  trackingId: true,
  recipientName: true,
  deliveryAddress: true,
  countryPostal: true,
  dateTime: true,
  packageWeight: true,
  productName: true,
  senderName: true,
  senderAddress: true,
  senderCountry: true,
  senderState: true,
  productPrice: true,
  estimatedDeliveryDate: true,
  actualDelayDays: true,
  userTelegramId: true,
  username: true,
  createdByAdminId: true,
}).extend({
  status: z.enum([
    TRACKING_STATUS.RETENIDO,
    TRACKING_STATUS.CONFIRMAR_PAGO, 
    TRACKING_STATUS.EN_TRANSITO,
    TRACKING_STATUS.ENTREGADO
  ]).default(TRACKING_STATUS.RETENIDO),
});

export const updateTrackingStatusSchema = z.object({
  newStatus: z.enum([
    TRACKING_STATUS.RETENIDO,
    TRACKING_STATUS.CONFIRMAR_PAGO,
    TRACKING_STATUS.EN_TRANSITO,
    TRACKING_STATUS.ENTREGADO
  ]),
  notes: z.string().optional(),
});

export const insertShippingRouteSchema = createInsertSchema(shippingRoutes).pick({
  originCountry: true,
  destinationCountry: true,
  estimatedDays: true,
});

export const insertStatusHistorySchema = createInsertSchema(statusHistory).pick({
  trackingId: true,
  oldStatus: true,
  newStatus: true,
  notes: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertContactRequest = z.infer<typeof insertContactRequestSchema>;
export type ContactRequest = typeof contactRequests.$inferSelect;

export type InsertServiceQuote = z.infer<typeof insertServiceQuoteSchema>;
export type ServiceQuote = typeof serviceQuotes.$inferSelect;

// Tracking system types
export type InsertTracking = z.infer<typeof insertTrackingSchema>;
export type Tracking = typeof trackings.$inferSelect;

export type InsertShippingRoute = z.infer<typeof insertShippingRouteSchema>;
export type ShippingRoute = typeof shippingRoutes.$inferSelect;

export type InsertStatusHistory = z.infer<typeof insertStatusHistorySchema>;
export type StatusHistory = typeof statusHistory.$inferSelect;

// Status display with emojis for frontend
export const STATUS_DISPLAY = {
  [TRACKING_STATUS.RETENIDO]: "🔴 RETENIDO",
  [TRACKING_STATUS.CONFIRMAR_PAGO]: "🟡 CONFIRMAR PAGO", 
  [TRACKING_STATUS.EN_TRANSITO]: "🔵 EN TRÁNSITO",
  [TRACKING_STATUS.ENTREGADO]: "🟢 ENTREGADO"
} as const;

// Frontend-friendly tracking interface with computed properties
export interface TrackingWithStatus extends Tracking {
  statusDisplay: string;
  daysSinceCreated: number;
  isDelayed: boolean;
}

// API request types for frontend
export interface TrackingLookupRequest {
  trackingId: string;
}

export interface TrackingCreateRequest extends InsertTracking {}

export interface TrackingUpdateStatusRequest {
  trackingId: string;
  newStatus: TrackingStatusType;
  notes?: string;
}

// API response types  
export interface TrackingLookupResponse {
  tracking: Tracking | null;
  history: StatusHistory[];
  found: boolean;
}

export interface TrackingListResponse {
  trackings: Tracking[];
  total: number;
  byStatus: Record<string, number>;
}

export interface TrackingStatsResponse {
  total: number;
  today: number;
  byStatus: Record<TrackingStatusType, number>;
}
