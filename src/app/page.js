'use client'
import React, { useState, useEffect } from 'react';
import Home from './home/page';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';

export default function App() {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      setWishlist(savedWishlist);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  if (!user) {
    if (typeof window !== 'undefined') {
      window.location.href = '/sign/signIn'
    }
    return null
  }
 
  return (
    <main className="">
      <div className="w-full">
        <Navbar wishlist={wishlist} />
        <Home wishlist={wishlist} setWishlist={setWishlist} />
      </div>
    </main>
  );
}
