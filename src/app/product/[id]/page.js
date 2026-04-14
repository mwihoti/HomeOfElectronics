"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import withAuth from "@/hoc/withAuth";

// ── Icons ─────────────────────────────────────────────────────────────────────
const HeartIcon = ({ filled }) => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const CartIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const BoltIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg className="w-4 h-4" viewBox="0 0 20 20" fill={filled ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="1">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// ── Stars row ─────────────────────────────────────────────────────────────────
const Stars = ({ count = 0 }) => {
  const clamped = Math.min(5, Math.max(0, Math.round(count / 2)));
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} filled={i <= clamped} />)}
    </div>
  );
};

// ── Skeleton ──────────────────────────────────────────────────────────────────
const Skeleton = () => (
  <div className="min-h-screen bg-[#f5dbcb] animate-pulse">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="h-4 w-48 bg-slate-200 rounded mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="aspect-square bg-slate-200 rounded-2xl" />
          <div className="flex gap-3">
            {[1,2,3].map(i => <div key={i} className="w-20 h-20 bg-slate-200 rounded-xl" />)}
          </div>
        </div>
        <div className="space-y-4 pt-4">
          <div className="h-7 bg-slate-200 rounded w-3/4" />
          <div className="h-5 bg-slate-200 rounded w-1/3" />
          <div className="h-10 bg-slate-200 rounded w-1/2" />
          <div className="h-4 bg-slate-200 rounded w-1/4" />
          <div className="h-12 bg-slate-200 rounded" />
          <div className="h-12 bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  </div>
);

// ── Tab content ───────────────────────────────────────────────────────────────
const TABS = ["Description", "Shipping", "Refund Policy", "Security"];

