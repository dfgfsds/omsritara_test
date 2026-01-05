'use client';

import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const FloatingWhatsApp: React.FC = () => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile(); // initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const phoneNumber = '917448899396';
  const message = encodeURIComponent('Hello! I am interested in your services.');

  // Check if on productLandingPage slug route
  const isProductPage = pathname?.startsWith('/productLandingPage/');

  const bottomClass = isProductPage && isMobile ? 'bottom-20' : 'bottom-5';

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed left-5 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 ${bottomClass}`}
    >
      <FaWhatsapp className="w-6 h-6" />
    </a>
  );
};

export default FloatingWhatsApp;
