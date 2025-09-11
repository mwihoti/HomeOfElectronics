import Image from "next/image";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Store Info */}
        <div className="flex flex-col items-center md:items-start">
          <Image src="/logo.jpeg" alt="Shop Logo" width={80} height={80} className="rounded-full mb-4" />
          <h3 className="text-xl font-bold text-yellow-300">HomeOfElectronics</h3>
          <p className="mt-2 text-sm text-gray-400">
            Your one-stop shop for all electronic gadgets and accessories. Shop with confidence!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-yellow-300">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="text-gray-400 hover:text-yellow-300 transition duration-300">Home</Link></li>
            <li><Link href="/product" className="text-gray-400 hover:text-yellow-300 transition duration-300">Orders</Link></li>
            <li><Link href="/about" className="text-gray-400 hover:text-yellow-300 transition duration-300">About Us</Link></li>
            <li><Link href="/contact" className="text-gray-400 hover:text-yellow-300 transition duration-300">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-yellow-300">Contact Us</h4>
          <ul className="space-y-2">
            <li className="text-gray-400">Phone: 0723 559 412</li>
            <li className="text-gray-400">Phone: 0769 836 03</li>
            <li className="text-gray-400">Email: danielmwihoti@gmail.com</li>
            <li className="text-gray-400">Location: Nairobi, Luthuli St, Skyworth Bldg, 3rd Fl, Stall 10</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-yellow-300">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Image src="/ig.png" alt="Instagram" width={30} height={30} className="hover:opacity-75 transition duration-300" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Image src="/fb.png" alt="Facebook" width={30} height={30} className="hover:opacity-75 transition duration-300" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <Image src="/x.png" alt="X" width={30} height={30} className="hover:opacity-75 transition duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-800 pt-4 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} HomeOfElectronics. All rights reserved.</p>
        <p className="mt-2">
          <Link href="/terms" className="hover:text-yellow-300 transition duration-300">Terms of Service</Link> | 
          <Link href="/privacy" className="hover:text-yellow-300 transition duration-300 ml-2">Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;