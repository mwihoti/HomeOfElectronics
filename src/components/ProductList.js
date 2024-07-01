import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import WishlistButton from '@/components/WishlistButton';

const ProductList = ({ initialProducts = [] }) => {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/getProducts');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(
          data.map((product) => ({
            ...product,
            currentImage: product.images ? product.images[0] : null,
            intervalId: null,
          }))
        );
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleMouseEnter = (productId) => {
    const productIndex = products.findIndex((product) => product._id === productId);
    if (productIndex === -1 || !products[productIndex].images || products[productIndex].images.length < 2) return;
    let currentImageIndex = 0 || 1;

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
    if (productIndex === -1) return;
    clearInterval(products[productIndex].intervalId);

    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      newProducts[productIndex].currentImage = newProducts[productIndex].images[0];
      newProducts[productIndex].intervalId = null;
      return newProducts;
    });
  };

  const handleClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  if (products.length === 0) {
    return (
      <div className="mx-auto p-4">
        <h3 className="mb-4 items-center">Our collections</h3>
        <p>No products available.</p>
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
                  src={product.currentImage}
                  loading="lazy"
                  className="object-fill object-center h-40 w-full"
                  alt={product.name}
                  priority
                />
              </div>
              <h4>Product name: {product.name}</h4>
              <div className="flex gap-10 justify-center m-2">
                <p>
                  <strong>Price Ksh: </strong>
                  {product.price}
                </p>
               
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
};

export default ProductList;
