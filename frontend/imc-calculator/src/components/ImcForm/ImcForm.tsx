import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, RoundImage, Input, Button, SecondaryButton } from '../shared/Form.styles';
import { ImcFormProps } from '../../types/ImcForm.types';
import { registerImc } from '../../services/imcRecordService';
import PersonMeasurement from '../../assets/images/person_measurement.png';

const ImcForm: React.FC<ImcFormProps> = ({ fetchImcData }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const formatHeight = (height: string) => {
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
      await registerImc(name, weightNum, heightNum);
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
