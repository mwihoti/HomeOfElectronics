'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();
  const { cart, getTotalItems, getTotalUniqueItems } = useCart();
  const { wishlists } = useWishlist();

  const handleWishlistClick = () => {
    router.push('/wishlist');
  };

  const handleAddToCart = () => {
    router.push('/cart');
  };

  const handleLogout = () => {
    logout();
    router.push('/signUp');
  };

  return (
    <nav className="bg-[#406ca9] text-white p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image src="/logo.jpeg" alt="shop Logo" width={60} height={50} />
          <h2 className="text-2xl text-black font-bold">HomeOfElectronics</h2>
        </div>

        <div className="hidden md:flex space-x-10">
          <Link href="/">Home</Link>
          <Link href="/product">Orders</Link>
          <Link href="/about">About Us</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="flex items-center gap-1" onClick={handleAddToCart}>
            <Image className="rounded object-fill" src="/cart.gif" alt="cart" width={40} height={30} />
            <Link href="/cart">Cart ({getTotalUniqueItems()})</Link>
          </button>

          {user ? (
            <>
              <div className="flex items-center gap-2">
                <Image className="rounded border bg-gray-300 p-1" src="/user.png" alt="user" width={40} height={30} />
                <span>{user.username}</span>
              </div>
              <button onClick={handleLogout} className="border rounded-xl p-2">Logout</button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/signIn" className="border rounded-xl p-2">Sign In</Link>
              <Link href="/signUp" className="border rounded-xl p-2">Sign Up</Link>
            </div>
          )}

          <button className="flex items-center gap-1" onClick={handleWishlistClick}>
            <Image className="rounded object-fill" src="/wishlist.png" alt="wishlist" width={40} height={30} />
            <span>Wishlist ({wishlists?.length ?? 0})</span>
          </button>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4">
          <Link href="/">Home</Link>
          <Link href="/product">Orders</Link>
          <Link href="/about">About Us</Link>

          <button className="flex items-center gap-1" onClick={handleAddToCart}>
            <Image className="rounded object-fill" src="/cart.gif" alt="cart" width={40} height={30} />
            <span>Cart ({getTotalUniqueItems()})</span>
          </button>

          {user ? (
            <>
              <div className="flex items-center gap-2">
                <Image className="rounded border bg-gray-300 p-1" src="/user.png" alt="user" width={40} height={30} />
                <span>{user.username}</span>
              </div>
              <button onClick={handleLogout} className="border rounded-xl p-2">Logout</button>
            </>
          ) : (
            <div className="flex flex-col space-y-2">
              <Link href="/signIn" className="border rounded-xl p-2">Sign In</Link>
              <Link href="/signUp" className="border rounded-xl p-2">Sign Up</Link>
            </div>
          )}

          <button className="flex items-center gap-1" onClick={handleWishlistClick}>
            <Image className="rounded object-fill" src="/wishlist.png" alt="wishlist" width={40} height={30} />
            <span>Wishlist ({wishlists?.length ?? 0})</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
