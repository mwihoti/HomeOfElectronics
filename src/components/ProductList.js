"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

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

  const handleMouseEnetr = (productId) => {
    const productIndex = products.findIndex((product) => product._id === productId);
    let currentImageIndex = 0;

    const intervalId = setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % products[productIndex].images.length
      setProducts((prevProducts) => {
        const newProducts = [...prevProducts];
        newProducts[productIndex].currentImage = newProducts[productIndex].images[currentImageIndex];
        return newProducts
      });
    }, 500);

    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      newProducts[productIndex].intervalId = intervalId;
      return newProducts;
    });
  };

  const handleMouseLeave = (productId) => {
    const productIndex = products.findIndex((product) => product._id === productId);
    clearInterval(products[productIndex].intervalId);

    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      newProducts[productIndex].currentImage = newProducts[productIndex].images[0];
      return newProducts;
    });
  }

  const handleClick =  (productId) => {
    router.push(`/product/${productId}`);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto p-4 ">
      <h3 className=' mb-4  items-center'>Our collections</h3>
     
        <div className='justify-center  m-3 '>

       
      <ul className='p-3 m-2 space-between  text-black gap-8 grid grid-cols-4 divide-x'>
        {products.map((product) => (
          <li key={product._id } className="bg-gray-200 border m-2"
          onMouseEnter={() => handleMouseEnetr(product._id)}
          onMouseLeave={() => handleMouseLeave(product._id)}
          onClick={() => handleClick(product._id)}
          >
            <div className='w-full p-3'>
            <img src={`${product.currentImage|| product.images[0] }`} loading='lazy' className='object-fill object-center h-40 w-full'  alt={product.name} />


            </div>
           
            
             <h4>Product name: {product.name}</h4>
            { /*<p>Category: {product.category}</p>*/}
            <div className="flex gap-10 justify-center m-2">
            <p><strong>Price Ksh: </strong>{product.price}</p>
            {/*<p>Description: {product.description}</p>*/}
            <p> <strong>Quantity: </strong>{product.quantity}</p>
            
            </div >
           
            <div>

            <button className='p-2 border m-3 rounded '> Add </button>
            </div>
             
          </li>
          
        ))}
       
      </ul> 
   
      
      </div>
     
    </div>
  );
};

export default ProductList;
