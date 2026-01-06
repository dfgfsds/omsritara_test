// // next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         formats: ["image/avif", "image/webp"],
//         unoptimized: true,
//         domains: [
//             "www.reikicrystalproducts.com",
//             "ecomapi.ftdigitalsolutions.org",
//             "cdn.shopify.com",
//             "semantic-ui.com",
//             "cdn-icons-png.flaticon.com",
//         ],
//     },
//     async rewrites() {
//         return [
//             {
//                 source: "/robots.txt",
//                 destination: "/api/robots",
//             },
//             {
//                 source: "/sitemap.xml",
//                 destination: "/api/sitemap",
//             },
//         ];
//     },
// };

// module.exports = nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false, // 🔥 TEMP for lighthouse

  images: {
    unoptimized: true,
    //  unoptimized: false,

    formats: ["image/avif", "image/webp"],

    domains: [
      "www.reikicrystalproducts.com",
      "ecomapi.ftdigitalsolutions.org",
      "cdn.shopify.com",
      "semantic-ui.com",
      "cdn-icons-png.flaticon.com",
    ],

    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 160, 256, 384],

    minimumCacheTTL: 60 * 60 * 24 * 30, // 🚀 30 days
  },

  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
};

module.exports = nextConfig;
