import { useTranslation } from "react-i18next";

export default function Notfound() {
  const { t } = useTranslation();

  document.title = "Page not found!";

  return <h1>{t("messages.page404")}</h1>;
}
