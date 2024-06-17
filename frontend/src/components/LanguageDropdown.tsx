import React, { useEffect, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('i18nextLng') || 'en';
    i18n.changeLanguage(storedLanguage);
  }, [i18n]);

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('i18nextLng', selectedLanguage);
  };

  const isMobileOrTablet = () => {
    // Check if the screen width is less than 768 pixels (tablet/mobile size in Tailwind CSS)
    return window.innerWidth < 768;
  };

  const getLanguageAbbreviation = (language: string): string => {
    // Function to return the first three letters of the language
    return language.slice(0, 3).toUpperCase();
  };

  return (
    <div className={`  ${isMobileOrTablet() ? 'w-10' : ''}`}>
      <select
        onChange={handleLanguageChange}
        className={`p-1 w-20  rounded-md border-2 border-white bg-gradient-to-r from-[#6a11cb] via-[#ab67df] to-[#6a11cb] bg-blue-950  text-blue-100   font-mono ${
          isMobileOrTablet() ? 'text-sm' : ''}`}
        value={i18n.language}
      >
        <option value="">{isMobileOrTablet() ? 'SELECT' : 'SELECT LANGUAGE'}</option>
        <option value="en">{getLanguageAbbreviation('English')}</option>
        <option value="hi">{getLanguageAbbreviation('Hindi')}</option>
        <option value="mh">{getLanguageAbbreviation('Marathi')}</option>
        <option value="guj">{getLanguageAbbreviation('Gujarati')}</option>
        <option value="wb">{getLanguageAbbreviation('Bengali')}</option>
        <option value="tel">{getLanguageAbbreviation('Telugu')}</option>
        <option value="tam">{getLanguageAbbreviation('Tamil')}</option>
        <option value="ur">{getLanguageAbbreviation('Urdu')}</option>
      </select>
    </div>
  );
};

export default LanguageDropdown;

