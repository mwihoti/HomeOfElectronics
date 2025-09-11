"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useCart } from "@/context/CartContext";
import axios from "axios";
import Link from "next/link";
import "intasend-inlinejs-sdk";

const PaymentPage = () => {
  const { cart, getTotalPrice } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [reference, setReference] = useState("HomeOfElectronics");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [customAmount, setCustomAmount] = useState("");
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    setTotalPrice(getTotalPrice());
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      // Update cart context if needed
    }
  }, [getTotalPrice]);

  const onComplete = useCallback(async (response) => {
    setPaymentStatus("Payment complete");
    localStorage.setItem("paymentData", JSON.stringify(response));
    await axios.post("/api/store-payment", response);
    localStorage.removeItem("cart");
    window.location.href = "/";
  }, []);

  const onFailed = useCallback((response) => {
    setErrorMessage("Payment failed. Please try again.");
  }, []);

  const onInProgress = useCallback(() => {
    setPaymentStatus("Payment in progress...");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.IntaSend) {
      const intasend = new window.IntaSend({
        publicAPIKey: "ISPubKey_test_8d4987b0-d63a-4a54-a536-02a0032c9f4c",
        live: false,
      });

      intasend
        .on("COMPLETE", onComplete)
        .on("FAILED", onFailed)
        .on("IN-PROGRESS", onInProgress);

      // Initialize payment configuration
      const paymentConfig = {
        amount: customAmount ? parseFloat(customAmount) : totalPrice,
        currency: "KES",
        phone_number: phone,
        reference,
        paymentMethods: ["card", "mpesa"], // Support for M-Pesa and card
        first_name: name,
        email: "", // Add email if available
        description: "Purchase from HomeOfElectronics",
      };

      // Trigger payment when handlePayment is called
      window.handlePayment = () => {
        intasend.payment(paymentConfig);
      };
    }
  }, [customAmount, totalPrice, phone, reference, name, onComplete, onFailed, onInProgress]);

  const handlePayment = () => {
    if (window.handlePayment) {
      window.handlePayment();
    } else {
      setErrorMessage("Payment initialization failed. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePayment();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">Confirm Your Order</h1>
        <ul className="mb-4">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between border-b py-2">
              <span>{item.name}</span>
              <span>{item.quantity} x Ksh {item.price}</span>
            </li>
          ))}
        </ul>
        <p className="text-lg font-semibold mb-4">Total: Ksh {totalPrice || 0}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md p-3 border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phone"
              className="mt-1 block w-full p-3 border border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location:
            </label>
            <input
              type="text"
              id="location"
              className="mt-1 block w-full rounded-md p-3 border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address:
            </label>
            <input
              type="text"
              id="address"
              className="mt-1 block w-full rounded-md p-3 border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
              Reference:
            </label>
            <input
              type="text"
              id="reference"
              className="mt-1 block w-full rounded-md p-3 border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="e.g., HomeOfElectronics"
            />
          </div>
          <div>
            <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700">
              Custom Amount:
            </label>
            <input
              type="number"
              id="customAmount"
              className="mt-1 block w-full rounded-md p-3 border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Enter amount to pay"
            />
          </div>
          <button
            type="submit"
            className="intaSendPayButton w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Pay Now
          </button>
          <Link href="/orders">
            <h3 className="mt-4 block text-center text-indigo-600 hover:underline">
              View my Payments
            </h3>
          </Link>
        </form>
        {paymentStatus && <p className="mt-4 text-center text-green-500">{paymentStatus}</p>}
        {errorMessage && <p className="mt-4 text-center text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default PaymentPage;