import React from 'react';
import ProductList from '@/components/ProductList'; // Adjust import path as necessary
import { client } from '@/lib/client';

const ProductsPage = async () => {
  const query = '*[_type == "product"]';
  console.log('sanity', query)
  const products = await client.fetch(query);
  return <ProductList initialProducts={products} />;
};

export default ProductsPage;
