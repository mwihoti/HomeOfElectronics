import React from 'react';
import ProductList from '@/components/ProductList'; // Adjust import path as necessary
import { client } from '@/lib/client';

const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  console.log('sanity', query)
  const products = await client.fetch(query);

  return {
    props: { initialProducts: products || [] },

    }
  }
  const ProductsPage = ({ initialProducts }) => {
    return <ProductList initialProducts={products} />;
  };

export default ProductsPage;
