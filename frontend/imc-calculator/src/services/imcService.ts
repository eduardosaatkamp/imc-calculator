import api from './api';

export const deleteImc = async (id: number) => {
  try {
    const response = await api.delete(`/cliente/${id}`);
    return response;
  } catch (error) {
    console.error('Error deleting IMC record:', error);
    throw error;
  }
};
