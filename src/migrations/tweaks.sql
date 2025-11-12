-- Migration: tweaks.sql
-- Description: Tweaks the database schema

-- ============================================
-- SEED DATA: TRANSLATIONS
-- ============================================
-- English Translations
INSERT INTO translations (language_code, translation_key, translation_value, category) VALUES
-- Navigation
('en', 'nav.home', 'Home', 'nav'),
('en', 'nav.order', 'Order', 'nav'),
('en', 'nav.ourCustomers', 'Our Customers', 'nav'),
('en', 'nav.aboutUs', 'About us', 'nav'),
('en', 'nav.contactUs', 'Contact Us', 'nav'),

-- Login
('en', 'login.title', 'Log in', 'login'),
('en', 'login.emailLabel', 'Enter your email address', 'login'),
('en', 'login.emailPlaceholder', 'Email address', 'login'),
('en', 'login.passwordLabel', 'Enter your password', 'login'),
('en', 'login.passwordPlaceholder', 'Password', 'login'),
('en', 'login.button', 'Log in', 'login'),
('en', 'login.register', 'Register', 'login'),
('en', 'login.forgottenPassword', 'Forgotten password?', 'login'),

-- Language
('en', 'language.english', 'English', 'language'),
('en', 'language.swedish', 'Svenska', 'language')

ON CONFLICT (language_code, translation_key) DO NOTHING;

-- Swedish Translations
INSERT INTO translations (language_code, translation_key, translation_value, category) VALUES
-- Navigation
('sv', 'nav.home', 'Hem', 'nav'),
('sv', 'nav.order', 'Beställ', 'nav'),
('sv', 'nav.ourCustomers', 'Våra kunder', 'nav'),
('sv', 'nav.aboutUs', 'Om oss', 'nav'),
('sv', 'nav.contactUs', 'Kontakta oss', 'nav'),

-- Login
('sv', 'login.title', 'Logga in', 'login'),
('sv', 'login.emailLabel', 'Skriv in din epost adress', 'login'),
('sv', 'login.emailPlaceholder', 'Epost adress', 'login'),
('sv', 'login.passwordLabel', 'Skriv in ditt lösenord', 'login'),
('sv', 'login.passwordPlaceholder', 'Lösenord', 'login'),
('sv', 'login.button', 'Logga in', 'login'),
('sv', 'login.register', 'Registrera dig', 'login'),
('sv', 'login.forgottenPassword', 'Glömt lösenord?', 'login'),

-- Language
('sv', 'language.english', 'English', 'language'),
('sv', 'language.swedish', 'Svenska', 'language')

ON CONFLICT (language_code, translation_key) DO NOTHING;

