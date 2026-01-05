'use client';

import { useCategories } from '@/context/CategoriesContext';
import { slugConvert } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import logo from '@/public/logo.png';

export default function CategoriesPage() {


    const { categories }: any = useCategories();


      // Dynamic OG Image Logic (first category image or fallback)
      const dynamicOgImage =
    categories?.data?.[0]?.image ||
    "https://omsritara.in/assets/images/og-category.jpg";

    return (
        <>
         <Head>
        <title>Healing Crystals & Spiritual Products by Category | Om SriTara</title>

        <meta
          name="description"
          content="Shop authentic healing crystals, rings, pendants, malas, yanthirams, angel tools, pyramids & spiritual statues at Om SriTara. All products are cleansed, spiritually energized & Reiki charged for divine healing."
        />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="Om SriTara" />

        {/* Canonical */}
        <link rel="canonical" href="https://www.omsritara.in/categories" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Healing Crystals & Spiritual Products by Category | Om SriTara"
        />
        <meta
          property="og:description"
          content="Explore healing crystals, malas, yanthirams, angel tools, pyramids & spiritual statues – all Reiki charged & spiritually energized for divine healing."
        />
        <meta property="og:url" content="https://www.omsritara.in/categories" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={dynamicOgImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Healing Crystals & Spiritual Products by Category | Om SriTara"
        />
        <meta
          name="twitter:description"
          content="Shop Reiki charged healing crystals, malas, yanthirams, angel tools, pyramids & spiritual statues for divine healing & protection."
        />
        <meta name="twitter:image" content={dynamicOgImage} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Healing Crystals & Spiritual Products by Category | Om SriTara",
              url: "https://www.omsritara.in/categories",
              description:
                "Shop authentic healing crystals, rings, pendants, malas, yanthirams, angel tools, pyramids & spiritual statues at Om SriTara. All products are cleansed, spiritually energized & Reiki charged for divine healing.",
              inLanguage: "en-IN",
              isPartOf: {
                "@type": "Website",
                name: "Om SriTara",
                url: "https://omsritara.in",
              },
              publisher: {
                "@type": "Organization",
                name: "Om SriTara",
                url: "https://omsritara.in",
                logo: {
                  "@type": "ImageObject",
                  url:  `https://www.omsritara.in/${logo.src}`,
                },
              },
              image: dynamicOgImage,
              breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://omsritara.in",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Categories",
                    item: "https://www.omsritara.in/categories",
                  },
                ],
              },
              mainEntity: [
                {
                  "@type": "ItemList",
                  name: "Product Categories",
                  itemListElement: categories?.data?.map((item: any) => ({
                    "@type": "Thing",
                    name: item?.name,
                  })),
                },
              ],
            }),
          }}
        />
      </Head>
   
        <div className="bg-white">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold mb-4 mt-3">Shop by Category</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Browse our collection of sustainable and eco-friendly products organized by category.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {categories?.data?.map((category: any) => (
                        <Link
                            href={`/categories/${slugConvert(category?.name)}`}
                            key={category?.id}
                            className="relative group overflow-hidden rounded-md shadow hover:shadow-lg transition"
                        >
                            {/* Background Image */}
                            <div className="aspect-[4/3] w-full overflow-hidden">
                                {category?.image && (
                                    <Image
                                        src={category?.image || 'https://semantic-ui.com/images/wireframe/image.png'}
                                        alt={category?.name || 'Category'}
                                        className="h-full w-full object-cover  transition-transform duration-500"
                                        width={300}
                                        height={288}
                                    />
                                )}

                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

                            {/* Text */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-white text-2xl font-bold uppercase tracking-wide text-center px-4">
                                    {category?.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
             </>
    );
}
