import React from 'react'
import ProductForm from '@/components/ProductForm'
import ProductDetail from '@/app/product/[ProductDetail]'

const ProductPage = () => {
  return (
    <div>
        <h1>
            Add Products
        </h1>

      { /* <ProductForm/>*/}
        <ProductDetail />


    </div>
  )
}

export default ProductPage