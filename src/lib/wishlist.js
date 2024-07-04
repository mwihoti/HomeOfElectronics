import { useState, useEffect } from 'react';

const useLocalStorageWishlist = () => {
  const [wishlists, setWishlists] = useState(() => {
    const storedWishlist = localStorage.getItem('wishlists');
    console.log('Initializing wishlist from localStorage:', storedWishlist);
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  useEffect(() => {
    console.log('Storing wishlist to localStorage:', wishlists);
    localStorage.setItem('wishlists', JSON.stringify(wishlists));
    const event = new Event('wishlistUpdated');
    window.dispatchEvent(event);
  }, [wishlists]);

  const addToWishlist = (product) => {
    setWishlists((prevWishlists) => {
      const isInWishlist = prevWishlists.some((item) => item._id === product._id);
      if (!isInWishlist) {
        return [...prevWishlists, product];
      }
      return prevWishlists;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlists((prevWishlists) => prevWishlists.filter((item) => item._id !== productId));
  };

  return { wishlists, addToWishlist, removeFromWishlist };
};

export default useLocalStorageWishlist;
