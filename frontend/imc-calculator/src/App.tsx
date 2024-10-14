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
         <button onClick={() => changeLanguage('pt')}>
                <img
                    alt="Brazil"
                    src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/BR.svg"
                    style={{ width: '30px', height: '20px', marginRight: '8px' }}
                />
                {('Português')}
            </button>
          <button onClick={() => changeLanguage('en')}>
                <img
                    alt="United States"
                    src="http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
                    style={{ width: '30px', height: '20px', marginRight: '8px' }}
                />
                {('English')}
            </button>
          <ImcCalculator />
      </div>
  );
};

export default App;

