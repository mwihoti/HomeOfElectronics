'use client';
import React from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const router = useRouter();
  const { cart, removeFromCart, countQuantityAdded, getTotalPrice, getTotalUniqueItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5dbcb] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-slate-700 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-6 max-w-xs">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5dbcb]">
      {/* Page header */}
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Shopping Cart</h1>
            <p className="text-sm text-slate-500 mt-0.5">{getTotalUniqueItems()} {getTotalUniqueItems() === 1 ? 'item' : 'items'}</p>
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

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart items */}
          <div className="flex-1">
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item._id}
                  className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col sm:flex-row"
                >
                  {/* Image */}
                  <Link href={`/product/${item._id}`} className="shrink-0 sm:w-40 h-40 sm:h-auto relative block bg-slate-100">
                    {item.images?.[0] ? (
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        className="object-cover"
                        loading="eager"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No Image</div>
                    )}
                  </Link>

                  {/* Details */}
                  <div className="flex flex-col sm:flex-row flex-1 p-5 gap-4">
                    <div className="flex-1">
                      <Link href={`/product/${item._id}`} className="hover:text-blue-600 transition-colors">
                        <h3 className="text-sm font-semibold text-slate-900 leading-snug mb-2">{item.name}</h3>
                      </Link>
                      <p className="text-lg font-bold text-slate-900 mb-3">Ksh {item.price?.toLocaleString()}</p>

                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => countQuantityAdded(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors text-lg font-medium"
                        >
                          −
                        </button>
                        <span className="w-10 text-center text-sm font-medium text-slate-900">{item.quantity}</span>
                        <button
                          onClick={() => countQuantityAdded(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors text-lg font-medium"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal + remove */}
                    <div className="flex sm:flex-col items-start sm:items-end justify-between gap-3 shrink-0">
                      <p className="text-sm font-semibold text-slate-700">
                        Subtotal: <span className="text-slate-900">Ksh {(item.price * item.quantity)?.toLocaleString()}</span>
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order summary */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sticky top-24">
              <h2 className="text-base font-bold text-slate-900 mb-5">Order Summary</h2>
              <div className="space-y-3 text-sm text-slate-600 mb-5">
                <div className="flex justify-between">
                  <span>Items ({getTotalUniqueItems()})</span>
                  <span className="font-medium text-slate-900">Ksh {getTotalPrice()?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-between text-base font-bold text-slate-900">
                  <span>Total</span>
                  <span>Ksh {getTotalPrice()?.toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={() => router.push('/payment')}
                className="w-full bg-orange-500 hover:bg-orange-400 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
              >
                Proceed to Payment
              </button>
              <Link
                href="/"
                className="block text-center mt-3 text-sm text-slate-500 hover:text-slate-800 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
