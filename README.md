# Fakturera SOW Backend

A Node.js REST API backend built with Express for the Fakturera Statement of Work system.

## Technology Stack

### Core Framework
- **Node.js**: ES Modules (ESM)
- **Express**: ^5.1.0

### Database
- **PostgreSQL**: Database system
- **pg**: ^8.16.3 (PostgreSQL client for Node.js)

### Authentication & Security
- **jsonwebtoken**: ^9.0.2 (JWT token generation and verification)
- **bcryptjs**: ^3.0.3 (Password hashing)
- **express-validator**: ^7.3.0 (Request validation middleware)

### Middleware & Utilities
- **cors**: ^2.8.5 (Cross-Origin Resource Sharing)
- **dotenv**: ^17.2.3 (Environment variable management)

### Development Tools
- **nodemon**: ^3.1.11 (Auto-restart server during development)

## Project Structure

```
src/
├── config/
│   └── db.js              # Database connection and pool configuration
├── controllers/
│   ├── auth.controller.js      # Authentication logic
│   ├── pricelist.controller.js # Pricelist operations
│   └── translation.controller.js # Translation management
├── lib/
│   ├── migrations.js      # Migration utilities
│   ├── ops/               # Database operations
│   │   ├── db-migrations.js
│   │   ├── product.js
│   │   ├── translation.js
│   │   └── user.js
│   └── utils.js           # Helper functions
├── middleware/
│   └── auth.middleware.js # JWT authentication middleware
├── migrations/
│   ├── schema.sql         # Database schema
│   └── tweaks.sql         # Database tweaks/migrations
├── routes/
│   ├── auth.routes.js          # Authentication endpoints
│   ├── pricelist.routes.js     # Pricelist endpoints
│   └── translation.routes.js   # Translation endpoints
├── server.js              # Main application entry point
└── tools/
    └── run-tweaks.js      # Migration runner
```

## Available Scripts

- `npm start` - Run database migrations and start production server
- `npm run dev` - Run database migrations and start development server with auto-reload
- `npm run server` - Start server with nodemon (without migrations)
- `npm run migrate` - Run database migrations only

## Environment Variables

Required environment variables (configured via `.env` file):
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (default: 8000)
- `BACKEND_URL` - Backend server URL
- `FRONTEND_URL` - Frontend URL for CORS configuration
- `JWT_SECRET` - Secret key for JWT token signing
- `NODE_ENV` - Environment mode (development/production)

## API Endpoints

- `/health` - Health check endpoint
- `/api/auth` - Authentication routes
- `/api/translations` - Translation management routes
- `/api/pricelist` - Pricelist routes
