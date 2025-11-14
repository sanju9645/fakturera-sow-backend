import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import AuthMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/login', AuthController.login);

export default router;
