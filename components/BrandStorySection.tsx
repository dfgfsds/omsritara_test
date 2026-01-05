"use client";

import { Heart, Star, Gift } from "lucide-react";

export default function BrandStorySection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#fde8e7] via-white to-[#fff3f1] overflow-hidden">

      {/* Floating Magical Orbs */}
      <div className="absolute top-0 left-8 w-56 h-56 md:w-72 md:h-72 bg-[#a5291b]/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-6 w-72 h-72 md:w-96 md:h-96 bg-[#a5291b]/20 rounded-full blur-3xl animate-pulse-slow"></div>
      
      {/* Floating sparkles */}
      <div className="absolute top-20 right-1/4 w-6 h-6 bg-[#a5291b]/40 rounded-full animate-bounce-slow"></div>
      <div className="absolute bottom-32 left-1/3 w-4 h-4 bg-[#a5291b]/40 rounded-full animate-bounce-slow"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-5 py-2 bg-[#a5291b]/10 text-[#a5291b] rounded-full text-sm font-medium tracking-wide">
            ✨ Our Brand Story
          </span>

          <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Om Sritara – India’s Trusted Healing Crystal Shop
            <span className="block text-[#a5291b]">Experience the Divine Energy of Crystals</span>
          </h2>
        </div>

        {/* Two-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Layered Crystal Images */}
          <div className="relative flex justify-center">
            <div className="absolute -top-12 -left-12 w-28 h-28 md:w-40 md:h-40 bg-[#a5291b]/30 rounded-full blur-2xl"></div>
            <div className="absolute top-10 right-0 w-32 h-32 md:w-48 md:h-48 bg-[#a5291b]/30 rounded-full blur-2xl"></div>
            <img
              src="/images/crystal-cluster.png"
              alt="Healing Crystals"
              className="relative rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right: Glassmorphism Brand Story Card */}
          <div className="relative">
            {/* Overlapping Gradient Accent */}
            <div className="absolute -top-6 -right-6 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-tr from-[#a5291b]/20 to-[#fde8e7]/20 rounded-full blur-3xl z-0"></div>

            <div className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-8 sm:p-12 relative z-10 space-y-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Om Sritara is India’s trusted healing crystals shop online, Energized healing crystals as a gift from the divine to help every seeker find their way. All of these are ethically sourced, handpicked, and charged with healing vibes to help you.
              </p>

              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                It doesn’t matter what nature your journey is: ⁠Unconditional love, abundance money overflow, strong protection, or deep inner peace. Our Reiki crystal products online collection is the perfect companion to strengthen your heartfelt intentions and bring you into vibrational harmony.
              </p>

              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Om Sritara welcomes you to experience the raw and rugged charm of Mother Earth through natural stones or the beauty of gemstones in jewelry and thereby connect with the timeless wisdom of nature to expedite your spiritual evolution.
              </p>

              <p className="text-gray-900 font-medium text-base sm:text-lg leading-relaxed">
                Shop uninterruptedly, heal by nature’s law, and become aware of the power that lies within you. The energy that changes your life could very well be Om Sritara. - The best online crystal shop in India.
              </p>

              {/* Feature Icons */}
              <div className="grid grid-cols-3 gap-6 mt-6">
                <div className="flex flex-col items-center bg-[#a5291b]/10 p-5 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
                  <Heart className="text-[#a5291b] mb-2" size={28} />
                  <p className="text-gray-900 font-medium text-center text-sm">Heartfelt Healing</p>
                </div>
                <div className="flex flex-col items-center bg-[#a5291b]/10 p-5 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
                  <Star className="text-[#a5291b] mb-2" size={28} />
                  <p className="text-gray-900 font-medium text-center text-sm">Spiritual Alignment</p>
                </div>
                <div className="flex flex-col items-center bg-[#a5291b]/10 p-5 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
                  <Gift className="text-[#a5291b] mb-2" size={28} />
                  <p className="text-gray-900 font-medium text-center text-sm">Energetic Gifts</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
