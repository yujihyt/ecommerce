import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
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

        <FaShoppingCart className="text-2xl cursor-pointer" onClick={() => navigate('/cart')} />
        <FaUser className="text-2xl cursor-pointer" onClick={() => navigate('/user')} />
      </div>
    </header>
  );
};

export default Header;
