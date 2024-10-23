import { registerGlucose } from './glucoseRecordService';
import api from './api';

jest.mock('./api'); // Mock do módulo de API

describe('Glucose Service', () => {
  it('should call the API to register a new glucose record', async () => {
    const mockData = { nome: 'Ana', glicemiaCliente: 100 };
    (api.post as jest.Mock).mockResolvedValue({ data: mockData });

    const response = await registerGlucose('Ana', 100);

    expect(api.post).toHaveBeenCalledWith('/cliente', mockData);
    expect(response.data).toEqual(mockData);
  });

  it('should handle API errors correctly', async () => {
    (api.post as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(registerGlucose('Ana', 100)).rejects.toThrow('Network error');
  });
});
