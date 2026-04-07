"use client";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

const PromoCarousel = () => {
  const promotions = [
    {
      id: 1,
      image: "/promo1.jpg",
      tag: "Limited Stock",
      title: "Smart TVs",
      discount: "Up to 80% OFF",
      details: "Free shipping within Nairobi",
      href: "/products",
    },
    {
      id: 2,
      image: "/promo2.jpg",
      tag: "Best Deals",
      title: "Laptops",
      discount: "Up to 50% OFF",
      details: "Offer ends soon — don't miss out",
      href: "/products",
    },
    {
      id: 3,
      image: "/promo3.jpeg",
      tag: "Exclusive",
      title: "Smartphones",
      discount: "Up to 40% OFF",
      details: "Shop now for exclusive discounts",
      href: "/products",
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      <Carousel
        autoplay
        autoplayDelay={4000}
        loop
        className="rounded-none"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-5 left-1/2 z-50 flex -translate-x-1/2 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? "w-8 bg-white" : "w-3 bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
        prevArrow={({ handlePrev }) => (
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-black/30 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        nextArrow={({ handleNext }) => (
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black/30 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      >
        {promotions.map((promo) => (
          <div key={promo.id} className="relative h-[380px] md:h-[520px] w-full">
            {/* Background image */}
            <Image
              src={promo.image}
              alt={promo.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            {/* Dark gradient overlay — left-heavy for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />

            {/* Content — left aligned */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-8 md:px-16 max-w-2xl">
                <span className="inline-block bg-orange-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                  {promo.tag}
                </span>
                <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-none mb-3 tracking-tight">
                  {promo.title}
                </h2>
                <p className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
                  {promo.discount}
                </p>
                <p className="text-slate-300 text-base md:text-lg mb-6">{promo.details}</p>
                <Link
                  href={promo.href}
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  Shop Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PromoCarousel;
