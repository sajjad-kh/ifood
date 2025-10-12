
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locale/en";
import { fa } from "./locale/fa";

const resources = {
  en: {
    translation: en
  },
    fa: {
    translation: fa
  }
};

i18n
.use(initReactI18next)
.init({
  resources,
  lng: "fa",
  interpolation:{
    escapeValue:false
  }
});

// append app to dom
// const root = createRoot(document.getElementById('root'));
// root.render(
//   <App />
// );

export default i18n;