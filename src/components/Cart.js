'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const router = useRouter()
  const { cart, removeFromCart, updateCartItemQuantity, getTotalPrice, getTotalUniqueItems, countQuantityAdded } = useCart();
  console.log('cart items', cart);

  const handleQuantityChange = (item, newQuantity) => {
    countQuantityAdded(item.id, newQuantity);
  };

  if (cart.length === 0) {
    return <p>Your cart is empty</p>;
  }

  const handlePayment = () => {
    router.push('/payment')
  }

  return (
    <div className='container mx-auto p-30 m-20'>
      <h2 className='my-4 text-center'>Your Cart</h2>
      <ul className="space-y-4">
        {cart.map((item) => (
          <li key={item._id} className="flex justify-between items-center border p-2 rounded">
            <div className='flex items-center'>
              {item.images  && item.images.length > 0 ? (
               <Image src={`data:image/jpeg;base64,${item.images[0]}`} alt={item.name} width={60} height={50} />
              ) : (
                <div className="w-12 h-12 flex items-center justify-center bg-gray-200 text-gray-600">
                  No Image
                </div>
              )}
              <div className='ml-3'>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <input type='number' value={item.quantity} onChange={(e) => handleQuantityChange(item, parseInt(e.target.value, 10))} 
                className='w-16 p-1 border rounded' min="1" />
              </div>
            </div>
            <div>
              <p>Price: Ksh {item.price}</p>
              <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className='flex justify-between mt-4'>
        <p>Total Unique Items: {getTotalUniqueItems()}</p>
        <p>Total: Ksh {getTotalPrice()}</p>
        <button className='border px-4 py-2 bg-yellow-500 text-white rounded' onClick={handlePayment}>Proceed to Payment</button>
      </div>
      <button className='mt-4 px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-lg'>
        <Link href='/'>Continue shopping</Link>
      </button>
    </div>
  );
};

export default Cart;
