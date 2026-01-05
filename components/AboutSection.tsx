// import React from 'react';
// import HealingCrystalsSection from './HealingCrystalsSection';

// const AboutSection: React.FC = () => {

//     return (
//         <section className=" pt-5 pb-5 m-4">
//             <div className="max-w-7xl mx-auto px-4 py-10 bg-gradient-to-br from-gray-50 to-gray-200 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
//                 {/* Title Section */}
//                 <div className="text-center mb-8">
//                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#a5291b] ">
//                         Omsritara
//                     </h2>
//                     <h3 className="text-lg mt-2 md:text-xl font-semibold text-gray-800 uppercase tracking-wide">
//                         Our Brand Story
//                     </h3>
                   
//                 </div>

//                 {/* Content Section */}
//                 <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed text-justify md:text-center">
//                     <p>
//                     Om Sritara is India’s trusted healing crystals shop online, Energized healing crystals as a gift from the divine to help every seeker find their way. All of these are ethically sourced, handpicked, and charged with healing vibes to help you.
//                     </p>

//                     <p>
//                      It doesn’t matter what nature your journey is: ⁠Unconditional love, abundance money overflow, strong protection, or deep inner peace. Our Reiki crystal products online collection is the perfect companion to strengthen your heartfelt intentions and bring you into vibrational harmony. 
//                     </p>
// <p></p>
//                     <p>
//                     Shop uninterruptedly, heal by nature’s law, and become aware of the power that lies within you. The energy that changes your life could very well be Om ‍‌‍‍‌‍‌‍‍‌Sritara. - The best online crystal shop in India.

//                     </p>
//                 </div>
//             </div>


//  <HealingCrystalsSection/>

//             <div className="w-full max-w-3xl mx-auto my-8 px-4">
//                 <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
//                     <iframe
//                         src="https://www.youtube.com/embed/Fx3LtSscbXY?si=Td4wmlIPUbT_4yDn"
//                         title="Omsritara Introduction Video"
//                         frameBorder="0"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                         referrerPolicy="strict-origin-when-cross-origin"
//                         allowFullScreen
//                         className="absolute top-0 left-0 w-full h-full"
//                     ></iframe>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default AboutSection;


import React, { memo } from "react";
import dynamic from "next/dynamic";

const HealingCrystalsSection = dynamic(
  () => import("./HealingCrystalsSection"),
  { ssr: false }
);

const AboutSection: React.FC = () => {
  return (
    <section className="pt-5 pb-5 m-4">
      <div className="max-w-7xl mx-auto px-4 py-10 bg-gradient-to-br from-gray-50 to-gray-200 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#a5291b]">
            Omsritara
          </h2>
          <h3 className="text-lg mt-2 md:text-xl font-semibold text-gray-800 uppercase tracking-wide">
            Our Brand Story
          </h3>
        </div>

        <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed text-center">
          <p>
            Om Sritara is India’s trusted healing crystals shop online...
          </p>

          <p>
            It doesn’t matter what nature your journey is...
          </p>

          <p>
            Shop uninterruptedly, heal by nature’s law...
          </p>
        </div>
      </div>

      <HealingCrystalsSection />

      <div className="w-full max-w-3xl mx-auto my-8 px-4">
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
          <iframe
            src="https://www.youtube.com/embed/Fx3LtSscbXY"
            loading="lazy"
            title="Omsritara Introduction Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default memo(AboutSection);
