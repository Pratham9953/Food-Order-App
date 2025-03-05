import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MenuCard from "./components/MenuCard";
import Cart from "./components/Cart";
import "./components/styles.css";

const App = () => {
  const [cart, setCart] = useState([]);

  // Load cart from local storage when app starts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    const index = cart.findIndex(item => item.id === itemId);
    if (index !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(index, 1);
      setCart(updatedCart);
    }
  };

  return (
    <Router>
      <div className="p-4">
        <nav className="flex justify-between bg-gray-900 text-white p-4">
          <Link to="/" className="text-xl font-bold">🍽️ My Menu App</Link>
          <Link to="/cart" className="bg-blue-500 px-4 py-2 rounded">
            🛒 Cart ({cart.length})
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<MenuCard addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} removeFromCart={removeFromCart} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
