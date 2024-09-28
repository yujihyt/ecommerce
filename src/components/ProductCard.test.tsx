import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

test('renders product card correctly', () => {
  const product = {
    id: 1,
    title: 'Sample Product',
    price: 29.99,
    image: 'sample-image-url.jpg'
  };

  render(<ProductCard {...product} />);

  expect(screen.getByText('Sample Product')).toBeInTheDocument();
  expect(screen.getByText('$29.99')).toBeInTheDocument();
});
