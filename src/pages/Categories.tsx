import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import { capitalizeFirstLetterOfEachWord } from '../utils/capitalize-first-letter';

const Categories: React.FC = () => {
  const [productsByCategory, setProductsByCategory] = useState<Record<string, any[]>>({});

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      organizeProductsByCategory(data);
    };

    getProducts();
  }, []);

  const organizeProductsByCategory = (products: any[]) => {
    const categories: Record<string, any[]> = {};

    products.forEach(product => {
      if (!categories[product.category]) {
        categories[product.category] = [];
      }
      categories[product.category].push(product);
    });

    setProductsByCategory(categories);
  };

  return (
    <div className="container mx-auto p-4">
      {Object.keys(productsByCategory).map(category => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-main-text">{capitalizeFirstLetterOfEachWord(category)}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {productsByCategory[category].map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
