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

## Recent Changes (October 2025)

- **Comprehensive Tracking History System (October 11, 2025)**:
  - **Automatic Event Generation**: Implemented full lifecycle event tracking for all shipments
    - **On Creation**: Auto-generates "Recibido en oficinas de [estado origen]" and "Esperando confirmación de pago" events
    - **On Payment Confirmation**: Adds "Pago confirmado" event to history
    - **On Shipping**: Generates complete route progression events with all intermediate states
  - **Route State Detection**: Integrated OpenRouteService reverse geocoding to identify all states along delivery route
    - Samples 4 waypoints along the route geometry for balanced API usage and accuracy
    - Identifies unique states the package passes through from origin to destination
    - Fallback mechanism uses only origin state if API fails
  - **Complete Route History**: Auto-generates chronological events showing package journey
    - "Salió de oficinas de [estado]" for departure from each state
    - "Llegó a oficina de [estado]" for arrival at each state
    - Events created in correct sequence from origin through all intermediate states to final destination
  - **Database Schema Updates**: 
    - Added route_states, sender_lat, sender_lon, delivery_lat, delivery_lon columns to trackings table
    - Modified status_history ordering to use (changed_at, id) for deterministic chronological display
  - **Backend Updates**:
    - Modified getTrackingHistory() to order by (changed_at, id) preventing non-deterministic ordering of same-timestamp events
    - Ensured consistent chronological display across web interface and bot
  - **Bot Enhancements**:
    - Added generate_route_history_events() function in database.py for bulk event creation
    - Modified ship_package() in admin_panel.py to trigger automatic route event generation
    - Integrated reverse geocoding in openroute_service.py with get_route_states() function

- **Database Configuration (October 11, 2025)**: 
  - **Unified Replit PostgreSQL Database**: Successfully configured a single Replit PostgreSQL database shared by both the web application and Telegram bot
  - **Database URL Management**: Updated all scripts to use DATABASE_URL directly instead of constructing from individual PG variables for consistency
  - **Database Schema**: Fully configured with 6 tables (users, contact_requests, service_quotes, trackings, shipping_routes, status_history)
  - **Default Data**: Pre-populated shipping_routes with 14 default routes for Spain to various countries
  - **Secret Management**: All required secrets configured (DATABASE_URL, BOT_TOKEN, CHANNEL_ID, ADMIN_TOKEN, ORS_API_KEY, OWNER_TELEGRAM_ID)
  - **Scripts Updated**: Modified bot/setup_db.py and bot/migrate_db.py to use DATABASE_URL directly for reliable connections
  
- **Telegram Bot Role-Based Permissions**: Implemented secure two-tier permission system for admin panel
  - **Owner Role**: Full access to all trackings across all administrators (identified via OWNER_TELEGRAM_ID environment variable)
  - **Admin Role**: Can only view and manage trackings they personally created
  - **Database Schema**: Added `created_by_admin_id` column to trackings table to track tracking ownership
  - **Security Hardening**: 
    - Normalized OWNER_TELEGRAM_ID to integer at startup for consistent type-safe comparisons
    - Eliminated all fallback queries that could bypass admin filtering
    - admin_id always derived from authenticated user (update.effective_user.id) - never from callback data or external parameters
    - Added permission verification before all sensitive operations (confirm payment, ship package, mark delivered, delete tracking, apply delay)
  - **Filtered Views**: Admin filtering applies to all tracking views (retained packages, payment confirmations, shipment management, statistics, search results)
  - **Models Updated**: Added `created_by_admin_id` field to Tracking dataclass in bot/models.py

## Previous Changes (August 2025)
- **Package Size Icons Update**: Updated TrackingHero component to use custom package images for size selection icons (2kg, 5kg, 10kg) and added missing 20kg option with proper icon
- **Enhanced Package Selection**: Package size selection now displays authentic package icons provided by user instead of generic Package icons from Lucide
- **Action Buttons**: Added "COMENZAR ENVÍO" and "MÁS INFO" buttons to complete the package selection interface
- **Administrative Services Icons**: Updated "Siempre pensando en ti" section with user-provided images for Gestión Aduanera, Trámites DGT, and Administración Pública (16x16 size for better visibility matching Correos.es design)
- **Online Store Section Icon**: Replaced custom SVG illustration in "Compra en nuestra tienda online" section with user's exact image showing mobile phone with shopping cart and shopping bags
- **Travel Section Image**: Updated "Viaja y disfruta con Correos" section with user's exact image showing tourists with map and camera exploring a historic city plaza
- **Store Services Image**: Updated "¿Quieres comprar en nuestras tiendas o enviar dinero?" section with user's exact image showing authentic Correos yellow signage and logo
- **Footer Logo Update**: Replaced "EP" text with authentic Correos logo (crown and postal horn) and adjusted footer background color to match Correos.es design
- **Footer Structure Simplification**: Removed collapsible menu sections and reorganized footer to match Correos.es reference layout with social media icons at top, followed by app downloads, payment methods, and legal section

## Previous Changes (January 2025)
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
- **Enhanced Footer**: Implemented complete mobile-responsive footer with collapsible menus ("Para ti", "Para tu empresa", "Para tu interés", headphones icon), authentic App Store/Google Play download buttons, detailed payment method cards (Mastercard, PayPal, Maestro, Visa, American Express), and official trust certificate seal
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