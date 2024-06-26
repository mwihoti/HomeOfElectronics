import React from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

const Cart = () => {
  const { cart, removeFromCart, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div className='container mx-auto'>
      <h2 className='my-4 text-center'>Your Cart</h2>
      <div className='grid grid-cols-1 space-y-4'>
        {cart.map(item => (
          <div key={item.id} className='flex items-center space-x-4'>
            <Image src={`data:image/jpeg;base64,${item.images[0]}`} alt={item.name} width={60} height={50} />
            <p>{item.name}</p>
            <p>{item.quantity}</p>
            <p>{item.price}</p>
            <button onClick={() => removeFromCart(item.id)} className='border px-2 py-1 bg-red-500 text-white rounded'>Remove</button>
          </div>
        ))}
      </div>
      <div className='flex justify-between mt-4'>
        <p>Total: Ksh {getTotalPrice()}</p>
        <button className='border px-4 py-2 bg-yellow-500 text-white rounded'>Proceed to Payment</button>
      </div>
      <button className='mt-4 px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-lg'>
        <Link href='/'>Continue shopping</Link>
      </button>
    </div>
  );
};

export default Cart;
