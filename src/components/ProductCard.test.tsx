import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext';
import { useFavorite } from '../context/FavoriteContext';

jest.mock('../context/CartContext', () => ({
  useCart: jest.fn(),
}));
jest.mock('../context/FavoriteContext', () => ({
  useFavorite: jest.fn(),
}));

describe('ProductCard', () => {
  const mockAddToCart = jest.fn();
  const mockUpdateQuantity = jest.fn();
  const mockRemoveFromCart = jest.fn();
  const mockToggleFavorite = jest.fn();
  
  const cart: any[] = [];
  const favorites: any[] = [];
  
  const product = {
    id: 1,
    title: 'Test Product',
    price: 29.99,
    image: '/test-image.jpg',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useCart as jest.Mock).mockReturnValue({
      cart,
      addToCart: mockAddToCart,
      updateQuantity: mockUpdateQuantity,
      removeFromCart: mockRemoveFromCart,
    });

    (useFavorite as jest.Mock).mockReturnValue({
      favorites,
      toggleFavorite: mockToggleFavorite,
    });
  });

  it('should render product details correctly', () => {
    render(<ProductCard {...product} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', '/test-image.jpg');
  });

  it('should call addToCart when the "Add to Cart" button is clicked', () => {
    render(<ProductCard {...product} />);

    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    expect(mockAddToCart).toHaveBeenCalledWith({ id: 1, title: 'Test Product', price: 29.99, image: '/test-image.jpg', quantity: 1 });
  });

  it('should show quantity controls when product is in the cart', () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [{ ...product, quantity: 2 }],
      addToCart: mockAddToCart,
      updateQuantity: mockUpdateQuantity,
      removeFromCart: mockRemoveFromCart,
    });

    render(<ProductCard {...product} />);

    fireEvent.mouseEnter(screen.getByAltText('Test Product'));

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
  });

  it('should update quantity when "+" or "-" is clicked', () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [{ ...product, quantity: 2 }],
      addToCart: mockAddToCart,
      updateQuantity: mockUpdateQuantity,
      removeFromCart: mockRemoveFromCart,
    });

    render(<ProductCard {...product} />);

    fireEvent.mouseEnter(screen.getByAltText('Test Product'));

    const incrementButton = screen.getByText('+');
    const decrementButton = screen.getByText('-');

    fireEvent.click(incrementButton);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);

    fireEvent.click(decrementButton);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it('should remove item from cart if quantity is 1 and "-" is clicked', () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [{ ...product, quantity: 1 }],
      addToCart: mockAddToCart,
      updateQuantity: mockUpdateQuantity,
      removeFromCart: mockRemoveFromCart,
    });

    render(<ProductCard {...product} />);

    fireEvent.mouseEnter(screen.getByAltText('Test Product'));
    
    const decrementButton = screen.getByText('-');
    fireEvent.click(decrementButton);

    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });

  it('should toggle favorite status when the heart icon is clicked', () => {
    render(<ProductCard {...product} />);

    // Simulate hover to show the heart icon
    fireEvent.mouseEnter(screen.getByAltText('Test Product'));

    const heartIcon = screen.getByLabelText('Toggle Favorite');
    fireEvent.click(heartIcon);

    expect(mockToggleFavorite).toHaveBeenCalledWith({
      id: 1,
      title: 'Test Product',
      price: 29.99,
      image: '/test-image.jpg',
      quantity: 1,
    });
  });

  it('should show filled heart icon if the product is a favorite', () => {
    (useFavorite as jest.Mock).mockReturnValue({
      favorites: [{ id: 1, title: 'Test Product', price: 29.99, image: '/test-image.jpg', quantity: 1 }],
      toggleFavorite: mockToggleFavorite,
    });

    render(<ProductCard {...product} />);

    fireEvent.mouseEnter(screen.getByAltText('Test Product'));

    const filledHeartIcon = screen.getByText('♥');
    expect(filledHeartIcon).toBeInTheDocument();
  });
});
