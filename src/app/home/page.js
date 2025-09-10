'use client';
import Image from 'next/image';
import ProductList from '@/components/ProductList';
import PromoCarousel from '@/components/PromoCarousel';

const Home = () => {
  return (
    <div className='text-center text-black bg-[#f5f7fa] min-h-screen flex flex-col items-center'>
      {/* Carousel Section */}
      <PromoCarousel />

      {/* Categories */}
      <div className='py-4'>
        <h4 className='mb-4 text-xl font-semibold'>Check Out Our Latest Categories</h4>
        <ul className='flex flex-wrap justify-center gap-6'>
          <li className='flex flex-col items-center'>
            <Image src='/tv.png' alt='tv' height={50} width={50} />
            <span className='mt-2'>TVs</span>
          </li>
          <li className='flex flex-col items-center'>
            <Image src='/speakers.png' alt='speakers' height={50} width={50} />
            <span className='mt-2'>Speakers</span>
          </li>
          <li className='flex flex-col items-center'>
            <Image src='/headphones.png' alt='headphones' height={50} width={50} />
            <span className='mt-2'>Personal Audio</span>
          </li>
        </ul>
      </div>

      {/* Products */}
      <h3 className='mt-6 text-lg font-bold'>Get Best Deals on Electronics</h3>
      <ProductList />
    </div>
  );
};

export default Home;
