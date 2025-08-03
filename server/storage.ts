import { type User, type InsertUser, type ContactRequest, type InsertContactRequest, type ServiceQuote, type InsertServiceQuote } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
  getAllContactRequests(): Promise<ContactRequest[]>;
  
  createServiceQuote(quote: InsertServiceQuote): Promise<ServiceQuote>;
  getAllServiceQuotes(): Promise<ServiceQuote[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactRequests: Map<string, ContactRequest>;
  private serviceQuotes: Map<string, ServiceQuote>;

  constructor() {
    this.users = new Map();
    this.contactRequests = new Map();
    this.serviceQuotes = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactRequest(insertRequest: InsertContactRequest): Promise<ContactRequest> {
    const id = randomUUID();
    const request: ContactRequest = { 
      ...insertRequest, 
      id, 
      createdAt: new Date() 
    };
    this.contactRequests.set(id, request);
    return request;
  }

  async getAllContactRequests(): Promise<ContactRequest[]> {
    return Array.from(this.contactRequests.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createServiceQuote(insertQuote: InsertServiceQuote): Promise<ServiceQuote> {
    const id = randomUUID();
    const quote: ServiceQuote = { 
      ...insertQuote, 
      id, 
      createdAt: new Date() 
    };
    this.serviceQuotes.set(id, quote);
    return quote;
  }

  async getAllServiceQuotes(): Promise<ServiceQuote[]> {
    return Array.from(this.serviceQuotes.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
