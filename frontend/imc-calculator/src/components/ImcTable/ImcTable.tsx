import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Table, Th, Td, Description } from './ImcTable.styles';
import { Paciente } from './ImcTable.types';

const ImcTable = () => {
  const { t } = useTranslation();

  const pacientes: Paciente[] = [
    { nome: 'Carlos Silva', imc: 22.5, descricao: 'Entre 18.5 e 24.9', obsImc: t('observation.normal') },
    { nome: 'Ana Souza', imc: 27.3, descricao: 'Entre 25 e 29.9', obsImc: t('observation.overweight') },
    { nome: 'João Pereira', imc: 31.2, descricao: 'Entre 30 e 34.9', obsImc: t('observation.obese') },
  ];

  return (
    <Card>
      <h2>{t('patientList.title')}</h2>
      <Description>
        <strong>IMC (Índice de Massa Corporal):</strong> O IMC é uma medida para avaliar se o peso está adequado
        em relação à altura. Valores normais estão entre <strong>18.5 e 24.9</strong>. Atenção para valores abaixo de
        18.5 (baixo peso) ou acima de 24.9 (sobrepeso).
      </Description>
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
