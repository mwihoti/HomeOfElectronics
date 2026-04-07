'use client';
import Image from 'next/image';
import Link from 'next/link';
import ProductList from '@/components/ProductList';
import PromoCarousel from '@/components/PromoCarousel';

const categories = [
  { label: 'TVs', icon: '/tv.png', href: '/products?category=tv' },
  { label: 'Speakers', icon: '/speakers.png', href: '/products?category=speakers' },
  { label: 'Audio', icon: '/headphones.png', href: '/products?category=audio' },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Carousel */}
      <PromoCarousel />

      {/* Category strip */}
      <div className="bg-white border-b border-slate-100 py-5">
        <div className="container mx-auto px-6">
          <ul className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
            {categories.map((cat) => (
              <li key={cat.label}>
                <Link
                  href={cat.href}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 bg-slate-100 group-hover:bg-blue-50 rounded-2xl flex items-center justify-center transition-colors duration-200 border border-slate-200 group-hover:border-blue-200">
                    <Image src={cat.icon} alt={cat.label} width={30} height={30} className="object-contain" />
                  </div>
                  <span className="text-xs font-medium text-slate-600 group-hover:text-blue-600 transition-colors">
                    {cat.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Trust badges */}
      <div className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-6">
          <ul className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-sm font-medium">
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Genuine Products
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              M-Pesa &amp; Stripe
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              Nairobi, Luthuli St
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Fast Delivery
            </li>
          </ul>
        </div>
      </div>

      {/* Products section */}
      <div className="container mx-auto px-4 py-8">
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
