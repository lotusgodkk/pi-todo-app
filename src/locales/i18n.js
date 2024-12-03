import { createI18n } from "vue-i18n";
import en from "./en.json";
import es from "./es.json";
import hi from "./hi.json";

const messages = {
  en,
  es,
  hi,
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
