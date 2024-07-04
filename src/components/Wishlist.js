'use client'
import React from 'react';
import Link from 'next/link';
import useLocalStorageWishlist from '@/lib/wishlist';

const WishList = () => {
  const { wishlists, removeFromWishlist } = useLocalStorageWishlist();
  console.log('Wishlist items:', wishlists);

  return (
    <div className='mx-auto text-center'>
      <h3>Your wishlist</h3>
      <div className='justify-center m-3'>
        {wishlists.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <ul className='p-3 m-2 space-between text-black gap-8 grid grid-cols-2 divide-x'>
            {wishlists.map((product) => (
              <li key={product._id} className='bg-gray-200 border m-2'>
                <Link href={`/product/${product._id}`}>
                
                <div>
                  <img
                    src={product.currentImage || product.images[0]}
                    loading='lazy'
                    className='object-fill object-center h-40 w-full'
                    alt={product.name}
                  />
                </div>
                </Link>
                <h4>Product name: {product.name}</h4>
                <div className='flex gap-10 justify-center m-2'>
                  <p>
                    <strong>Price</strong>: {product.price}
                  </p>
                  
                </div>
                {product.slug && product.slug.current ? (
                  <Link
                    href={`/product/${product.slug.current}`}
                    className='bg-blue-400 p-2 text-white'
                  >
                    View Product
                  </Link>
                ) : (
                  <p className='text-red-500'>Slug not available</p>
                )}
                <button onClick={() => removeFromWishlist(product._id)}>Remove</button>
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
