import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

// Styled components
const Container = styled.div`
    text-align: center;
    padding: 20px;
    max-width: 500px;
    margin: 0 auto;
`;

const Title = styled.h1`
    font-size: 2em;
    color: #007bff;
`;

const InputGroup = styled.div`
    margin-bottom: 20px;
`;

const Input = styled.input`
    padding: 10px;
    width: 100%;
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
    &:hover {
        background-color: #0056b3;
    }
`;

const Result = styled.p`
    font-size: 1.2em;
    color: #28a745;
    margin-top: 20px;
`;

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
        <Container className="container">
            <Title>{t('IMC Calculator')}</Title>

            <InputGroup className="form-group">
                <label htmlFor="name">{t('Name')}:</label>
                <Input 
                    id="name"
                    type="text" 
                    placeholder={t('Name')} 
                    className="form-control"
                />
            </InputGroup>

            <InputGroup className="form-group">
                <label htmlFor="weight">{t('Weight (kg)')}:</label>
                <Input 
                    id="weight"
                    type="text" 
                    value={weight} 
                    onChange={(e) => setWeight(e.target.value.replace(/[^0-9.]/g, ''))} // Aceita apenas números e ponto
                    placeholder={t('Weight (kg)')} 
                    className="form-control"
                />
            </InputGroup>

            <InputGroup className="form-group">
                <label htmlFor="height">{t('Height (m)')}:</label>
                <Input 
                    id="height"
                    type="text" 
                    value={height} 
                    onChange={(e) => setHeight(e.target.value.replace(/[^0-9.]/g, ''))} // Aceita apenas números e ponto
                    placeholder={t('Height (m)')} 
                    className="form-control"
                />
            </InputGroup>

            <Button onClick={calculateImc} className="btn btn-primary">
                {t('Calculate BMI')}
            </Button>

            {result && (
                <Result>{t('Your BMI is')}: {result.toFixed(2)}</Result>
            )}
        </Container>
    );
};

export default ImcCalculator;
