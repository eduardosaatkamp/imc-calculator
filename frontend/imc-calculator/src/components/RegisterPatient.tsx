import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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

const RegisterPatient = () => {
    const [name, setName] = useState('');
    const [glucose, setGlucose] = useState('');
    const [message, setMessage] = useState<string | null>(null);

    const handleRegisterGlucose = async () => {
        if (!name || !glucose) {
            setMessage('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/cliente', {
                nome: name,
                glicemiaCliente: parseFloat(glucose)
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
            
            setMessage('Glicemia registrada com sucesso!');
        } catch (error) {
            setMessage('Erro ao registrar glicemia.');
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
                <label htmlFor="glucose">Glicemia:</label>
                <Input 
                    id="glucose"
                    type="text" 
                    value={glucose}
                    onChange={(e) => setGlucose(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="Glicemia"
                />
            </InputGroup>

            <Button onClick={handleRegisterGlucose}>
                Registrar Glicemia
            </Button>

            {message && <p>{message}</p>}
        </Container>
    );
};

export default RegisterPatient;
