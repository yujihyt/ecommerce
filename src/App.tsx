import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Breadcrumb from './components/Breadcrumb';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import { FavoriteProvider } from './context/FavoriteContext';
import { fetchProducts } from './services/productService';
import CategoriesPage from './pages/CategoriesPage';
import PromotionBar from './components/PromotionBar';

const App = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
    };

    getProducts();
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <Router>
      <FavoriteProvider>
        <CartProvider>
          <PromotionBar/>
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Breadcrumb />
          <Routes>
            <Route
              path="/"
              element={<HomePage filteredProducts={filteredProducts} />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
          </Routes>
        </CartProvider>
      </FavoriteProvider>
    </Router>
  );
};

export default App;
