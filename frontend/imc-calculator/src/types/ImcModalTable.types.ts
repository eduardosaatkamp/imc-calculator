export interface ImcModalTableProps {
    imcData: {
      id: number;
      nome: string;
      imcCliente: number;
      descricao: string;
      obsImc: string;
      peso: number;
      altura: number;
    }[];
    fetchImcData: () => void;
  }
  