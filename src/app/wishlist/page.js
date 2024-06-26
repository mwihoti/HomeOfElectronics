'use client'
import React, { useEffect, useState } from 'react'
import Wishlist from '@/components/Wishlist'
import Navbar from '@/components/Navbar'
import withAuth from '@/hoc/withAuth'

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([])


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            setWishlist(savedWishlist)
        }
    }, [])
  return (
    <div className='h-screen'>
         <Navbar wishlist={wishlist} />
        <Wishlist wishlist={wishlist} />       
    </div>
  )
}

export default withAuth(WishlistPage)