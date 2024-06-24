'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import ProductList from '@/components/ProductList';

const Home = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Initialize wishlist from localStorage if available
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []); // Run this effect only once, on mount

  useEffect(() => {
    // Save wishlist to localStorage whenever it changes
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <div className='text-center text-black bg-[#f5f7fa]'>
      <div>
        <ul className='flex space-x-6 p-3'>
          <h4 className=''>CheckOut our latest categories</h4>
          <li>
            <Image src='/tv.png' alt='tv' height={50} width={50} />
            Tvs
          </li>
          <li>
            <Image src='/speakers.png' alt='speakers' height={50} width={50} />
            Speakers
          </li>
          <li>
            <Image src='/headphones.png' alt='headphones' height={50} width={50} />
            PersonalAudio
          </li>
        </ul>
      </div>
      <ProductList wishlist={wishlist} setWishlist={setWishlist} />
    </div>
  );
};

export default Home;
