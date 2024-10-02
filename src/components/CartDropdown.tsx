import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartDropdown: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
    <div className="absolute right-0 mt-2 w-64 bg-main shadow-lg rounded-lg p-4 z-50">
      <h3 className="font-bold text-main-text mb-4">Shopping Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex items-center justify-between mb-2">
              <img src={item.image} alt={item.title} className="max-h-12 max-w-8 object-scale-down" />
              <div className="flex-1 ml-2">
                <p className="text-secondary-text">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center border m-sm">
                <button
                  className="px-2"
                  onClick={() => handleDecrement(item.id, item.quantity)}
                >
                  -
                </button>
                <span className="px-2 text-main-text">{item.quantity}</span>
                <button
                  className="px-2"
                  onClick={() => handleIncrement(item.id, item.quantity)}
                >
                  +
                </button>
              </div>
              <button className="text-main-text bg-secondary p-custom-sm ml-2" onClick={() => removeFromCart(item.id)}>
                <FaTimes />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 text-right font-bold text-secondary-text">
        Total: ${totalAmount.toFixed(2)}
      </div>
      <div className="mt-4">
        {
          cart.length !== 0 && 
          <button
            className="w-full bg-button text-main font-bold py-2 px-4 rounded"
            onClick={() => navigate('/cart')}
          >
            Finish Purchase
          </button>
        }
      </div>
    </div>
  );
};

export default CartDropdown;
