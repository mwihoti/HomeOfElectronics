'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));

    }
   
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    const existingItemIndex = cart.find(item => item.id === product.id);

    if (existingItemIndex == -1) {
      const updatedCart = [...cart];
      const existingItem = updatedCart[existingItemIndex]
      const updatedItem = { ...existingItem, quantity: existingItem.quantity}
      updatedCart[existingItemIndex] = updatedItem
      setCart(updatedCart    );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const countQuantityAdded = (productId) => {
    // Find the product in the cart
    const productInCart = cart.find(item => item.id === productId);
    // Return the quantity of the product if it exists, otherwise 0
    return productInCart ? productInCart.quantity : 0;
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    setCart(cart.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = productId => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalUniqueItems = () => cart.length;

  const getTotalItems = () => cart.reduce((acc, item) => acc + item.quantity, 0);

  const getTotalPrice = () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart, addToCart,countQuantityAdded, updateCartItemQuantity, removeFromCart, clearCart,
      getTotalUniqueItems, getTotalItems, getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};
