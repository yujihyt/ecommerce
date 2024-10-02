import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import { useFavorite } from '../context/FavoriteContext';

const ITEMS_PER_PAGE = 9;

const Home = () => {
  const { favorites } = useFavorite();
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

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
      setFilteredProducts(favorites);
    } else {
      const filtered = products.filter((product: any) =>
        selectedCategories.includes(product.category)
      );
      setFilteredProducts(filtered);
    }
    setCurrentPage(1);
  }, [selectedCategories, products, favorites]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <div className="w-1/4">
          <CategoryFilter
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
          />
        </div>
        <div className="w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentItems.map((product: any) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>

          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-button text-main' : 'bg-secondary text-main-text'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
