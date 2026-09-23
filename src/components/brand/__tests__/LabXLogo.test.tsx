import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import LabXLogo from '../LabXLogo';

describe('LabXLogo', () => {
  it('renders the LabX brand wordmark', () => {
    render(<LabXLogo />);
    expect(screen.getByText('Lab')).toBeInTheDocument();
    expect(screen.getByText('X')).toBeInTheDocument();
  });

  it('renders inside a navigation link when linkToHome is true', () => {
    render(
      <BrowserRouter>
        <LabXLogo linkToHome />
      </BrowserRouter>
    );
    const link = screen.getByRole('link', { name: /LabX Home/i });
    expect(link).toHaveAttribute('href', '/');
  });

  it('applies responsive size classes correctly', () => {
    const { container } = render(<LabXLogo size="lg" />);
    expect(container.querySelector('.text-3xl')).toBeInTheDocument();
    expect(container.querySelector('.text-4xl')).toBeInTheDocument();
  });
});
