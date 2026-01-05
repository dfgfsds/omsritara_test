// "use client";

// import Link from "next/link";
// import { Phone } from "lucide-react"; // or react-icons if u prefer

// interface FloatingCallButtonProps {
//     phoneNumber?: string;
// }

// export default function FloatingCallButton({
//     phoneNumber = "+918989052020",
// }: FloatingCallButtonProps) {
//     return (
//         <Link
//             href={`tel:${phoneNumber}`}
//             className="fixed bottom-36 md:bottom-24 left-5 z-50 flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-r from-red-700 to-red-600 text-white shadow-lg border border-red-600 transition-transform duration-300  hover:shadow-2xl"
//             aria-label="Call Us"
//         >
//             {/* Optional pulsing ring effect */}
//             {/* <span className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-500 opacity-75 animate-ping"></span> */}

//             <Phone size={20} className="sm:size-6 relative z-10" />
//         </Link>
//     );
// }


'use client';

import { memo } from 'react';
import { Phone } from 'lucide-react';

interface FloatingCallButtonProps {
  phoneNumber?: string;
}

function FloatingCallButton({
  phoneNumber = '+918989052020',
}: FloatingCallButtonProps) {
  return (
    <a
      href={`tel:${phoneNumber}`}
      aria-label="Call Us"
      className="
        fixed bottom-36 md:bottom-24 left-5 z-50
        flex items-center justify-center
        w-11 h-11 sm:w-12 sm:h-12
        rounded-full
        bg-gradient-to-r from-red-700 to-red-600
        text-white
        shadow-lg border border-red-600
        transition-transform duration-300
        hover:scale-105 hover:shadow-2xl
        pointer-events-auto
      "
    >
      <Phone size={20} className="relative z-10 sm:w-6 sm:h-6" />
    </a>
  );
}

export default memo(FloatingCallButton);
