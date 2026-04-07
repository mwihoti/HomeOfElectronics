"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

const ProductList = ({ initialProducts = [] }) => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { addToWishlist, wishlists } = useWishlist();
  const { addToCart } = useCart();
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [previewProduct, setPreviewProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/getProducts");
        if (!res.ok) throw new Error("Failed to fetch products");
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
        const initialQuantities = data.reduce((acc, product) => {
          acc[product._id] = 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product, quantities[product._id] || 1);
  };

  const handleMouseEnter = (productId) => {
    const productIndex = products.findIndex((p) => p._id === productId);
    if (productIndex === -1 || !products[productIndex].images || products[productIndex].images.length < 2) return;

    let currentImageIndex = 0;
    const intervalId = setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % products[productIndex].images.length;
      setProducts((prev) => {
        const next = [...prev];
        next[productIndex] = { ...next[productIndex], currentImage: next[productIndex].images[currentImageIndex] };
        return next;
      });
    }, 600);

    setProducts((prev) => {
      const next = [...prev];
      next[productIndex] = { ...next[productIndex], intervalId };
      return next;
    });
    setHoveredProductId(productId);
  };

  const handleMouseLeave = (productId) => {
    const productIndex = products.findIndex((p) => p._id === productId);
    if (productIndex === -1) return;
    clearInterval(products[productIndex].intervalId);
    setProducts((prev) => {
      const next = [...prev];
      next[productIndex] = { ...next[productIndex], currentImage: next[productIndex].images[0], intervalId: null };
      return next;
    });
    setHoveredProductId(null);
  };

  const handleAddToWishlist = (e, product) => {
    e.stopPropagation();
    addToWishlist(product);
  };

  const handlePreview = (e, product) => {
    e.stopPropagation();
    setPreviewProduct(product);
  };

  const handleBuyNow = (e, product) => {
    e.stopPropagation();
    addToCart(product, quantities[product._id] || 1);
    router.push("/payment");
  };

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({ ...prev, [productId]: Math.max(1, value) }));
  };

  const renderStars = (rating) =>
    [1, 2, 3, 4, 5].map((i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        className={`h-3.5 w-3.5 ${i <= rating ? "text-amber-400" : "text-slate-200"}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));

  const isInWishlist = (productId) => wishlists.some((w) => w._id === productId);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
        </svg>
        <p className="text-lg font-medium">No products available</p>
        <p className="text-sm mt-1">Check back soon for new arrivals</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-bold text-slate-800">Our Collections</h3>
        <span className="flex-1 h-px bg-slate-200" />
        <span className="text-sm text-slate-500">{products.length} products</span>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => {
          const originalPrice = product.originalPrice || product.price;
          const displayPrice = product.discountedPrice !== undefined ? product.discountedPrice : product.price;
          const discountPct = product.discount ? `-${product.discount}%` : "";
          const savings = product.savings ? `Save Ksh ${product.savings.toFixed(0)}` : "";
          const quantity = quantities[product._id] || 1;
          const isHovered = hoveredProductId === product._id;
          const wishlisted = isInWishlist(product._id);

          return (
            <li
              key={product._id}
              className={`group bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                isHovered ? "shadow-2xl -translate-y-1" : "shadow-md"
              }`}
              onMouseEnter={() => handleMouseEnter(product._id)}
              onMouseLeave={() => handleMouseLeave(product._id)}
              onClick={() => router.push(`/product/${product._id}`)}
            >
              {/* Image */}
              <div className="relative w-full h-56 bg-slate-100 overflow-hidden">
                <Image
                  src={product.currentImage || "/placeholder.jpg"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                {/* Discount badge */}
                {discountPct && (
                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">
                    {discountPct}
                  </span>
                )}
                {/* Wishlist button */}
                <button
                  onClick={(e) => handleAddToWishlist(e, product)}
                  className={`absolute top-3 right-3 p-1.5 rounded-full shadow transition-all duration-200 ${
                    wishlisted ? "bg-red-500 text-white" : "bg-white/90 text-slate-500 hover:text-red-500"
                  }`}
                  aria-label="Add to wishlist"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={wishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                {/* Hover overlay actions */}
                <div className={`absolute inset-x-0 bottom-0 flex gap-2 p-3 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                  <button
                    onClick={(e) => handleBuyNow(e, product)}
                    className="flex-1 bg-orange-500 hover:bg-orange-400 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={(e) => handlePreview(e, product)}
                    className="flex-1 bg-white/90 hover:bg-white text-slate-800 text-xs font-semibold py-2 rounded-lg transition-colors"
                  >
                    Quick View
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="p-4">
                <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                  {product.sold > 0 ? `${product.sold} sold` : "New Arrival"}
                </p>
                <h4 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug mb-2">
                  {product.name}
                </h4>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-xs text-slate-400">({product.reviews || 0})</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-base font-bold text-slate-900">Ksh {displayPrice?.toLocaleString()}</span>
                  {discountPct && (
                    <span className="text-xs text-slate-400 line-through">Ksh {originalPrice?.toLocaleString()}</span>
                  )}
                </div>
                {savings && <p className="text-xs text-green-600 font-medium mb-3">{savings}</p>}

                {/* Add to cart */}
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
                    onClick={(e) => e.stopPropagation()}
                    className="w-14 text-center text-sm border border-slate-200 rounded-lg py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-1.5 rounded-lg transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Quick View Modal */}
      {previewProduct && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewProduct(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 bg-slate-100">
              <Image
                src={previewProduct.currentImage || "/placeholder.jpg"}
                alt={previewProduct.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-1">{previewProduct.name}</h2>
              <p className="text-2xl font-bold text-blue-600 mb-3">Ksh {previewProduct.price?.toLocaleString()}</p>
              <p className="text-sm text-slate-500 mb-5 line-clamp-3">
                {previewProduct.description
                  ? previewProduct.description.split(/(?<=[.!?])\s+/).slice(0, 2).join(" ")
                  : "No description available"}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => router.push(`/product/${previewProduct._id}`)}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={() => setPreviewProduct(null)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
