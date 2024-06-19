'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/getProduct/${productId}`);
        const data = await response.json();
        if (response.ok) {
          setProduct(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product found</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={`data:image/jpeg;base64,${product.images[0]}`} alt={product.name} />
      <p><strong>Price Ksh:</strong> {product.price}</p>
      <p><strong>Quantity: </strong> {product.quantity}</p>
      <p><strong>Description: </strong> {product.description}</p>
      <button className='p-2 border m-3'>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
