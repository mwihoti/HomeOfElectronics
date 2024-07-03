'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlists');
    if (storedWishlist) {
      setWishlists(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlists', JSON.stringify(wishlists));
  }, [wishlists]);

  const addToWishlist = (product) => {
    setWishlists((prevWishlist) => {
      const isInWishlist = prevWishlist.some((item) => item._id === product._id);
      if (!isInWishlist) {
        return [...prevWishlist, product];
      }
      return prevWishlist;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlists((prevWishlist) => prevWishlist.filter((item) => item._id !== productId));
  };

  return (
    <WishlistContext.Provider value={{ 
        wishlists, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
