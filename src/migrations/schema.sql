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


-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for users
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_active ON users(is_active);
