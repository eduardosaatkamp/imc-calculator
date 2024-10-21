import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

// Estilos do Card
const Card = styled.div`
  width: 80%;
  max-width: 500px;
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

const Description = styled.div`
  margin-bottom: 10px;
  text-align: left;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const GlucoseQueueTable = () => {
  const { t } = useTranslation();
  const pacientes = [
    { nome: 'Carlos Silva', glicemia: 85, descricao: 'Normal (70-99)', obsGlicemia: t('observation.normal') },
    { nome: 'Ana Souza', glicemia: 110, descricao: 'Pré-diabetes (100-125)', obsGlicemia: t('observation.preDiabetes') },
    { nome: 'João Pereira', glicemia: 130, descricao: 'Diabetes (>125)', obsGlicemia: t('observation.diabetes') },
  ];

  return (
    <Card>
      <h2>{t('glucoseTitle')}</h2>
      <Description>
        <strong>Glicemia de Jejum:</strong> A glicemia de jejum é um teste para medir o nível de açúcar no sangue após
        um período de jejum de 8 horas ou mais. Valores normais estão entre <strong>70 e 99 mg/dL</strong>. Atenção para valores abaixo de 70 (hipoglicemia) ou acima de 125 (diabetes).
      </Description>
      <Table>
        <thead>
          <tr>
            <Th>{t('patientList.name')}</Th>
            <Th>Glicemia</Th>
            <Th>Descrição</Th>
            <Th>{t('patientList.observation')}</Th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente, index) => (
            <tr key={index}>
              <Td>{paciente.nome}</Td>
              <Td>{paciente.glicemia}</Td>
              <Td>{paciente.descricao}</Td>
              <Td>{paciente.obsGlicemia}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default GlucoseQueueTable;
