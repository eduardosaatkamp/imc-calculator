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
  glucoseData: { nome: string; glicemiaCliente: number; obsGlicemia: string }[];
}

const GlucoseTable: React.FC<GlucoseTableProps> = ({ glucoseData }) => {
  // Ordenar dados para mostrar o maior e o menor valor de glicemia nas duas primeiras linhas
  const sortedData = [...glucoseData].sort((a, b) => b.glicemiaCliente - a.glicemiaCliente);
  const topTwo = [sortedData[0], sortedData[sortedData.length - 1]]; // Maior e menor glicemia
  const limitedData = [...topTwo, sortedData[sortedData.length - 1], ...sortedData.slice(0, 7)]; // 10 registros no total

  return (
    <Table>
      <thead>
        <tr>
          <Th>Nome</Th>
          <Th>Glicemia</Th>
          <Th>Observação</Th>
        </tr>
      </thead>
      <tbody>
        {limitedData.map((paciente, index) => (
          <tr key={index}>
            <Td highlighted={index < 2}>{paciente.nome}</Td>
            <Td highlighted={index < 2}>{paciente.glicemiaCliente}</Td>
            <Td last={index === 2}>{paciente.obsGlicemia}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default GlucoseTable;
