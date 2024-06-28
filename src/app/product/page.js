'use client'
import React, {useState, useEffect} from 'react'
import ProductForm from '@/components/ProductForm'



const ProductPage = () => {

 
  return (
    <div>

        <h1>
            Add Products
        </h1>

      { <ProductForm/>}

      


    </div>
  )
}

export default ProductPage