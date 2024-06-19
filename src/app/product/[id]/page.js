'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const ProductDetail = () => {
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numItems, setNumItems] = useState(1);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/getProduct/${id}`);
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
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product found</p>;

  return (
    <div className="container mx-auto">
      <h2 className="text-center my-4">Product selected</h2>
      <div className="flex items-start space-x-6">
        <img className="w-1/2 h-auto object-cover rounded-lg" src={`data:image/jpeg;base64,${product.images[0]}`} alt={product.name} />
        <div className="w-1/2 m-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-lg"><strong>Price Ksh:</strong> {product.price}</p>
          <p className="text-lg"><strong>Quantity:</strong> {product.quantity}</p>
         
          <div className=' m-2 items-center p-1'>
            Select of items: 
          <div className='flex'>
            <Image src="/subtract.png" alt="minus" className='border m-2' width={20} height={20} onClick={() => setNumItems(numItems - 1)} />
            <p className="m-2">{numItems}</p>

            <Image src="/add.png" alt="addition" width={20} height={20} className='border m-2' onClick={() => setNumItems(numItems + 1)} />


          </div>
          </div>
          <div className='flex gap-4'>
          <button className="mt-4 px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-lg">Add to Cart</button>
          <button className="mt-4 px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-lg">Continue shopping</button>

          </div>
         
        </div>
      </div>
      <div className="flex mt-6 space-x-4">
        {product.images.slice(1).map((image, index) => (
          <img key={index} className="w-1/5 h-auto object-cover rounded-lg" src={`data:image/jpeg;base64,${image}`} alt={`${product.name}-${index}`} />
        ))}
         <p className="text-lg"><strong>Description:</strong> {product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
