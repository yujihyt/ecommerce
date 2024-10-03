import { render, screen, waitFor } from '@testing-library/react';
import CategoriesPage from './CategoriesPage';
import { fetchProducts } from '../services/productService';

jest.mock('../components/ProductCard', () => {
  return function MockProductCard({ title }: any) {
    return <div>{title}</div>;
  };
});

jest.mock('../services/productService', () => ({
  fetchProducts: jest.fn(),
}));

describe('CategoriesPage', () => {
  const mockProducts = [
    { id: 1, title: 'Product A', price: 10, image: 'imageA.jpg', category: 'category1' },
    { id: 2, title: 'Product B', price: 20, image: 'imageB.jpg', category: 'category1' },
    { id: 3, title: 'Product C', price: 30, image: 'imageC.jpg', category: 'category2' },
  ];

  beforeEach(() => {
    (fetchProducts as jest.Mock).mockResolvedValue(mockProducts);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders categories and products', async () => {
    render(<CategoriesPage />);

    await waitFor(() => {
      expect(screen.getByText('Category1')).toBeInTheDocument();
      expect(screen.getByText('Product A')).toBeInTheDocument();
      expect(screen.getByText('Product B')).toBeInTheDocument();
      expect(screen.getByText('Category2')).toBeInTheDocument();
      expect(screen.getByText('Product C')).toBeInTheDocument();
    });
  });

  test('displays correct number of product cards', async () => {
    render(<CategoriesPage />);

    await waitFor(() => {
      const productCards = screen.getAllByText(/Product/i);
      expect(productCards.length).toBe(3);
    });
  });
});
