# Products Microservice

A robust NestJS microservice for managing product data with NATS-based communication, SQLite database with Prisma ORM, and comprehensive CRUD operations.

## Features

- **NATS Microservice**: Built with NestJS microservices using NATS transport
- **Database**: SQLite with Prisma ORM for data persistence
- **Validation**: Input validation using class-validator and DTOs
- **CRUD Operations**: Complete product management functionality (Create, Read, Update, Soft Delete)
- **Pagination**: Built-in pagination support with metadata
- **UUID Support**: Automatic UUID generation for products
- **Soft Delete**: Products are marked as unavailable instead of hard deletion
- **Product Validation**: Bulk product validation for external services
- **Environment Configuration**: Joi-based environment validation
- **Code Quality**: ESLint and Prettier configured
- **Type Safety**: Full TypeScript support

## Installation

1. **Clone the repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file
   cp .env.template .env
   ```
  
   Configure the variables

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   ```

## Running the Application

### Development
```bash
# Watch mode
npm run start:dev

# Debug mode
npm run start:debug
```

### Production
```bash
# Build the application
npm run build

# Run in production mode
npm run start:prod
```

## Microservice Communication

This service communicates via NATS.

## 📁 Project Structure

```
src/
├── app.module.ts           # Main application module
├── main.ts                 # Application entry point
├── common/
│   ├── dto/
│   │   └── pagination.dto.ts
│   └── index.ts
├── config/
│   ├── envs.ts            # Environment validation
│   └── index.ts
└── products/
    ├── dto/
    │   ├── create-product.dto.ts
    │   └── update-product.dto.ts
    ├── products.controller.ts
    ├── products.module.ts
    └── products.service.ts

prisma/
├── schema.prisma          # Database schema
├── dev.db                # SQLite database file
└── migrations/           # Database migrations
```

**Built with using NestJS, Prisma, and TypeScript**