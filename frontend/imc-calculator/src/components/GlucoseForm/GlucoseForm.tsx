import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, RoundImage, Input, Button, SecondaryButton } from '../shared/Form.styles';
import { GlucoseFormProps } from '../../types/GlucoseForm.types';
import { registerGlucose } from '../../services/glucoseRecordService';
import PersonMeasurement from '../../assets/images/blood_drop.png';

const GlucoseForm: React.FC<GlucoseFormProps> = ({ fetchGlucoseData, showGlucoseModal }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [glucose, setGlucose] = useState('');

  const handleRegisterGlucose = async () => {
    const glucoseNum = parseFloat(glucose);

    if (!name || isNaN(glucoseNum) || glucoseNum <= 0) {
      console.log(t('error.fillFields'));
      return;
    }

    try {
      const response = await registerGlucose(name, glucoseNum);

      if (response.data && response.data.glicemiaCliente && showGlucoseModal) {
        showGlucoseModal(response.data.nome, response.data.glicemiaCliente, response.data.obsGlicemia);
      }

      fetchGlucoseData(); 
    } catch (error) {
      console.log(t('error.registerPatient'));
    }
  };

  return (
    <Card>
      <RoundImage src={PersonMeasurement} alt={t('glucoseImageAlt')} />
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
          value={glucose}
          onChange={(e) => setGlucose(e.target.value.replace(/[^0-9.]/g, ''))}
          placeholder={t('placeholders.glucose')}
        />
      </div>
      <div>
        <Button onClick={handleRegisterGlucose}>{t('patientList.register')}</Button>
        <SecondaryButton onClick={fetchGlucoseData}>{t('patientList.viewQueue')}</SecondaryButton>
      </div>
    </Card>
  );
};

export default GlucoseForm;
