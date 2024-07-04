'use client'
import React from 'react';
import Link from 'next/link';
import useLocalStorageWishlist from '@/lib/wishlist';

const WishList = () => {
  const { wishlists, removeFromWishlist } = useLocalStorageWishlist();
  console.log('Wishlist items:', wishlists);

  return (
    <div className='container mx-auto text-center p-4'>
      <h3 className='text-2xl font-bold mb-4'>Your Wishlist</h3>
      <div className='flex justify-center'>
        {wishlists.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <ul className='w-full space-y-4'>
            {wishlists.map((product) => (
              <li key={product._id} className='bg-gray-200 border rounded-lg p-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4'>
                <Link href={`/product/${product._id}`} className='w-full md:w-1/3'>
                  <img
                    src={product.currentImage || product.images[0]}
                    loading='lazy'
                    className='object-cover object-center h-60 w-full rounded-lg'
                    alt={product.name}
                  />
                </Link>
                <div className='md:ml-4 flex flex-col justify-between flex-grow text-left'>
                  <h4 className='text-lg font-semibold mb-2'>{product.name}</h4>
                  <p className='text-gray-700'><strong>Price:</strong> Ksh {product.price}</p>
                  <div className='flex gap-4 mt-4'>
                    <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => removeFromWishlist(product._id)}>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Link href='/'>
        <button className="mt-4 px-4 py-2 border border-gray-400 bg-gray-400 rounded-lg hover:bg-gray-500">Back</button>
      </Link>
    </div>
  );
};

export default WishList;
