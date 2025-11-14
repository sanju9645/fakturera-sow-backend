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

-- ============================================
-- SEED DATA: NOTFOUND
-- ============================================
INSERT INTO translations (language_code, translation_key, translation_value, category) VALUES
-- NotFound
('en', 'notfound.pageNotFoundError', 'Oops! Page not found', 'notfound'),
('en', 'notfound.returnToHome', 'Return to Home', 'notfound'),
('sv', 'notfound.pageNotFoundError', 'Hoppsan! Sidan hittades inte', 'notfound'),
('sv', 'notfound.returnToHome', 'Tillbaka till startsidan', 'notfound')

ON CONFLICT (language_code, translation_key) DO NOTHING;


-- ============================================
-- SEED DATA: TERMS AND CONDITIONS
-- ============================================
INSERT INTO translations (language_code, translation_key, translation_value, category) VALUES
-- Terms and Conditions (English)
('en', 'terms.title', 'Terms', 'terms'),
('en', 'terms.closeButton', 'Close and Go Back', 'terms'),
('en', 'terms.content', E'<strong>BY</strong> clicking Invoice Now, you choose to register according to the information that you have typed in and the text on the registration page and the terms here, and you at the same time accept the terms here.
You can use the program FOR FREE for 14 days.
123 Fakturera is so easy and self-explanatory that the chance that you will need support is minimal, but if you should need support, we are here for you, with our office manned for the most part of the day. After the trial period, the subscription continues and costs SEK 99 excluding VAT per month, which is billed annually. If you do not want to keep the program, just cancel the trial period by giving notice before 14 days from registration.
You have of course the right to terminate the use of the program without any costs, by giving us notice per email before 14 days from registration, that you do not want to continue with the program, and you then of course do not pay anything.
If we do not receive such a notice from you before 14 days from registration, then the order, for natural reasons, cannot be changed. With registration it is meant the date and time when you did choose to press the button Invoice Now.
Billing is for one year at a time.
The price for 123 Fakturera (offer price SEK 99 per month / ordinary price SEK 159 per month) is for the annual fee Start for one year\'s use of the program.
(When using the offer price of SEK 99, the one-year period is calculated from registration.)
All prices are excluding VAT.
Offer, Inventory Control, Member Invoicing, Multiuser version and English printout are (or can be) additional modules that can be ordered later.
Intermediation, as well as invoicing, may take place from K-Soft Sverige AB, Box 2826, 187 28 Täby. In the future, we may choose to cooperate with another company for e.g. intermediation and invoicing. However, the customer relationship is with us. The payment is made to the company from which the invoice comes.
The annual fee is on a continuous basis, but if you do not wish to continue using the program, all you have to do is give notice thirty days before the start of the next one-year period.
The introductory offer (SEK 99 per month) is for the annual fee Start for the first year. After the first year, the ordinary price is billed, which is currently, for annual fee Start, one hundred and fifty-nine kroner per month, for annual fee Remote control, three hundred kroner per month and for annual fee Pro, three hundred and thirty-three kroner per month. After one year, the annual Remote Control fee is invoiced as standard, but you can choose Start or Pro by giving notice at any time before the due date.
If you choose to keep the program by not notifying us by email within 14 days of registration that you do not wish to continue with the program, you accept that you will pay the invoice for your order. Failure to pay the invoice or late payment does not give the right to cancel the order. We are happy to help you with logo at a cost price.
License for the use of 123 Fakturera is of course sold in accordance with applicable laws.
In order to be able to help you more easily and provide you with support, as well as to comply with the laws, we, for natural reasons, have to store your information.
In connection with the storage of information, the law requires that we provide you with the following information:
If you order as a private person, you have the right to cancel as stated by law. Your information is stored so that we can help you, etc. We will use it to be able to help you if you need help, follow the laws regarding bookkeeping, etc. When there are upgrades and the like, we may send you offers and the like about our products and services by email or the like. You may be contacted by email, post and telephone. If you don\'t want to be contacted, just send us an email about it.
You can at any time ask not to be sent information about upgrades by email, letter or the like, and we will of course not do that. You send such a request to us by email, post or similar.
For natural reasons, we have to store, process and move your data. Your information is stored until further notice. You give us permission to store, process and move your data, as well as to send you offers and the like by email, letter and the like, and tell others that you are customer. Due to the way it works with software, permission also needs to be given to other parties. The permission is therefore granted to us, as well as to the companies and/or person(s) who own the software, the source code, the website and the like. It is also given to current and future companies owned and/or controlled by one or more of those who currently own and/or control us. It is also given to current and future companies owned and/or controlled by one or more of those who currently own and/or control the companies (if any), which own or will own the software, source code, website and the like. It is also given to current and future persons (if any) who own or will own the software, source code, website and the like. This applies both to current and future products and services. It is also given to another company, (like K-Soft Sverige AB), which we can use to send/sell products, upgrades and the like, either by intermediation or otherwise.
You of course have the right to request access to, change and deletion of the information we hold about you. You also have the right to request restriction of data processing, and to object to data processing and the right to data portability. You have the right to complain to the supervisory authority. You can find more legal information about us here. The laws of Ireland are the applicable laws. Placing an order is of course completely voluntary. Of course, we do not use any automated profiling or decisions.
If you wish to contact us, please use the information on this website.
Click on Invoice Now to register according to the information you have entered and the terms here. (Date and time of admission are entered automatically in our registers.)
Our experience is that our customers are very satisfied with the way we work and hope and believe that this will also be your experience.
Have a great day!', 'terms'),

-- Terms and Conditions (Swedish)
('sv', 'terms.title', 'Villkor', 'terms'),
('sv', 'terms.closeButton', 'Stäng och gå tillbaka', 'terms'),
('sv', 'terms.content', E'<strong>GENOM</strong> ATT klicka på Fakturera Nu så väljer ni att registrera enligt den information som ni har lagt in och texten på registreringssidan och villkoren här, och accepterar samtidigt villkoren här.
Ni kan använda programmet GRATIS i 14 dagar.
123 Fakturera är så lätt och självförklarande att chansen för att du kommer behöva support är minimal, men om du skulle behöva support, så är vi här för dig, med vårt kontor bemannat större delen av dagen. Efter provperioden så fortsätter abonnemanget och kostar 99 kronor exkl. moms per månad, som faktureras årligen. Om du inte vill behålla programmet, så är det bara att avbryta provperioden genom att ge oss besked inom 14 dagar från registrering.
Ni har självklart rätt att avsluta användningen av programmet utan kostnad, genom att ge oss besked per email inom 14 dagar från registrering, att ni inte vill fortsätta med programmet, och betalar då självklart inte heller något.
Om vi inte inom 14 dagar från registrering mottar sådant besked från er, så kan ordern av naturliga orsaker inte ändras. Med registrering menas det datum och klockslag då ni valde att trycka på knappen Fakturera Nu.
Fakturering sker för ett år i taget.
Priset för 123 Fakturera (specialpris 99 kr / ord. pris 159 kr per månad) är för årsavgift Start för ett års användning av programmet.
(Vid användning av specialpriset 99 kr räknas ett årsperioden från registrering.)
Alla priser är exkl. moms.
Offert, Lagerstyrning, Medlemsfakturering, Fleranvändarversion och Engelsk utskrift är (eller kan vara) tilläggsmoduler som kan beställas senare.
Förmedling samt fakturering kan komma att ske från K-Soft Sverige AB, Box 2826, 187 28 Täby. Vi kan i framtiden välja att samarbeta med annat företag för t.ex. förmedling eller fakturering. Kundförhållandet är dock med oss. Betalningen görs till det företag som fakturan kommer från.
Årsavgiften är löpande, men om ni inte vill fortsätta att använda programmet så är det bara att ge besked trettio dagar innan ingången av nästföljande ettårsperiod.
Introduktionspriset (99 kr per månad) är för årsavgift Start för det första året. Efter det första året faktureras ord. pris vilket för närvarande är 159 kr/mån för Start, 300 kr/mån för Fjärrstyrning och 333 kr/mån för Pro. Efter ett år faktureras Fjärrstyrning som standard men ni kan välja Start eller Pro genom att ge besked innan förfallodagen.
Om ni väljer att behålla programmet genom att inte ge oss besked per email innan 14 dagar från registrering om att ni inte vill fortsätta med programmet, så accepterar ni att ni kommer att betala fakturan för er beställning. Att inte betala fakturan eller sen betalning ger inte rätt att annullera beställningen. Vi hjälper gärna att fixa logotyp för er till självkostnadspris.
Licens för användning av 123 Fakturera säljs enligt gällande lagar.
För att lättare kunna hjälpa er och ge support samt för att följa lagarna, måste vi av naturliga orsaker spara er information.
I samband med lagring av information kräver lagen att vi ger er följande information:
Om ni beställer som privatperson har ni den ångerrätt som lagen fastställer. Er information sparas så att vi kan hjälpa er m.m. Vi kommer att använda den för att hjälpa er vid behov, följa lagar om bokföring etc. Vid uppgraderingar kan vi skicka erbjudanden per email eller liknande. Ni kan också bli kontaktade via email, post och telefon. Om ni inte vill bli kontaktade, skicka ett email till oss om det.
Ni kan när som helst begära att inte få information om uppgraderingar per email, brev eller liknande och vi kommer då självklart att följa det. Sådan begäran skickas till oss via email, brev eller liknande.
Vi måste spara, behandla och flytta era data. Informationen sparas tills vidare. Ni ger oss medgivande att spara, behandla och flytta era data samt att skicka erbjudanden per email, brev eller liknande, samt att informera andra att ni är kund. Detta medgivande omfattar också andra parter som äger programvara, källkod, hemsida med mera, och även nuvarande och framtida bolag ägda av oss eller våra ägare. Detta gäller nuvarande och framtida produkter och tjänster.
Ni har rätt att begära tillgång, rättelse eller radering av er information, begära begränsning av behandling, invända mot behandling samt begära dataportabilitet. Ni har rätt att klaga hos tillsynsmyndighet. Mer juridisk information hittar ni här. Lagarna i Irland gäller. Det är helt frivilligt att lägga er order. Vi använder inte automatiserad profilering eller automatiska beslut.
Om ni vill kontakta oss, använd informationen på hemsidan.
Klicka på Fakturera Nu för att registrera enligt informationen ni lagt in och villkoren här. (Datum och tid för registrering läggs in automatiskt.)
Vår erfarenhet är att våra kunder är mycket nöjda med vårt arbetssätt och vi hoppas att ni får samma upplevelse.
Ha en trevlig dag!', 'terms')

ON CONFLICT (language_code, translation_key) DO NOTHING;

