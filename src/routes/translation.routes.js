import express from 'express';
import { TranslationController } from '../controllers/translation.controller.js';

const router = express.Router();

// Get all translations for all languages
router.get('/', TranslationController.getAllTranslations);

export default router;

