import Image from "next/image";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white border-t border-zinc-800">
      <div className="container mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <Image src="/logo.jpeg" alt="Shop Logo" width={40} height={40} className="rounded-lg" />
              <span className="text-lg font-bold">
                Home<span className="text-blue-400">Of</span>Electronics
              </span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              Your one-stop shop for quality electronic gadgets and accessories. Shop with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-sm text-slate-200 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-sm text-slate-200 hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/orders" className="text-sm text-slate-200 hover:text-white transition-colors">Orders</Link></li>
              <li><Link href="/about" className="text-sm text-slate-200 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Contact Us</h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2 text-sm text-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0723 559 412
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0769 836 03
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Nairobi, Luthuli St, Skyworth Bldg, 3rd Fl, Stall 10
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Follow Us</h4>
            <div className="flex space-x-3 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-zinc-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Image src="/ig.png" alt="Instagram" width={18} height={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-zinc-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Image src="/fb.png" alt="Facebook" width={18} height={18} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-zinc-800 hover:bg-slate-500 rounded-lg flex items-center justify-center transition-colors"
                aria-label="X"
              >
                <Image src="/x.png" alt="X" width={18} height={18} />
              </a>
            </div>
            <p className="text-xs text-slate-300">M-Pesa &amp; Stripe accepted</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
          <p>&copy; {new Date().getFullYear()} HomeOfElectronics. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
