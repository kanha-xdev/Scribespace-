# Overview

QuillSpace is a premium blogging and content creation platform that enables writers, readers, and thinkers to share ideas and discover engaging stories. The platform features a modern, responsive design with a focus on high-quality content presentation and user experience. Built as a full-stack web application, it combines a React-based frontend with an Express.js backend and PostgreSQL database for scalable content management.

# User Preferences

Preferred communication style: Simple, everyday language.

## Team Project Status
Working on QuillSpace as part of a 4-member team with divided responsibilities:
- **Your role**: Frontend - pages & components (React + Tailwind UI) ✅ **COMPLETE**
- **Team structure**: Using branch-based development
- **Original roadmap**: Separate backend/ and frontend/ directories with MongoDB
- **Current status**: Frontend complete and deployed to Vercel, ready for backend integration

## Recent Updates (January 2025)
- ✅ **Frontend deployment prepared**: Resolved all build errors for Vercel deployment
- ✅ **Schema independence**: Created local schemas to replace @shared dependencies
- ✅ **Mock API system**: Frontend works standalone with realistic demo data
- ✅ **TypeScript errors fixed**: Clean build with no compilation errors
- ✅ **Team documentation**: Clear API requirements and integration guide created

# System Architecture

## Frontend Architecture
The client uses a modern React setup with TypeScript and Vite as the build tool. The UI is built with shadcn/ui components based on Radix UI primitives, providing a consistent and accessible design system. The application follows a page-based routing structure using Wouter for client-side navigation.

Key architectural decisions:
- **Component Library**: Adopted shadcn/ui for consistent, customizable UI components built on Radix UI
- **Styling**: Uses Tailwind CSS with CSS variables for theming, including dark mode support
- **State Management**: Leverages React Query (TanStack Query) for server state management and data fetching
- **Form Handling**: Implements React Hook Form with Zod validation for type-safe form management
- **Build System**: Vite for fast development and optimized production builds

## Backend Architecture
The server uses Express.js with TypeScript for type safety and modern JavaScript features. The architecture implements a layered approach with clear separation between routing, business logic, and data access.

Key architectural decisions:
- **Framework**: Express.js for its simplicity and extensive ecosystem
- **Storage Layer**: Abstract storage interface (IStorage) allows for flexible data persistence implementation
- **Development Setup**: Integrated Vite middleware for seamless development experience
- **API Design**: RESTful endpoints with consistent error handling and logging

## Data Layer
The application uses Drizzle ORM for database interactions with PostgreSQL as the primary database. The schema design supports core blogging features including articles, comments, user management, and social features.

Key architectural decisions:
- **ORM Choice**: Drizzle ORM provides type-safe database queries and excellent TypeScript integration
- **Schema Validation**: Zod schemas ensure data integrity at both API and database levels
- **Database**: PostgreSQL for robust relational data management
- **Migrations**: Drizzle-kit handles database schema migrations

## Core Features
- **Article Management**: Full CRUD operations for articles with categories, tags, and featured images
- **User System**: User profiles, authentication, and social features like following
- **Interactive Features**: Comments, likes, bookmarks, and article sharing
- **Content Discovery**: Search functionality, category filtering, and featured content
- **Rich Text Editing**: Custom rich text editor for article creation

# External Dependencies

## Database Services
- **Neon Database**: PostgreSQL hosting via @neondatabase/serverless for serverless-compatible database connections
- **connect-pg-simple**: Session store for PostgreSQL integration

## UI and Styling
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives (@radix-ui/react-*)
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Carousel/slider component for content presentation

## State Management and Data Fetching
- **TanStack React Query**: Server state management and data synchronization
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation for type-safe data handling

## Development and Build Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment optimizations for Replit platform

## Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx & tailwind-merge**: Conditional CSS class handling
- **nanoid**: Unique ID generation
- **class-variance-authority**: Type-safe CSS variant management