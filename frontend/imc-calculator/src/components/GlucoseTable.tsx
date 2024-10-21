import React from 'react';
import styled from 'styled-components';

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

const Td = styled.td<{ highlighted?: boolean; last?: boolean }>`
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
  background-color: ${({ highlighted }) => (highlighted ? '#ffd700' : 'white')};
  border: ${({ highlighted }) => (highlighted ? '2px solid red' : '1px solid #ccc')};
  background-color: ${({ last }) => (last ? '#f0f0f0' : 'inherit')};
`;

interface GlucoseTableProps {
  glucoseData: { nome: string; glicemiaCliente: number }[];
}

const GlucoseTable: React.FC<GlucoseTableProps> = ({ glucoseData }) => {
  // Ordenar os dados para mostrar o maior e o menor valor de glicemia nas duas primeiras linhas
  const sortedData = [...glucoseData].sort((a, b) => b.glicemiaCliente - a.glicemiaCliente);

  // Selecionar maior, menor e o último registro
  const highestGlucose = sortedData[0];
  const lowestGlucose = sortedData[sortedData.length - 1];
  const lastGlucose = sortedData.length > 1 ? sortedData[sortedData.length - 2] : sortedData[0];

  // Limitar a exibição a 10 registros no total
  const recentData = sortedData.slice(1, 7);
  const limitedData = [highestGlucose, lowestGlucose, lastGlucose, ...recentData].slice(0, 10);

  return (
    <Table>
      <thead>
        <tr>
          <Th>Nome</Th>
          <Th>Glicemia</Th>
        </tr>
      </thead>
      <tbody>
        {limitedData.map((paciente, index) => (
          <tr key={index}>
            <Td highlighted={index === 0 || index === 1}>{paciente.nome}</Td>
            <Td highlighted={index === 0 || index === 1}>{paciente.glicemiaCliente}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default GlucoseTable;
