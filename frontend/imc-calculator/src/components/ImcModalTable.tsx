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

interface ImcModalTableProps {
  imcData: { nome: string; imcCliente: number; obsImc: string; peso: number; altura: number }[];
}

const ImcModalTable: React.FC<ImcModalTableProps> = ({ imcData }) => {
  if (imcData.length === 0) {
    return <p>Nenhum dado de IMC encontrado.</p>;
  }

  // Ordena os dados por IMC em ordem decrescente
  const sortedData = [...imcData].sort((a, b) => b.imcCliente - a.imcCliente);

  // Identifica o maior e o menor IMC
  const highestImc = sortedData[0];
  const lowestImc = sortedData[sortedData.length - 1];
  const lastEntry = imcData[imcData.length - 1]; // Último registro enviado

  // Gera a lista final de dados, garantindo até 10 registros
  const finalData = [highestImc, lowestImc, lastEntry, ...sortedData.filter(
    (entry) => entry !== highestImc && entry !== lowestImc && entry !== lastEntry
  )].slice(0, 10); // Limita a 10 registros

  return (
    <Table>
      <thead>
        <tr>
          <Th>Nome</Th>
          <Th>IMC</Th>
          <Th>Observação</Th>
          <Th>Peso</Th>
          <Th>Altura</Th>
        </tr>
      </thead>
      <tbody>
        {finalData.map((paciente, index) => (
          <tr key={index}>
            <Td highlighted={index === 0 || index === 1 || index === 2}>{paciente.nome}</Td>
            <Td highlighted={index === 0 || index === 1 || index === 2}>{paciente.imcCliente.toFixed(1)}</Td>
            <Td>{paciente.obsImc}</Td>
            <Td>{paciente.peso}</Td>
            <Td>{paciente.altura}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ImcModalTable;
