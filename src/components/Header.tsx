import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import CartDropdown from './CartDropdown';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const cartRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
    <header className="bg-main p-4 flex flex-col sm:flex-row justify-between items-center relative">
      <div className="flex items-center mb-2 sm:mb-0">
        <img src="/vector.png" alt="Project Logo" className="h-10 w-10" />
        <h1 className="text-2xl font-bold cursor-pointer text-main-text ml-2">
          <Link to="/">Ecommerce</Link>
        </h1>
      </div>

      <nav className="flex space-x-4 mb-2 sm:mb-0">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/categories" className="hover:text-blue-400">Categories</Link>
        <Link to="/about" className="hover:text-blue-400">About</Link>
        <Link to="/contact" className="hover:text-blue-400">Contact</Link>
      </nav>

      <div className="flex items-center space-x-4 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 text-black rounded-md border"
          placeholder="Search products..."
        />

        <div className="relative text-button" ref={cartRef}>
          <FaShoppingCart
            className="text-2xl cursor-pointer"
            onClick={() => setCartOpen(!cartOpen)}
          />
          {cartOpen && <CartDropdown />}
        </div>

        <FaUser className="text-2xl cursor-pointer text-button" onClick={() => navigate('/user')} />
      </div>
    </header>
  );
};

export default Header;
