import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "./ru/ru.json";
import uz from "./uz/uz.json";
import en from "./en/en.json";

i18n.use(initReactI18next).init({
  lng: window.localStorage.getItem("currentLanguage") || "ru",
  fallbackLng: "ru",
  resources: {
    ru: ru,
    uz: uz,
    en: en,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
