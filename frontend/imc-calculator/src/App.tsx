import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ImcForm from './components/ImcForm/ImcForm';
import ImcTable from './components/ImcTable/ImcTable'; 
import GlucoseForm from './components/GlucoseForm/GlucoseForm';
import GlucoseQueueTable from './components/GlucoseQueueTable/GlucoseQueueTable';
import Modal from './components/Modal/Modal';
import ImcModalTable from './components/ImcModalTable/ImcModalTable'; 
import GlucoseModalTable from './components/GlucoseModalTable/GlucoseModalTable';
import Navbar from './components/TopBar/TopBar'; 
import axios from 'axios';
import './App.css'; 

const App = () => {
  const { i18n} = useTranslation();
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
    <div className="container">
      <Navbar changeLanguage={changeLanguage} />

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
   </div>
  );
};

export default App;
