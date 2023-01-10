import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { get_all_translations } from "@api/i18n";

i18next.use(LanguageDetector).use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  resources: get_all_translations(),
});
