import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fa' ? 'en' : 'fa';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-irancell text-white flex justify-end items-center p-2 z-50 gap-3">
      <div
        onClick={toggleLanguage}
        aria-label="Toggle language"
        title={i18n.language === 'fa' ? 'Switch to English' : 'تغییر به فارسی'}
        className="w-8 h-8 flex bg-white text-lg rounded cursor-pointer items-center justify-center"
      >
        <FontAwesomeIcon icon={faGlobe} className="text-blue-400 p-1" />
      </div>
    </div>
  );
};

export default Header;
