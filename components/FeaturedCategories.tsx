// 'use client';
// import Slider from 'react-slick';
// import Image from 'next/image';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { useCategories } from '@/context/CategoriesContext';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import { slugConvert } from '@/lib/utils';

// const SampleNextArrow = ({ onClick }: { onClick?: () => void }) => (
//   <div className="ml-2 p-2 rounded-full bg-white shadow cursor-pointer hover:bg-[#991b1b] hover:text-white" onClick={onClick}>
//     <ChevronRight size={20} />
//   </div>
// );

// const SamplePrevArrow = ({ onClick }: { onClick?: () => void }) => (
//   <div className="p-2 rounded-full bg-white shadow cursor-pointer hover:bg-[#991b1b] hover:text-white" onClick={onClick}>
//     <ChevronLeft size={20} />
//   </div>
// );

// const FeaturedCategories = () => {
//   let sliderRef: Slider | null = null;
//   const { categories, isLoading } = useCategories();
//   const router = useRouter();

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     cssEase: 'ease-in-out',
//     slidesToShow: 6,
//     slidesToScroll: 2,
//     arrows: true,
//     responsive: [
//       { breakpoint: 1280, settings: { slidesToShow: 6 } },
//       { breakpoint: 1024, settings: { slidesToShow: 3 } },
//       { breakpoint: 768, settings: { slidesToShow: 2 } },
//     ],
//   };

//   // Placeholder for loading
//   const skeletonItems = new Array(6).fill(null);

//   return (
//     <section className="mt-16">
//       <div className="container mx-auto px-4 max-w-7xl">
//         <div className="relative grid grid-cols-1 md:grid-cols-3 items-center gap-4 mb-2">
//           <div className="text-center col-span-1 md:col-start-2">
//             <h2 className="text-2xl md:text-3xl font-extrabold text-black">
//               Top Categories
//             </h2>

//           </div>

//           <div className="flex mt-4 flex-col items-center md:items-end justify-center md:justify-end col-span-1 md:col-start-3">
//             <Link
//               href="/categories"
//               onClick={() => router.push('/categories')}
//               className="text-sm text-gray-600 hover:underline mt-1 mr-4"
//             >
//               View All
//             </Link>
//           </div>
//         </div>
//         <p className='text-black p-2 md:p-4 md:mx-24 mx-2  my-4 text-center'>
//           Explore our wide range of authentic crystal jewelry and energy stones. From healing pendants and gemstone bracelets to chakra pendulums and raw crystals - Om Sritara brings you the best online crystal shop experience with handpicked, Reiki-energised products.
//         </p>

//         <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
//           {isLoading
//             ? skeletonItems.map((_, index) => (
//               <div key={index} className="px-4">
//                 <div className="flex flex-col items-center text-center animate-pulse">
//                   <div className="w-40 h-40 bg-gray-200 rounded-full" />
//                   <div className="mt-4 w-24 h-4 bg-gray-200 rounded" />
//                 </div>
//               </div>
//             ))
//             : categories?.data?.map((category, index) => (
//               <div key={index} className="px-4">
//                 <div className="flex flex-col items-center text-center">
//                   <div className="w-40 h-40 overflow-hidden rounded-full shadow-md">
//                     <Image
//                       src={category.image}
//                       alt={category.title}
//                       width={160} // same as w-40
//                       height={160} // same as h-40
//                       className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//                     />
//                   </div>
//                   <div className="mt-4 flex items-center justify-center w-full px-2">
//                     <h3
//                       onClick={() => router.push(`/categories/${slugConvert(category?.name)}`)}
//                       className="text-lg font-semibold cursor-pointer"
//                     >
//                       {category.name}
//                     </h3>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </Slider>
//       </div>
//     </section>
//   );
// };

// export default FeaturedCategories;



// "use client";
// import { useEffect, useState, useRef } from "react";
// import Image from "next/image";
// import { useCategories } from "@/context/CategoriesContext";
// import { useRouter } from "next/navigation";
// import Link from "next/link";


// export default function FeaturedCategories() {
//   const { categories } = useCategories();
//   const router = useRouter();

//   const data = categories?.data || [];
//   const total = data.length;
//   if (!total) return null;

//   // 🔁 Infinite loop
//   const looped = Array(30).fill(data).flat();

//   const [current, setCurrent] = useState(total * 15);
//   const timeoutRef = useRef<any>(null);

