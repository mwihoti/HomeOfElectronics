import React from 'react';
import Cart from '@/components/Cart';
import Navbar from '@/components/Navbar';
import { CartProvider } from '@/context/CartContext';


const cartPage = () => {
  return (
    <div>
      
        <Cart />
       
    </div>
  )
}

export default cartPage