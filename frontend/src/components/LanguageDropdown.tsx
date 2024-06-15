import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();
  const [selectWidth, setSelectWidth] = useState("w-25"); // Default width for desktop screens

  useEffect(() => {
    const storedLanguage = localStorage.getItem('i18nextLng') || 'en';
    i18n.changeLanguage(storedLanguage);
    adjustSelectWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [i18n]);

  const handleResize = () => {
    adjustSelectWidth(window.innerWidth);
  };

  const adjustSelectWidth = (width: number) => {
    if (width < 640) {
      setSelectWidth("w-20"); // Full width on mobile screens
    } else if (width >= 640 && width < 768) {
      setSelectWidth("w-20"); // Adjust width for tablets
    } else if (width >= 768 && width < 1024) {
      setSelectWidth("w-20"); // Adjust width for small screens/laptops
    } else if (width >= 1024 && width < 1200) {
      setSelectWidth("w-25"); // Adjust width for desktops
    } else {
      setSelectWidth("w-25"); // Default width for extra large screens
    }
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('i18nextLng', selectedLanguage);
  };

  return (
    <div className=" md:block"> 
      <div className="relative">
        <select 
          onChange={handleLanguageChange} 
          className={`p-1 rounded-md bg-blue-950 backdrop-blur-sm  text-gray-200 border-2 border-sky-100 ${selectWidth}`}
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
    </div>
  );
};

export default LanguageDropdown;
