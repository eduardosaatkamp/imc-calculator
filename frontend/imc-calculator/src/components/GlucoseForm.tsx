import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import BloodDrop from '../assets/blood_drop.png';

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

const RoundImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
  border: 3px solid #007bff;
`;

const Input = styled.input`
  padding: 8px;
  width: 80%;
  max-width: 250px;
  margin: 0 auto;
  display: block;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

interface GlucoseFormProps {
  fetchGlucoseData: () => void;
}

const GlucoseForm: React.FC<GlucoseFormProps> = ({ fetchGlucoseData }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [glucoseLevel, setGlucoseLevel] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleRegisterGlucose = async () => {
    if (!name || !glucoseLevel) {
      setMessage(t('error.fillFields'));
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/cliente', {
        nome: name,
        glicemiaCliente: parseFloat(glucoseLevel),
      });
      setMessage(t('patientList.successRegister'));
      fetchGlucoseData(); // Atualiza os dados após o envio
    } catch (error) {
      setMessage(t('error.registerPatient'));
    }
  };

  return (
    <Card>
      <RoundImage src={BloodDrop} alt={t('glucoseImageAlt')} />
      <h2>{t('triageTitle')}</h2>
      <div>
        <label>{t('patientList.name')}:</label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('placeholders.name')}
        />
      </div>
      <div>
        <label>{t('patientList.glucose')}:</label>
        <Input
          type="text"
          value={glucoseLevel}
          onChange={(e) => setGlucoseLevel(e.target.value.replace(/[^0-9.]/g, ''))}
          placeholder={t('placeholders.glucose')}
        />
      </div>
      <Button onClick={handleRegisterGlucose}>{t('patientList.register')}</Button>
      {message && <p>{message}</p>}
    </Card>
  );
};

export default GlucoseForm;
