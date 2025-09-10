"use client";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";

const PromoCarousel = () => {
  const promotions = [
    { 
      id: 1, 
      image: "/promo1.jpg", 
      title: "Smart Tvs", 
      discount: "Up to 80% OFF",
      details: "Limited Stock! Free Shipping within Nairobi!"
    },
    { 
      id: 2, 
      image: "/promo2.jpg", 
      title: "Laptops", 
      discount: "Up to 50% OFF",
      details: "Best Deals of the Season - Offer Ends Soon!"
    },
    { 
      id: 3, 
      image: "/promo3.jpeg", 
      title: "SmartPhones", 
      discount: "Up to 40% OFF",
      details: "Shop Now for Exclusive Discounts!"
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-8 overflow-hidden">
      <Carousel autoplay={500}
        className="rounded-xl"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {promotions.map((promo) => (
          <div key={promo.id} className="relative h-[400px] md:h-[500px] w-full">
            <div className="absolute inset-0 bg-blue-900 bg-opacity-80 flex items-center justify-center">
              <Image
                src={promo.image}
                alt={promo.title}
                width={1200}
                height={500}
                className="absolute inset-0 w-full h-full object-cover opacity-50"
                priority
              />
              <div className="relative z-10 text-center px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wide">
                  {promo.title}
                </h2>
                <div className="my-2 h-1 w-16 bg-white mx-auto"></div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-blue-200 uppercase">
                  {promo.discount}
                </h3>
                <p className="text-lg md:text-xl text-white mt-2">{promo.details}</p>
                <button className="mt-4 px-6 py-2 bg-yellow-400 text-blue-900 font-semibold rounded-lg hover:bg-yellow-500 transition">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PromoCarousel;