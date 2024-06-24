'use client'
import React, { useRef } from 'react';
import Link from 'next/link';

const Cart = ({
  cartItems = [],
  totalPrice,
  totalQuantities,
  setShowCart,
  toggleCartItemQuantity,
  onRemove,
  handleCheckout,
}) => {
  const cartRef = useRef();

  return (
    <div className="cart-wrapper fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 overflow-y-auto">
      <div className="cart-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <button
          type="button"
          className="cart-heading flex items-center justify-between px-4 py-2 border-b cursor-pointer"
          onClick={() => setShowCart(false)}
        >
          <span className="text-lg font-semibold">Your Cart</span>
          <span className="text-sm text-gray-600">{totalQuantities} items</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container overflow-y-auto">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div key={item._id} className="product flex items-center border-b p-4">
                <img
                  src={item.image}
                  className="cart-product-image h-20 w-20 object-contain rounded"
                  alt={item.name}
                />
                <div className="item-desc flex-grow ml-4">
                  <div className="flex justify-between items-center">
                    <h5 className="font-semibold">{item.name}</h5>
                    <h4 className="font-semibold">${item.price}</h4>
                  </div>
                  <div className="flex items-center mt-2">
                    <button
                      className="quantity-btn text-gray-500 focus:outline-none"
                      onClick={() => toggleCartItemQuantity(item._id, 'dec')}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="quantity-btn text-gray-500 focus:outline-none"
                      onClick={() => toggleCartItemQuantity(item._id, 'inc')}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="remove-item ml-auto text-red-500 focus:outline-none"
                      onClick={() => onRemove(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom p-4 border-t">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Subtotal:</h3>
              <h3 className="font-semibold">${totalPrice}</h3>
            </div>
            <div className="flex mt-4">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mr-4"
                onClick={handleCheckout}
              >
                Make Payment
              </button>
              <Link href="/">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
                  onClick={() => setShowCart(false)}
                >
                  Back to Homepage
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
