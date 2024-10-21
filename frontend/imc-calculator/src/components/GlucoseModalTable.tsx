import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;

interface GlucoseModalTableProps {
  glucoseData: { id: number; nome: string; glicemiaCliente: number; obsGlicemia: string }[];
  fetchGlucoseData: () => void; // Função para atualizar os dados após exclusão
}

const GlucoseModalTable: React.FC<GlucoseModalTableProps> = ({ glucoseData, fetchGlucoseData }) => {
  if (glucoseData.length === 0) {
    return <p>Nenhum dado de glicemia encontrado.</p>;
  }

  // Ordena os dados por glicemia em ordem decrescente
  const sortedData = [...glucoseData].sort((a, b) => b.glicemiaCliente - a.glicemiaCliente);

  // Identifica a maior, menor e o último registro de glicemia
  const highestGlucose = sortedData[0];
  const lowestGlucose = sortedData[sortedData.length - 1];
  const lastEntry = glucoseData[glucoseData.length - 1]; // Último registro enviado

  // Gera a lista final de dados, garantindo até 10 registros
  const finalData = [highestGlucose, lowestGlucose, lastEntry, ...sortedData.filter(
    (entry) => entry !== highestGlucose && entry !== lowestGlucose && entry !== lastEntry
  )].slice(0, 10); // Limita a 10 registros

  // Função para excluir um registro de glicemia com temporizador
  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este registro?')) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/cliente/${id}`);
        
        // Verifica se a exclusão foi bem-sucedida
        if (response.status === 200) {
          alert('Registro excluído com sucesso. Atualizando a lista...');

          // Adiciona um temporizador de 3 segundos antes de atualizar a lista
          setTimeout(async () => {
            await fetchGlucoseData(); // Atualiza os dados após exclusão
          }, 3000);
        } else {
          alert('Não foi possível excluir o registro. Tente novamente.');
        }
      } catch (error) {
        console.error('Erro ao excluir o registro:', error);
        alert('Não foi possível excluir o registro devido a um erro de rede ou servidor.');
      }
    }
  };

  return (
    <Table>
      <thead>
        <tr>
          <Th>Nome</Th>
          <Th>Glicemia</Th>
          <Th>Observação</Th>
          <Th>Ações</Th>
        </tr>
      </thead>
      <tbody>
        {finalData.map((paciente, index) => (
          <tr key={paciente.id}>
            <Td highlighted={index === 0 || index === 1 || index === 2}>{paciente.nome}</Td>
            <Td highlighted={index === 0 || index === 1 || index === 2}>{paciente.glicemiaCliente}</Td>
            <Td>{paciente.obsGlicemia}</Td>
            <Td>
              <DeleteButton onClick={() => handleDelete(paciente.id)}>Excluir</DeleteButton>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default GlucoseModalTable;