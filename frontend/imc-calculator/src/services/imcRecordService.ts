import api from './api';

export const registerImc = async (name: string, weight: number, height: number) => {
  try {
    const response = await api.post('/cliente', {
      nome: name,
      peso: weight,
      altura: height,
    });
    return response;
  } catch (error) {
    console.error('Error registering IMC:', error);
    throw error;
  }
};
