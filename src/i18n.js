import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locale/en";
import th from "./locale/th";

const resources = {
  en: en,
  th: th
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "en",

    keySeparator: false,

    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;