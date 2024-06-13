import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import translationEN from './locales/en/translation.json';
import translationHI from './locales/hi/translation.json';
import translationMH from './locales/mh/translation.json';
import translationWB from './locales/wb/translation.json';
import translationTel from './locales/tel/translation.json';
import translationTam from './locales/tam/translation.json';
import translationGuj from './locales/guj/translation.json';
import translationUr from './locales/ur/translation.json';

const storedLanguage = localStorage.getItem('i18nextLng') || 'en';

i18n.use(initReactI18next).init({
    debug:true,
    fallbackLng:"en",
    lng: storedLanguage,
    resources: {
        en:  {
            translation:translationEN
        },
        hi: {
            translation:translationHI
        },
        mh: {
            translation:translationMH
        },
        wb:{
            translation:translationWB
        },
        tel:{
            translation:translationTel
        },
        tam:{
            translation:translationTam
        },
        guj:{
            translation:translationGuj
        },
        ur:{
            translation:translationUr
        }
    }
})

export default i18n;