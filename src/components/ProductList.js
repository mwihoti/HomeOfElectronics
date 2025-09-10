"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import WishlistButton from "@/components/WishlistButton";
import { useWishlist } from "@/context/WishlistContext";

const ProductList = ({ initialProducts = [] }) => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const { addToWishlist } = useWishlist();
  const [hoveredProductId, setHoveredProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/getProducts");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(
          data.map((product) => ({
            ...product,
            currentImage: product.images ? product.images[0] : null,
            intervalId: null,
            rating: product.rating || 4.5,
            features: product.features || [],
          }))
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleMouseEnter = (productId) => {
    const productIndex = products.findIndex((product) => product._id === productId);
    if (productIndex === -1 || !products[productIndex].images || products[productIndex].images.length < 2) return;

    let currentImageIndex = 0;

    const intervalId = setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % products[productIndex].images.length;
      setProducts((prevProducts) => {
        const newProducts = [...prevProducts];
        newProducts[productIndex] = {
          ...newProducts[productIndex],
          currentImage: newProducts[productIndex].images[currentImageIndex],
        };
        return newProducts;
      });
    }, 500);

    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      newProducts[productIndex] = {
        ...newProducts[productIndex],
        intervalId,
      };
      return newProducts;
    });
    setHoveredProductId(productId);
  };

  const handleMouseLeave = (productId) => {
    const productIndex = products.findIndex((product) => product._id === productId);
    if (productIndex === -1) return;

    clearInterval(products[productIndex].intervalId);

    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      newProducts[productIndex] = {
        ...newProducts[productIndex],
        currentImage: newProducts[productIndex].images[0],
        intervalId: null,
      };
      return newProducts;
    });
    setHoveredProductId(null);
  };

  const handleClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  const handleAddToWishlist = (e, product) => {
    e.stopPropagation();
    addToWishlist(product);
  };

  const handleBuyNow = (e, productId) => {
    e.stopPropagation();
    alert(`Buy Now clicked for ${productId}! Implement checkout logic here.`);
  };

  const handlePreview = (e, productId) => {
    e.stopPropagation();
    router.push(`/product/${productId}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  if (products.length === 0) {
    return (
      <div className="mx-auto p-4">
        <h3 className="mb-4 text-center">Our Collections</h3>
        <p className="text-center">No products available.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4">
      <h3 className="mb-4 text-center">Our Collections</h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const originalPrice = product.originalPrice || product.price; // Fallback to price if originalPrice is missing
          const savings = product.savings !== undefined ? `Save Ksh${product.savings.toFixed(2)}` : "";
          const discountPercentage = product.discount ? `-${product.discount}%` : "";
          const displayPrice = product.discountedPrice !== undefined ? product.discountedPrice : product.price;

          return (
            <li
              key={product._id}
              className="bg-white border border-gray-200 p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300"
              onMouseEnter={() => handleMouseEnter(product._id)}
              onMouseLeave={() => handleMouseLeave(product._id)}
              onClick={() => handleClick(product._id)}
            >
              <div className="relative w-full h-64">
                <Image
                  src={product.currentImage || "/placeholder.jpg"}
                  alt={product.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-t-lg"
                  priority
                />
                {discountPercentage && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {discountPercentage}
                  </span>
                )}
              </div>
              <div className="p-2">
                <h4 className="mt-2 text-lg font-bold">{product.name}</h4>
                <p className="text-gray-600 text-sm">
                  {product.features.join(", ") || "High-quality electronics"}
                </p>
                <div className="flex items-baseline gap-2">
                  {discountPercentage && (
                    <p className="text-sm text-gray-500 line-through">
                      Ksh: {originalPrice}
                    </p>
                  )}
                  <p className="text-lg font-semibold text-green-600">
                    Ksh: {displayPrice}
                  </p>
                </div>
                {savings && <p className="text-sm text-green-600">{savings}</p>}
                <div className="flex items-center mt-1">
                  {renderStars(product.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.reviews} reviews)
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {product.sold > 0 ? `${product.sold} sold` : "New Arrival"}
                </p>
                <div
                  className={`mt-2 space-x-2 ${
                    hoveredProductId === product._id ? "flex" : "hidden"
                  }`}
                >
                  <button
                    className="w-1/2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                    onClick={(e) => handleBuyNow(e, product._id)}
                  >
                    Buy Now
                  </button>
                  <button
                    className="w-1/2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                    onClick={(e) => handlePreview(e, product._id)}
                  >
                    Preview
                  </button>
                </div>
                <div className="mt-2 flex space-x-2">
                  <button
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Added ${product.name} to cart!`);
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="w-full bg-gray-200 px-2 py-1 rounded flex items-center justify-center"
                    onClick={(e) => handleAddToWishlist(e, product)}
                  >
                    <h3 className="text-center text-sm">Add to</h3>
                    <Image
                      className="ml-1 object-contain"
                      src="/wishlist.png"
                      alt="wishlist"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductList;