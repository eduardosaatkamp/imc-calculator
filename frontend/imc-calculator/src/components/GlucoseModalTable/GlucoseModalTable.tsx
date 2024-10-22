import React, { useState } from 'react';
import axios from 'axios';
import { Table, Th, Td, TrashIconImg } from '../shared/ModalTable.styles'; 
import { GlucoseModalTableProps } from './GlucoseModalTable.types';
import TrashIcon from '../../assets/trash.svg';
import { Alert, Snackbar } from '@mui/material';

const GlucoseModalTable: React.FC<GlucoseModalTableProps> = ({ glucoseData, fetchGlucoseData }) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (glucoseData.length === 0) {
    return <p>Nenhum dado de glicemia encontrado.</p>;
  }

  const sortedData = [...glucoseData].sort((a, b) => b.glicemiaCliente - a.glicemiaCliente);

  const highestGlucose = sortedData[0];
  const lowestGlucose = sortedData[sortedData.length - 1];
  const lastEntry = glucoseData[glucoseData.length - 1]; 

  const finalData = [highestGlucose, lowestGlucose, lastEntry, ...sortedData.filter(
    (entry) => entry !== highestGlucose && entry !== lowestGlucose && entry !== lastEntry
  )].slice(0, 7); 

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este registro?')) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/cliente/${id}`);
        
        if (response.status === 200) {
          setAlertMessage('Registro excluído com sucesso. Atualizando a lista...');
          setAlertSeverity('success');
          setTimeout(async () => {
            await fetchGlucoseData(); 
          }, 3000);
        } else {
          setAlertMessage('Não foi possível excluir o registro. Tente novamente.');
          setAlertSeverity('error');
        }
      } catch (error) {
        console.error('Erro ao excluir o registro:', error);
        setAlertMessage('Não foi possível excluir o registro devido a um erro de rede ou servidor.');
        setAlertSeverity('error');
      } finally {
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <>
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

      {/* Snackbar do MUI para exibir alertas */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default GlucoseModalTable;
