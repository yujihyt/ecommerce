import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from './HomePage';
import { useFavorite } from '../context/FavoriteContext';

jest.mock('../context/FavoriteContext', () => ({
  useFavorite: jest.fn(),
}));

const mockProducts = [
  { id: 1, title: 'Product A', price: 10, image: 'imageA.jpg', category: 'electronics' },
  { id: 2, title: 'Product B', price: 20, image: 'imageB.jpg', category: 'electronics' },
  { id: 3, title: 'Product C', price: 15, image: 'imageC.jpg', category: 'furniture' },
  { id: 4, title: 'Product D', price: 25, image: 'imageD.jpg', category: 'furniture' },
  { id: 5, title: 'Product E', price: 30, image: 'imageE.jpg', category: 'clothing' },
  { id: 6, title: 'Product F', price: 12, image: 'imageF.jpg', category: 'clothing' },
  { id: 7, title: 'Product G', price: 22, image: 'imageG.jpg', category: 'clothing' },
  { id: 8, title: 'Product H', price: 18, image: 'imageH.jpg', category: 'clothing' },
  { id: 9, title: 'Product I', price: 40, image: 'imageI.jpg', category: 'furniture' },
  { id: 10, title: 'Product J', price: 50, image: 'imageJ.jpg', category: 'furniture' },
];

describe('HomePage', () => {
  beforeEach(() => {
    (useFavorite as jest.Mock).mockReturnValue({ favorites: [] });
  });

  test('renders products correctly', () => {
    render(<HomePage filteredProducts={mockProducts} />);

    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();
    expect(screen.getByText('Product C')).toBeInTheDocument();
    expect(screen.getByText('Product D')).toBeInTheDocument();
    expect(screen.getByText('Product E')).toBeInTheDocument();
    expect(screen.getByText('Product F')).toBeInTheDocument();
    expect(screen.getByText('Product G')).toBeInTheDocument();
    expect(screen.getByText('Product H')).toBeInTheDocument();
    expect(screen.getByText('Product I')).toBeInTheDocument();
  });

  test('filters products by selected categories', () => {
    (useFavorite as jest.Mock).mockReturnValue({ favorites: [] });
    
    render(<HomePage filteredProducts={mockProducts} />);

    const filterButton = screen.getByRole('button', { name: /clothing/i });
    fireEvent.click(filterButton);
    
    expect(screen.queryByText('Product A')).not.toBeInTheDocument();
    expect(screen.getByText('Product G')).toBeInTheDocument();
  });

  test('displays paginated products', () => {
    render(<HomePage filteredProducts={mockProducts} />);

    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();
    expect(screen.getByText('Product C')).toBeInTheDocument();
    expect(screen.getByText('Product D')).toBeInTheDocument();
    expect(screen.getByText('Product E')).toBeInTheDocument();
    expect(screen.getByText('Product F')).toBeInTheDocument();
    expect(screen.getByText('Product G')).toBeInTheDocument();
    expect(screen.getByText('Product H')).toBeInTheDocument();
    expect(screen.getByText('Product I')).toBeInTheDocument();

    expect(screen.queryByText('Product J')).not.toBeInTheDocument();

    const nextPageButton = screen.getByRole('button', { name: '2' });
    fireEvent.click(nextPageButton);

  });
  
  test('handles favorite products', () => {
    (useFavorite as jest.Mock).mockReturnValue({ favorites: [mockProducts[0]] });
    
    render(<HomePage filteredProducts={mockProducts} />);

    const favoritesButton = screen.getByRole('button', { name: /favorites/i });
    fireEvent.click(favoritesButton);
    
    expect(screen.getByText('Product A')).toBeInTheDocument();
  });
});
