'use client';
import React from 'react';
import { useWishlist } from '@/context/WishlistContext';

const WishlistButton = ({ product, className = '' }) => {
  const { wishlists, addToWishlist, removeFromWishlist } = useWishlist();
  const isWishlisted = wishlists.some((item) => item._id === product?._id);

  const toggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!product) return;
    if (isWishlisted) removeFromWishlist(product._id);
    else addToWishlist(product);
  };

  return (
    <button
      onClick={toggle}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      className={`flex items-center justify-center rounded-full transition-all
        ${isWishlisted
          ? 'text-red-500 hover:text-red-600'
          : 'text-slate-300 hover:text-red-400'}
        ${className}`}
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill={isWishlisted ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  );
};

export default WishlistButton;
