"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import withAuth from "@/hoc/withAuth";
import { useRouter } from "next/navigation";

const ProductDetail = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numItems, setNumItems] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/getProduct/${id}`);
        const data = await response.json();
        if (response.ok) {
          setProduct(data);
          // Store product details in localStorage
          localStorage.setItem("currentProduct", JSON.stringify(data));
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
    if (product) {
      addToCart(product, numItems);
      localStorage.setItem("cart", JSON.stringify({ [product._id]: numItems }));
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, numItems);
      localStorage.setItem("cart", JSON.stringify({ [product._id]: numItems }));
      router.push("/payment");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product found</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="my-4 text-center text-2xl font-bold">Product Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col items-start space-y-4">
          <Image
            className="w-full h-auto object-cover rounded-lg"
            src={product.images[currentImageIndex]}
            alt={product.name}
            width={500}
            height={300}
            priority
          />
          <div className="flex space-x-8">
            {product.images.map((image, index) => (
              <Image
                key={index}
                className="w-1/5 h-auto object-cover rounded-lg cursor-pointer"
                src={image}
                alt={`${product.name}-${index}`}
                width={300}
                height={250}
                priority
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
          <p className="text-lg"><strong>Description:</strong> {product.description}</p>
        </div>
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl"><strong>Price Ksh:</strong> {product.price}</p>
          <p className="text-xl"><strong>Quantity Available:</strong> {product.quantity}</p>
          <div className="items-center p-1">
            Select Items:
            <div className="flex items-center">
              <Image
                src="/subtract.png"
                alt="minus"
                className="border m-2 cursor-pointer"
                width={20}
                height={20}
                onClick={() => setNumItems(Math.max(1, numItems - 1))}
              />
              <p className="m-2">{numItems}</p>
              <Image
                src="/add.png"
                alt="addition"
                width={20}
                height={20}
                className="border m-2 cursor-pointer"
                onClick={() => setNumItems(numItems + 1)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              className="mt-4 px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-lg"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button className="mt-4 px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-lg">
              <Link href="/">Continue Shopping</Link>
            </button>
          </div>
          <div className="flex gap-4">
            <button
              className="mt-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-800 rounded-lg text-white"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            <button className="mt-4 px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-lg">
              <Link href="/">Home</Link>
            </button>
          </div>
          <button className="mt-4 px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-lg">
            <Link href="/cart">Check My Cart</Link>
          </button>
          {/* Additional Content Sections */}
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-xl font-semibold">Refund Policy</h3>
              <p className="text-gray-600">
                We offer a 30-day refund policy on all items purchased from HomeOfElectronics. To be eligible for a refund, the item must be unused and in the same condition as received, with original packaging intact. Please contact our support team within 30 days of purchase to initiate a return. Shipping costs for returns are the customer's responsibility unless the item is defective.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Shipping</h3>
              <p className="text-gray-600">
                Shipping is available across Kenya with delivery times ranging from 2-5 business days depending on your location. We offer free shipping on orders above Ksh 5,000. A flat rate of Ksh 300 applies to orders below this amount. Tracking information will be provided once your order is dispatched.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Security & Privacy</h3>
              <p className="text-gray-600">
                At HomeOfElectronics, we prioritize your security and privacy. All transactions are encrypted using SSL technology, and we do not store your payment information. Your personal data is protected under our Privacy Policy, and we only use it to process your orders and improve our services. For more details, visit our Privacy Policy page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(ProductDetail);