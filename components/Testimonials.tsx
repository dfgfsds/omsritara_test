// "use client";
// import React from "react";
// import Slider from "react-slick";
// import Image from "next/image";
// import { Star } from "lucide-react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const testimonials = [
//     {
//         name: "Aaradhya, Bengaluru",
//         review:
//             "I ordered a rose quartz bracelet and could literally feel the calming energy as soon as I wore it. Om Sritara’s crystals are truly charged and full of love!",
//         rating: 5,
//     },
//     {
//         name: " Manoj, Chennai",
//         review:
//             "Their Reiki-charged crystals have helped me balance my emotions and focus during meditation. The energy feels pure and strong.",
//         rating: 5,
//     },
//     {
//         name: "Priya Sharma, Delhi",
//         review:
//             "Om Sritara’s customer service is so kind and personal. I bought a citrine crystal for abundance, and within weeks, I noticed positive shifts in my mindset.",
//         rating: 4,
//     },
//     {
//         name: "Ananya Gupta",
//         review:
//             "Beautiful collection of spiritual items. I purchased a bracelet and a card set—both exceeded my expectations.",
//         rating: 5,
//     },
//     {
//         name: "Ravi Kumar, Hyderabad",
//         review:
//             "Unlike other online crystal shops, Om Sritara provides detailed spiritual guidance with every purchase. You can feel the sacredness in their packaging.",
//         rating: 4,
//     },
//     {
//         name: "Sneha, Pune",
//         review:
//             "Beautiful, natural, and truly energized crystals. I’ve bought pendulums and bracelets—each one feels blessed. Highly recommend Om Sritara’s  healing crystal shop online!",
//         rating: 5,
//     },
// ];

// const Testimonials = () => {
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 800,
//         slidesToShow: 3,
//         slidesToScroll: 2,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         responsive: [
//             {
//                 breakpoint: 1024, // tablet
//                 settings: {
//                     slidesToShow: 2,
//                 },
//             },
//             {
//                 breakpoint: 640, // mobile
//                 settings: {
//                     slidesToShow: 1,
//                 },
//             },
//         ],
//     };

//     return (
//         <section className="py-12 bg-gray-50">
//             <div className="max-w-6xl mx-auto px-4">
//                 <div className="flex items-center gap-3 mb-6">
//                     <Image
//                         src="/google-logo.png"
//                         alt="Google"
//                         width={40}
//                         height={40}
//                     />
//                     <h2 className="text-2xl font-bold">What Our Customers Say</h2>
//                 </div>

//                 <Slider {...settings}>
//                     {testimonials.map((t, i) => (
//                         <div key={i} className="px-3">
//                             <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
//                                 <div className="flex items-center gap-2">
//                                     {Array.from({ length: t.rating }).map((_, idx) => (
//                                         <Star
//                                             key={idx}
//                                             className="text-yellow-500 fill-yellow-500"
//                                             size={18}
//                                         />
//                                     ))}
//                                 </div>
//                                 <p className="text-gray-600 italic">"{t.review}"</p>
//                                 <p className="font-semibold text-gray-800">- {t.name}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </Slider>
//             </div>
//         </section>
//     );
// };

// export default Testimonials;



"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

/* ⭐ Inline SVG Star – faster than lucide-react */
const StarIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="#facc15"
        aria-hidden="true"
    >
        <path d="M12 17.3l6.18 3.73-1.64-7.03L21.9 9.27l-7.19-.61L12 2 9.29 8.66l-7.19.61 5.36 4.73-1.64 7.03L12 17.3z" />
    </svg>
);

const testimonials = [
    {
        name: "Aaradhya, Bengaluru",
        review:
            "I ordered a rose quartz bracelet and could literally feel the calming energy as soon as I wore it.",
        rating: 5,
    },
    {
        name: "Manoj, Chennai",
        review:
            "Their Reiki-charged crystals helped me balance my emotions and focus.",
        rating: 5,
    },
    {
        name: "Priya Sharma, Delhi",
        review:
            "Customer service is very kind. Positive shifts within weeks!",
        rating: 4,
    },
    {
        name: "Ananya Gupta",
        review:
            "Beautiful spiritual items. Exceeded expectations.",
        rating: 5,
    },
    {
        name: "Ravi Kumar, Hyderabad",
        review:
            "You can feel the sacredness in their packaging.",
        rating: 5,
    },
];

export default function Testimonials() {
    const total = testimonials.length;

    const [index, setIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(1);
    const startX = useRef<number | null>(null);

    /* 🔥 Responsive items per view */
    useEffect(() => {
        const calc = () => {
            const w = window.innerWidth;
            if (w < 640) return 1;
            if (w < 1024) return 2;
            return 3;
        };

        const update = () => setItemsPerView(calc());
        update();

        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const slideWidth = useMemo(
        () => 100 / itemsPerView,
        [itemsPerView]
    );

    /* 🔥 Autoplay (pause when tab inactive) */
    useEffect(() => {
        if (total <= itemsPerView) return;

        let interval: any;

        const start = () => {
            interval = setInterval(() => {
                setIndex((i) =>
                    i >= total - itemsPerView ? 0 : i + 1
                );
            }, 4000);
        };

        const stop = () => interval && clearInterval(interval);

        document.addEventListener("visibilitychange", () =>
            document.hidden ? stop() : start()
        );

        start();
        return stop;
    }, [total, itemsPerView]);

    /* 🔥 Swipe */
    const onTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (!startX.current) return;

        const diff = startX.current - e.changedTouches[0].clientX;

        if (diff > 50 && index < total - itemsPerView)
            setIndex((i) => i + 1);

        if (diff < -50 && index > 0)
            setIndex((i) => i - 1);

        startX.current = null;
    };

    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                {/* HEADER */}
                <div className="flex items-center gap-3 mb-6">
                    <Image
                        src="/google-logo.png"
                        alt="Google Reviews"
                        width={40}
                        height={40}
                        loading="lazy"
                        unoptimized
                    />
                    <h2 className="text-2xl font-bold">
                        What Our Customers Say
                    </h2>
                </div>

                {/* SLIDER */}
                <div
                    className="overflow-hidden"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{
                            transform: `translateX(-${index * slideWidth}%)`,
                        }}
                    >
                        {testimonials.map((t, i) => (
                            <div
                                key={i}
                                className="px-3 flex-shrink-0"
                                style={{ width: `${slideWidth}%` }}
                            >
                                <div className="bg-white rounded-xl shadow p-6 h-full flex flex-col gap-4">
                                    <div className="flex gap-1">
                                        {Array.from({ length: t.rating }).map((_, idx) => (
                                            <StarIcon key={idx} />
                                        ))}
                                    </div>

                                    <p className="text-gray-600 italic">
                                        "{t.review}"
                                    </p>
                                    <p className="font-semibold">
                                        – {t.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* DOTS */}
                <div className="flex justify-center mt-6 gap-2">
                    {Array.from({
                        length: total - itemsPerView + 1,
                    }).map((_, i) => (
                        <button
                            key={i}
                            aria-label={`Go to testimonial ${i + 1}`}
                            onClick={() => setIndex(i)}
                            className={`h-2 rounded-full transition-all
                ${i === index ? "bg-black w-4" : "bg-gray-300 w-2"}
              `}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

