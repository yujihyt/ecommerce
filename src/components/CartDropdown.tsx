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
    <div className="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-lg p-4 z-50">
      <h3 className="font-bold text-lg mb-4">Shopping Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex items-center justify-between mb-2">
              <img src={item.image} alt={item.title} className="w-12 h-12 object-cover" />
              <div className="flex-1 ml-2">
                <h4 className="text-sm">{item.title}</h4>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <button
                  className="text-red-600 px-2"
                  onClick={() => handleDecrement(item.id, item.quantity)}
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  className="text-green-600 px-2"
                  onClick={() => handleIncrement(item.id, item.quantity)}
                >
                  +
                </button>
              </div>
              <button className="text-red-600 ml-2" onClick={() => removeFromCart(item.id)}>
                <FaTimes />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 text-right font-bold">
        Total: ${totalAmount.toFixed(2)}
      </div>
      <div className="mt-4">
        {
          cart.length !== 0 && 
          <button
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded"
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
