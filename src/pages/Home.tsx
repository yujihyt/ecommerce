import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import { useFavorite } from '../context/FavoriteContext';

const Home = () => {
  const { favorites } = useFavorite();
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
    };

    getProducts();
  }, []);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(products);
    } else if (selectedCategories.includes('Favorites')) {
      setFilteredProducts(favorites); // Show only favorites
    } else {
      const filtered = products.filter((product: any) =>
        selectedCategories.includes(product.category)
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategories, products, favorites]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="flex">
        <div className="w-1/4">
          <CategoryFilter
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
          />
        </div>
        <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-md">
          {filteredProducts.map((product: any) => (
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
    </div>
  );
};

export default Home;
