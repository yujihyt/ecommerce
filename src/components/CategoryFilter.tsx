import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/productService';
import { useFavorite } from '../context/FavoriteContext';

type CategoryFilterProps = {
  selectedCategories: string[];
  onCategoryChange: (category: string[]) => void;
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategories, onCategoryChange }) => {
  const { favorites } = useFavorite();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories([...data, 'Favorites']);
    };

    getCategories();
  }, []);

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md bg-white m-md">
      <h2 className="text-xl font-semibold mb-4 text-main-text">Categories</h2>
      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <div key={category} className="flex items-center justify-between border-b border-gray-200 py-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="mr-2"
              />
              <span className="text-md font-medium text-secondary-text">
                {category} {category === 'Favorites' && `(${favorites.length})`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
