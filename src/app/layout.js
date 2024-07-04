import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext"; // Import WishlistProvider
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Homeofelectronics",
  description: "author mwihoti",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className="min-h-screen flex flex-col w-full">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider> {/* Wrap the application with WishlistProvider */}
              <Navbar />
              <main className="flex-grow container mx-auto px-4">
                {children}
              </main>
              <Footer className="" />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
