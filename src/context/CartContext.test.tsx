import { render, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

const TestComponent = () => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  return (
    <>
      <button onClick={() => addToCart({ id: 1, title: 'Test Product', price: 10, image: 'test.jpg', quantity: 1 })}>
        Add Item
      </button>
      <button onClick={() => removeFromCart(1)}>Remove Item</button>
      <button onClick={() => updateQuantity(1, 3)}>Update Quantity</button>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.title} - {item.quantity}
          </li>
        ))}
      </ul>
    </>
  );
};

describe('CartContext', () => {
  it('should add an item to the cart', () => {
    const { getByText, queryByText } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(queryByText(/Test Product/)).toBeNull();

    act(() => {
      getByText('Add Item').click();
    });

    expect(getByText('Test Product - 1')).toBeInTheDocument();
  });

  it('should remove an item from the cart', () => {
    const { getByText, queryByText } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      getByText('Add Item').click();
    });

    expect(getByText('Test Product - 1')).toBeInTheDocument();

    act(() => {
      getByText('Remove Item').click();
    });

    expect(queryByText('Test Product')).toBeNull();
  });

  it('should update the quantity of an item in the cart', () => {
    const { getByText } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      getByText('Add Item').click();
    });

    expect(getByText('Test Product - 1')).toBeInTheDocument();

    act(() => {
      getByText('Update Quantity').click();
    });

    expect(getByText('Test Product - 3')).toBeInTheDocument();
  });
});
