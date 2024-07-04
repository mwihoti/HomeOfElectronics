'use client'
import React, {useState, useEffect} from 'react'
import ProductForm from '@/components/ProductForm'
import PaymentsPage from '../orders/page'


const ProductPage = () => {

 
  return (
    <div>

        <h1>
            Add Products
        </h1>

      { <PaymentsPage/>}

      


    </div>
  )
}

export default ProductPage