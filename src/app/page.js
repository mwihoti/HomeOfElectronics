'use client'
import React from 'react';
import Home from './home/page';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';

function ProtectedLayout({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Add a loading indicator
  }

  if (!user) {
    if (typeof window !== 'undefined') {
      window.location.href = '/sign/signUp';
    }
    return null;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    
      <CartProvider>
       
      
          
            <main className="">
              <div className="w-full">
                <Home />
              </div>
            </main>
           
         
        
      </CartProvider>
   
  );
}
