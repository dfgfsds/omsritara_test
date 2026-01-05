import Head from "next/head";
import logo from '@/public/logo.png';
const AboutUs = () => {

  return (
    <>
      {/* =======================
                 SEO / HEAD SECTION
            ======================== */}
      <Head>
        <title>About OmSri Tara | Spiritual Healing & Reiki Learning Center</title>
        <meta
          name="description"
          content="Discover Om Sri Tara, a sanctuary for holistic transformation led by Guru Matha. Explore Reiki courses, energy healing, and buy energized crystals online."
        />

        {/* Primary SEO Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="Om Sri Tara, spiritual healing center, Reiki learning center, Reiki courses, energy healing, holistic transformation, Guru Matha, spiritual guidance, energized crystals"
        />

        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="About OmSri Tara | Spiritual Healing & Reiki Learning Center"
        />
        <meta
          property="og:description"
          content="Explore Om Sri Tara — a holistic healing sanctuary offering Reiki courses, energy healing, spiritual guidance, and energized crystals."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.omsritara.in/about" />
        <meta
          property="og:image"
         content={`https://www.omsritara.in/${logo.src}`} 
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About OmSri Tara | Spiritual Healing & Reiki Learning Center"
        />
        <meta
          name="twitter:description"
          content="A sanctuary for healing, Reiki learning, and spiritual transformation guided by Guru Matha."
        />
        <meta
          name="twitter:image"
          content={`https://www.omsritara.in/${logo.src}`} 
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.omsritara.in/about" />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Om Sri Tara",
              "url": "https://www.omsritara.in",
              "logo": `https://www.omsritara.in/${logo.src}`,
              "description":
                "Om Sri Tara is a spiritual healing sanctuary offering Reiki courses, energy healing, spiritual guidance, and energized crystals.",
              "founder": {
                "@type": "Person",
                "name": "Guru Matha",
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+91-8989052020",
                  "contactType": "customer service",
                  "areaServed": "IN",
                  "availableLanguage": ["English", "Tamil"],
                },
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress":
                  "OMSRITARA, 46 Giri Rd, Satyamurthy Nagar, T. Nagar, Chennai, Tamil Nadu",
                "addressLocality": "Chennai",
                "addressRegion": "TN",
                "postalCode": "600017",
                "addressCountry": "IN",
              },
              "sameAs": [
                "https://www.facebook.com/omsritarafoundation/",
                "https://www.instagram.com/omsritara/",
              ],
            }),
          }}
        />

      </Head>

      <section className="py-12 px-4 md:px-12 lg:px-24 bg-white text-gray-800">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#a5291b]">
            Who We Are
          </h2>

          {/* Description */}
          <p className="mb-6 text-lg leading-relaxed">
            <b>Om Sri Tara </b>is more than just a center; it is a sacred sanctuary dedicated to spiritual learning, energy healing, and holistic transformation. Founded under the divine grace of Guru Matha, we serve as a bridge between ancient wisdom and modern living.
          </p>
          <p className="mb-6 text-lg leading-relaxed">
            Rooted in the timeless traditions of Reiki and multidimensional healing, we provide a supportive space for seekers to awaken their consciousness, align their energy, and empower their inner being. Whether you are seeking clarity, protection, or abundance, Om Sri Tara offers the spiritual tools needed to navigate your life’s unique path.

          </p>

          <h3 className="text-2xl font-semibold text-[#a5291b] mb-4">Our Guiding Light: Guru Matha</h3>
          <p className="mb-6 text-lg leading-relaxed">
            Our foundation is built upon the spiritual strength and intuitive guidance of Guru Matha, a powerful Ambal Upasaki and a gifted spiritual guide. As a renowned Reiki Master, Guru Matha's approach is deeply personal. She believes that healing is not merely a method but a sacred journey toward discovering your divine self.
          </p>
          <p className="mb-6 text-lg leading-relaxed">
            At Om Sri Tara, we invoke the benevolent presence of the Goddess Green Tara, Kwan Yin, Isis, and Fortuna, channeling their grace into every teaching, every healing session, and every transformation we guide.


          </p>


          {/* Mission */}
          <h3 className="text-2xl font-semibold text-[#a5291b] mb-4">Our Mission</h3>
          <p className="mb-10 text-lg leading-relaxed">
            To awaken divine spiritual consciousness in every soul. We guide seekers through personal transformation and energetic alignment using authentic healing methods, ancient wisdom, and the compassionate grace of the sacred feminine. We exist to serve as a vessel of light, helping you rise above life’s limitations through the power of sacred energy work.

          </p>

          {/* Vision */}
          <h3 className="text-2xl font-semibold text-[#a5291b] mb-4">Our Vision</h3>
          <p className="text-lg leading-relaxed">
            To become a globally trusted spiritual sanctuary where timeless practices such as Reiki, Akashic Records, Angelic Healing, Numerology, and Shamanism are lovingly integrated into modern lives. We envision a world where every individual finds healing, peace, protection, and their true soul purpose.

          </p>



          <h3 className="text-2xl font-semibold text-[#a5291b] my-4">Spiritual Courses & Modalities</h3>

          <p className="text-lg leading-relaxed mb-4">
            We offer a wide spectrum of spiritual courses designed to help you evolve. Our curriculum includes:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-base mb-6">
            <li>Reiki Healing & Training</li>
            <li>Akashic Records Access</li>
            <li>Angelic Healing Therapy</li>
            <li>Numerology & Shamanism</li>
            <li>Divine Guidance & Counseling</li>
          </ul>


          <section className="max-w-5xl mx-auto px-4 text-gray-800 py-2">

            <h1 className="text-2xl font-semibold text-start text-[#a5291b] my-4">
              Buy Healing Crystals Online <br /> <span className='text-xl text-gray-800 mt-2'> Trusted, Tested & Energized</span>
            </h1>

            <p className="text-lg leading-relaxed mb-4">
              At Om Sri Tara, we believe that crystals are pieces of Earth’s divine energy. When you buy raw crystals online from us, you are bringing home a powerful tool for balance and harmony.

            </p>
            <h3 className="text-2xl font-semibold text-[#a5291b] my-4">Why Choose Our Crystals?</h3>


            <p className="text-lg leading-relaxed mb-4"> Unlike standard marketplaces, we ensure that every stone you receive is vibrating with high-frequency energy.</p>
            <ul className="list-disc pl-6 space-y-2 text-base mb-6">
              <li>100% natural and ethically sourced</li>
              <li>Cleansed and charged before shipping</li>
              <li>Packed with intention and care</li>
              <li>Energized using healing techniques</li>
            </ul>

            <p className="text-lg leading-relaxed mb-4">The "Om Sri Tara" Promise: Trusted, Tested & Energized What sets us apart is our sacred energizing process. All our products are personally charged and energized by Guru Matha. Before reaching your hands, each crystal undergoes a sacred three-day energizing ritual, ensuring it carries pure, positive vibrations to support your spiritual and emotional healing journey.</p>
          </section>



        </div>
      </section>
    </>
  );
};

export default AboutUs;
