'use client'
import React, {useState, useEffect} from 'react'
import ProductForm from '@/components/ProductForm'
import Navbar from '@/components/Navbar'


const ProductPage = () => {

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      setWishlist(savedWishlist);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  return (
    <div>
       <Navbar wishlist={wishlist} />
        <h1>
            Add Products
        </h1>

      { <ProductForm/>}

      


    </div>
  )
}

export default ProductPage