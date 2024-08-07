import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

// Import des traductions
import en from '@/translation/en.json';
import fr from '@/translation/fr.json';

i18n.defaultLocale = 'en';
i18n.locale = Localization.locale;
i18n.fallbacks = true;
i18n.translations = {
  en,
  fr,
};

export default i18n;
