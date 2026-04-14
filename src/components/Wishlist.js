'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

const HeartFilledIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const CartIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const WishList = () => {
  const { wishlists, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  // ── Empty state ───────────────────────────────────────────────────────────
  if (wishlists.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5dbcb] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
          <svg className="w-10 h-10 text-slate-200" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Your wishlist is empty</h2>
        <p className="text-slate-500 text-sm mb-7 max-w-xs">
          Save items you love by tapping the heart icon on any product.
        </p>
        <Link href="/"
          className="bg-slate-900 hover:bg-slate-700 text-white font-semibold px-7 py-3 rounded-xl text-sm transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  // ── Wishlist grid ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f5dbcb]">

      {/* Sticky header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-slate-400 hover:text-slate-700 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-none">My Wishlist</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                {wishlists.length} saved {wishlists.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <button
            onClick={() => wishlists.forEach(p => removeFromWishlist(p._id))}
            className="text-xs text-slate-400 hover:text-red-500 transition-colors"
          >
            Clear all
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlists.map((product) => {
            const productId = product._id || product.id;
            const price = Number(product.price) || 0;
            const discountedPrice = product.discountedPrice ? Number(product.discountedPrice) : null;
            const displayPrice = discountedPrice || price;
            const comparePrice = discountedPrice ? price : null;
            const discount = product.discount || 0;

            return (
              <div key={productId}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group">

                {/* Image */}
                <Link href={`/product/${productId}`} className="relative block bg-slate-50 aspect-square overflow-hidden">
                  {(product.currentImage || product.images?.[0]) ? (
                    <Image
                      src={product.currentImage || product.images[0]}
                      alt={product.name}
                      fill
                      className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-200 text-xs">No image</div>
                  )}
                  {discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                      -{discount}%
                    </div>
                  )}
                  {/* Remove heart */}
                  <button
                    onClick={(e) => { e.preventDefault(); removeFromWishlist(productId); }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Remove from wishlist"
                  >
                    <HeartFilledIcon />
                  </button>
                </Link>

                {/* Info */}
                <div className="flex flex-col flex-1 p-3 gap-2">
                  <Link href={`/product/${productId}`}
                    className="text-xs sm:text-sm font-semibold text-slate-800 hover:text-orange-600 transition-colors line-clamp-2 leading-snug flex-1">
                    {product.name}
                  </Link>

                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-bold text-slate-900">
                        Ksh {displayPrice.toLocaleString()}
                      </span>
                      {comparePrice && (
                        <span className="text-[10px] text-slate-400 line-through">
                          Ksh {comparePrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(product, 1)}
                    className="w-full flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-400 text-white text-xs font-semibold py-2 rounded-xl transition-colors"
                  >
                    <CartIcon />
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WishList;
