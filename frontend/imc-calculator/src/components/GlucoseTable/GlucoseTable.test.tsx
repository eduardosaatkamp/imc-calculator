import React from 'react';
import { render, screen } from '@testing-library/react';
import GlucoseTable from './GlucoseTable';
import '../../i18nForTests';

describe('GlucoseTable Component', () => {
  it('renders table correctly with data', () => {
    render(<GlucoseTable />);

    expect(screen.getByText(/Carlos Silva/i)).toBeInTheDocument();
    expect(screen.getByText(/85/i)).toBeInTheDocument();
    expect(screen.getByText(/Normal \(70-99\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Normal/i)).toBeInTheDocument();

  });

  it('renders the description correctly', () => {
    render(<GlucoseTable />);

    expect(
      screen.getByText(
        /é um teste para medir o nível de açúcar no sangue após um período de jejum de 8 horas ou mais./i
      )
    ).toBeInTheDocument();
  });
});
