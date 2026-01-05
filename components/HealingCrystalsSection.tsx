"use client";

import {
  Sparkles,
  Gem,
  Package,
  Leaf,
} from "lucide-react";

export default function HealingCrystalsSection() {
  return (
    <section className="relative py-20 md:py-24l overflow-hidden">

      {/* Floating Magical Orbs */}
      {/* <div className="absolute top-0 left-10 w-56 h-56 md:w-72 md:h-72 bg-[#a5291b]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-6 w-72 h-72 md:w-96 md:h-96 bg-[#a5291b]/20 rounded-full blur-3xl"></div> */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-14">
       

          <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-[#a5291b] leading-tight">
            Buy Healing Crystals Online
            <span className="block text-3xl mt-2 text-gray-700 ">
              Trusted, Tested & Energized
            </span>
          </h2>

          <p className="max-w-2xl mx-auto mt-4 text-gray-700 text-base sm:text-lg">
            When you buy raw crystals online from Om Sritara, you’re not just buying a stone — 
            you’re bringing home a piece of Earth’s divine energy.
          </p>
        </div>

        {/* Two Column Section */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left Side */}
          <div>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
              Every crystal we offer goes through a sacred preparation process, 
              ensuring it reaches you with pure, positive, and powerful vibrations.
            </p>

            {/* Features */}
            <div className="space-y-6">

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md">
                  <Sparkles className="text-[#a5291b]" size={26} />
                </div>
                <p className="text-gray-900 mt-2 font-medium text-lg">
                  100% natural and ethically sourced
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md">
                  <Gem className="text-[#a5291b]" size={26} />
                </div>
                <p className="text-gray-900 mt-2 font-medium text-lg">
                  Cleansed and charged before shipping
                </p>
              </div>

              <div className="flex items-start  gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md">
                  <Package className="text-[#a5291b]" size={26} />
                </div>
                <p className="text-gray-900 mt-2 font-medium text-lg">
                  Packed with intention and care
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md">
                  <Leaf className="text-[#a5291b]" size={26} />
                </div>
                <p className="text-gray-900 mt-2 font-medium text-lg">
                  Energized using healing techniques
                </p>
              </div>

            </div>
          </div>

          {/* Right Side */}
          <div className="bg-white/70 backdrop-blur-xl border border-white shadow-2xl rounded-2xl p-4 sm:p-10 md:p-12">

            <h3 className="text-2xl font-semibold text-[#a5291b] mb-5">
               Sacred 3-Day Energizing Process
            </h3>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-5">
              At Om Sritara, all our products are personally charged and energized by<span className="font-semibold text-[#a5291b]"> Guru Matha</span>, a renowned Reiki Master. Each crystal undergoes a sacred three-day energizing process, ensuring it carries pure, positive vibrations before reaching you.
          
            </p>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-5">
              This careful spiritual process enhances the crystal’s natural energy, helping you experience deeper healing, balance, and harmony in your daily life.
            </p>

            <p className="text-gray-700 font-medium text-base sm:text-lg leading-relaxed">
              Our mission is to deliver genuine, high-vibration crystals that truly support your spiritual and emotional healing journey.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
