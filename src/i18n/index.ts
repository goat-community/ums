import { initReactI18next } from "react-i18next";
import axios from "axios";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

function getAllTranslations() {
  const languages = ["en", "de"];
  const messages = {};
  languages.forEach((language) => {
    axios
      .get(
        `https://goat-community.github.io/translations/UMSTranslations/${
          language || "en"
        }/allTranslations.json`
      )
      .then((data) => {
        messages[language] = { translation: data.data };
      });
  });
  console.log(messages);
  return messages;
}

i18next.use(initReactI18next).use(LanguageDetector).init({
  debug: true,
  fallbackLng: "en",
  resources: getAllTranslations(),
});
