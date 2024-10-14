import React from 'react';
import ImcCalculator from './components/ImCalculator';
import { useTranslation } from 'react-i18next';
import './i18n'; 
import './App.css';

const App: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
      <div>
          <button onClick={() => changeLanguage('pt')}>Português</button>
          <button onClick={() => changeLanguage('en')}>English</button>
          <ImcCalculator />
      </div>
  );
};

export default App;

