"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();
  const { getTotalUniqueItems } = useCart();
  const { wishlists } = useWishlist();

  const handleWishlistClick = () => router.push("/wishlist");
  const handleAddToCart = () => router.push("/cart");
  const handleLogout = () => {
    logout();
    router.push("/signUp");
  };

  return (
    <nav className="bg-zinc-950 text-white shadow-lg sticky top-0 z-50 border-b border-zinc-800">
      {/* Top bar */}
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 shrink-0">
          <Image src="/logo.jpeg" alt="Shop Logo" width={42} height={42} className="rounded-lg" />
          <span className="text-xl font-bold tracking-tight">
            Home<span className="text-blue-400">Of</span>Electronics
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-100">
          <Link href="/" className="hover:text-blue-400 transition-colors duration-200">Home</Link>
          <Link href="/products" className="hover:text-blue-400 transition-colors duration-200">Products</Link>
          <Link href="/orders" className="hover:text-blue-400 transition-colors duration-200">Orders</Link>
          <Link href="/about" className="hover:text-blue-400 transition-colors duration-200">About</Link>
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Wishlist */}
          <button
            onClick={handleWishlistClick}
            className="relative p-2 text-white hover:text-blue-400 transition-colors"
            aria-label="Wishlist"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlists.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {wishlists.length}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={handleAddToCart}
            className="relative p-2 text-white hover:text-blue-400 transition-colors"
            aria-label="Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {getTotalUniqueItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {getTotalUniqueItems()}
              </span>
            )}
          </button>

          {/* Auth */}
          {user ? (
            <div className="flex items-center space-x-3 ml-2">
              <div className="flex items-center space-x-2 bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-lg">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold uppercase">
                  {user.username?.[0] || "U"}
                </div>
                <span className="text-sm text-white font-medium">{user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-red-400 hover:text-red-300 transition-colors px-2 py-1 font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 ml-2">
              <Link
                href="/signIn"
                className="text-sm text-white font-medium hover:text-blue-400 px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors border border-zinc-700"
              >
                Sign In
              </Link>
              <Link
                href="/signUp"
                className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg transition-colors font-medium"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile: cart icon + hamburger */}
        <div className="md:hidden flex items-center space-x-3">
          <button onClick={handleAddToCart} className="relative p-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {getTotalUniqueItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {getTotalUniqueItems()}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white hover:text-blue-400"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-900 px-6 py-4 space-y-3">
          <Link href="/" className="block text-white hover:text-blue-400 py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/products" className="block text-white hover:text-blue-400 py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Products</Link>
          <Link href="/orders" className="block text-white hover:text-blue-400 py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Orders</Link>
          <Link href="/about" className="block text-white hover:text-blue-400 py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>About</Link>
          <button onClick={() => { handleWishlistClick(); setIsMenuOpen(false); }} className="block text-white hover:text-blue-400 py-2 text-sm font-medium w-full text-left">
            Wishlist {wishlists.length > 0 && `(${wishlists.length})`}
          </button>
          <div className="pt-2 border-t border-zinc-800">
            {user ? (
              <div className="flex items-center justify-between">
                <span className="text-sm text-white font-medium">{user.username}</span>
                <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300">Logout</button>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link href="/signIn" className="flex-1 text-center text-sm bg-slate-700 text-white px-4 py-2 rounded-lg" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                <Link href="/signUp" className="flex-1 text-center text-sm bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
