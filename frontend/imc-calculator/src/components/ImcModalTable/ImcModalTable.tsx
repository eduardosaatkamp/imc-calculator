import React from 'react';
import axios from 'axios';
import { Table, Th, Td, TrashIconImg } from './ImcModalTable.styles';
import { ImcModalTableProps } from './ImcModalTable.types';
import TrashIcon from '../../assets/trash.svg';

const ImcModalTable: React.FC<ImcModalTableProps> = ({ imcData, fetchImcData }) => {
  if (imcData.length === 0) {
    return <p>Nenhum dado de IMC encontrado.</p>;
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este registro?')) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/cliente/${id}`);
        
        if (response.status === 200) {
          await fetchImcData(); 
          alert('Registro excluído com sucesso.');
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
          <Th>Peso (kg)</Th>
          <Th>Altura (m)</Th>
          <Th>IMC</Th>
          <Th>Descrição</Th>
          <Th>Observação</Th>
          <Th>Ações</Th>
        </tr>
      </thead>
      <tbody>
        {imcData.slice(0, 7).map((paciente, index) => (
          <tr key={paciente.id}>
            <Td highlighted={index === 0 || index === 1 || index === 2}>{paciente.nome}</Td>
            <Td highlighted={index === 0 || index === 1 || index === 2}>{paciente.peso}</Td>
            <Td highlighted={index === 0 || index === 1 || index === 2}>{paciente.altura}</Td>
            <Td highlighted={index === 0 || index === 1 || index === 2}>{paciente.imcCliente}</Td>
            <Td>{paciente.descricao}</Td>
            <Td>{paciente.obsImc}</Td>
            <Td>
              <TrashIconImg 
                src={TrashIcon} 
                alt="Delete" 
                onClick={() => handleDelete(paciente.id)} 
              />
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ImcModalTable;