//   // 📱 screen width detect
//   const [screenWidth, setScreenWidth] = useState(0);

//   useEffect(() => {
//     const update = () => setScreenWidth(window.innerWidth);
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   const isMobile = screenWidth < 768;

//   // width logic unchanged
//   const itemWidth = isMobile ? screenWidth - 32 : 180;
//   const gap = isMobile ? 0 : 32;
//   const step = itemWidth + gap;

//   const nextSlide = () => setCurrent((p) => p + 1);
//   const prevSlide = () => setCurrent((p) => p - 1);

//   // autoplay
//   useEffect(() => {
//     clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(nextSlide, 2500);
//     return () => clearTimeout(timeoutRef.current);
//   }, [current]);

//   // 👉 OWN SWIPE LOGIC (NO PACKAGE)
//   const touchStartX = useRef<number | null>(null);
//   const touchEndX = useRef<number | null>(null);
//   const minSwipe = 50;

//   const onTouchStart = (e: React.TouchEvent) => {
//     touchStartX.current = e.touches[0].clientX;
//   };

//   const onTouchMove = (e: React.TouchEvent) => {
//     touchEndX.current = e.touches[0].clientX;
//   };

//   const onTouchEnd = () => {
//     if (
//       touchStartX.current === null ||
//       touchEndX.current === null
//     )
//       return;

//     const diff = touchStartX.current - touchEndX.current;

//     if (diff > minSwipe) nextSlide(); // swipe left
//     if (diff < -minSwipe) prevSlide(); // swipe right

//     touchStartX.current = null;
//     touchEndX.current = null;
//   };

//   const activeDot = ((current % total) + total) % total;

//   return (
//     <section className="mt-16">
//       <div className="container mx-auto px-4 max-w-7xl">
//         <div className="relative grid grid-cols-1 md:grid-cols-3 items-center gap-4 mb-2">
//           <div className="text-center col-span-1 md:col-start-2">
//             <h2 className="text-2xl md:text-3xl font-extrabold text-black">
//               Top Categories
//             </h2>

//           </div>

//           <div className="flex mt-4 flex-col items-center md:items-end justify-center md:justify-end col-span-1 md:col-start-3">
//             <Link
//               href="/categories"
//               onClick={() => router.push('/categories')}
//               className="text-sm text-gray-600 hover:underline mt-1 mr-4"
//             >
//               View All
//             </Link>
//           </div>
//         </div>
//         <p className='text-black p-2 md:p-4 md:mx-24 mx-2  my-4 text-center'>
//           Explore our wide range of authentic crystal jewelry and energy stones. From healing pendants and gemstone bracelets to chakra pendulums and raw crystals - Om Sritara brings you the best online crystal shop experience with handpicked, Reiki-energised products.
//         </p>

