import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

// Interface para os dados de glicemia
interface GlicemiaPaciente {
  nome: string;
  glicemiaCliente: number;
  obsGlicemia: string;
}

// Estilos do card
const Card = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border: 2px solid #007bff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

// Estilos da tabela
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: 1px solid #ccc;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
`;

const GlucoseTable: React.FC = () => {
  const { t } = useTranslation();
  const [pacientes, setPacientes] = useState<GlicemiaPaciente[]>([]);

  // Função para buscar dados de glicemia
  const fetchGlucoseData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cliente?tipo=glicemia');
      setPacientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados de glicemia:', error);
    }
  };

  useEffect(() => {
    fetchGlucoseData();
  }, []); // Executa ao carregar o componente

  return (
    <Card>
      <h2>{t('patientList.title')} - {t('triageTitle')}</h2>
      <Table>
        <thead>
          <tr>
            <Th>{t('patientList.name')}</Th>
            <Th>{t('patientList.glucose')}</Th>
            {/* <Th>{t('patientList.observation')}</Th> */}
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente, index) => (
            <tr key={index}>
              <Td>{paciente.nome}</Td>
              <Td>{paciente.glicemiaCliente}</Td>
              {/* <Td>{paciente.obsGlicemia}</Td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default GlucoseTable;
