import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { CartItem } from '../types/CartItem';

interface CartDropdownProps {
  cartItems: CartItem[];
}

const CartDropdown: React.FC<CartDropdownProps> = ({ cartItems }) => {
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-lg p-4 z-50">
      <h3 className="font-bold text-lg mb-4">Shopping Cart</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between mb-2">
              <img src={item.image} alt={item.title} className="w-12 h-12 object-cover" />
              <div className="flex-1 ml-2">
                <h4 className="text-sm">{item.title}</h4>
                <p className="text-gray-600">x{item.quantity} - ${item.price.toFixed(2)}</p>
              </div>
              <button className="text-red-600">
                <FaTimes />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 text-right font-bold">
        Total: ${totalAmount.toFixed(2)}
      </div>
    </div>
  );
};

export default CartDropdown;
