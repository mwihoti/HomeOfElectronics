'use client'
import React, { useEffect, useState } from 'react'
import Wishlist from '@/components/Wishlist'

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([])


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            setWishlist(savedWishlist)
        }
    }, [])
  return (
    <div>
        <h1> Wishlist page</h1>
        <Wishlist wishlist={wishlist} />       
    </div>
  )
}

export default WishlistPage