import { Translation } from '../lib/ops/translation.js';

export class TranslationController {
  static async getAllTranslations(req, res) {
    try {
      // Get all translations as nested objects for all languages
      const allTranslations = await Translation.translationsAsNestedObject();
      if (Object.keys(allTranslations).length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No translations found'
        });
      }
      
      res.json({
        success: true,
        data: allTranslations
      });
    } catch (error) {
      console.error('Get all translations error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};
