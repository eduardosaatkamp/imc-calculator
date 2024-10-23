import api from './api';

export const registerGlucose = async (name: string, glucose: number) => {
  try {
    const response = await api.post('/cliente', {
      nome: name,
      glicemiaCliente: glucose,
    });
    return response;
  } catch (error) {
    console.error('Error registering glucose:', error);
    throw error;
  }
};
