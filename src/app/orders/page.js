'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const statusColors = {
  COMPLETE: 'bg-green-100 text-green-700',
  PENDING: 'bg-amber-100 text-amber-700',
  FAILED: 'bg-red-100 text-red-700',
};

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await axios.get('/api/get-payments');
        if (data.success) {
          setPayments(data.payments);
        } else {
          setErrorMessage('Failed to fetch payments.');
        }
      } catch {
        setErrorMessage('Failed to fetch payments.');
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Orders</h1>
            <p className="text-sm text-slate-500 mt-0.5">Track your payment history</p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Shop
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Error */}
        {errorMessage && (
          <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errorMessage}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <svg className="animate-spin h-8 w-8 mb-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-sm">Loading your orders...</p>
          </div>
        ) : payments.length === 0 && !errorMessage ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-700 mb-2">No orders yet</h2>
            <p className="text-slate-500 mb-6 max-w-xs">Once you make a purchase, your orders will appear here.</p>
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          /* Desktop table / mobile cards */
          <>
            {/* Desktop */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tracking ID</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Provider</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payments.map((payment) => (
                    <tr key={payment.tracking_id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-slate-600">{payment.tracking_id}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[payment.state?.toUpperCase()] || 'bg-slate-100 text-slate-600'}`}>
                          {payment.state}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-700 font-medium">{payment.provider}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900">Ksh {Number(payment.value)?.toLocaleString()}</td>
                      <td className="px-6 py-4 text-slate-500">{new Date(payment.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <ul className="md:hidden space-y-4">
              {payments.map((payment) => (
                <li key={payment.tracking_id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-mono text-xs text-slate-500 break-all mr-2">{payment.tracking_id}</span>
                    <span className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[payment.state?.toUpperCase()] || 'bg-slate-100 text-slate-600'}`}>
                      {payment.state}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-slate-400 text-xs mb-0.5">Provider</p>
                      <p className="font-medium text-slate-800">{payment.provider}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs mb-0.5">Amount</p>
                      <p className="font-bold text-slate-900">Ksh {Number(payment.value)?.toLocaleString()}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-slate-400 text-xs mb-0.5">Date</p>
                      <p className="text-slate-700">{new Date(payment.created_at).toLocaleString('en-KE')}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentsPage;
