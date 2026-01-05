// 'use client';

// import { useEffect, useState } from 'react';
// import { ChevronUp } from 'lucide-react';
// import { usePathname } from 'next/navigation';

// const ScrollToTop = () => {
//   const [visible, setVisible] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const pathname = usePathname();

//   // Show button on scroll
//   useEffect(() => {
//     const toggleVisibility = () => {
//       setVisible(window.scrollY > 300);
//     };
//     window.addEventListener('scroll', toggleVisibility);
//     return () => window.removeEventListener('scroll', toggleVisibility);
//   }, []);

//   // Check if mobile
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 640);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Conditionally set bottom class
//   const isProductPage = pathname?.startsWith('/productLandingPage/');
//   const bottomClass = isProductPage && isMobile ? 'bottom-20' : 'bottom-6';

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     visible && (
//       <button
//         onClick={scrollToTop}
//         className={`fixed ${bottomClass} right-6 z-50 bg-[#a5291b] hover:bg-red-700 text-white p-3 rounded-md shadow-md transition-all`}
//         aria-label="Scroll to Top"
//       >
//         <ChevronUp size={20} />
//       </button>
//     )
//   );
// };

// export default ScrollToTop;


'use client';

import { useEffect, useState, useRef, memo } from 'react';
import { ChevronUp } from 'lucide-react';
import { usePathname } from 'next/navigation';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  const ticking = useRef(false);

  /* ---------- SCROLL HANDLER (THROTTLED) ---------- */
  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 300;
          setVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ---------- MOBILE CHECK (NO RESIZE LISTENER) ---------- */
  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)');
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  /* ---------- POSITION LOGIC ---------- */
  const isProductPage = pathname?.startsWith('/productLandingPage/');
  const bottomClass =
    isProductPage && isMobile ? 'bottom-20' : 'bottom-6';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to Top"
      className={`fixed ${bottomClass} right-6 z-50 
        bg-[#a5291b] hover:bg-red-700 text-white 
        p-3 rounded-md shadow-md 
        transition-all`}
    >
      <ChevronUp size={20} />
    </button>
  );
};

export default memo(ScrollToTop);
