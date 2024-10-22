import api from './api';

export const deleteGlucose = async (id: number) => {
  try {
    const response = await api.delete(`/cliente/${id}`);
    return response;
  } catch (error) {
    console.error('Error deleting glucose record:', error);
    throw error;
  }
};
