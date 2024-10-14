import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "IMC Calculator": "BMI Calculator",
      "Weight (kg)": "Weight (kg)",
      "Height (m)": "Height (m)",
      "Calculate BMI": "Calculate BMI",
      "Your BMI is": "Your BMI is"
    }
  },
  pt: {
    translation: {
      "IMC Calculator": "Calculadora de IMC",
      "Weight (kg)": "Peso (kg)",
      "Height (m)": "Altura (m)",
      "Calculate BMI": "Calcular IMC",
      "Your BMI is": "Seu IMC é"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt', // Idioma padrão
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
