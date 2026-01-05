// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        domains: [
            "www.reikicrystalproducts.com",
            "ecomapi.ftdigitalsolutions.org",
            "cdn.shopify.com",
            "semantic-ui.com",
            "cdn-icons-png.flaticon.com",
        ],
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
