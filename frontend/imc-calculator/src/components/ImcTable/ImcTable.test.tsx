import React from 'react';
import { render, screen } from '@testing-library/react';
import ImcTable from './ImcTable';
import '../../i18nForTests';

describe('ImcTable Component', () => {
  it('renders table correctly with data', () => {
    render(<ImcTable />);

    expect(screen.getByText(/Carlos Silva/i)).toBeInTheDocument();
    expect(screen.getByText(/22.5/i)).toBeInTheDocument();
    expect(screen.getByText(/Entre 18.5 e 24.9/i)).toBeInTheDocument();
    expect(screen.getByText(/Normal/i)).toBeInTheDocument();

  });

  it('renders the explanation correctly', () => {
    render(<ImcTable />);


    expect(
      screen.getByText(/IMC \(Índice de Massa Corporal\):/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/é uma medida para avaliar se o peso está adequado/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Valores normais estão entre 18.5 e 24.9/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Atenção para valores abaixo de 18.5 \(baixo peso\) ou acima de 24.9 \(sobrepeso\)/i)
    ).toBeInTheDocument();
  });
});
