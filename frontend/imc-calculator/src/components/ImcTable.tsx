import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

// Estilos do Card
const Card = styled.div`
  width: 95%;
  max-width: 400px;
  padding: 20px;
  border: 2px solid #007bff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  background-color: white;
  text-align: center;
  overflow: hidden;
  margin-top: 20px;
`;

// Estilos da Tabela
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

const ImcTable = () => {
  const { t } = useTranslation();
  const pacientes = [
    { nome: 'Carlos Silva', imc: 22.5, descricao: 'Entre 18.5 e 24.9', obsImc: t('observation.normal') },
    { nome: 'Ana Souza', imc: 27.3, descricao: 'Entre 25 e 29.9', obsImc: t('observation.overweight') },
    { nome: 'João Pereira', imc: 31.2, descricao: 'Entre 30 e 34.9', obsImc: t('observation.obese') },
  ];

  return (
    <Card>
      <h2>{t('patientList.title')}</h2>
      <Table>
        <thead>
          <tr>
            <Th>{t('patientList.name')}</Th>
            <Th>IMC</Th>
            <Th>Descrição</Th>
            <Th>{t('patientList.observation')}</Th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente, index) => (
            <tr key={index}>
              <Td>{paciente.nome}</Td>
              <Td>{paciente.imc}</Td>
              <Td>{paciente.descricao}</Td>
              <Td>{paciente.obsImc}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default ImcTable;
