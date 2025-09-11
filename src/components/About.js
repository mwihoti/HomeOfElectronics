"use client";
import React from "react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-white p-6">
      {/* Hero Section */}
      <div
        className="w-full max-w-6xl mx-auto bg-cover bg-center rounded-xl shadow-2xl mb-8"
        style={{
          backgroundImage: "url('/store-background.jpg')", // Replace with actual image path
          height: "300px",
          position: "relative",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-gray-900 text-transparent bg-clip-text">
              About HomeOfElectronics
            </h1>
            <p className="mt-2 text-lg font-bold">
              Discover the story behind your trusted electronics partner.
            </p>
          </div>
          
        </div>
        
      </div>

      {/* Main Content */}
      <div className="w-full max-w-5xl mx-auto bg-white shadow-2xl rounded-xl p-8 space-y-10">
        {/* Brand Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
       
          <p className="text-2xl text-gray-800 leading-relaxed max-w-2xl">
            Welcome to HomeOfElectronics, your trusted destination for all electronic needs. We offer a wide range of high-quality gadgets and accessories that you can purchase online with ease. Collect your items from our designated pickup station using a unique tracking ID for a hassle-free experience.
          </p>
        </div>

        {/* Location and Services */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
          <p className="text-2xl text-gray-800 leading-relaxed mb-6">
            Located in Nairobi on Luthuli Street, Skyworth Building, 3rd Floor, Stall 10, we are committed to providing a seamless shopping experience. Our platform allows customers to log in and out effortlessly while enjoying top-notch customer service and a variety of products.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-4xl font-semibold text-indigo-700 mb-2">Our Mission</h3>
              <p className="text-gray-600 text-2xl">
                To deliver innovative electronics solutions with exceptional quality and customer satisfaction.
              </p>
            </div>
            <div>
              <h3 className="text-4xl font-semibold text-indigo-700 mb-2">Our Vision</h3>
              <p className="text-gray-600 text-2xl">
                To be the leading e-commerce platform for electronics in East Africa by 2030.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-indigo-50 p-6 rounded-xl shadow-inner">
          <h2 className="text-4xl font-semibold text-center mb-6 text-indigo-700">
            Contact Us
          </h2>
          <ul className="list-none text-center space-y-4 text-gray-700">
            <li className="flex items-center justify-center gap-3">
              <span className="text-md text-2xl">Phone: 0723 559 412</span>
            </li>
            <li className="flex items-center justify-center gap-3">
              <span className="text-md text-2xl">Phone: 0769 836 03</span>
            </li>
         {/*
            <li className="flex items-center justify-center gap-3">
              <span className="text-md text-2xl">Email: danielmwihoti@gmail.com</span>
            </li> */}
          </ul>
        </div>

        {/* Call to Action */}
        <p className="text-xl font-semibold text-center text-indigo-700 mt-4">
          Thank you for choosing HomeOfElectronics—your satisfaction is our priority! Explore our products today.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;