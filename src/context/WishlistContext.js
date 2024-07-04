'use client'
import { createContext, useContext } from 'react';
import useLocalStorageWishlist from '@/lib/wishlist';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const wishlist = useLocalStorageWishlist();
  return (
    <WishlistContext.Provider value={wishlist}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context){
    throw new Error('useWishlist must be used within whishlist provider')

  }
  return context
};
