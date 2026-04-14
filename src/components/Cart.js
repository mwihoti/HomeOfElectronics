'use client';
import React from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const Cart = () => {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    updateCartItemQuantity,
    getTotalPrice,
    getTotalUniqueItems,
  } = useCart();

  const total = getTotalPrice();
  const itemCount = getTotalUniqueItems();

  // ── Empty state ───────────────────────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5dbcb] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
          <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 text-sm mb-7 max-w-xs">
          Browse our store and add something you love.
        </p>
        <Link href="/"
          className="bg-slate-900 hover:bg-slate-700 text-white font-semibold px-7 py-3 rounded-xl text-sm transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  // ── Cart with items ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f5dbcb]">

      {/* Page header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-slate-400 hover:text-slate-700 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-none">Shopping Cart</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-800 transition-colors hidden sm:block">
            Continue Shopping →
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* ── Cart items list ─────────────────────────────────────────── */}
          <div className="flex-1 w-full space-y-4">
            {cart.map((item) => {
              const itemId = item.id || item._id;
              const price = Number(item.price) || 0;
              const lineTotal = price * item.quantity;

              return (
                <div key={itemId}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col sm:flex-row">

                  {/* Image */}
                  <Link href={`/product/${itemId}`}
                    className="shrink-0 relative w-full sm:w-36 h-44 sm:h-auto bg-slate-50 block">
                    {item.images?.[0] ? (
                      <Image src={item.images[0]} alt={item.name} fill
                        className="object-cover" sizes="144px" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-xs">
                        No image
                      </div>
                    )}
                  </Link>

                  {/* Details */}
                  <div className="flex flex-col flex-1 p-4 sm:p-5 gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${itemId}`}
                          className="text-sm font-semibold text-slate-900 hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                          {item.name}
                        </Link>
                        {item.category && (
                          <span className="inline-block mt-1 text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                            {item.category}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(itemId)}
                        className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                        aria-label="Remove item"
                      >
                        <TrashIcon />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      {/* Quantity stepper */}
                      <div className="flex items-center gap-0 border border-slate-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateCartItemQuantity(itemId, Math.max(1, item.quantity - 1))}
                          className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors text-lg font-medium disabled:opacity-40"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="w-10 h-9 flex items-center justify-center text-sm font-semibold text-slate-900 border-x border-slate-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartItemQuantity(itemId, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors text-lg font-medium"
                        >
                          +
                        </button>
                      </div>

                      {/* Line total */}
                      <div className="text-right">
                        <p className="text-base font-bold text-slate-900">
                          Ksh {lineTotal.toLocaleString()}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-slate-400">
                            Ksh {price.toLocaleString()} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Order summary sidebar ────────────────────────────────────── */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:sticky lg:top-24">
              <h2 className="text-base font-bold text-slate-900 mb-5">Order Summary</h2>

              {/* Line items */}
              <ul className="space-y-2.5 text-sm mb-5">
                {cart.map((item) => {
                  const itemId = item.id || item._id;
                  const price = Number(item.price) || 0;
                  return (
                    <li key={itemId} className="flex justify-between text-slate-600">
                      <span className="truncate max-w-[60%]">{item.name}</span>
                      <span className="font-medium text-slate-800 whitespace-nowrap ml-2">
                        Ksh {(price * item.quantity).toLocaleString()}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* Totals */}
              <div className="border-t border-slate-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-800">Ksh {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Delivery</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 text-base pt-2 border-t border-slate-100">
                  <span>Total</span>
                  <span>Ksh {total.toLocaleString()}</span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => router.push('/payment')}
                className="mt-5 w-full bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold py-3.5 rounded-xl text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Proceed to Checkout
              </button>

              <p className="mt-3 text-center text-xs text-slate-400">
                Secured · Free returns · M-Pesa supported
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
