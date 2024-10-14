import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const ImcCalculator = () => {
    const { t } = useTranslation();
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [result, setResult] = useState<number | null>(null);

    const calculateImc = async () => {
        try {
            console.log(`Calculando IMC para Peso: ${weight}, Altura: ${height}`);
            const response = await axios.post('http://localhost:8080/api/imc', {
                weight,
                height
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setResult(response.data.calculatedImc);
        } catch (error) {
            console.error('Erro ao calcular o IMC:', error);
        }
    };

    return (
        <div>
            <h1>{t('IMC Calculator')}</h1>
            <div>
                <label>{t('Weight (kg)')}:</label>
                <input 
                    type="text" 
                    value={weight} 
                    onChange={(e) => setWeight(e.target.value.replace(/[^0-9.]/g, ''))} // Aceita apenas números e ponto
                    placeholder={t('Weight (kg)')} 
                />
            </div>
            <div>
                <label>{t('Height (m)')}:</label>
                <input 
                    type="text" 
                    value={height} 
                    onChange={(e) => setHeight(e.target.value.replace(/[^0-9.]/g, ''))} // Aceita apenas números e ponto
                    placeholder={t('Height (m)')} 
                />
            </div>
            <button onClick={calculateImc}>{t('Calculate BMI')}</button>
            {result && <p>{t('Your BMI is')}: {result.toFixed(2)}</p>}
        </div>
    );
};

export default ImcCalculator;
