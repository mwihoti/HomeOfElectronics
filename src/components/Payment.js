"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const STATES = { IDLE: "idle", PROCESSING: "processing", POLLING: "polling", SUCCESS: "success", FAILED: "failed" };

const MPESA_ERRORS = {
  "1": "Insufficient M-Pesa balance.",
  "17": "Transaction declined by M-Pesa.",
  "1032": "You cancelled the payment request.",
  "1037": "Could not reach your phone. Please check it is on.",
};

// Format any phone input to 2547XXXXXXXX
function toSafaricomPhone(raw) {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length === 10) return "254" + digits.slice(1);
  if (digits.startsWith("254") && digits.length === 12) return digits;
  if (digits.startsWith("7") && digits.length === 9) return "254" + digits;
  return digits;
}

// ─── Icons ───────────────────────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);
const CheckIcon = () => (
  <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const XIcon = () => (
  <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const LockIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

// ─── Pulsing dots loader ──────────────────────────────────────────────────────
const PulsingDots = () => (
  <div className="flex items-center gap-1.5">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-2 h-2 rounded-full bg-green-500 inline-block"
        style={{ animation: `pulse 1.2s ${i * 0.2}s infinite` }}
      />
    ))}
    <style>{`@keyframes pulse { 0%,80%,100%{opacity:.3;transform:scale(.8)} 40%{opacity:1;transform:scale(1)} }`}</style>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
