import axios from "axios";

export const get_all_translations = () => {
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
  return messages;
};
