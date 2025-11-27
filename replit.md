# Overview

This project, "EnvíosPro," is a full-stack web application inspired by Correos.es, designed for package delivery and shipping services. It features a React frontend and an Express.js backend, offering package tracking, shipping calculators, service listings, and administrative tools. The platform aims to provide real-time tracking capabilities and a user experience that mirrors the mobile interface of Correos.es, including sections for inclusive messaging, administrative services, and comprehensive shipment tracking.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend
- **Framework**: React 18 with TypeScript and Vite.
- **UI/UX**: Radix UI primitives, Shadcn/ui components, Tailwind CSS for styling, and CSS custom properties for theming.
- **Routing**: Wouter for client-side routing.
- **State Management**: TanStack Query for server state.
- **Form Handling**: React Hook Form with Zod validation.
- **Design**: Mobile-first, responsive design with WCAG compliant and accessible components.

## Backend
- **Runtime**: Node.js with Express.js.
- **Language**: TypeScript with ES modules.
- **API**: RESTful endpoints for contact and service quotes.
- **Validation**: Zod schemas for request validation.

## Data Layer
- **Database**: PostgreSQL with Neon Database serverless driver.
- **ORM**: Drizzle ORM for type-safe operations.
- **Schema**: Shared schema definitions using Drizzle-Zod.
- **Storage**: Abstracted storage layer with in-memory fallback.
- **Database Schema Details**: Includes tables for users, contact requests, service quotes, package tracking, shipping routes, and status history. Package tracking includes detailed route progression with automatic event generation, real-time status updates, and chronological event history.

## System Design Choices
- **Branding**: "EnvíosPro" with Correos-style blue and orange color palette.
- **Features**: Dedicated tracking page, shipping calculator (XS/S/M/L), "EligeCorreos" inclusive messaging, administrative services (DGT, customs, public administration), shipping guides, online store section, travel services, blog, special products, and mobile app promotion.
- **Footer**: Comprehensive mobile-responsive footer with social media, app downloads, payment methods, and legal sections, mirroring Correos.es design.
- **Development Tooling**: Vite build system, TypeScript strict mode, hot reload, and Replit-specific tooling.

# External Dependencies

- **Framework & Build**: `@vitejs/plugin-react`, `tsx`, `esbuild`.
- **State Management**: `@tanstack/react-query`.
- **Routing**: `wouter`.
- **Database**: `@neondatabase/serverless`, `drizzle-orm`, `drizzle-kit`.
- **Backend**: `express`.
- **UI & Styling**: `@radix-ui/*`, `tailwindcss`, `class-variance-authority`, `lucide-react`.
- **Forms & Validation**: `react-hook-form`, `@hookform/resolvers`, `zod`, `zod-validation-error`.
- **Timezone Handling**: `pytz`.
- **External APIs**: OpenRouteService for geocoding and route state detection.