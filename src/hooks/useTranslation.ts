import { useLanguageStore } from '../stores/languageStore';
import { translations } from '../translations';

export const useTranslation = () => {
  const { language } = useLanguageStore();
  
  const t = (key: keyof typeof translations.en) => {
    return translations[language][key];
  };

  return { t };
};