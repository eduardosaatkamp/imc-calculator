import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "IMC Calculator": "BMI Calculator",
      "Weight (kg)": "Weight (kg)",
      "Height (m)": "Height (m)",
      "Calculate BMI": "Calculate BMI",
      "Your BMI is": "Your BMI is",
      "triageTitle": "Fasting Glucose Screening",
      "glucoseImageAlt": "Fasting Blood Glucose Image",
      "patientList": {
        "title": "Patient List",
        "name": "Name",
        "glucose": "Glucose",
        "observation": "Observation",
        "edit": "Edit",
        "delete": "Delete",
        "save": "Save",
        "cancel": "Cancel",
        "register": "Register Patient",
        "successRegister": "Patient registered successfully"
      },
      "placeholders": {
        "name": "Enter patient's name",
        "glucose": "Enter glucose level"
      },
      "observation": {
        "high": "High",
        "low": "Low",
        "normal": "Normal"
      },
      "error": {
        "fetchPatients": "Error fetching patients:",
        "deletePatient": "Error deleting patient:",
        "updatePatient": "Error updating patient:",
        "fillFields": "Please fill in all fields correctly.",
        "registerPatient": "Error registering patient:"
      }
    }
  },
  pt: {
    translation: {
      "IMC Calculator": "Calculadora de IMC",
      "Weight (kg)": "Peso (kg)",
      "Height (m)": "Altura (m)",
      "Calculate BMI": "Calcular IMC",
      "Your BMI is": "Seu IMC é",
      "triageTitle": "Triagem de Glicemia de Jejum",
      "glucoseImageAlt": "Imagem de Glicemia de Jejum",
      "patientList": {
        "title": "Lista de Pacientes",
        "name": "Nome",
        "glucose": "Glicemia",
        "observation": "Observação",
        "edit": "Editar",
        "delete": "Excluir",
        "save": "Salvar",
        "cancel": "Cancelar",
        "register": "Registrar Paciente",
        "successRegister": "Paciente registrado com sucesso"
      },
      "placeholders": {
        "name": "Nome do paciente",
        "glucose": "Glicemia de jejum"
      },
      "observation": {
        "high": "Alta",
        "low": "Baixa",
        "normal": "Normal"
      },
      "error": {
        "fetchPatients": "Erro ao buscar pacientes:",
        "deletePatient": "Erro ao excluir paciente:",
        "updatePatient": "Erro ao atualizar paciente:",
        "fillFields": "Por favor, preencha todos os campos corretamente.",
        "registerPatient": "Erro ao registrar paciente:"
      }
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
