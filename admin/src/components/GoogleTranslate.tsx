import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Translate.css";

declare global {
  interface Window {
    google: any;
    googleTranslateInit: () => void;
  }
}

const GoogleTranslate = () => {
  const location = useLocation();

  useEffect(() => {
    const googleTranslateInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,hi,pa,sa,mr,ur,bn,es,ja,ko,zh-CN,es,nl,fr,de,it,ta,te',
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          defaultLanguage: 'en',
        }, 'google_element');
      }
    };

    if (!window.googleTranslateInit) {
      window.googleTranslateInit = googleTranslateInit;
    }

    const loadGoogleTranslateScript = () => {
      if (!document.getElementById("google_translate_script")) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateInit";
        script.id = "google_translate_script";
        script.onerror = () => console.error('Error loading Google Translate script');
        document.body.appendChild(script);
      } else {
        googleTranslateInit();
      }
    };

    loadGoogleTranslateScript();

    if (window.google && window.google.translate) {
      googleTranslateInit();
    }
  }, [location]);

  return <div id="google_element" className="google-translate-container"></div>;
};

export default GoogleTranslate;
