import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CartItem } from '../types/CartItem';

type FavoriteContextType = {
  favorites: CartItem[];
  toggleFavorite: (item: CartItem) => void;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorite must be used within a FavoriteProvider');
  }
  return context;
};

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<CartItem[]>([]);

  const toggleFavorite = (item: CartItem) => {
    setFavorites((prevFavorites) => {
      const existingItem = prevFavorites.find(favItem => favItem.id === item.id);
      if (existingItem) {
        return prevFavorites.filter(favItem => favItem.id !== item.id);
      } else {
        return [...prevFavorites, item];
      }
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
