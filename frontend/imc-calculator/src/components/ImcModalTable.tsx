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

interface ImcModalTableProps {
  imcData: { nome: string; imcCliente: number; peso: number; altura: number }[];
}

const ImcModalTable: React.FC<ImcModalTableProps> = ({ imcData }) => {
  // Ordenar dados para mostrar o maior e o menor IMC nas duas primeiras linhas
  const sortedData = [...imcData].sort((a, b) => b.imcCliente - a.imcCliente);
  const topTwo = [sortedData[0], sortedData[sortedData.length - 1]]; // Maior e menor IMC
  const limitedData = [...topTwo, sortedData[sortedData.length - 1], ...sortedData.slice(0, 7)]; // 10 registros no total

  return (
    <Table>
      <thead>
        <tr>
          <Th>Nome</Th>
          <Th>IMC</Th>
          <Th>Peso</Th>
          <Th>Altura</Th>
        </tr>
      </thead>
      <tbody>
        {limitedData.map((paciente, index) => (
          <tr key={index}>
            <Td highlighted={index < 2}>{paciente.nome}</Td>
            <Td highlighted={index < 2}>{paciente.imcCliente}</Td>
            <Td last={index === 2}>{paciente.peso}</Td>
            <Td last={index === 2}>{paciente.altura}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ImcModalTable;