//         {/* CAROUSEL */}
//         <div
//           className="relative overflow-hidden mt-5"
//           onTouchStart={onTouchStart}
//           onTouchMove={onTouchMove}
//           onTouchEnd={onTouchEnd}
//         >
//           <div
//             className="flex transition-transform duration-500 ease-out"
//             style={{
//               transform: `translateX(-${current * step}px)`,
//             }}
//           >
//             {looped.map((cat: any, idx: number) => (
//               <div
//                 key={idx}
//                 className="flex-shrink-0 cursor-pointer"
//                 style={{
//                   width: itemWidth,
//                   marginRight: gap,
//                 }}
//                 onClick={() =>
//                   router.push(`/category/${cat?.slug_name}`)
//                 }
//               >
//                 {/* 🔒 CARD DESIGN – UNCHANGED */}
//                 <div className="w-full h-[180px] rounded-full overflow-hidden shadow flex items-center justify-center">
//                   <Image
//                     src={cat?.image}
//                     alt={cat?.name}
//                     width={160} // same as w-40
//                     height={160} // same as h-40
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 <p className="mt-3 text-center text-gray-800 font-semibold">
//                   {cat?.name}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* DOTS */}
//         <div className="flex justify-center mt-8 gap-5">
//           {Array.from({ length: total }).map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => setCurrent(total * 15 + idx)}
//               className={`h-1.5 rounded-full transition-all
//                 ${idx === activeDot
//                   ? "bg-black w-3"
//                   : "bg-gray-300 w-1.5"
//                 }
//               `}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useCategories } from "@/context/CategoriesContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FeaturedCategories() {
  const { categories } = useCategories();
  const router = useRouter();
  const data = categories?.data || [];
  const total = data.length;
  if (!total) return null;

  // const looped = Array(30).fill(data).flat();
  // const [current, setCurrent] = useState(total * 15);
  const LOOP_COUNT = 10;
  const looped = Array(LOOP_COUNT).fill(data).flat();
  const [current, setCurrent] = useState(total * Math.floor(LOOP_COUNT / 2));
  const middleIndex = total * Math.floor(LOOP_COUNT / 2);

  const timeoutRef = useRef<any>(null);

  // const [screenWidth, setScreenWidth] = useState(0);

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );


  useEffect(() => {
    const update = () => setScreenWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ✅ FINAL BREAKPOINT LOGIC */
  const getItemsPerView = (width: number) => {
    if (width < 400) return 1;      // very small mobile
    if (width < 768) return 2;      // xs
    if (width < 1024) return 4;     // md
    return 6;                       // lg + xl
  };

  const itemsPerView = getItemsPerView(screenWidth);
  const gap = 24;

  const containerWidth =
    screenWidth > 0 ? Math.min(screenWidth - 32, 1280) : 0;

  const itemWidth =
    (containerWidth - gap * (itemsPerView - 1)) / itemsPerView;

  const step = itemWidth + gap;

  const nextSlide = () => setCurrent((p) => p + 1);
  const prevSlide = () => setCurrent((p) => p - 1);

  /* autoplay */
  // useEffect(() => {
  //   clearTimeout(timeoutRef.current);
  //   timeoutRef.current = setTimeout(nextSlide, 2500);
  //   return () => clearTimeout(timeoutRef.current);
  // }, [current]);
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setCurrent((p) => p + 1);
  //   }, 2500);

  //   return () => clearInterval(id);
  // }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((p) => p + 1);
    }, 2500);

    return () => clearInterval(id);
  }, [current]);


  useEffect(() => {
    if (current >= total * (LOOP_COUNT - 2)) {
      setCurrent(middleIndex);
    }
    if (current <= total) {
      setCurrent(middleIndex);
    }
  }, [current, total, middleIndex]);


  /* swipe */
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const activeDot = ((current % total) + total) % total;

  return (
    <section className="mt-16">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* HEADER */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 items-center gap-4 mb-2">
          <div className="text-center col-span-1 md:col-start-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-black">
              Top Categories
            </h2>
          </div>

          <div className="flex mt-4 flex-col items-center md:items-end col-span-1 md:col-start-3">
            <Link
              href="/categories"
              className="text-sm text-gray-600 hover:underline"
            >
              View All
            </Link>
          </div>
        </div>

        <p className="text-black p-2 md:p-4 md:mx-24 mx-2 my-4 text-center">
          Explore our wide range of authentic crystal jewelry and energy stones.
        </p>

        {/* CAROUSEL */}
        <div
          className="relative overflow-hidden mt-5"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * step}px)` }}
          >
            {looped?.map((cat: any, idx: number) => (
              <div
                key={idx}
                className="flex-shrink-0 cursor-pointer"
                style={{
                  width: itemWidth,
                  marginRight: gap,
                }}
                onClick={() =>
                  router.push(`/category/${cat?.slug_name}`)
                }
              >
                {/* ✅ PERFECT ROUND IMAGE */}
                <div className="w-full aspect-square rounded-full overflow-hidden shadow">
                  {/* <Image
                    src={cat?.image}
                    alt={cat?.name}
                    fill
                    sizes="(max-width: 400px) 100vw, 180px"
                    className="object-cover"
                  /> */}
                  <Image
                    src={cat?.image}
                    alt={cat?.name}
                    width={160} // same as w-40
                    height={160} // same as h-40
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    unoptimized
                  />
                </div>

                <p className="mt-3 text-center font-semibold">
                  {cat?.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* DOTS */}
        <div className="flex justify-center mt-8 gap-5">
          {Array.from({ length: total }).map((_, idx) => (
            <button
              aria-label={`Go to category ${idx + 1}`}
              key={idx}
              // onClick={() => setCurrent(total * 15 + idx)}
              onClick={() => setCurrent(middleIndex + idx)}
              className={`h-1.5 rounded-full transition-all
                ${idx === activeDot ? "bg-black w-3" : "bg-gray-300 w-1.5"}
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
