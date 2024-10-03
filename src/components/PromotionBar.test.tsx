import { render, screen } from '@testing-library/react';
import PromotionBar from './PromotionBar';

describe('PromotionBar', () => {
  it('renders the promotion message correctly', () => {
    render(<PromotionBar />);
    
    expect(screen.getByText('Win 25% OFF on your first purchase')).toBeInTheDocument();
  });

  it('has the correct styles applied', () => {
    render(<PromotionBar />);

    const promotionElement = screen.getByText('Win 25% OFF on your first purchase');
    expect(promotionElement).toHaveClass('bg-button p-2 flex items-center relative text-secondary justify-center');
  });
});
