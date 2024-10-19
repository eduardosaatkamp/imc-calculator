import React from 'react';
import styled from 'styled-components';
import ImcCalculator from './components/ImCalculator';
import { useTranslation } from 'react-i18next';
import './i18n'; 
import './App.css';

// Importação da imagem adicionada no projeto
import PersonMeasurement from './assets/person_measurement.png'; // Ajuste o caminho conforme o local da imagem

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f4f4f4;
  padding: 10px;
`;

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

const LanguageSwitcher = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 20px;
`;

const FlagButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const Flag = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid white;
`;

const AppTitle = styled.h1`
  font-size: 1.8em;
  color: white;
  margin: 0 10px;
`;

const CenteredNavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
  margin-top: 80px;
`;

const RoundImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
  border: 3px solid #007bff;
`;

const App: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Container>
      {/* Menu superior com bandeiras e título centralizados */}
      <NavBar>
        <CenteredNavBar>
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
        </CenteredNavBar>
      </NavBar>

      {/* Card principal com o título e a imagem */}
      <Card>
        {/* <h1>{t('Calculadora de IMC')}</h1> */}
        <RoundImage src={PersonMeasurement} alt="Person being measured" />
        <ImcCalculator />
      </Card>
    </Container>
  );
};

export default App;
