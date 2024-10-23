import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Table, Th, Td, Description } from '../shared/Table.styles';
import { Paciente } from '../../types/GlucoseTable.types';

const GlucoseQueueTable = () => {
  const { t } = useTranslation();

  const pacientes: Paciente[] = [
    { nome: 'Carlos Silva', glicemia: 85, descricao: 'Normal (70-99)', obsGlicemia: t('observation.normal') },
    { nome: 'Ana Souza', glicemia: 110, descricao: 'Pré-diabetes (100-125)', obsGlicemia: t('observation.preDiabetes') },
    { nome: 'João Pereira', glicemia: 130, descricao: 'Diabetes (>125)', obsGlicemia: t('observation.diabetes') },
  ];

  return (
    <Card>
      <h2>{t('patientList.context')}</h2>
      <Description>
        <strong>Glicemia de Jejum:</strong> é um teste para medir o nível de açúcar no sangue após
        um período de jejum de 8 horas ou mais. Valores normais estão entre <strong>70 e 99 mg/dL</strong>. Atenção para valores abaixo de 70 (hipoglicemia) ou acima de 125 (diabetes).
      </Description>
      <Table>
        <thead>
          <tr>
            <Th>{t('patientList.name')}</Th>
            <Th>{t('patientList.glucose')}</Th>
            <Th>{t('patientList.description')}</Th>
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
