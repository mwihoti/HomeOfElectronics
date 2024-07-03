import React from 'react';
import Image from 'next/image';
import { useWishlist } from '@/context/WishlistContext';

const WishlistButton = ({ product }) => {
    const { addToWishlist, wishlists} = useWishlist();

    const handleAddtoWishlist = (e) => {
        e.stopPropagation();
        addToWishlist(product);
    }
  return (
    <div>
        <button className='p-2 border inset-1 ml-20 m-2 rounded' onClick={
            handleAddtoWishlist
        }><h3 className='text-center'>Add to</h3>
        <Image className='rounded object-fill' src="/wishlist.png" alt="wishlist" width={20} height={20} />
    </button>
    </div>
  );
}

export default WishlistButton;

       