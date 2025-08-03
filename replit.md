# Overview

This is a modern full-stack web application built with a React frontend and Express.js backend, designed to provide professional services for businesses. The application features a corporate website with service offerings, contact forms, quote requests, and resource management. It uses a PostgreSQL database with Drizzle ORM for data persistence and includes comprehensive UI components for a polished user experience.

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
- **Timestamps**: Automatic creation timestamps for audit trails

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