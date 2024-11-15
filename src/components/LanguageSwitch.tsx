import React from 'react';
import { useLanguageStore } from '../stores/languageStore';

export const LanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useLanguageStore();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded ${
          language === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('fr')}
        className={`px-2 py-1 rounded ${
          language === 'fr'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        FR
      </button>
    </div>
  );
};