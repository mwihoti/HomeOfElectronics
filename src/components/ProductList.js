"use client";
import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/getProducts', {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        const data = await response.json();
        console.log(data);  // Log fetched data
        if (response.ok) {
          setProducts(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h3>Product List</h3>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h4>{product.name}</h4>
            <img src={`data:image/jpeg;base64,${product.images}`} alt={product.name} />
            <p>Category: {product.category}</p>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
            <p>Quantity: {product.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
