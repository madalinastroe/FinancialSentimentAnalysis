import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { TRANSLATIONS_EN } from './en';
import { TRANSLATIONS_RO } from './ro';

i18n
  .use(initReactI18next)
  .init({
    keySeparator: false,
    interpolation: {
      escapeValue: false
    },
    lng: localStorage.getItem('language') || 'en',
    resources: {
      en: {
        translation: TRANSLATIONS_EN
      },
      ro: {
        translation: TRANSLATIONS_RO
      }
    }
  });
  
export default i18n;
