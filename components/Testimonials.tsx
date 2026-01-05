"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { Star } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
    {
        name: "Aaradhya, Bengaluru",
        review:
            "I ordered a rose quartz bracelet and could literally feel the calming energy as soon as I wore it. Om Sritara’s crystals are truly charged and full of love!",
        rating: 5,
    },
    {
        name: " Manoj, Chennai",
        review:
            "Their Reiki-charged crystals have helped me balance my emotions and focus during meditation. The energy feels pure and strong.",
        rating: 5,
    },
    {
        name: "Priya Sharma, Delhi",
        review:
            "Om Sritara’s customer service is so kind and personal. I bought a citrine crystal for abundance, and within weeks, I noticed positive shifts in my mindset.",
        rating: 4,
    },
    {
        name: "Ananya Gupta",
        review:
            "Beautiful collection of spiritual items. I purchased a bracelet and a card set—both exceeded my expectations.",
        rating: 5,
    },
    {
        name: "Ravi Kumar, Hyderabad",
        review:
            "Unlike other online crystal shops, Om Sritara provides detailed spiritual guidance with every purchase. You can feel the sacredness in their packaging.",
        rating: 4,
    },
    {
        name: "Sneha, Pune",
        review:
            "Beautiful, natural, and truly energized crystals. I’ve bought pendulums and bracelets—each one feels blessed. Highly recommend Om Sritara’s  healing crystal shop online!",
        rating: 5,
    },
];

const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024, // tablet
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640, // mobile
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center gap-3 mb-6">
                    <Image
                        src="/google-logo.png"
                        alt="Google"
                        width={40}
                        height={40}
                    />
                    <h2 className="text-2xl font-bold">What Our Customers Say</h2>
                </div>

                <Slider {...settings}>
                    {testimonials.map((t, i) => (
                        <div key={i} className="px-3">
                            <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
                                <div className="flex items-center gap-2">
                                    {Array.from({ length: t.rating }).map((_, idx) => (
                                        <Star
                                            key={idx}
                                            className="text-yellow-500 fill-yellow-500"
                                            size={18}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-600 italic">"{t.review}"</p>
                                <p className="font-semibold text-gray-800">- {t.name}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default Testimonials;
