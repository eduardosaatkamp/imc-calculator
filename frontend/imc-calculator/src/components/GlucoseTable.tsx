import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

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

const GlucoseTable = () => {
  const { t } = useTranslation();
  const pacientes = [
    { nome: 'John Doe', glicemia: 120, obsGlicemia: t('observation.high') },
    { nome: 'Alice Johnson', glicemia: 85, obsGlicemia: t('observation.normal') },
  ];

  return (
    <Card>
      <h2>{t('patientList.title')}</h2>
      <Table>
        <thead>
          <tr>
            <Th>{t('patientList.name')}</Th>
            <Th>{t('patientList.glucose')}</Th>
            <Th>{t('patientList.observation')}</Th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente, index) => (
            <tr key={index}>
              <Td>{paciente.nome}</Td>
              <Td>{paciente.glicemia}</Td>
              <Td>{paciente.obsGlicemia}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default GlucoseTable;