import express from 'express';
import { PricelistController } from '../controllers/pricelist.controller.js';
import AuthMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', AuthMiddleware.authenticate, (req, res) => PricelistController.getPricelist(req, res));
router.put('/:id', AuthMiddleware.authenticate, (req, res) => PricelistController.updateProduct(req, res));

export default router;

