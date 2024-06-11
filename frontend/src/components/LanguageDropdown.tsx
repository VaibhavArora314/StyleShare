import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageDropdown = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('i18nextLng') || 'en';
    i18n.changeLanguage(storedLanguage);
  }, [i18n]);

  const handleLanguageChange = (event:any) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('i18nextLng', selectedLanguage);
  };

  return (
    <div className="mx-1 -my-2 fixed z-50">
      <select 
        onChange={handleLanguageChange} 
        className="p-1 rounded-md bg-blue-950 backdrop-blur-sm text-gray-100 border-2 border-sky-500"
        value={i18n.language}
      >
        <option value="">Select Language</option>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="mh">Marathi</option>
        <option value="guj">Gujarati</option>
        <option value="wb">Bengali</option>
        <option value="tel">Telugu</option>
        <option value="tam">Tamil</option>
        <option value="ur">Urdu</option>
      </select>
    </div>
  );
};

export default LanguageDropdown;
