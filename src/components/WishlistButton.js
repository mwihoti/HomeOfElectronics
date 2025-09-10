import React from 'react';
import Image from 'next/image';
import { useWishlist } from '@/context/WishlistContext';

const WishlistButton = ({ product }) => {
  const { addToWishlist} = useWishlist();

  const handleAddtoWishlist = (e) => {
    e.stopPropagation();
    addToWishlist(product);
  };



  return (
    <div className=''>
     
     
        <button className='py-2 border inset-1  mt-2  w-full rounded bg-blue-500 border-cyan-700 '  onClick={handleAddtoWishlist}>
          <h3 className='text-center'>Add to</h3>
          <Image className='rounded object-fill' src="/wishlist.png" alt="wishlist" width={20} height={20} />
        </button>
     
    </div>
  );
}

export default WishlistButton;
