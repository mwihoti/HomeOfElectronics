'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await axios.get('/api/get-payments');
        if (data.success) {
          setPayments(data.payments);
        } else {
          setErrorMessage('Failed to fetch payments.');
        }
      } catch (error) {
        setErrorMessage('Failed to fetch payments.');
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">My Payments</h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Tracking ID</th>
              <th className="px-4 py-2">State</th>
              <th className="px-4 py-2">Provider</th>
              <th className="px-4 py-2">Amount (KES)</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.tracking_id}>
                <td className="border px-4 py-2">{payment.tracking_id}</td>
                <td className="border px-4 py-2">{payment.state}</td>
                <td className="border px-4 py-2">{payment.provider}</td>
                <td className="border px-4 py-2">{payment.value}</td>
                <td className="border px-4 py-2">{new Date(payment.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsPage;
