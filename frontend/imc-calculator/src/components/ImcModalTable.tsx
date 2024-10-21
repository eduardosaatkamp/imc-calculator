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

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
`;

interface ImcModalTableProps {
  imcData: { nome: string; imcCliente: number; peso: number; altura: number }[];
}

const ImcModalTable: React.FC<ImcModalTableProps> = ({ imcData }) => {
  return (
    <div>
      <h2>Dados de IMC Registrados</h2>
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
          {imcData.map((data, index) => (
            <tr key={index}>
              <Td>{data.nome}</Td>
              <Td>{data.imcCliente}</Td>
              <Td>{data.peso}</Td>
              <Td>{data.altura}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ImcModalTable;
