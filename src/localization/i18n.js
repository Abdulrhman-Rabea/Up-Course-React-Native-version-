// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
// import enTranslation from "./en/translation.json";
// import arTranslation from "./ar/translation.json";

// i18n
//     .use(LanguageDetector) // detect language from browser
//     .use(initReactI18next)
//     .init({
//         resources: {
//             en: {
//                 translation: enTranslation,
//             },
//             ar: {
//                 translation: arTranslation,
//             },
//         },
//         fallbackLng: "en", // default lan
//         interpolation: {
//             escapeValue: false,
//         },
//     });

// export default i18n;

//i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import enTranslation from "./en/translation.json";
import arTranslation from "./ar/translation.json";

const deviceLanguage = Localization.locale
  ? Localization.locale.split("-")[0]
  : "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    ar: { translation: arTranslation },
  },
  lng: deviceLanguage, // لو undefined يرجع en
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