export default function PaymentPage() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pageState, setPageState] = useState(STATES.IDLE);
  const [errorMsg, setErrorMsg] = useState("");
  const [checkoutRequestId, setCheckoutRequestId] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const pollRef = useRef(null);
  const timeoutRef = useRef(null);

  const totalPrice = getTotalPrice();

  const stopPolling = useCallback(() => {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
    if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
  }, []);

  useEffect(() => () => stopPolling(), [stopPolling]);

  const pollStatus = useCallback(async (requestId) => {
    try {
      const res = await fetch("/api/mpesa/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkoutRequestId: requestId }),
      });
      const data = await res.json();

      // Still processing — keep polling
      if (data.errorCode || data.ResultCode === undefined) return;

      const code = String(data.ResultCode);
      stopPolling();

      if (code === "0") {
        setPageState(STATES.SUCCESS);
        clearCart?.();
      } else {
        setPageState(STATES.FAILED);
        setErrorMsg(MPESA_ERRORS[code] || data.ResultDesc || "Payment was not completed.");
      }
    } catch {
      // Network glitch — keep polling
    }
  }, [stopPolling, clearCart]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setPageState(STATES.PROCESSING);

    const formattedPhone = toSafaricomPhone(phone);

    try {
      const res = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formattedPhone,
          amount: totalPrice || 1,
          accountRef: "HomeOfElectronics",
        }),
      });
      const data = await res.json();

      if (data.success) {
        setCheckoutRequestId(data.checkoutRequestId);
        setPageState(STATES.POLLING);

        // Poll every 4 s
        pollRef.current = setInterval(() => pollStatus(data.checkoutRequestId), 4000);

        // Timeout after 2 min
        timeoutRef.current = setTimeout(() => {
          stopPolling();
          setPageState(STATES.FAILED);
          setErrorMsg("Payment timed out. Please try again.");
        }, 120_000);
      } else {
        setPageState(STATES.FAILED);
        setErrorMsg(data.message || "Could not initiate payment.");
      }
    } catch {
      setPageState(STATES.FAILED);
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  // ── Shared card wrapper ──────────────────────────────────────────────────
  const Card = ({ children }) => (
    <div className="min-h-screen bg-[#f5dbcb] flex items-start justify-center pt-10 pb-16 px-4">
      <div className="w-full max-w-lg">
        {/* Back link */}
        <Link href="/cart"
          className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 mb-6 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to cart
        </Link>
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );

  // ── SUCCESS ──────────────────────────────────────────────────────────────
  if (pageState === STATES.SUCCESS) {
    return (
      <Card>
        <div className="p-10 flex flex-col items-center text-center">
          <div className="text-green-500 mb-4"><CheckIcon /></div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h2>
          <p className="text-slate-500 mb-1">Your order has been confirmed.</p>
          {receipt && <p className="text-xs text-slate-400 font-mono mt-1">Receipt: {receipt}</p>}
          <Link href="/"
            className="mt-8 w-full bg-slate-900 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl text-sm text-center transition-colors block">
            Continue Shopping
          </Link>
          <Link href="/orders"
            className="mt-3 text-sm text-slate-400 hover:text-slate-600 transition-colors">
            View my orders
          </Link>
        </div>
      </Card>
    );
  }

  // ── FAILED ───────────────────────────────────────────────────────────────
  if (pageState === STATES.FAILED) {
    return (
      <Card>
        <div className="p-10 flex flex-col items-center text-center">
          <div className="text-red-400 mb-4"><XIcon /></div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Failed</h2>
          <p className="text-slate-500 text-sm max-w-xs">{errorMsg}</p>
          <button
            onClick={() => { setPageState(STATES.IDLE); setErrorMsg(""); }}
            className="mt-8 w-full bg-slate-900 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
            Try Again
          </button>
        </div>
      </Card>
    );
  }

  // ── PROCESSING / POLLING ─────────────────────────────────────────────────
  if (pageState === STATES.PROCESSING || pageState === STATES.POLLING) {
    const lastFour = toSafaricomPhone(phone).slice(-4);
    return (
      <Card>
        <div className="p-10 flex flex-col items-center text-center">
          {/* Animated phone */}
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6 text-green-600
            ring-4 ring-green-100 animate-[ping_2s_ease-in-out_infinite]"
            style={{ animation: "none", position: "relative" }}>
            <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-40" />
            <div className="relative text-green-600"><PhoneIcon /></div>
          </div>

          {pageState === STATES.PROCESSING ? (
            <>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Sending STK push…</h2>
              <p className="text-slate-500 text-sm">Connecting to M-Pesa, please wait.</p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Check your phone</h2>
              <p className="text-slate-500 text-sm mb-1">
                A payment request was sent to <span className="font-semibold text-slate-700">…{lastFour}</span>
              </p>
              <p className="text-slate-400 text-xs">Enter your M-Pesa PIN to complete the payment.</p>
            </>
          )}

          <div className="mt-8 mb-2"><PulsingDots /></div>
          <p className="text-xs text-slate-400">Waiting for confirmation…</p>

          <button
            onClick={() => { stopPolling(); setPageState(STATES.IDLE); }}
            className="mt-8 text-sm text-slate-400 hover:text-red-500 transition-colors">
            Cancel
          </button>
        </div>
      </Card>
    );
  }

  // ── IDLE FORM ────────────────────────────────────────────────────────────
  return (
    <Card>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
            <PhoneIcon />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-none">M-Pesa Checkout</h1>
            <p className="text-green-100 text-xs mt-0.5">
              Powered by Safaricom Daraja
              {process.env.NEXT_PUBLIC_DARAJA_ENV !== 'production' && (
                <span className="ml-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">
                  Sandbox
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Order summary */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Order Summary</p>
        {cart.length === 0 ? (
          <p className="text-sm text-slate-400">Your cart is empty.</p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item, i) => (
              <li key={i} className="flex items-center justify-between text-sm">
                <span className="text-slate-700 truncate max-w-[60%]">{item.name}</span>
                <span className="text-slate-500 text-xs whitespace-nowrap ml-2">
                  {item.quantity} × <span className="font-medium text-slate-800">
                    Ksh {Number(item.price).toLocaleString()}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-3 pt-3 border-t border-slate-200 flex justify-between items-center">
          <span className="text-sm font-semibold text-slate-700">Total</span>
          <span className="text-base font-bold text-slate-900">
            Ksh {totalPrice.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            required
            placeholder="John Kamau"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900
              placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
              transition-all"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            M-Pesa Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-sm font-medium text-slate-400">🇰🇪</span>
            </div>
            <input
              type="tel"
              required
              placeholder="0712 345 678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900
                placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                transition-all"
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">Accepts 07XX, 254XX, or +254XX format</p>
        </div>

        {/* Amount display */}
        <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 flex justify-between items-center">
          <span className="text-sm text-green-700 font-medium">Amount to pay</span>
          <span className="text-lg font-bold text-green-800">Ksh {totalPrice.toLocaleString()}</span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={cart.length === 0}
          className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed
            text-white font-bold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <LockIcon />
          Pay Ksh {totalPrice.toLocaleString()} via M-Pesa
        </button>

        {/* Trust badge */}
        <p className="text-center text-xs text-slate-400 pt-1 flex items-center justify-center gap-1.5">
          <LockIcon />
          Secured by Safaricom Daraja
        </p>
      </form>
    </Card>
  );
}
