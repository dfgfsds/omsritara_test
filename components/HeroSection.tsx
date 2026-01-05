// 'use client';
// import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import { baseUrl } from '@/api-endpoints/ApiUrls';
// import { useVendor } from '@/context/VendorContext';
// import Image from 'next/image';

// export default function HeroSection({ banners }: any) {
//   const router = useRouter();
//   // const { vendorId } = useVendor();
//   // const [banners, setBanners] = useState<any[]>([]);
//   const [isMobile, setIsMobile] = useState<boolean | null>(null);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);
//   if (!banners?.length) return null;

//   if (isMobile === null) return null;

//   const filteredBanners = banners?.filter(banner =>
//     isMobile ? banner.type === 'Mobile View' : banner.type === 'Web View'
//   );

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 800,
//     autoplay: false,
//     autoplaySpeed: 3000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     pauseOnHover: false,
//     appendDots: (dots: React.ReactNode) => (
//       <div style={{ marginTop: '20px', textAlign: 'center' }}>
//         <ul className="flex justify-center space-x-2">{dots}</ul>
//       </div>
//     ),
//     customPaging: () => (
//       <div className="dot w-2 h-2 bg-gray-300 rounded-full transition-all duration-300" />
//     ),
//   };

//   const handleBannerClick = (banner: any) => {
//     const url = banner?.target_url;
//     if (!url) return;
//     if (url.startsWith("http://") || url.startsWith("https://")) {
//       window.open(url, "_blank");
//     } else {
//       router.push(url);
//     }
//   };

//   return (
//     <div className="z-10 md:h-[70vh] rounded-lg md:px-10 md:py-4">
//       <Slider {...settings}>
//         {filteredBanners?.map((banner: any, index: number) => (
//           <div
//             key={banner.id}
//             onClick={() => handleBannerClick(banner)}
//             className="cursor-pointer"
//           >
//             <section className="relative w-full h-[70vh] rounded-lg">
//               <Image
//                 src={banner?.image_url}
//                 alt={banner?.title || "Omsritara Banner"}
//                 fill
//                 priority
//                 sizes="100vw"
//                 className="md:rounded-lg md:object-cover"
//               />
//             </section>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }


'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function HeroSection({ banners }: any) {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 👉 swipe refs
  const startX = useRef<number | null>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!banners?.length) return null;

  const filteredBanners = banners.filter((b: any) =>
    isMobile ? b.type === 'Mobile View' : b.type === 'Web View'
  );

  const total = filteredBanners.length;

  /* ---------------- AUTO SLIDE ---------------- */
  useEffect(() => {
    if (total <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [total]);

  /* ---------------- NAVIGATION ---------------- */
  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c === 0 ? total - 1 : c - 1));

  /* ---------------- TOUCH EVENTS ---------------- */
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current || startX.current === null) return;

    const diff = e.changedTouches[0].clientX - startX.current;

    if (Math.abs(diff) > 50) {
      diff < 0 ? next() : prev();
    }

    isDragging.current = false;
    startX.current = null;
  };

  /* ---------------- MOUSE DRAG (DESKTOP) ---------------- */
  const onMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    isDragging.current = true;
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current || startX.current === null) return;

    const diff = e.clientX - startX.current;

    if (Math.abs(diff) > 50) {
      diff < 0 ? next() : prev();
    }

    isDragging.current = false;
    startX.current = null;
  };

  const handleBannerClick = (banner: any) => {
    const url = banner?.target_url;
    if (!url) return;
    url.startsWith('http')
      ? window.open(url, '_blank')
      : router.push(url);
  };

  return (
    <div className="z-10 md:h-[70vh] rounded-lg md:px-10 md:py-4">
      <section
        className="relative w-full overflow-hidden select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {/* SLIDES */}
        <div className="relative h-[55vh] md:h-[70vh]">
          {filteredBanners.map((banner: any, index: number) => (
            <div
              key={banner.id}
              onClick={() => handleBannerClick(banner)}
              className={`
                absolute inset-0 transition-opacity duration-700 ease-in-out
                ${index === current ? 'opacity-100 z-20' : 'opacity-0 z-10'}
                cursor-pointer
              `}
            >
              <Image
                src={banner.image_url}
                alt={banner.title || 'Omsritara Banner'}
                fill
                priority={index === 0}   // 🔥 LCP fix
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* DOTS */}
        {total > 1 && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {filteredBanners?.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2.5 h-2.5 rounded-full transition
                  ${index === current ? 'bg-white' : 'bg-white/50'}
                `}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
