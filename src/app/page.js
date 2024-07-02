'use client'
import React from 'react';
import Home from './home/page';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

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
    
  
       
      
          <div className='flex flex-col min-h-screen '>
            <main className="flex-grow">
              <div className="container mx-auto px-4">
                <Home />
              </div>
            </main>
            </div>
           
         
        
     
   
  );
}
