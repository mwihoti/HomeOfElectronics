'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const WishList = () => {
  // Step 2: Initialize local state for wishlists
  const [wishlists, setWishlists] = useState([]);

  // Step 3: Simulate fetching wishlist data
  useEffect(() => {
    // Simulate fetching data (replace with actual data fetching logic)
    const fetchedWishlists = []; // Fetch or simulate fetch from an API or local source
    setWishlists(fetchedWishlists);
    console.log("Wishlist component, wishlists:", fetchedWishlists);
  }, []); // Empty dependency array means this effect runs once on mount

  const wishlistArray = Array.isArray(wishlists) ? wishlists : [];

  return (
    <div className='mx-auto text-center'>
      <h3>Your wishlist</h3>
      <div className='justify-center m-3'>
        {wishlistArray.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <ul className='p-3 m-2 space-between text-black gap-8 grid grid-cols-2 divide-x'>
            {wishlistArray.map((product) => (
              <li key={product._id} className='bg-gray-200 border m-2'>
                <div>
                  <img
                    src={`data:image/jpeg;base64,${product.currentImage || product.images[0]}`}
                    loading='lazy'
                    className='object-fill object-center h-40 w-full'
                    alt={product.name}
                  />
                </div>
                <h4>Product name: {product.name}</h4>
                <div className='flex gap-10 justify-center m-2'>
                  <p>
                    <strong>Price</strong>: {product.price}
                  </p>
                  <p>
                    <strong>Quantity</strong>: {product.quantity}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Link href='/' passHref>
        <button className="mt-4 px-4 py-2 border border-gray-400 bg-gray-400 rounded-lg">Back</button>
      </Link>
    </div>
  );
};

export default WishList;