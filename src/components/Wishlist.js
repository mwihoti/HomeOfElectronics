'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useLocalStorageWishlist from '@/lib/wishlist';
import { useCart } from '@/context/CartContext';

const WishList = () => {
  const { wishlists, removeFromWishlist } = useLocalStorageWishlist();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Wishlist</h1>
            <p className="text-sm text-slate-500 mt-0.5">{wishlists.length} saved {wishlists.length === 1 ? 'item' : 'items'}</p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {wishlists.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-700 mb-2">Your wishlist is empty</h2>
            <p className="text-slate-500 mb-6 max-w-xs">Save items you love and come back to them anytime.</p>
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {wishlists.map((product) => (
              <li
                key={product._id}
                className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col sm:flex-row"
              >
                {/* Image */}
                <Link href={`/product/${product._id}`} className="shrink-0 sm:w-48 h-48 sm:h-auto relative block bg-slate-100">
                  <Image
                    src={product.currentImage || product.images?.[0] || '/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Details */}
                <div className="flex flex-col sm:flex-row flex-1 p-5 gap-4">
                  <div className="flex-1">
                    <Link href={`/product/${product._id}`} className="hover:text-blue-600 transition-colors">
                      <h4 className="text-base font-semibold text-slate-900 mb-1 leading-snug">{product.name}</h4>
                    </Link>
                    {product.features?.length > 0 && (
                      <p className="text-sm text-slate-500 mb-3 line-clamp-2">{product.features.join(' · ')}</p>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-slate-900">Ksh {product.price?.toLocaleString()}</span>
                      {product.originalPrice && product.originalPrice !== product.price && (
                        <span className="text-sm text-slate-400 line-through">Ksh {product.originalPrice?.toLocaleString()}</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col gap-3 sm:justify-center shrink-0">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="flex-1 sm:flex-none sm:w-36 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors text-center"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(product._id)}
                      className="flex-1 sm:flex-none sm:w-36 border border-slate-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600 text-slate-600 text-sm font-medium px-4 py-2 rounded-lg transition-colors text-center"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WishList;
