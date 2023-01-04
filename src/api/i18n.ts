import germanFile from "../locales/de.json";
import englishFile from "../locales/en.json";

export function get_all_translations() {
  const languagesSorted = {
    en: englishFile,
    de: germanFile,
  };

  const messages = {};
  for (const language in languagesSorted) {
    messages[language] = { translation: languagesSorted[language] };
  }

  return messages;
}
