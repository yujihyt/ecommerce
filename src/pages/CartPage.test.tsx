import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CartPage from './CartPage';

const mockCart = [
  {
    id: 1,
    title: 'Test Product 1',
    price: 10.0,
    image: 'test1.jpg',
    quantity: 2,
  },
  {
    id: 2,
    title: 'Test Product 2',
    price: 20.0,
    image: 'test2.jpg',
    quantity: 1,
  },
];

const mockRemoveFromCart = jest.fn();
const mockUpdateQuantity = jest.fn();

jest.mock('../context/CartContext', () => ({
  useCart: () => ({
    cart: mockCart,
    removeFromCart: mockRemoveFromCart,
    updateQuantity: mockUpdateQuantity,
  }),
}));

describe('CartPage', () => {
  it('should display the cart items', () => {
    const { getByText } = render(
      <Router>
        <CartPage />
      </Router>
    );

    expect(getByText('Test Product 1')).toBeInTheDocument();
    expect(getByText('Test Product 2')).toBeInTheDocument();
    expect(getByText('$10.00')).toBeInTheDocument();
    expect(getByText('$20.00')).toBeInTheDocument();
  });

  it('should increment the quantity of an item', () => {
    const { getAllByText } = render(
      <Router>
        <CartPage />
      </Router>
    );

    const incrementButtons = getAllByText('+');
    fireEvent.click(incrementButtons[0]);

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it('should decrement the quantity of an item', () => {
    const { getAllByText } = render(
      <Router>
        <CartPage />
      </Router>
    );

    const decrementButtons = getAllByText('-');
    fireEvent.click(decrementButtons[0]);

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it('should remove an item from the cart', () => {
    const { getAllByText } = render(
      <Router>
        <CartPage />
      </Router>
    );

    const removeButtons = getAllByText('×');
    fireEvent.click(removeButtons[0]);

    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });

  it('should display total amount correctly', () => {
    const { getByText } = render(
      <Router>
        <CartPage />
      </Router>
    );

    expect(getByText('$43.00')).toBeInTheDocument();
  });
});
