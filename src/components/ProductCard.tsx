import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useFavorite } from '../context/FavoriteContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

type ProductCardProps = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const ProductCard = ({ id, title, price, image }: ProductCardProps) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const { toggleFavorite, favorites } = useFavorite();
  const isFavorite = favorites.some(item => item.id === id);
  const [hovered, setHovered] = useState(false);

  const cartItem = cart.find((item) => item.id === id);

  const handleToggleFavorite = () => {
    const item: CartItem = { id, title, price, image, quantity: 1 };
    toggleFavorite(item);
  };

  return (
    <div
      className="border p-4 rounded-lg shadow relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={image} alt={title} className="w-full h-48 object-contain mb-2" />
      {hovered && (
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 z-10"
          aria-label="Toggle Favorite"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-500" />
          )}
        </button>
      )}
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="flex justify-between items-center mt-2">
        <span className="text-green-500">In stock</span>
        <p className="text-sm">${price}</p>
      </div>
      
      {hovered && (
        <div className="absolute bottom-0 left-0 w-full bg-white p-2">
          {(cartItem && cartItem.quantity > 0) ? (
            <div className="flex items-center justify-between">
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => cartItem.quantity === 1 ? removeFromCart(id) : updateQuantity(id, cartItem.quantity - 1)}
              >
                -
              </button>
              <span>{cartItem.quantity}</span>
              <button
                className="px-2 py-1 bg-green-500 text-white rounded"
                onClick={() => updateQuantity(id, cartItem.quantity + 1)}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="w-full py-1 bg-blue-500 text-white rounded"
              onClick={() => addToCart({ id, title, price, image, quantity: 1 })}
            >
              Add to Cart
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
