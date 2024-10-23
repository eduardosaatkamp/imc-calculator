import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  TopBarContainer, 
  TopBarContent, 
  LanguageSwitcher, 
  FlagButton, 
  Flag, 
  AppTitle 
} from './TopBar.styles';
import { TopBarProps } from '../../types/TopBar.types';

const TopBar: React.FC<TopBarProps> = ({ changeLanguage }) => {
  const { t } = useTranslation();

  return (
    <TopBarContainer>
      <TopBarContent>
        <AppTitle>{t('appTitle')}</AppTitle>
        <LanguageSwitcher>
          <FlagButton onClick={() => changeLanguage('pt')}>
            <Flag src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/BR.svg" alt="Português" />
          </FlagButton>
          <FlagButton onClick={() => changeLanguage('en')}>
            <Flag src="http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg" alt="English" />
          </FlagButton>
        </LanguageSwitcher>
      </TopBarContent>
    </TopBarContainer>
  );
};

export default TopBar;
