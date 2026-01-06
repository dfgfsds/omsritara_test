// 'use client';
// import React from 'react';
// import Slider from 'react-slick';
// import Image from 'next/image';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// // Summer image list (replace with your actual image paths)
// const summerImages = [
//   { src: '/img1.webp', alt: 'Enjoy Summer' },
//   { src: '/img2.jpg', alt: 'Summer Vacation' },
//   { src: '/img3.jpg', alt: 'Happy Summer' },
//   { src: '/img4.jpg', alt: 'Welcome Summer' },
//   { src: '/img5.png', alt: 'Summer Vacation Again' }
// ];

// // Custom Arrow Components
// const NextArrow = ({ onClick }: { onClick?: () => void }) => (
//   <div className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
//     <ChevronRight className="w-6 h-6 text-gray-600 hover:text-black" onClick={onClick} />
//   </div>
// );

// const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
//   <div className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
//     <ChevronLeft className="w-6 h-6 text-gray-600 hover:text-black" onClick={onClick} />
//   </div>
// );

// // Carousel Component
// const Certificates = () => {
//   const settings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     arrows: true,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: { slidesToShow: 4 }
//       },
//       {
//         breakpoint: 768,
//         settings: { slidesToShow: 3 }
//       },
//       {
//         breakpoint: 480,
//         settings: { slidesToShow: 2 }
//       }
//     ]
//   };

//   return (
//     <section className="py-10 px-4 bg-white">
//       <div className="relative max-w-6xl mx-auto">
//         <Slider {...settings}>
//           {summerImages.map((item, index) => (
//             <div key={index} className="px-3">
//               <div className="flex justify-center items-center">
//                 {item?.src && (
//                   <Image
//                     src={item.src}
//                     alt={item.alt}
//                     width={120}
//                     height={120}
//                     className="object-contain hover:scale-105 transition-transform h:32"
//                   />
//                 )}

//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </section>
//   );
// };

// export default Certificates;


"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { src: "/img1.webp", alt: "Enjoy Summer" },
  { src: "/img2.jpg", alt: "Summer Vacation" },
  { src: "/img3.jpg", alt: "Happy Summer" },
  { src: "/img4.jpg", alt: "Welcome Summer" },
  { src: "/img5.png", alt: "Summer Vacation Again" },
  { src: "/img1.webp", alt: "Enjoy Summer" },
  { src: "/img2.jpg", alt: "Summer Vacation" },
  { src: "/img3.jpg", alt: "Happy Summer" },
  { src: "/img4.jpg", alt: "Welcome Summer" },
  { src: "/img5.png", alt: "Summer Vacation Again" },
];

export default function Certificates() {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const startX = useRef<number | null>(null);

  /* screen width */
  useEffect(() => {
    const resize = () => setWidth(window.innerWidth);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* responsive items */
  const getItems = () => {
    if (width < 480) return 2;
    if (width < 768) return 3;
    if (width < 1024) return 4;
    return 5;
  };

  const itemsPerView = getItems();
  const maxIndex = images.length - itemsPerView;

  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));

  /* swipe */
  const onTouchStart = (e: React.TouchEvent) =>
    (startX.current = e.touches[0].clientX);

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!startX.current) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
    startX.current = null;
  };

  return (
    <section className="py-10 px-4 bg-white">
      <div className="relative max-w-6xl mx-auto overflow-hidden">

        {/* SLIDER */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * (100 / itemsPerView)}%)` }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex justify-center"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={120}
                height={120}
                loading="lazy"
                className="object-contain transition-transform duration-300 hover:scale-105"
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* ARROWS */}
        <button
          aria-label="Previous"
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          aria-label="Next"
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
