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
        <h3 className="mb-4 text-center">Our Collections</h3>
        <p>No products available.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4">
      <h3 className="mb-4 text-center">Our Collections</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <li
            key={product._id}
            className="bg-gray-200 border p-4 rounded-lg hover:shadow-lg transition-shadow duration-300"
            onMouseEnter={() => handleMouseEnter(product._id)}
            onMouseLeave={() => handleMouseLeave(product._id)}
            onClick={() => handleClick(product._id)}
          >
            <div className="w-full p-3">
              <img
                src={product.currentImage}
                loading="lazy"
                className="object-fill object-center h-40 w-full rounded-lg"
                alt={product.name}
              />
            </div>
            <h4 className="mt-2 text-lg font-bold">{product.name}</h4>
            <div className="flex justify-between items-center mt-2">
              <p className="text-lg font-semibold">Ksh: {product.price}</p>
            </div>
            <div className="flex justify-center mt-2">
              <WishlistButton product={product} />
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
