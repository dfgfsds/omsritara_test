"use client";

import React, { useState } from "react";

type FaqItem = {
    id: number;
    question: string;
    answer: string;
};

const defaultFaqs: FaqItem[] = [
    {
        id: 1,
        question: "Are Om Sritara crystals genuine and natural?",
        answer:
            "Yes. Every crystal sold by Om Sritara is 100% natural, authentic, and ethically sourced. Each piece is handpicked for its purity and energy quality.",
    },
    {
        id: 2,
        question: "How are the crystals energized before shipping?",
        answer:
            "All our crystals undergo a sacred 3-day Energizing process performed by Guru Matha. This process cleanses, charges, and infuses each stone with high positive vibrations.",
    },
    {
        id: 3,
        question: "Do you offer Reiki crystal products online apart from raw stones?",
        answer:
            "Absolutely! Om Sritara offers a wide range of Reiki crystal jewelry, pendulums, bracelets, and spiritual accessories—all cleansed and charged with divine intention.",
    },
    {
        id: 4,
        question: "Do you ship crystals all over India?",
        answer:
            "Yes. We deliver across the globe with secure packaging, ensuring your crystals reach you safe, pure, and full of healing energy.",
    },
    {
        id: 5,
        question: "Why should I buy healing crystals online from Om Sritara?",
        answer:
            "Because we’re more than just an online crystal shop—we’re a spiritual brand with integrity and energy consciousness. Every crystal you buy supports your healing journey with authenticity, care, and divine vibration.",
    },
];

export default function FAQSection({
    faqs = defaultFaqs,
    className = "",
}: {
    faqs?: FaqItem[];
    className?: string;
}) {
    const [openId, setOpenId] = useState<number | null>(faqs[0]?.id ?? null);

    const toggle = (id: number) => setOpenId(openId === id ? null : id);

    return (
        <section
            className={`max-w-6xl mx-auto p-6 sm:p-10 bg-white rounded-2xl transition-all duration-300 ${className}`}
            aria-labelledby="faq-heading"
        >
            <h2
                id="faq-heading"
                className="text-2xl sm:text-3xl font-semibold mb-4 text-center text-gray-900"
            >
                FAQs – Everything You Need to Know About Buying Healing Crystals Online
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-8 text-center max-w-2xl mx-auto">
                Have a question? See the most common ones below. Click or tap a question to
                reveal its answer.
            </p>

            <div className="space-y-4">
                {faqs.map((item) => {
                    const isOpen = openId === item.id;
                    return (
                        <div
                            key={item.id}
                            className={`border border-gray-200 rounded-md transition-all duration-300 overflow-hidden ${isOpen ? "shadow-md" : "shadow-sm"
                                }`}
                        >
                            <button
                                onClick={() => toggle(item.id)}
                                aria-expanded={isOpen}
                                aria-controls={`faq-panel-${item.id}`}
                                className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none"
                            >
                                <span className="flex-1 text-base sm:text-lg font-medium text-gray-900">
                                    {item.question}
                                </span>
                                <span
                                    className={`ml-4 flex-none transform transition-transform duration-300 ease-in-out ${isOpen ? "rotate-45 text-indigo-600" : "rotate-0 text-gray-500"
                                        }`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path
                                            d="M10 4v12M4 10h12"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                            </button>

                            <div
                                id={`faq-panel-${item.id}`}
                                role="region"
                                aria-labelledby={`faq-heading-${item.id}`}
                                className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                    }`}
                            >
                                <div className="overflow-hidden">
                                    <p className="px-5 pb-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </section>
    );
}