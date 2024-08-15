import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';

const getLanguage = () => {
  const locales = Localization.getLocales();
  return locales.length > 0 ? locales[0].languageCode : 'en';
};

// Translations
const resources = {
  en: {
    translation: {
      Profile: 'Profile',
      Confidentiality: 'Confidentiality',
      Welcome: 'Welcome',
      ChangeLanguage: 'Change Language',
    },
  },
  fr: {
    translation: {
      Profile: 'Profil',
      Confidentiality: 'Confidentialité',
      Welcome: 'Bienvenue',
      ChangeLanguage: 'Changer la langue',
    },
  },
};

// Configuration de i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getLanguage(), // Initialiser avec la langue du périphérique
    fallbackLng: 'en', // Langue de secours
    interpolation: {
      escapeValue: false, // Réagit à la sécurité XSS
    },
    supportedLngs: ['en', 'fr'], // Langues prises en charge
  });

export default i18n;
