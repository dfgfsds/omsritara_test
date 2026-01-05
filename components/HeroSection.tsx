'use client';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import { baseUrl } from '@/api-endpoints/ApiUrls';
import { useVendor } from '@/context/VendorContext';
import Image from 'next/image';

// export default function HeroSection() {
export default function HeroSection({ banners }: any) {
  const router = useRouter();
  // const { vendorId } = useVendor();
  // const [banners, setBanners] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  // Fetch banners
  // const bannerGetApi = async () => {
  //   try {
  //     const res = await axios.get(`${baseUrl}/banners/?vendorId=63`);
  //     if (res.data?.banners) {
  //       setBanners(res.data.banners);
  //     } else {
  //       console.warn('Unexpected API response:', res.data);
  //     }
  //   } catch (error) {
  //     console.log('Error fetching banners:', error);
  //   }
  // };

  // useEffect(() => {
  //   bannerGetApi();
  // }, []);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  if (!banners?.length) return null;

  if (isMobile === null) return null;

  // Filter banners based on type
  const filteredBanners = banners?.filter(banner =>
    isMobile ? banner.type === 'Mobile View' : banner.type === 'Web View'
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: false,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
    appendDots: (dots: React.ReactNode) => (
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <ul className="flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="dot w-2 h-2 bg-gray-300 rounded-full transition-all duration-300" />
    ),
  };

  const handleBannerClick = (banner: any) => {
    const url = banner?.target_url;
    if (!url) return;

    // Check if the URL is external (starts with http:// or https://)
    if (url.startsWith("http://") || url.startsWith("https://")) {
      // open in new tab
      window.open(url, "_blank");
    } else {
      // internal route → same tab navigation
      router.push(url);
    }
  };

  return (
    <div className="z-10 md:h-[70vh] rounded-lg md:px-10 md:py-4">
      <Slider {...settings}>
        {filteredBanners?.map((banner:any, index:number) => (
          <div
            key={banner.id}
            onClick={() => handleBannerClick(banner)}
            className="cursor-pointer"
          >
            {/* <img
              className="md:rounded-lg md:object-cover w-full h-[70vh] md:h-auto"
              src={banner.image_url}
              alt={banner.title || 'banner'}
            /> */}
            <section className="relative w-full h-[70vh] rounded-lg">
              <Image
                src={banner?.image_url}
                alt={banner?.title || "Omsritara Banner"}
                fill
                priority          // 🚀 LCP FIX
                sizes="100vw"
                className="md:rounded-lg md:object-cover"
              // onClick={() => hero.target_url && router.push(hero.target_url)}
              />
            </section>
          </div>
        ))}
      </Slider>
    </div>
  );
}
