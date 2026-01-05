import { useState, useEffect } from "react";
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
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlHeader = () => {
        if (typeof window !== "undefined") {
            if (window.scrollY > lastScrollY) {
                // Scrolling down
                setShowHeader(false);
            } else {
                // Scrolling up
                setShowHeader(true);
            }
            setLastScrollY(window.scrollY);
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", controlHeader);
            return () => window.removeEventListener("scroll", controlHeader);
        }
    }, [lastScrollY]);

    return (
        <div className="min-h-screen custom-cursor">
            <div className="bg-[#a5291b] text-white text-xs md:text-sm text-center py-2 px-4 w-full top-0 z-50">
                🎁 Free Shipping All Over India – No Minimum Order!
            </div>
            {/* Header with transition */}
            {/* <div
                className={`fixed top-0 w-full z-[999] transition-transform h-full md:h-auto duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"
                    }`}
            > */}
            <Header />
            {/* </div> */}

            <main className=""> {/* add padding-top equal to header height */}
                {children}
            </main>
            <Footer />

            <ScrollToTop />
            <FloatingCallButton />
            <FloatingWhatsApp />
        </div>
    );
}

