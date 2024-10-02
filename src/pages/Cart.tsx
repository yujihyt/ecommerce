import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const navigate = useNavigate();

  const handleDecrement = (itemId: number, currentQuantity: number) => {
    if (currentQuantity === 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, currentQuantity - 1);
    }
  };

  const handleIncrement = (itemId: number, currentQuantity: number) => {
    updateQuantity(itemId, currentQuantity + 1);
  };

  return (
    <div
      className="relative mx-auto flex"
      style={{
        width: '1351px',
        height: '808px',
        background: '#FFFFFF',
      }}
    >
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="mb-6">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center justify-between mb-4">
                <img src={item.image} alt={item.title} className="max-w-20 max-h-20 object-cover" />
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="p-2 text-black rounded-md border">
                  <button
                    className="px-2"
                    onClick={() => handleDecrement(item.id, item.quantity)}
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    className="px-2"
                    onClick={() => handleIncrement(item.id, item.quantity)}
                  >
                    +
                  </button>
                </div>
                <button className="text-main-text bg-secondary ml-2 p-custom-md" onClick={() => removeFromCart(item.id)}>
                  <FaTimes />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="w-1/3 p-8 border-l">
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="mb-6">
              <li className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>
                  ${totalAmount.toFixed(2)}
                </span>
              </li>
              <li className="flex justify-between mb-2">
                <span>Shipping:</span>
                <span>
                  Free
                </span>
              </li>
              <li className="flex justify-between mb-2">
                <span>Tax:</span>
                <span>
                  ${(3).toFixed(2)}
                </span>
              </li>
            </ul>
            <div className="flex justify-between font-bold text-main-text">
              <span>Total:</span>
              <span>${(totalAmount + 3).toFixed(2)}</span>
            </div>
            <div className="mt-6">
              <button
                className="bg-button text-main font-bold py-2 px-6 rounded w-full"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
            </div>
            <div className="flex justify-center items-center p-custom-sm">
              <span onClick={() => navigate('/')} className="underline">Keep Shopping</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
