import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CartDropdown from './CartDropdown';
import { useCart } from '../context/CartContext';

jest.mock('../context/CartContext', () => ({
  useCart: jest.fn(),
}));

const mockUseCart = useCart as jest.Mock;

describe('CartDropdown', () => {
  const mockNavigate = jest.fn();
  const mockCart = [
    { id: 1, title: 'Product 1', price: 10.0, quantity: 2, image: 'image1.jpg' },
    { id: 2, title: 'Product 2', price: 20.0, quantity: 1, image: 'image2.jpg' },
  ];

  const setupMocks = (cart = mockCart) => {
    mockUseCart.mockReturnValue({
      cart,
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));
  });

  it('should render an empty cart message when the cart is empty', () => {
    setupMocks([]);

    render(
      <Router>
        <CartDropdown />
      </Router>
    );

    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  it('should render cart items and total amount correctly', () => {
    setupMocks();

    render(
      <Router>
        <CartDropdown />
      </Router>
    );

    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText('$20.00')).toBeInTheDocument();
    expect(screen.getByText('Total: $40.00')).toBeInTheDocument();
  });

  it('should handle decrementing item quantity', () => {
    setupMocks();

    render(
      <Router>
        <CartDropdown />
      </Router>
    );

    const decrementButton = screen.getAllByText('-')[0];
    fireEvent.click(decrementButton);

    expect(useCart().updateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it('should remove item if quantity is 1 and decrement button is clicked', () => {
    const singleQuantityCart = [
      { id: 1, title: 'Product 1', price: 10.0, quantity: 1, image: 'image1.jpg' },
    ];
    setupMocks(singleQuantityCart);

    render(
      <Router>
        <CartDropdown />
      </Router>
    );

    const decrementButton = screen.getByText('-');
    fireEvent.click(decrementButton);

    expect(useCart().removeFromCart).toHaveBeenCalledWith(1);
  });

  it('should handle incrementing item quantity', () => {
    setupMocks();

    render(
      <Router>
        <CartDropdown />
      </Router>
    );

    const incrementButton = screen.getAllByText('+')[0];
    fireEvent.click(incrementButton);

    expect(useCart().updateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it('should remove item when clicking the remove button', () => {
    setupMocks();

    render(
      <Router>
        <CartDropdown />
      </Router>
    );

    const removeButton = screen.getAllByRole('button', { name: /times/i })[0];
    fireEvent.click(removeButton);

    expect(useCart().removeFromCart).toHaveBeenCalledWith(1);
  });

  it('should navigate to the cart page when clicking the finish purchase button', () => {
    setupMocks();

    render(
      <Router>
        <CartDropdown />
      </Router>
    );

    const finishButton = screen.getByText('Finish Purchase');
    fireEvent.click(finishButton);

    expect(mockNavigate).toHaveBeenCalledWith('/cart');
  });
});