const TabContent = ({ tab, description }) => {
  if (tab === "Description") return (
    <p className="text-slate-600 leading-relaxed text-sm">{description || "No description available."}</p>
  );
  if (tab === "Shipping") return (
    <div className="space-y-3 text-sm text-slate-600">
      <p>Shipping is available across Kenya with delivery times of <strong>2–5 business days</strong> depending on your location.</p>
      <ul className="list-disc list-inside space-y-1 text-slate-500">
        <li>Free shipping on orders above <strong>Ksh 5,000</strong></li>
        <li>Flat rate of <strong>Ksh 300</strong> for orders below that amount</li>
        <li>Tracking information provided once your order is dispatched</li>
      </ul>
    </div>
  );
  if (tab === "Refund Policy") return (
    <div className="space-y-3 text-sm text-slate-600">
      <p>We offer a <strong>30-day refund policy</strong> on all items. To be eligible:</p>
      <ul className="list-disc list-inside space-y-1 text-slate-500">
        <li>Item must be unused and in original condition</li>
        <li>Original packaging must be intact</li>
        <li>Contact our support team within 30 days of purchase</li>
        <li>Shipping costs for returns are the customer's responsibility unless the item is defective</li>
      </ul>
    </div>
  );
  return (
    <div className="space-y-3 text-sm text-slate-600">
      <p>At HomeOfElectronics, we prioritise your security and privacy:</p>
      <ul className="list-disc list-inside space-y-1 text-slate-500">
        <li>All transactions encrypted using SSL technology</li>
        <li>We never store your payment information</li>
        <li>Personal data only used to process orders and improve services</li>
        <li>M-Pesa payments processed securely via Safaricom Daraja</li>
      </ul>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const ProductDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { wishlists, addToWishlist, removeFromWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState("Description");
  const [addedToCart, setAddedToCart] = useState(false);

  const isWishlisted = product ? wishlists.some((w) => w._id === product._id) : false;

  useEffect(() => {
    if (!id) return;
    const fetch_ = async () => {
      try {
        const res = await fetch(`/api/getProduct/${id}`);
        const data = await res.json();
        if (res.ok) {
          setProduct(data);
          localStorage.setItem("currentProduct", JSON.stringify(data));
        } else {
          setError(data.message);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, qty);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, qty);
    router.push("/payment");
  };

  const toggleWishlist = () => {
    if (!product) return;
    if (isWishlisted) removeFromWishlist(product._id);
    else addToWishlist(product);
  };

  if (loading) return <Skeleton />;

  if (error || !product) return (
    <div className="min-h-screen bg-[#f5dbcb] flex flex-col items-center justify-center text-center px-4">
      <p className="text-slate-500 mb-4">{error || "Product not found."}</p>
      <Link href="/" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold">
        Back to Shop
      </Link>
    </div>
  );

  const images = product.images || [];
  const price = Number(product.price) || 0;
  const originalPrice = product.originalPrice ? Number(product.originalPrice) : null;
  const discountedPrice = product.discountedPrice ? Number(product.discountedPrice) : null;
  const displayPrice = discountedPrice || price;
  const comparePrice = originalPrice || (discountedPrice ? price : null);
  const savings = comparePrice ? comparePrice - displayPrice : 0;
  const discount = product.discount || 0;
  const inStock = (product.quantity || 0) > 0;

  return (
    <div className="min-h-screen bg-[#f5dbcb]">

      {/* Breadcrumb bar */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-slate-700 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-slate-700 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium truncate max-w-[160px]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── Image gallery ──────────────────────────────────────────── */}
          <div className="space-y-3 lg:sticky lg:top-8">
            {/* Main image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
              {images[activeImg] ? (
                <Image
                  src={images[activeImg]}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-sm">No image</div>
              )}
              {discount > 0 && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                  -{discount}%
                </div>
              )}
              {/* Wishlist bubble on image */}
              <button
                onClick={toggleWishlist}
                className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all
                  ${isWishlisted ? "bg-red-500 text-white" : "bg-white text-slate-400 hover:text-red-500"}`}
              >
                <HeartIcon filled={isWishlisted} />
              </button>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`shrink-0 relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all
                      ${activeImg === i ? "border-orange-500 shadow-md" : "border-slate-200 hover:border-slate-300"}`}
                  >
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill
                      className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product info ────────────────────────────────────────────── */}
          <div className="space-y-5">

            {/* Name + rating */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">{product.name}</h1>
              {product.reviews !== undefined && (
                <div className="flex items-center gap-2 mt-2">
                  <Stars count={product.reviews} />
                  <span className="text-xs text-slate-400">({product.reviews} reviews)</span>
                  {product.sold && (
                    <span className="text-xs text-slate-400">· {product.sold} sold</span>
                  )}
                </div>
              )}
            </div>

            {/* Price */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-slate-900">
                  Ksh {displayPrice.toLocaleString()}
                </span>
                {comparePrice && comparePrice > displayPrice && (
                  <span className="text-base text-slate-400 line-through">
                    Ksh {comparePrice.toLocaleString()}
                  </span>
                )}
              </div>
              {savings > 0 && (
                <p className="text-sm text-green-600 font-medium">
                  You save Ksh {savings.toLocaleString()} 🎉
                </p>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full
                ${inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`} />
                {inStock ? `In Stock (${product.quantity} available)` : "Out of Stock"}
              </span>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Quantity</p>
              <div className="flex items-center gap-0 border border-slate-200 rounded-xl overflow-hidden w-fit bg-white">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors text-lg font-medium disabled:opacity-30"
                >−</button>
                <span className="w-12 h-10 flex items-center justify-center text-sm font-bold text-slate-900 border-x border-slate-200">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(q => Math.min(product.quantity || 99, q + 1))}
                  disabled={qty >= (product.quantity || 99)}
                  className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors text-lg font-medium disabled:opacity-30"
                >+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl text-sm transition-all shadow-sm
                  ${addedToCart
                    ? "bg-green-500 text-white"
                    : "bg-orange-500 hover:bg-orange-400 text-white disabled:opacity-50 disabled:cursor-not-allowed"}`}
              >
                <CartIcon />
                {addedToCart ? "Added to Cart ✓" : "Add to Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!inStock}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl text-sm transition-colors shadow-sm"
              >
                <BoltIcon />
                Buy Now
              </button>

              <button
                onClick={toggleWishlist}
                className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl text-sm transition-all border
                  ${isWishlisted
                    ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-red-500"}`}
              >
                <HeartIcon filled={isWishlisted} />
                {isWishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 pt-1">
              {[
                { icon: "🔒", text: "Secure Payment" },
                { icon: "🚚", text: "Free over Ksh 5K" },
                { icon: "↩️", text: "30-day Returns" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-xs text-slate-500 bg-white rounded-lg px-3 py-1.5 border border-slate-100">
                  <span>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs ─────────────────────────────────────────────────────── */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-slate-100 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-4 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px
                  ${activeTab === tab
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-slate-500 hover:text-slate-800"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Tab body */}
          <div className="p-6">
            <TabContent tab={activeTab} description={product.description} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default withAuth(ProductDetail);
