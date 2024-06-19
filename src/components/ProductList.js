"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
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

  const addToWishlist = (productId) => {
    const productToAdd = products.find((product) => product._id === productId);
    if (!wishlist.some((item) => item._id === productId)) {
      setWishlist([...wishlist, productToAdd]);
    }
  };

  const handleWishlistClick = () => {
    console.log('Wishlist clicked', wishlist);
    // Implement logic to show wishlist items or navigate to wishlist page
  };

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
              <div className="flex">
                <button
                  className="p-2 border ml-20 border-gray-500 m-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist(product._id);
                  }}
                >
                  Add to
                  <br />
                  <Image className="rounded object-fill" src="/wishlist.png" alt="wishlist" width={40} height={30} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
