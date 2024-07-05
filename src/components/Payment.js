'use client';
import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import 'intasend-inlinejs-sdk';
import axios from 'axios';
import Link from 'next/link';

const PaymentPage = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [reference, setReference] = useState('HomeOfElectronics'); // Default reference text
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [customAmount, setCustomAmount] = useState('');

  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [cart]);

  useEffect(() => {
   const instasend = new window.IntaSend({
      publicAPIKey: "ISPubKey_test_8d4987b0-d63a-4a54-a536-02a0032c9f4c",
      live: false // or true for live environment
    })
    instasend
    .on("COMPLETE", async (response) => { console.log("COMPLETE:", response)
      localStorage.setItem('paymentData', JSON.stringify(response));
      await axios.post('/api/store-payment', response);
      window.location.href= '/';
     })
    .on("FAILED", (response) => { console.log("FAILED", response);
      setErrorMessage('Payment failed please try again')
     })
    .on("IN-PROGRESS", () => { console.log("INPROGRESS ...") });

    window.instasend =instasend;
  }, []);
  


 

  const handlePayment = async () => {
    const amountToPay = customAmount ? parseFloat(customAmount) : totalPrice;
    const orderDetails = {
      name,
      phone,
      location,
      totalPrice: amountToPay,
      reference,
      cart
    };
    window.intasend.initialize({
      amount: amountToPay, // Convert to cents
      currency: "KES",
      email: "customer@example.com", // Optionally add customer email
      first_name: name.split(' ')[0],
      last_name: name.split(' ').slice(1).join(' '),
      phone_number: phone,
      description: reference,
    });
  }
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
        <p className="text-lg font-semibold mb-4">Total: Ksh {totalPrice}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
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
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number:</label>
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
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location:</label>
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
            <label htmlFor="reference" className="block text-sm font-medium text-gray-700">Reference:</label>
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
            <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700">Custom Amount:</label>
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
            data-currency="KES"
            data-amount={(customAmount ? parseFloat(customAmount) : totalPrice) } // IntaSend expects the amount in cents
            data-phone={phone} // Use the phone number entered by the user
            data-reference={reference} // Use the reference entered by the user
          >
            Pay Now
          </button>
          <Link href="/orders">
          <button>
          View my Payments
          </button>
          </Link>
        </form>
        {paymentStatus && <p className="mt-4 text-center text-green-500">{paymentStatus}</p>}
        {errorMessage && <p className="mt-4 text-center text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};


export default PaymentPage;