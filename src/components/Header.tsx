import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import CartDropdown from './CartDropdown';
import { CartItem } from '../types/CartItem';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109.95,
      quantity: 2,
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
    },
    {
      id: 2,
      title: 'Mens Casual Premium Slim Fit T-Shirts ',
      price: 22.3,
      quantity: 1,
      image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg'
    }
  ]);

  const navigate = useNavigate();
  const cartRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
      setCartOpen(false);
    }
  };

  useEffect(() => {
    if (cartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartOpen]);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center relative">
      <div className="flex items-center space-x-4">
        <img src="/vector.png" alt="Project Logo" className="h-10 w-10" />
        <h1 className="text-2xl font-bold cursor-pointer">
          <Link to="/">Ecommerce</Link>
        </h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/categories" className="hover:text-blue-400">Categories</Link>
          <Link to="/about" className="hover:text-blue-400">About</Link>
          <Link to="/contact" className="hover:text-blue-400">Contact</Link>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 text-black rounded-md"
            placeholder="Search products..."
          />
          <button type="submit" className="bg-blue-500 p-2 rounded-md">Search</button>
        </form>

        <div className="relative" ref={cartRef}>
          <FaShoppingCart
            className="text-2xl cursor-pointer"
            onClick={() => setCartOpen(!cartOpen)}
          />
          {cartOpen && <CartDropdown cartItems={cartItems} />}
        </div>

        <FaUser className="text-2xl cursor-pointer" onClick={() => navigate('/user')} />
      </div>
    </header>
  );
};

export default Header;
