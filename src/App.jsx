import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Shop from './Shop';
import Cart from './Cart';
import SearchBar from './SearchBar';

const App = () => {
  const [basket, setBasket] = useState(() => JSON.parse(localStorage.getItem('data')) || []);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(basket));
  }, [basket]);

  return (
    <Router>
      <Header cartCount={basket.reduce((acc, item) => acc + item.item, 0)} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Shop searchQuery={searchQuery} basket={basket} setBasket={setBasket} />} />
        <Route path="/cart" element={<Cart searchQuery={searchQuery} basket={basket} setBasket={setBasket} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
