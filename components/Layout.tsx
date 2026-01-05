// import { useState, useEffect } from "react";
// import Header from "./Header";
// import Footer from "./Footer";
// import ScrollToTop from "./ScrollToTop";
// import FloatingWhatsApp from "./FloatingWhatsApp";
// import FloatingCallButton from "./FloatingCallButton";

// interface LayoutProps {
//     children: React.ReactNode;
// }

// export default function Layout({ children }: LayoutProps) {
//     const [showHeader, setShowHeader] = useState(true);
//     const [lastScrollY, setLastScrollY] = useState(0);

//     const controlHeader = () => {
//         if (typeof window !== "undefined") {
//             if (window.scrollY > lastScrollY) {
//                 // Scrolling down
//                 setShowHeader(false);
//             } else {
//                 // Scrolling up
//                 setShowHeader(true);
//             }
//             setLastScrollY(window.scrollY);
//         }
//     };

//     useEffect(() => {
//         if (typeof window !== "undefined") {
//             window.addEventListener("scroll", controlHeader);
//             return () => window.removeEventListener("scroll", controlHeader);
//         }
//     }, [lastScrollY]);

//     return (
//         <div className="min-h-screen custom-cursor">
//             <div className="bg-[#a5291b] text-white text-xs md:text-sm text-center py-2 px-4 w-full top-0 z-50">
//                 🎁 Free Shipping All Over India – No Minimum Order!
//             </div>
//             {/* Header with transition */}
//             {/* <div
//                 className={`fixed top-0 w-full z-[999] transition-transform h-full md:h-auto duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"
//                     }`}
//             > */}
//             <Header />
//             {/* </div> */}

//             <main className=""> {/* add padding-top equal to header height */}
//                 {children}
//             </main>
//             <Footer />

//             <ScrollToTop />
//             <FloatingCallButton />
//             <FloatingWhatsApp />
//         </div>
//     );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import FloatingWhatsApp from "./FloatingWhatsApp";
import FloatingCallButton from "./FloatingCallButton";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [showHeader, setShowHeader] = useState(true);
    const lastScrollY = useRef(0);

    const controlHeader = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY.current) {
            // scrolling down
            setShowHeader(false);
        } else {
            // scrolling up
            setShowHeader(true);
        }

        lastScrollY.current = currentScrollY;
    };

    useEffect(() => {
        window.addEventListener("scroll", controlHeader, { passive: true });
        return () => window.removeEventListener("scroll", controlHeader);
    }, []);

    return (
        <div className="min-h-screen custom-cursor">
            {/* TOP OFFER BAR */}
            <div className="bg-[#a5291b] text-white text-xs md:text-sm text-center py-2 px-4 w-full z-50">
                🎁 Free Shipping All Over India – No Minimum Order!
            </div>

            {/* HEADER */}
            {/* 
        If you want hide-on-scroll later,
        wrap Header with this div 👇
        
        <div
          className={`fixed top-0 w-full z-[999] transition-transform duration-300
          ${showHeader ? "translate-y-0" : "-translate-y-full"}`}
        >
          <Header />
        </div>
      */}
            <Header />

            {/* MAIN CONTENT */}
            <main>{children}</main>

            {/* FOOTER */}
            <Footer />

            {/* FLOATING UI */}
            <ScrollToTop />
            <FloatingCallButton />
            <FloatingWhatsApp />
        </div>
    );
}
