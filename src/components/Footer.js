import Image from "next/image";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#3d2314] text-[#f5dbcb] border-t border-[#5c3520]">
      {/* Main row */}
      <div className="container mx-auto px-6 py-5 flex flex-wrap items-center gap-y-4 gap-x-8 justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.jpeg" alt="Logo" width={32} height={32} className="rounded-md" />
          <span className="font-bold text-sm text-[#f5dbcb]">
            Home<span className="text-blue-400">Of</span>Electronics
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-5 text-xs font-medium text-[#e8c4a8]">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/products" className="hover:text-white transition-colors">Products</Link>
          <Link href="/orders" className="hover:text-white transition-colors">Orders</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
        </nav>

        {/* Contact */}
        <div className="flex items-center gap-4 text-xs text-[#e8c4a8]">
          <span className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            0723 559 412
          </span>
          <span className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Luthuli St, Skyworth Bldg, 3rd Fl, Stall 10
          </span>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-2">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-[#5c3520] hover:bg-pink-600 rounded-md flex items-center justify-center transition-colors" aria-label="Instagram">
            <Image src="/ig.png" alt="Instagram" width={14} height={14} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-[#5c3520] hover:bg-blue-600 rounded-md flex items-center justify-center transition-colors" aria-label="Facebook">
            <Image src="/fb.png" alt="Facebook" width={14} height={14} />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-[#5c3520] hover:bg-zinc-600 rounded-md flex items-center justify-center transition-colors" aria-label="X">
            <Image src="/x.png" alt="X" width={14} height={14} />
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#5c3520] py-3 px-6">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#c9a880]">
          <p>&copy; {new Date().getFullYear()} HomeOfElectronics. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-[#f5dbcb] transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-[#f5dbcb] transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
