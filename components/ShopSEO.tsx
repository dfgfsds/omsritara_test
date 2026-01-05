"use client";
import Head from "next/head";
import logo from "@/public/logo.png";

export default function ShopSEO({ ogImage }: { ogImage: string }) {
  const fallbackImage =
    "https://omsritara.in/assets/images/og-category.jpg";

  const finalOgImage = ogImage || fallbackImage;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>Best Online Crystal Shop | Healing Stones & Crystal- Omsritara</title>
      <meta
        name="description"
        content="Discover healing crystals and natural crystal stones at the best online crystal shop in India. Pure, energized stones for your spiritual journey."
      />
      <meta
        name="keywords"
        content="online crystal shops, crystal online shopping, best online crystal shop, crystal stones, healing stones and crystals, healing crystal, natural healing crystals India"
      />

      {/* Canonical */}
      <link rel="canonical" href="https://www.omsritara.in/shop/" />

      {/* Open Graph */}
      <meta
        property="og:title"
        content="Best Online Crystal Shop | Healing Stones & Crystal- Omsritara"
      />
      <meta
        property="og:description"
        content="Discover healing crystals and natural crystal stones at the best online crystal shop in India. Pure, energized stones for your spiritual journey."
      />
      <meta property="og:url" content="https://www.omsritara.in/shop/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={finalOgImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Best Online Crystal Shop | Healing Stones & Crystal- Omsritara"
      />
      <meta
        name="twitter:description"
        content="Discover healing crystals and natural crystal stones at the best online crystal shop in India. Energized crystals for inner balance and spiritual healing."
      />
      <meta name="twitter:image" content={finalOgImage} />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Om Sritara",
            url: "https://omsritara.in",
            logo: `https://www.omsritara.in/${logo.src}`,
            sameAs: [
              "https://www.facebook.com/omsritarafoundation/",
              "https://www.youtube.com/channel/UCxXJOgXcbckwNby5kEFkBjA",
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Om Sritara",
            url: "https://www.omsritara.in/",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://www.omsritara.in/?s={search_term}",
              "query-input": "required name=search_term",
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.omsritara.in/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Shop",
                item: "https://www.omsritara.in/shop/",
              },
            ],
          }),
        }}
      />
    </Head>
  );
}
