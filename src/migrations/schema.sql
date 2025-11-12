-- Migration: schema.sql
-- Description: Creates initial database schema for fakturera-sow

-- ============================================
-- TRANSLATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS translations (
  id SERIAL PRIMARY KEY,
  language_code VARCHAR(10) NOT NULL,
  translation_key VARCHAR(255) NOT NULL,
  translation_value TEXT NOT NULL,
  category VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_code, translation_key)
);

-- Indexes for translations
CREATE INDEX IF NOT EXISTS idx_translations_language ON translations(language_code);
CREATE INDEX IF NOT EXISTS idx_translations_key ON translations(translation_key);
CREATE INDEX IF NOT EXISTS idx_translations_category ON translations(category);
