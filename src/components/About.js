"use client";
import React from "react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl p-8 mb-8">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-indigo-700 bg-gradient-to-r from-indigo-500 to-blue-500 text-transparent bg-clip-text">
          About HomeOfElectronics
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
          <Image
            src="/store-image.jpg" // Replace with actual image path
            alt="Store Image"
            width={300}
            height={200}
            className="rounded-lg shadow-md object-cover"
          />
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to HomeOfElectronics, your trusted destination for all electronic needs. We offer a wide range of high-quality gadgets and accessories that you can purchase online with ease. Collect your items from our designated pickup station using a unique tracking ID for a hassle-free experience.
          </p>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Located in Nairobi on Luthuli Street, Skyworth Building, 3rd Floor, Stall 10, we are committed to providing a seamless shopping experience. Our platform allows customers to log in and out effortlessly while enjoying top-notch customer service and a variety of products.
        </p>
        <div className="bg-indigo-50 p-6 rounded-xl shadow-inner mb-6">
          <h2 className="text-2xl font-semibold text-center mb-4 text-indigo-700">Contact Us</h2>
          <ul className="list-none text-center space-y-2 text-gray-700">
            <li className="flex items-center justify-center gap-2">
              <Image src="/phone.png" alt="Phone" width={20} height={20} />
              <span>Phone: 0723 559 412</span>
            </li>
            <li className="flex items-center justify-center gap-2">
              <Image src="/phone.png" alt="Phone" width={20} height={20} />
              <span>Phone: 0769 836 03</span>
            </li>
            <li className="flex items-center justify-center gap-2">
              <Image src="/email.png" alt="Email" width={20} height={20} />
              <span>Email: danielmwihoti@gmail.com</span>
            </li>
          </ul>
        </div>
        <p className="text-xl font-semibold text-center text-indigo-700 mt-4">
          Thank you for choosing HomeOfElectronics—your satisfaction is our priority!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;