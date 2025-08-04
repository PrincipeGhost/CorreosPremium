# Overview

This is a modern full-stack web application built with a React frontend and Express.js backend, designed as a package delivery and shipping service platform inspired by Correos.es. The application features a corporate website with package tracking functionality, shipping calculators, service offerings, and administrative tools. The platform is branded as "EnvíosPro" and focuses on package delivery services across Spain with real-time tracking capabilities. The design closely matches the mobile experience of Correos.es with dedicated sections for inclusive messaging, administrative services, and shipment tracking.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development/build tooling
- **UI Library**: Comprehensive component system using Radix UI primitives with custom styling
- **Styling**: Tailwind CSS with CSS custom properties for theming, including corporate brand colors
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation resolvers

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for contact requests and service quotes
- **Validation**: Zod schemas for request validation with detailed error handling
- **Development**: Hot module replacement via Vite integration in development mode

## Data Layer
- **Database**: PostgreSQL with Neon Database serverless driver
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Shared schema definitions between client and server using Drizzle-Zod integration
- **Storage Interface**: Abstracted storage layer with in-memory fallback for development

## Component Architecture
- **Design System**: Shadcn/ui components with consistent styling and accessibility
- **Layout Structure**: Modular page sections (Hero, Services, Contact forms, etc.)
- **Responsive Design**: Mobile-first approach with breakpoint-based adaptations
- **Accessibility**: WCAG compliant components with proper ARIA attributes

## Database Schema
- **Users**: Basic user management with username/password authentication
- **Contact Requests**: Form submissions with contact details and service type
- **Service Quotes**: Detailed quote requests with project specifications and client information
- **Package Tracking**: Mock tracking system with predefined tracking numbers for demonstration
- **Timestamps**: Automatic creation timestamps for audit trails

## Recent Changes (January 2025)
- **Branding Update**: Changed from generic "Tu Empresa" to "EnvíosPro" for package delivery focus
- **Correos.es Design Implementation**: Adapted homepage design to match Correos.es layout and functionality
- **Package Tracking System**: Added dedicated tracking page with real-time package status updates
- **Shipping Calculator**: Implemented package size selector (XS/S/M/L) with weight and dimension specifications
- **Color Scheme**: Updated to Correos-style blue (#2B5CB8) and orange (#E55722) color palette
- **Navigation**: Added routing for /tracking page with functional package search
- **Mock Data**: Created test tracking numbers (EP001234567ES, EP987654321ES, EP456789123ES) for demonstration
- **Mobile-First Sections**: Added "#EligeCorreos" section with inclusive messaging "De: todos y todas, Para: todos y todas"
- **Administrative Services**: Implemented "Siempre pensando en ti" section with DGT procedures, customs management, and public administration services
- **Shipment Waiting Section**: Added "¿Estás esperando un envío?" informational section
- **Shipping Guide Section**: Added "¿Quieres hacer un envío?" with shipping information and guidance
- **Online Store Section**: Implemented detailed "online" section with comprehensive product descriptions matching Correos.es content
- **Travel Services**: Added "Viaja y disfruta con Correos" section featuring Camino de Santiago experiences with hero image
- **Store Services**: Implemented "¿Quieres comprar en nuestras tiendas o enviar dinero?" with corporate imagery
- **Blog Section**: Added "Descubre Actualidad, el Blog de Correos" with call-to-action button
- **Special Products**: Implemented "Criptosello - Mortadelo 2024" section for collectible stamps
- **Mobile App Promotion**: Added "Ya disponible la nueva App de Correos" with download buttons
- **Enhanced Footer**: Updated footer with social media links, app downloads, payment methods, and legal links
- **Complete Mobile Experience**: The application now provides a comprehensive mobile-first experience that closely mirrors the Correos.es interface and user flow with all major sections implemented

## Development Tooling
- **Build System**: Vite with React plugin and TypeScript support
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Development Experience**: Hot reload, error overlays, and Replit-specific tooling integration
- **Path Aliases**: Organized imports with @ prefixes for clean code organization

# External Dependencies

## Core Framework Dependencies
- **@vitejs/plugin-react**: React support for Vite build system
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing library for React applications

## Database and Backend
- **@neondatabase/serverless**: Serverless PostgreSQL database driver
- **drizzle-orm**: Type-safe ORM with excellent TypeScript integration
- **drizzle-kit**: Database migration and schema management tools
- **express**: Web application framework for Node.js

## UI and Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants
- **lucide-react**: Modern icon library with React components

## Form and Validation
- **react-hook-form**: Performant forms with minimal re-renders
- **@hookform/resolvers**: Integration layer for validation libraries
- **zod**: TypeScript-first schema validation library
- **zod-validation-error**: User-friendly error messages from Zod schemas

## Development and Build Tools
- **typescript**: Static type checking and modern JavaScript features
- **tsx**: TypeScript execution engine for development
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-***: Replit-specific development enhancements