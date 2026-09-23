import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LabXPointRing from '../LabXPointRing';

describe('LabXPointRing Component', () => {
  it('renders level and points correctly in the inner label', () => {
    render(<LabXPointRing points={1840} level={7} />);

    expect(screen.getByText('Level')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('1840 pts')).toBeInTheDocument();
  });

  it('sets custom dimensions on the outer container', () => {
    const { container } = render(<LabXPointRing points={620} level={3} size={200} strokeWidth={12} />);
    const wrapper = container.querySelector('div');

    expect(wrapper).toHaveStyle({ width: '200px', height: '200px' });
  });

  it('renders SVG elements with gradient stroke definitions', () => {
    const { container } = render(<LabXPointRing points={2350} level={9} />);
    const svg = container.querySelector('svg');
    const linearGradient = container.querySelector('linearGradient');

    expect(svg).toBeInTheDocument();
    expect(linearGradient).toBeInTheDocument();
    expect(linearGradient).toHaveAttribute('id', 'gradient-ring');
  });
});
