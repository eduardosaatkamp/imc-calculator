import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ImcForm from './components/ImcForm';
import ImcTable from './components/ImcTable/ImcTable'; 
import GlucoseForm from './components/GlucoseForm';
import GlucoseQueueTable from './components/GlucoseQueueTable/GlucoseQueueTable';
import styled from 'styled-components';
import Modal from './components/Modal/Modal';
import ImcModalTable from './components/ImcModalTable/ImcModalTable'; 
import GlucoseModalTable from './components/GlucoseModalTable/GlucoseModalTable';
import axios from 'axios';

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
  padding: 10px 20px;
  color: white;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const LanguageSwitcher = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
  font-size: 1.5em;
  color: white;
  margin: 0;
`;

const App = () => {
  const { i18n, t } = useTranslation();
  const [imcData, setImcData] = useState<
    { id: number; nome: string; imcCliente: number; descricao: string; obsImc: string; peso: number; altura: number }[]
  >([]);
  const [glucoseData, setGlucoseData] = useState<
    { id: number; nome: string; glicemiaCliente: number; obsGlicemia: string }[]
  >([]);
  const [showImcModal, setShowImcModal] = useState(false);
  const [showGlucoseModal, setShowGlucoseModal] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const fetchImcData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cliente?tipo=imc');
      setImcData(response.data.map((item: any) => {
        const descricao = item.imcCliente < 18.5 ? 'Abaixo do peso' :
          item.imcCliente < 24.9 ? 'Peso normal' :
          item.imcCliente < 29.9 ? 'Sobrepeso' : 'Obesidade';

        return {
          id: item.id,
          nome: item.nome,
          imcCliente: item.imcCliente,
          descricao,
          obsImc: item.obsImc || '',
          peso: item.peso,
          altura: item.altura,
        };
      }));
      setShowImcModal(true);
    } catch (error) {
      console.error('Erro ao buscar dados de IMC:', error);
    }
  };

  const fetchGlucoseData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cliente?tipo=glicemia');
      setGlucoseData(response.data.map((item: any) => ({
        id: item.id || 0,
        nome: item.nome,
        glicemiaCliente: item.glicemiaCliente,
        obsGlicemia: item.obsGlicemia || '',
      })));
      setShowGlucoseModal(true);
    } catch (error) {
      console.error('Erro ao buscar dados de glicemia:', error);
    }
  };

  return (
    <Container>
      <NavBar>
        <NavContent>
          <AppTitle>{t('appTitle')}</AppTitle>
          <LanguageSwitcher>
            <FlagButton onClick={() => changeLanguage('pt')}>
              <Flag src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/BR.svg" alt="Português" />
            </FlagButton>
            <FlagButton onClick={() => changeLanguage('en')}>
              <Flag src="http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg" alt="English" />
            </FlagButton>
          </LanguageSwitcher>
        </NavContent>
      </NavBar>

      <div style={{ marginTop: '60px' }}>
        <ImcForm fetchImcData={fetchImcData} />
        <ImcTable /> 
        <GlucoseForm fetchGlucoseData={fetchGlucoseData} />
        <GlucoseQueueTable />
      </div>

      {showImcModal && (
        <Modal onClose={() => setShowImcModal(false)}>
          <ImcModalTable imcData={imcData} fetchImcData={fetchImcData} /> 
        </Modal>
      )}

      {showGlucoseModal && (
        <Modal onClose={() => setShowGlucoseModal(false)}>
          <GlucoseModalTable glucoseData={glucoseData} fetchGlucoseData={fetchGlucoseData} />
        </Modal>
      )}
    </Container>
  );
};

export default App;
