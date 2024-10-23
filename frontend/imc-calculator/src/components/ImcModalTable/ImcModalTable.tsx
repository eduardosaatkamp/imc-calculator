import React, { useState } from 'react';
import { Table, Th, Td, TrashIconImg } from '../shared/ModalTable.styles'; 
import { ImcModalTableProps } from '../../types/ImcModalTable.types';
import TrashIcon from '../../assets/icons/trash.svg';
import { deleteImc } from '../../services/imcModalActions';
import AlertSnackbar from '../AlertSnackbar/AlertSnackbar';

const ImcModalTable: React.FC<ImcModalTableProps> = ({ imcData, fetchImcData }) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (imcData.length === 0) {
    return <p>No IMC data found.</p>;
  }

  const sortedData = [...imcData].sort((a, b) => b.imcCliente - a.imcCliente);

  const highestImc = sortedData[0];
  const lowestImc = sortedData[sortedData.length - 1];
  const lastEntry = imcData[imcData.length - 1];

  const finalData = [
    highestImc, 
    lowestImc, 
    lastEntry, 
    ...sortedData.filter(entry => 
      entry !== highestImc && entry !== lowestImc && entry !== lastEntry
    )
  ].slice(0, 7);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const response = await deleteImc(id);
        
        if (response.status === 200) {
          setAlertMessage('Record successfully deleted. Updating the list...');
          setAlertSeverity('success');
          await fetchImcData();
        } else {
          setAlertMessage('Failed to delete the record. Try again.');
          setAlertSeverity('error');
        }
      } catch (error) {
        console.error('Error deleting the record:', error);
        setAlertMessage('Failed to delete the record due to a network or server error.');
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
            <Th>Name</Th>
            <Th>Weight (kg)</Th>
            <Th>Height (m)</Th>
            <Th>BMI</Th>
            <Th>Description</Th>
            <Th>Observation</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {finalData.map((paciente, index) => (
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

      <AlertSnackbar 
        open={openSnackbar} 
        message={alertMessage} 
        severity={alertSeverity} 
        onClose={handleCloseSnackbar} 
      />
    </>
  );
};

export default ImcModalTable;
