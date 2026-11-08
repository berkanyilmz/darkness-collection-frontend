// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// import english from '../../utils/languages/en.json';
// import french from '../../utils/languages/fr.json';
// import arabic from  '../../utils/languages/ar.json';
// import chinese from '../../utils/languages/ch.json';
// import turkish from '../../utils/languages/tr.json';

// const resources = {
//   en: {
//     translation: english,
//   },
//   fr: {
//     translation: french,
//   },
//   ar: {
//     translation: arabic,
//   },
//   ch: {
//     translation: chinese,
//   },
//   tr: {
//     translation: turkish
//   }
// };

// i18n
//   .use(initReactI18next) // passes i18n down to react-i18next
//   .init({
//     resources,
//     lng: 'tr',
//     interpolation: {
//       escapeValue: false, // react already safes from xss
//     },
//   });

// export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import english from "../../utils/languages/en.json";
import turkish from "../../utils/languages/tr.json";

const resources = {
  en: { translation: english },
  tr: { translation: turkish },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "tr", // varsayılan
  fallbackLng: "en", // tr bulunmazsa en kullan
  supportedLngs: ["tr", "en"], // sadece bu iki dil yüklensin
  interpolation: {
    escapeValue: false,
  },
  load: "languageOnly", // en-US → en
});

export default i18n;