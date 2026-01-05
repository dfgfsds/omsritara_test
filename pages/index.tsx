// import AboutSection from "@/components/AboutSection";
// import BlogSection from "@/components/BlogSection";
// import Certificates from "@/components/Certificates";
// import FeaturedCategories from "@/components/FeaturedCategories";
import HeroSection from "@/components/HeroSection";
// import NewArrivals from "@/components/NewArrivals";
// import Bracelets from "@/components/SpecialPackages";
// import Testimonials from "@/components/Testimonials";
// import { baseUrl } from "@/api-endpoints/ApiUrls";
import axios from "axios";
// import FAQSection from "@/components/FAQ";
import Head from "next/head";
import dynamic from "next/dynamic";

// const FeaturedCategories = dynamic(() => import("@/components/FeaturedCategories"), { ssr: false });
// const NewArrivals = dynamic(() => import("@/components/NewArrivals"), { ssr: false });
// const Bracelets = dynamic(() => import("@/components/SpecialPackages"), { ssr: false });
// const AboutSection = dynamic(() => import("@/components/AboutSection"), { ssr: false });
// const BlogSection = dynamic(() => import("@/components/BlogSection"), { ssr: false });
// const Certificates = dynamic(() => import("@/components/Certificates"), { ssr: false });
// const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: false });
// const FAQSection = dynamic(() => import("@/components/FAQ"), { ssr: false });


import FeaturedCategories from "@/components/FeaturedCategories";
import BlogSection from "@/components/BlogSection";

const NewArrivals = dynamic(() => import("@/components/NewArrivals"), {
  ssr: false,
  loading: () =>
  (
    <div className="h-[300px] flex items-center justify-center text-gray-400">
      Loading products...
    </div>
  )
});

const Bracelets = dynamic(() => import("@/components/SpecialPackages"), {
  ssr: false
});

const AboutSection = dynamic(() => import("@/components/AboutSection"), {
  ssr: true
});


const Certificates = dynamic(() => import("@/components/Certificates"), {
  ssr: true
});

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  ssr: false
});

const FAQSection = dynamic(() => import("@/components/FAQ"), {
  ssr: false
});



// export default function Home({ blogs }: { blogs: any[] }) {
export default function Home({ blogs, banners }: any) {
  return (
    <>
      <Head>
        {/* Primary Meta */}
        <title>Buy Healing Crystals Online in India - Omsritara</title>
        <meta
          name="description"
          content="Shop healing crystals, Reiki crystal products & raw stones online in India. Omsritara – your trusted healing crystals shop online."
        />
        <meta
          name="keywords"
          content="healing crystals india, buy crystals online, reiki crystal products, raw stones india, crystal shop online, chakra stones, Omsritara, natural gemstones"
        />
        <meta name="robots" content="index, follow" />

        {/* Canonical */}
        <link rel="canonical" href="https://www.omsritara.in/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.omsritara.in/" />
        <meta
          property="og:title"
          content="Buy Healing Crystals Online in India - Omsritara"
        />
        <meta
          property="og:description"
          content="Shop healing crystals, Reiki crystal products & raw stones online in India. Omsritara – your trusted healing crystals shop online."
        />
        <meta
          property="og:image"
          content="https://www.omsritara.in/banner5.jpg"
        />
        <meta property="og:site_name" content="Omsritara" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.omsritara.in/" />
        <meta
          name="twitter:title"
          content="Buy Healing Crystals Online in India - Omsritara"
        />
        <meta
          name="twitter:description"
          content="Shop healing crystals, Reiki crystal products & raw stones online in India. Omsritara – your trusted healing crystals shop online."
        />
        <meta
          name="twitter:image"
          content="https://www.omsritara.in/banner5.jpg"
        />

        {/* Geo */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.omsritara.in/#organization",
                  name: "Omsritara",
                  url: "https://www.omsritara.in/",
                  logo: "https://www.omsritara.in/logo.png",
                  description:
                    "Shop healing crystals, Reiki crystal products & raw stones online in India. Omsritara – your trusted healing crystals shop online.",
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+91-8989052020",
                    contactType: "customer service",
                    areaServed: "IN",
                    availableLanguage: ["en", "ta", "hi"],
                  },
                  sameAs: [
                    "https://www.facebook.com/omsritarafoundation/",
                    "https://www.instagram.com/omsritara/",
                    "https://www.youtube.com/channel/UCxXJOgXcbckwNby5kEFkBjA",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.omsritara.in/#website",
                  url: "https://www.omsritara.in/",
                  name: "Omsritara - Buy Healing Crystals Online",
                  description:
                    "Your trusted source for authentic healing crystals and Reiki products in India.",
                  publisher: {
                    "@id": "https://www.omsritara.in/#organization",
                  },
                  potentialAction: {
                    "@type": "SearchAction",
                    target:
                      "https://www.omsritara.in/?s={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </Head>
      <div>

        {/* <HeroSection /> */}
        <HeroSection banners={banners} />
        <FeaturedCategories />
        <NewArrivals />
        <Bracelets />
        <AboutSection />
        {/* <BrandStorySection/> */}

        <BlogSection blogs={blogs} />
        <Certificates />
        <Testimonials />
        <FAQSection />
      </div>
    </>

  );
}

// ✅ Server-Side Rendering
// export async function getServerSideProps() {
//   try {
//     const vendorId = 63;
//     const blogAPI = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/?vendor_id=${vendorId}`;
//     const res = await axios.get(blogAPI);

//     return {
//       props: {
//         blogs: res.data?.blogs || [],
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: {
//         blogs: [],
//       },
//     };
//   }
// }

export async function getServerSideProps() {
  try {
    const vendorId = 63;

    const [blogRes, bannerRes] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/?vendor_id=${vendorId}`),
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/banners/?vendorId=${vendorId}`)
    ]);

    return {
      props: {
        blogs: blogRes?.data?.blogs || [],
        banners: bannerRes?.data?.banners
      }
    };
  } catch (err) {
    return { props: { blogs: [], banners: [] } };
  }
}

