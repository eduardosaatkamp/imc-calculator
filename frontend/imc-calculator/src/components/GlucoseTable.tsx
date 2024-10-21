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

const Td = styled.td<{ highlighted?: boolean }>`
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
  background-color: ${({ highlighted }) => (highlighted ? '#ffd700' : 'white')};
  border: ${({ highlighted }) => (highlighted ? '2px solid red' : '1px solid #ccc')};
`;

interface GlucoseTableProps {
  glucoseData: { nome: string; glicemiaCliente: number; obsGlicemia: string }[];
}

const GlucoseTable: React.FC<GlucoseTableProps> = ({ glucoseData }) => {
  if (glucoseData.length === 0) {
    return <p>Nenhum dado de glicemia encontrado.</p>;
  }

  // Ordena os dados por glicemia em ordem decrescente
  const sortedData = [...glucoseData].sort((a, b) => b.glicemiaCliente - a.glicemiaCliente);

  // Identifica a maior e a menor glicemia
  const highestGlucose = sortedData[0];
  const lowestGlucose = sortedData[sortedData.length - 1];
  const lastEntry = glucoseData[glucoseData.length - 1]; // Último registro enviado

  // Gera a lista final de dados, garantindo até 10 registros
  const finalData = [highestGlucose, lowestGlucose, lastEntry, ...sortedData.filter(
    (entry) => entry !== highestGlucose && entry !== lowestGlucose && entry !== lastEntry
  )].slice(0, 10); // Limita a 10 registros

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
        {finalData.map((paciente, index) => (
          <tr key={index}>
            <Td highlighted={index === 0 || index === 1 || index === 2}>{paciente.nome}</Td>
            <Td highlighted={index === 0 || index === 1 || index === 2}>{paciente.glicemiaCliente}</Td>
            <Td>{paciente.obsGlicemia}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default GlucoseTable;
