import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import PersonMeasurement from '../assets/person_measurement.png';

const Card = styled.div`
 width: 80%;
  max-width: 500px;
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
  margin-right: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: #28a745;
  &:hover {
    background-color: #218838;
  }
`;

interface ImcFormProps {
  fetchImcData: () => void;
}

const ImcForm: React.FC<ImcFormProps> = ({ fetchImcData }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const formatHeight = (height: string) => {
    // Se a altura for fornecida como um número inteiro, como "180", converte para "1.80"
    if (/^\d{3}$/.test(height)) {
      return `${height[0]}.${height.substring(1)}`;
    }
    return height;
  };

  const handleRegisterImc = async () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(formatHeight(height));

    if (!name || isNaN(weightNum) || isNaN(heightNum) || heightNum === 0) {
      alert(t('error.fillFields'));
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/cliente', {
        nome: name,
        peso: weightNum,
        altura: heightNum,
      });

      // Atualiza os dados após o registro
      fetchImcData();
    } catch (error) {
      alert(t('error.registerPatient'));
    }
  };

  return (
    <Card>
      <RoundImage src={PersonMeasurement} alt={t('glucoseImageAlt')} />
      <h2>{t('IMC Calculator')}</h2>
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
        <label>{t('Weight (kg)')}:</label>
        <Input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value.replace(/[^0-9.]/g, ''))}
          placeholder={t('Weight (kg)')}
        />
      </div>
      <div>
        <label>{t('Height (m)')}:</label>
        <Input
          type="text"
          value={height}
          onChange={(e) => setHeight(formatHeight(e.target.value.replace(/[^0-9]/g, '')))}
          placeholder={t('Height (m)')}
        />
      </div>
      <div>
        <Button onClick={handleRegisterImc}>{t('patientList.register')}</Button>
        <SecondaryButton onClick={fetchImcData}>{t('patientList.viewQueue')}</SecondaryButton>
      </div>
    </Card>
  );
};

export default ImcForm;
