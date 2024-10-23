import React, { useState } from 'react';
import { Table, Th, Td, TrashIconImg } from '../shared/ModalTable.styles'; 
import { GlucoseModalTableProps } from '../../types/GlucoseModalTable.types';
import TrashIcon from '../../assets/icons/trash.svg';
import { deleteGlucose } from '../../services/glucoseModalActionsService';
import AlertSnackbar from '../AlertSnackbar/AlertSnackbar';

const GlucoseModalTable: React.FC<GlucoseModalTableProps> = ({ glucoseData, fetchGlucoseData }) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (glucoseData.length === 0) {
    return <p>No glucose data found.</p>;
  }

  const sortedData = [...glucoseData].sort((a, b) => b.glicemiaCliente - a.glicemiaCliente);

  const highestGlucose = sortedData[0];
  const lowestGlucose = sortedData[sortedData.length - 1];
  const lastEntry = glucoseData[glucoseData.length - 1];

  const finalData = [
    highestGlucose, 
    lowestGlucose, 
    lastEntry, 
    ...sortedData.filter(entry => 
      entry !== highestGlucose && entry !== lowestGlucose && entry !== lastEntry
    )
  ].slice(0, 7);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const response = await deleteGlucose(id);
        
        if (response.status === 200) {
          setAlertMessage('Record successfully deleted. Updating the list...');
          setAlertSeverity('success');
          await fetchGlucoseData(); 
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
            <Th>Glucose</Th>
            <Th>Observation</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {finalData.map((paciente, index) => (
            <tr key={paciente.id}>
              <Td highlighted={index <= 2}>{paciente.nome}</Td>
              <Td highlighted={index <= 2}>{paciente.glicemiaCliente}</Td>
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

      <AlertSnackbar 
        open={openSnackbar} 
        message={alertMessage} 
        severity={alertSeverity} 
        onClose={handleCloseSnackbar} 
      />
    </>
  );
};

export default GlucoseModalTable;
