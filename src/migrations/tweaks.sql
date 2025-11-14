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


-- ============================================
-- SEED DATA: LOGIN ERROR MESSAGES
-- ============================================
INSERT INTO translations (language_code, translation_key, translation_value, category) VALUES
-- Login
('en', 'login.invalidEmailError', 'Please enter a valid email address', 'login'),
('en', 'login.invalidPasswordError', 'This field cannot be empty', 'login'),
('sv', 'login.invalidEmailError', 'Vänligen skriv in en giltig epost adress', 'login'),
('sv', 'login.invalidPasswordError', 'Detta fält kan inte vara tomt', 'login')

ON CONFLICT (language_code, translation_key) DO NOTHING;


-- ============================================
-- SEED DATA: Demo User
-- ============================================
INSERT INTO users (email, password_hash, first_name, last_name, is_active)
VALUES ('test@example.com', '$2a$10$FSypipoM7yJNyjrRfR.2ducIlXCZYMpzGrchCNfsq6vJXM4pTmLme', 'Test', 'User', true)
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- SEED DATA: LOGIN ERROR MESSAGES
-- ============================================
INSERT INTO translations (language_code, translation_key, translation_value, category) VALUES
-- Login
('en', 'login.passwordMinLengthError', 'This field must be at least 4 characters long.', 'login'),
('en', 'login.userNotFoundError', 'The user does not exist', 'login'),
('sv', 'login.passwordMinLengthError', 'Detta fält måste innehålla minst 4 tecken.', 'login'),
('sv', 'login.userNotFoundError', 'Användaren finns inte', 'login')

ON CONFLICT (language_code, translation_key) DO NOTHING;
