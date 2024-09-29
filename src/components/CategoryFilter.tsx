import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/productService';

type CategoryFilterProps = {
  selectedCategories: string[];
  onCategoryChange: (category: string[]) => void;
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategories, onCategoryChange }) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };

    getCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  return (
    <div className="p-4 border-r">
      <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`p-2 border rounded ${
              selectedCategories.includes(category) ? 'bg-blue-500 text-white' : ''
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
