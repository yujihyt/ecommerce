import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { CartProvider } from './context/CartContext';
import { FavoriteProvider } from './context/FavoriteContext';
import * as productService from './services/productService';

jest.mock('./services/productService');

const mockProducts = [
  { id: 1, title: 'Product A', price: 10, image: 'imageA.jpg', category: 'electronics' },
  { id: 2, title: 'Product B', price: 20, image: 'imageB.jpg', category: 'electronics' },
  { id: 3, title: 'Product C', price: 15, image: 'imageC.jpg', category: 'furniture' },
];

describe('App', () => {
  beforeEach(() => {
    (productService.fetchProducts as jest.Mock).mockResolvedValue(mockProducts);
  });

  test('renders HomePage with products', async () => {
    render(
      <Router>
        <FavoriteProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FavoriteProvider>
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Product A')).toBeInTheDocument();
      expect(screen.getByText('Product B')).toBeInTheDocument();
      expect(screen.getByText('Product C')).toBeInTheDocument();
    });
  });

  test('navigates to the Cart page', async () => {
    render(
      <Router>
        <FavoriteProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FavoriteProvider>
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Product A')).toBeInTheDocument();
    });

    const cartLink = screen.getByRole('link', { name: /cart/i });
    cartLink.click();

    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
  });

  test('navigates to the Categories page', async () => {
    render(
      <Router>
        <FavoriteProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FavoriteProvider>
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Product A')).toBeInTheDocument();
    });

    const categoriesLink = screen.getByRole('link', { name: /categories/i });
    categoriesLink.click();

    expect(screen.getByText('Categories')).toBeInTheDocument();
  });
});
