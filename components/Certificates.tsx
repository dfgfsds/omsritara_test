'use client';
import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Summer image list (replace with your actual image paths)
const summerImages = [
  { src: '/img1.webp', alt: 'Enjoy Summer' },
  { src: '/img2.jpg', alt: 'Summer Vacation' },
  { src: '/img3.jpg', alt: 'Happy Summer' },
  { src: '/img4.jpg', alt: 'Welcome Summer' },
  { src: '/img5.png', alt: 'Summer Vacation Again' }
];

// Custom Arrow Components
const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
    <ChevronRight className="w-6 h-6 text-gray-600 hover:text-black" onClick={onClick} />
  </div>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
    <ChevronLeft className="w-6 h-6 text-gray-600 hover:text-black" onClick={onClick} />
  </div>
);

// Carousel Component
const Certificates = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 }
      }
    ]
  };

  return (
    <section className="py-10 px-4 bg-white">
      <div className="relative max-w-6xl mx-auto">
        <Slider {...settings}>
          {summerImages.map((item, index) => (
            <div key={index} className="px-3">
              <div className="flex justify-center items-center">
                {item?.src && (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={120}
                    height={120}
                    className="object-contain hover:scale-105 transition-transform h:32"
                  />
                )}

              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Certificates;
