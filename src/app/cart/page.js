'use client'
import React from 'react';
import Cart from '@/components/Cart';
import withAuth from '@/hoc/withAuth';


const cartPage = () => {
  return (
    <div className='h-screen '>
      
        <Cart className=""/>
       
    </div>
  )
}

export default withAuth(cartPage)