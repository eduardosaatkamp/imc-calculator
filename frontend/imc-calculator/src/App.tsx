import React, { useState } from 'react';
import styled from 'styled-components';
import ImcCalculator from './components/ImcCalculator';
import RegisterPatient from './components/RegisterPatient';
import PatientList from './components/PatientList';
import { useTranslation } from 'react-i18next';
import './i18n'; 

import PersonMeasurement from './assets/person_measurement.png';
import GlucoseImage from './assets/An_illustration_representing_fasting_blood_glucose.png';

// Container principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f4f4f4;
  padding: 10px;
`;

// Menu superior
const NavBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #007bff;
  padding: 10px 0;
  color: white;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

// Seletor de idioma
const LanguageSwitcher = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// Botão para as bandeiras
const FlagButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

// Imagem da bandeira
const Flag = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid white;
`;

// Título da aplicação
const AppTitle = styled.h1`
  font-size: 1.8em;
  color: white;
  margin: 0 10px;
`;

// Navegação das abas
const TabNavigation = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 80px;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  background-color: ${({ active }) => (active ? '#007bff' : '#f4f4f4')};
  color: ${({ active }) => (active ? 'white' : '#007bff')};
  border: 2px solid #007bff;
  border-radius: 8px;
  cursor: pointer;
`;

// Card principal
const Card = styled.div`
  width: 95%;
  max-width: 400px;
  padding: 20px;
  border: 2px solid #007bff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  background-color: white;
  text-align: center;
  overflow: hidden;
  margin-top: 20px;
`;

// Imagem circular
const RoundImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
  border: 3px solid #007bff;
`;

// Novo componente de título para cada aba
const TabTitle = styled.h1`
  font-size: 1.5em;
  color: #007bff;
  margin-bottom: 10px;
`;

const App: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'imc' | 'glucose'>('imc');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Container>
      {/* Menu superior com bandeiras e título centralizados */}
      <NavBar>
        <LanguageSwitcher>
          <FlagButton onClick={() => changeLanguage('pt')}>
            <Flag
              src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/BR.svg"
              alt="Português"
            />
          </FlagButton>
          <AppTitle>IMC GLICEMIA</AppTitle>
          <FlagButton onClick={() => changeLanguage('en')}>
            <Flag
              src="http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
              alt="English"
            />
          </FlagButton>
        </LanguageSwitcher>
      </NavBar>

      {/* Navegação de abas para alternar entre IMC e Glicemia */}
      <TabNavigation>
        <TabButton
          active={activeTab === 'imc'}
          onClick={() => setActiveTab('imc')}
        >
          {t('IMC')}
        </TabButton>
        <TabButton
          active={activeTab === 'glucose'}
          onClick={() => setActiveTab('glucose')}
        >
          {t('Glucose')}
        </TabButton>
      </TabNavigation>

      {/* Conteúdo das abas */}
      {activeTab === 'imc' ? (
        <Card>
          <TabTitle>{t('IMC Calculator')}</TabTitle>
          <RoundImage src={PersonMeasurement} alt="Person being measured" />
          <ImcCalculator />
          {/* Lista de pacientes para IMC */}
          <PatientList shouldUpdate={false} />
        </Card>
      ) : (
        <Card>
          <TabTitle>{t('Glucose Triage')}</TabTitle>
          <RoundImage src={GlucoseImage} alt={t('glucoseImageAlt')} />
          <RegisterPatient />
          {/* Lista de pacientes para Glicemia */}
          <PatientList shouldUpdate={true} />
        </Card>
      )}
    </Container>
  );
};

export default App;
