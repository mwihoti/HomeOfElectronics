'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const ProductDetail = () => {
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numItems, setNumItems] = useState(1);
  const { addToCart } = useCart();
  
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

  const handleAddToCart = () => {
    console.log('Adding to cart:', product, numItems);
    addToCart(product, numItems);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product found</p>;

  return (
    <div className="container mx-auto">
      <h2 className="my-4 text-center">Product selected</h2>
      <div className='grid grid-cols-2 space-x-6'>
        <div className="flex flex-col items-start space-y-4">
          <img className="w-full h-auto object-cover rounded-lg" src={`data:image/jpeg;base64,${product.images[0]}`} alt={product.name} />
          <div className="flex space-x-4">
            {product.images.slice(1).map((image, index) => (
              <img key={index} className="w-1/5 h-auto object-cover rounded-lg" src={`data:image/jpeg;base64,${image}`} alt={`${product.name}-${index}`} />
            ))}
          </div>
          <p className="text-lg"><strong>Description:</strong> {product.description}</p>
        </div>
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-lg"><strong>Price Ksh:</strong> {product.price}</p>
          <p className="text-lg"><strong>Quantity:</strong> {product.quantity}</p>
          <div className='items-center p-1'>
            Select of items:
            <div className='flex'>
              <Image src="/subtract.png" alt="minus" className='border m-2' width={20} height={20} onClick={() => setNumItems(numItems - 1)} />
              <p className="m-2">{numItems}</p>
              <Image src="/add.png" alt="addition" width={20} height={20} className='border m-2' onClick={() => setNumItems(numItems + 1)} />
            </div>
          </div>
          <div className='flex gap-4'>
            <button className="mt-4 px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-lg" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="mt-4 px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-lg">
              <Link href='/'>Continue shopping</Link>
            </button>
          </div>
          <div className='gap-8'>
            <button className="mt-4 px-4 py-2 border border-gray-4 bg-yellow-400 hover:bg-yellow-800 rounded-lg">Buy Now</button>
            <button className="mt-4 px-4 py-2 border border-gray-4 bg-gray-400 rounded-lg">
              <Link href='/'>Home</Link>
            </button>
          </div>
          <button className="mt-4 px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-lg">
            <Link href='/cart'>Check my Cart</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
