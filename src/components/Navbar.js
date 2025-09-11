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
    <nav className="bg-gradient-to-r from-blue-900 to-indigo-700 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex items-center space-x-4">
          <Image src="/logo.jpeg" alt="Shop Logo" width={60} height={50} className="rounded-full" />
          <h2 className="text-2xl font-extrabold text-yellow-300">HomeOfElectronics</h2>
        </div>

        <div className="hidden md:flex space-x-8 text-lg font-semibold">
          <Link href="/" className="hover:text-yellow-300 transition duration-300">Home</Link>
          <Link href="/product" className="hover:text-yellow-300 transition duration-300">Orders</Link>
          <Link href="/about" className="hover:text-yellow-300 transition duration-300">About Us</Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={handleAddToCart}
            className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full transition duration-300"
          >
            <Image src="/cart.gif" alt="Cart" width={24} height={24} />
            <span>Cart ({getTotalUniqueItems()})</span>
          </button>

          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4 bg-gray-400 p-6 rounded-full">
                <Image src="/user.png" alt="User" width={24} height={24} className="rounded-full" />
                <span className="text-sm">{user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                href="/signIn"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300"
              >
                Sign In
              </Link>
              <Link
                href="/signUp"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}

          <button
            onClick={handleWishlistClick}
            className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition duration-300"
          >
            <Image src="/wishlist.png" alt="Wishlist" width={24} height={24} />
            <span>Wishlist ({wishlists.length})</span>
          </button>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4 px-6">
          <Link href="/" className="hover:text-yellow-300 transition duration-300">Home</Link>
          <Link href="/product" className="hover:text-yellow-300 transition duration-300">Orders</Link>
          <Link href="/about" className="hover:text-yellow-300 transition duration-300">About Us</Link>
          <button
            onClick={handleAddToCart}
            className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full transition duration-300"
          >
            <Image src="/cart.gif" alt="Cart" width={24} height={24} />
            <span>Cart ({getTotalUniqueItems()})</span>
          </button>
          {user ? (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 bg-gray-800 p-2 rounded-full">
                <Image src="/user.png" alt="User" width={24} height={24} className="rounded-full" />
                <span>{user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <Link
                href="/signIn"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300"
              >
                Sign In
              </Link>
              <Link
                href="/signUp"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
          <button
            onClick={handleWishlistClick}
            className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition duration-300"
          >
            <Image src="/wishlist.png" alt="Wishlist" width={24} height={24} />
            <span>Wishlist ({wishlists.length})</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;