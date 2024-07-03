'use client';
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';

const PaymentPage = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handlePayment = async () => {
    const totalPrice = getTotalPrice();
    const orderDetails = {
      name,
      phone,
      location,
      totalPrice,
      cart
    }
    if (paymentMethod === 'mpesa') {
      try {
        const {data} = await axios.post('api/mpesa/mpesa-payment', orderDetails)
        window.location.href = data.paymentUrl;
      } catch (error) {
        setErrorMessage(error.response ? error.response.data.message : 'M-Pesa payment failed.');
      }
    } else{
       try {
        const { data} = await axios.post('api/stripe/stripe', orderDetails);
        window.location.href = data.paymentUrl;

       } catch (error) {
        setErrorMessage(error.response ? error.response.data.message : 'Stripe payment failed.');
       }
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
        <p className="text-lg font-semibold mb-4">Total: Ksh {getTotalPrice()}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md p-3  border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
              className="mt-1 block w-full p-3  border border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
              className="mt-1 block w-full rounded-md p-3  border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium  text-gray-700">Payment Method:</label>
            <select
              className="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="mpesa">M-Pesa</option>
              <option value="stripe">Stripe</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Proceed to Payment
          </button>
        </form>
        {paymentStatus && <p className="mt-4 text-center text-green-500">{paymentStatus}</p>}
        {errorMessage && <p className="mt-4 text-center text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default PaymentPage;
