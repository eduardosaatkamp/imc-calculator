import React, { useState } from 'react';
import axios from 'axios';

const ImcCalculator = () => {
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
            <h1>Calculadora de IMC</h1>
            <div>
                <label>Peso (kg): </label>
                <input 
                    type="text" 
                    value={weight} 
                    onChange={(e) => setWeight(e.target.value.replace(/[^0-9.]/g, ''))} // Aceita apenas números e ponto
                    placeholder="Peso (kg)" 
                />
            </div>
            <div>
                <label>Altura (m): </label>
                <input 
                    type="text" 
                    value={height} 
                    onChange={(e) => setHeight(e.target.value.replace(/[^0-9.]/g, ''))} // Aceita apenas números e ponto
                    placeholder="Altura (m)" 
                />
            </div>
            <button onClick={calculateImc}>Calcular IMC</button>
            {result && <p>Seu IMC é: {result.toFixed(2)}</p>}
        </div>
    );
};

export default ImcCalculator;
