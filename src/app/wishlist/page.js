'use client'
import React, { useEffect, useState } from 'react'
import Wishlist from '@/components/Wishlist'
import Navbar from '@/components/Navbar'
import withAuth from '@/hoc/withAuth'

const WishlistPage = () => {
   
  return (
    <div className='h-screen'>
    
        <Wishlist />       
    </div>
  )
}

export default withAuth(WishlistPage)