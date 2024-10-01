import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Breadcrumb from './components/Breadcrumb';
import { CartProvider } from './context/CartContent';
import Cart from './pages/Cart';
// import Categories from './pages/Categories';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import Cart from './pages/Cart';
// import User from './pages/User';
// import Search from './pages/Search';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Breadcrumb />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user" element={<User />} />
          <Route path="/search" element={<Search />} /> */}
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
