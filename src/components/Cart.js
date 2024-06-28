  'use client'

  import React, {useContext} from 'react';
  import { useCart } from '@/context/CartContext';
  import Image from 'next/image';
  import Link from 'next/link';

  const Cart = () => {
    const { cart, removeFromCart, getTotalPrice, getTotalItems } = useCart();
    console.log('cart items', cart)

    if (cart.length === 0) {
      return <p>Your cart is empty</p>;
    }

    return (
      <div className='container mx-auto'>
        <h2 className='my-4 text-center'>Your Cart</h2>
        <ul className="space-y-4">
        {cart.map((item) => (
          <li key={item._id} className="flex justify-between items-center border p-2 rounded">
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
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
        <p>Total Items: {getTotalItems()}</p>
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
