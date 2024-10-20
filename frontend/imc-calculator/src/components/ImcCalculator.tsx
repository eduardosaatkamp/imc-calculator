import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const Container = styled.div`
    text-align: center;
    padding: 20px;
    max-width: 500px;
    margin: 0 auto;
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

const ImcCalculator = () => {
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [message, setMessage] = useState<string | null>(null);

    const handleCalculateImc = async () => {
        if (!name || !weight || !height) {
            setMessage('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/cliente', {
                nome: name,
                peso: parseFloat(weight),
                altura: parseFloat(height)
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
            
            setMessage('IMC registrado com sucesso!');
        } catch (error) {
            setMessage('Erro ao registrar IMC.');
        }
    };

    return (
        <Container className="container">
            <InputGroup className="form-group">
                <label htmlFor="name">Nome:</label>
                <Input 
                    id="name"
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome"
                />
            </InputGroup>

            <InputGroup className="form-group">
                <label htmlFor="weight">Peso (kg):</label>
                <Input 
                    id="weight"
                    type="text" 
                    value={weight}
                    onChange={(e) => setWeight(e.target.value.replace(/[^0-9.]/g, ''))}
                    placeholder="Peso"
                />
            </InputGroup>

            <InputGroup className="form-group">
                <label htmlFor="height">Altura (m):</label>
                <Input 
                    id="height"
                    type="text" 
                    value={height}
                    onChange={(e) => setHeight(e.target.value.replace(/[^0-9.]/g, ''))}
                    placeholder="Altura"
                />
            </InputGroup>

            <Button onClick={handleCalculateImc}>
                Registrar IMC
            </Button>

            {message && <p>{message}</p>}
        </Container>
    );
};

export default ImcCalculator;
