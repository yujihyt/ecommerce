import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Breadcrumb from './components/Breadcrumb';
// import Categories from './pages/Categories';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import Cart from './pages/Cart';
// import User from './pages/User';
// import Search from './pages/Search';

const App = () => {
  return (
    <Router>
      <Header />
      <Breadcrumb />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<User />} />
        <Route path="/search" element={<Search />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
