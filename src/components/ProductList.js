"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import WishlistButton from '@/components/WishlistButton';
import { client } from '@/lib/client';
const ProductList = ({ products}) => {
  const router  = useRouter();  
  const [products, setProducts] = useState(
    initialProducts.map(product => ({
      ...product,
      currentImage: product.images[0],
      intervalId: null, })) 
  );
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);
  //const router = useRouter();

  //useEffect(() => {
    //const fetchProducts = async () => {
      //try {
        //const response = await fetch('/api/getProducts', {
          //headers: {
            //'Cache-Control': 'no-cache',
          //},
        //});
        //const data = await response.json();
        //if (response.ok) {
        //  setProducts(data);
       // } else {
       ///   setError(data.message);
      //  }
     // } catch (error) {
     //   setError(error.message);
    //  } finally {
   //     setLoading(false);
    //  }
   // };

   // fetchProducts();
 // }, []);
  <div>
    {products?.map((productItem) => <Product key= {productItem._id} product={productItem} />)}
  </div>

  const handleMouseEnter = (productId) => {
    const productIndex = products.findIndex((product) => product._id === productId);
    let currentImageIndex = 0;

    const intervalId = setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % products[productIndex].images.length;
      setProducts((prevProducts) => {
        const newProducts = [...prevProducts];
        newProducts[productIndex].currentImage = newProducts[productIndex].images[currentImageIndex];
        return newProducts;
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
  };

  const handleClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  //const addToWishlist = (productId) => {
  //  const productToAdd = products.find((product) => product._id === productId);
   // if (!productToAdd) {
  //    console.error(`Product with id ${productId} not found`);
  //    return;
  //  }
    
  //  if (!wishlist) {
  //    setWishlist([productToAdd]);
  //    localStorage.setItem('wishlist', JSON.stringify([productToAdd]));
  //   return;
  //  }
    
   // if (!wishlist.some((item) => item._id === productId)) {
  //    const newWishlist = [...wishlist, productToAdd];
   //   setWishlist(newWishlist);
   //   localStorage.setItem('wishlist', JSON.stringify(newWishlist));
   // }
  //};
  

  if (loading) {
    return (
      <div className="mx-auto p-4">
        <h3 className="mb-4 items-center">Our collections</h3>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto p-4">
        <h3 className="mb-4 items-center">Our collections</h3>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4">
      <h3 className="mb-4 items-center">Our collections</h3>
      <div className="justify-center m-3">
        <ul className="p-3 m-2 space-between text-black gap-8 grid grid-cols-4 divide-x">
          {products.map((product) => (
            <li
              key={product._id}
              className="bg-gray-200 border m-2"
             
            >
              <div
                 onMouseEnter={() => handleMouseEnter(product._id)}
                 onMouseLeave={() => handleMouseLeave(product._id)}
                 onClick={() => handleClick(product._id)}
              >
                  <div className="w-full p-3">
                <img
                  src={`data:image/jpeg;base64,${product.currentImage || product.images[0]}`}
                  loading="lazy"
                  className="object-fill object-center h-40 w-full"
                  alt={product.name}
                />
              </div>
              <h4>Product name: {product.name}</h4>
              <div className="flex gap-10 justify-center m-2">
                <p>
                  <strong>Price Ksh: </strong>
                  {product.price}
                </p>
                <p>
                  <strong>Quantity: </strong>
                  {product.quantity}
                </p>
              </div>

              </div>
            
              <div className="flex">
                <WishlistButton product={product} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );


  }

  export const getServerSideProps = async (  ) => {
    const query = '*[_type == "product"]'
    const products = await client.fetch(query);

    return {
      props: {products}
    }
  }

export default ProductList;
