export interface GlucoseModalTableProps {
    glucoseData: { id: number; nome: string; glicemiaCliente: number; obsGlicemia: string }[];
    fetchGlucoseData: () => void; 
  }
  