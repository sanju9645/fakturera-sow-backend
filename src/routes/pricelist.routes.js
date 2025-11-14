import express from 'express';
import { PricelistController } from '../controllers/pricelist.controller.js';
import AuthMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected routes - require authentication
router.get('/', AuthMiddleware.authenticate, (req, res) => PricelistController.getPricelist(req, res));

export default router;

