"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "500+", label: "Products" },
  { value: "1K+", label: "Happy Customers" },
  { value: "3rd Fl", label: "Skyworth Bldg" },
  { value: "2024", label: "Est. Nairobi" },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#f5dbcb]">
      {/* Hero */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden bg-slate-900">
        <Image
          src="/store-background.jpg"
          alt="Store"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <span className="inline-block bg-blue-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-3">
            About <span className="text-blue-400">HomeOf</span>Electronics
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-xl">
            Your trusted destination for quality electronics in Nairobi.
          </p>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-blue-600 text-white py-5">
        <div className="container mx-auto px-6">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <li key={s.label}>
                <p className="text-3xl font-extrabold">{s.value}</p>
                <p className="text-sm text-blue-200 mt-1">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 py-14 max-w-5xl space-y-12">
        {/* Who we are */}
        <section className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Who We Are</h2>
          <p className="text-slate-600 leading-relaxed text-base md:text-lg">
            Welcome to HomeOfElectronics — your trusted destination for all electronic needs. We offer a
            wide range of high-quality gadgets and accessories that you can purchase online with ease.
            Collect your items from our store using a unique tracking ID for a hassle-free experience.
          </p>
          <p className="text-slate-600 leading-relaxed text-base md:text-lg mt-4">
            Located in Nairobi on Luthuli Street, Skyworth Building, 3rd Floor, Stall 10, we are committed
            to providing a seamless shopping experience with top-notch customer service and a variety of
            products.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-8 border-l-4 border-blue-600">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">
              To deliver innovative electronics solutions with exceptional quality and customer satisfaction,
              making technology accessible to everyone in East Africa.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-8 border-l-4 border-orange-500">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed">
              To be the leading e-commerce platform for electronics in East Africa by 2030, known for
              trust, quality, and unbeatable prices.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 md:p-10">
          <h2 className="text-2xl font-bold mb-6 text-center">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Phone</p>
                <p className="font-semibold">0723 559 412</p>
                <p className="font-semibold">0769 836 03</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Location</p>
                <p className="font-semibold">Luthuli St, Skyworth Bldg</p>
                <p className="font-semibold">3rd Floor, Stall 10, Nairobi</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Hours</p>
                <p className="font-semibold">Mon – Sat: 8am – 7pm</p>
                <p className="font-semibold">Sun: 10am – 4pm</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <p className="text-slate-500 mb-4">Thank you for choosing HomeOfElectronics — your satisfaction is our priority.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Explore Products
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
