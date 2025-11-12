import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase, checkDatabaseConnection } from './config/db.js';

import translationRoutes from './routes/translation.routes.js';

dotenv.config();

const app = express();

/**
 * -------------- GENERAL SETUP ----------------
 */
const PORT = process.env.PORT || 8000;
const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;

/**
 * -------------- MIDDLEWARES ----------------
 */
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

/**
 * -------------- ROUTES ----------------
 */
// Health check
app.get('/health', async (req, res) => {
  const dbStatus = await checkDatabaseConnection();
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: dbStatus ? 'connected' : 'disconnected'
  });
});

// API routes
app.use('/api/translations', translationRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

/**
 * -------------- ERROR HANDLING MIDDLEWARE ----------------
 */
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

/**
 * -------------- SERVER ----------------
 */
(async () => {
  try {
    // Connect to database
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on ${BACKEND_URL}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`Health check: ${BACKEND_URL}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();

export default app;

