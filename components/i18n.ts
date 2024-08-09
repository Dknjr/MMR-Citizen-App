import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

// Import des traductions
import en from '@/translation/en.json';
import fr from '@/translation/fr.json';

// Configuration de i18n
(i18n as any).locale = Localization.locale || 'en';  // Remplace `defaultLocale`
(i18n as any).fallbacks = true;                      // Pas de changement ici, reste une propriété existante
(i18n as any).translations = {                       // Utilisez les traductions disponibles
  en,
  fr,
};

export default i18n;
