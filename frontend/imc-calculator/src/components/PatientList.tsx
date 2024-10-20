import React from 'react';
import styled from 'styled-components';

// Estilização da tabela
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

interface PatientListProps {
  shouldUpdate: boolean;
}

const PatientList: React.FC<PatientListProps> = ({ shouldUpdate }) => {
  const pacientes = [
    { nome: 'John Doe', imc: 22.5, obsImc: 'Peso normal', glicemia: 120, obsGlicemia: 'Alta' },
    // ... mais dados de exemplo
  ];

  return (
    <Table>
      <thead>
        <tr>
          <Th>Nome</Th>
          {shouldUpdate ? (
            <>
              <Th>Glicemia</Th>
              <Th>Observação Glicemia</Th>
            </>
          ) : (
            <>
              <Th>IMC</Th>
              <Th>Observação IMC</Th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {pacientes.map((paciente, index) => (
          <tr key={index}>
            <Td>{paciente.nome}</Td>
            {shouldUpdate ? (
              <>
                <Td>{paciente.glicemia}</Td>
                <Td>{paciente.obsGlicemia}</Td>
              </>
            ) : (
              <>
                <Td>{paciente.imc}</Td>
                <Td>{paciente.obsImc}</Td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PatientList;
