'use client';



import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">About HomeOfElectronics</h1>
        <p className="text-lg mb-6 text-gray-700">
          Welcome to HomeOfElectronics, your only trusted shop for all electronic needs. We offer a wide range of electronic products that users can purchase online and pick up from our designated pickup station with the help of a tracking ID.
        </p>
        <p className="text-lg mb-6 text-gray-700">
          Our shop is located in Nairobi, on Luthuli Street, Skyworth Building, 3rd Floor, Stall 10. Our customers can log in and log out easily, and enjoy a seamless shopping experience on our platform.
        </p>
        <div className="bg-gray-300 p-4 rounded-lg shadow-inner mb-6">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">Contact Us</h2>
          <ul className="list-inside text-gray-700 list-none text-center ">
            <li className="mb-2">Phone: 0723559412</li>
            <li>Phone: 076983603</li>
          </ul>
        </div>
        <p className="text-xl font-semibold text-center text-gray-700">
          Thank you for choosing HomeOfElectronics!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
