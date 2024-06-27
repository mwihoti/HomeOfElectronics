import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext"
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Homeofelectronics",
  description: "author mwihoti",
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">

      <head>

      </head>

      <body className="min-h-screen" >
        <AuthProvider>
        <WishlistProvider >
      <CartProvider>
      <Navbar /> 
        {children}
        <Footer  className="absolute bottom-0 m-3"/> 
        </CartProvider>
        </WishlistProvider>
        </AuthProvider>
      </body>

    </html>
  );
}
