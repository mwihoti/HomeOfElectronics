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
    <div className="mx-auto p-4">
      <h3 className=' mb-4 items-center'>Our collections</h3>
      <div >
        <div className='flex justify-center'>

       
      <ul className='p-3 flex  gap-4'>
        {products.map((product) => (
          <li key={product._id}>
            <h4>{product.name}</h4>
            <img src={`data:image/jpeg;base64,${product.images}`} alt={product.name} />
            <p>Category: {product.category}</p>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
            <p>Quantity: {product.quantity}</p>
              <button className='p-2 border m-3 rounded bg-zinc-950'> Add </button>
          </li>
          
        ))}
       
      </ul> 
        
       </div>
      
      </div>
     
    </div>
  );
};

export default ProductList;
