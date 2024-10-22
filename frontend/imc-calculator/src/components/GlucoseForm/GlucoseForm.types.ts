export interface GlucoseFormProps {
    fetchGlucoseData: () => void;
    showGlucoseModal?: (nome: string, glicemiaCliente: number, obsGlicemia: string) => void;
  }
  