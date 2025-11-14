import { query } from '../../config/db.js';

export class Translation {
  /**
   * Transform flat translation rows into nested object structure
   */
  static formatTranslationsAsNestedObject(translationRows) {
    const nested = {};
    
    translationRows.forEach(({ translation_key, translation_value }) => {
      const keys = translation_key.split('.');
      let current = nested;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = translation_value;
    });
    
    return nested;
  }


  static async translationsAsNestedObject() {
    const result = await query(
      `SELECT language_code, translation_key, translation_value, category
        FROM translations
        ORDER BY language_code, category, translation_key`
    );
    
    // Group by language
    const translationsByLanguage = {};
    
    result.rows.forEach(({ language_code, translation_key, translation_value }) => {
      if (!translationsByLanguage[language_code]) {
        translationsByLanguage[language_code] = [];
      }
      
      translationsByLanguage[language_code].push({ translation_key, translation_value });
    });
    
    // Format each language's translations as nested object
    const formattedTranslations = {};
    Object.keys(translationsByLanguage).forEach(languageCode => {
      formattedTranslations[languageCode] = this.formatTranslationsAsNestedObject(
        translationsByLanguage[languageCode]
      );
    });
    
    return formattedTranslations;
  }
}