'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import ProductList from '@/components/ProductList';

const Home = () => {
  

  return (
    <div className='text-center text-black bg-[#f5f7fa]'>
      <div>
        <ul className='flex space-x-6 p-3'>
          <h4 className=''>CheckOut our latest categories</h4>
          <li>
            <Image src='/tv.png' alt='tv' height={50} width={50} />
            Tvs
          </li>
          <li>
            <Image src='/speakers.png' alt='speakers' height={50} width={50} />
            Speakers
          </li>
          <li>
            <Image src='/headphones.png' alt='headphones' height={50} width={50} />
            PersonalAudio
          </li>
        </ul>
      </div>
      <ProductList />
    </div>
  );
};

export default Home;
