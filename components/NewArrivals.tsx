// 'use client';
// import React from 'react';
// import Slider from 'react-slick';
// import ProductCard from './ProductCard';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import bg from '@/public/omsritara-new-arrivalas-bg.png';
// import { useProducts } from '@/context/ProductsContext';
// import { useRouter } from 'next/navigation';
// import { useCartItem } from '@/context/CartItemContext';
// import { useWishList } from '@/context/WishListContext';
// import ProductCardSkeleton from './ProductCardSkeleton';

// const sliderSettings = {
//   dots: false,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 5,
//   slidesToScroll: 1,
//   arrows: false,
//   autoplay: true,
//   autoplaySpeed: 3000,
//   pauseOnHover: false,
//   cssEase: 'linear',
//   responsive: [
//     { breakpoint: 1024, settings: { slidesToShow: 3 } },
//     { breakpoint: 768, settings: { slidesToShow: 2 } },
//     { breakpoint: 640, settings: { slidesToShow: 2 } },
//   ],
// };

// const NewArrivals: React.FC = () => {
//   const { products, isLoading }: any = useProducts();
//   const { wishList }: any = useWishList();
//   const { cartItem }: any = useCartItem();
//   const router = useRouter();

//   const mergedProductData = React.useMemo(() => {
//     if (!products?.data) return [];

//     // Filter products by status
//     const activeProducts = products.data.filter((product: any) =>
//       product.status === true ||
//       product.status === 1 ||
//       product.status === '1' ||
//       product.status === 'true' ||
//       product.status === 'TRUE' ||
//       product.status === 'active' ||
//       product.status === 'ACTIVE'
//     );

//     // Merge cart info
//     const withCartInfo = activeProducts.map((product: any, idx: number) => {
//       const matchCart = cartItem?.data?.find(
//         (ci: any) => ci.product === product.id
//       );
//       return matchCart
//         ? {
//           ...product,
//           Aid: idx,
//           cartQty: matchCart.quantity,
//           cartId: matchCart.id,
//         }
//         : product;
//     });

//     // Merge wishlist info
//     return withCartInfo.map((prod: any) => {
//       const wish = wishList?.data?.find((w: any) => w.product === prod.id);
//       return {
//         ...prod,
//         isLike: !!wish,
//         wishListId: wish?.id,
//       };
//     });
//   }, [products, cartItem, wishList]);


//   const sortedProductData = React.useMemo(() => {
//     // Prefer created_at/updated_at if you have it; fallback to id
//     return [...mergedProductData].sort((a, b) => {
//       if (a.created_at && b.created_at) {
//         return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
//       }
//       return Number(b.id) - Number(a.id);
//     });
//   }, [mergedProductData]);

//   function slugConvert(name: string) {
//     return name
//       .toLowerCase()
//       .trim()
//       .replace(/\s+/g, '-')         // Replace spaces with hyphens
//       .replace(/[^\w-]+/g, '');     // Remove non-word characters except hyphens
//   }

//   return (
//     <section
//       className="py-2 mt-20"
//       style={{
//         backgroundImage: `url(${bg.src})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <div className="container mx-auto md:px-4 max-w-7xl">
//         <h2 className="text-4xl font-semibold text-center mb-6">
//           New Arrivals
//         </h2>
//         <p className='text-black md:mx-24 mx-12  my-4 text-center'>
//           Discover new healing crystals online — freshly charged and added weekly. Buy healing crystals online that radiate pure positive energy and natural beauty
//         </p>

//         <Slider {...sliderSettings}>
//           {isLoading
//             ? Array.from({ length: 5 }).map((_, idx) => (
//               <div key={idx} className="px-2">
//                 <ProductCardSkeleton />
//               </div>
//             ))
//             : sortedProductData.map((product: any, idx: any) => (
//               <div key={idx} className="px-2">
//                 <ProductCard
//                   image={product.image_urls[0] || ''}
//                   hoverImage={product.image_urls[1] || ''}
//                   title={product.name}
//                   price={product.price}
//                   onAddToCart={() => alert(`Add to cart: ${product.name}`)}
//                   onView={() => router.push(`/shop/${slugConvert(product?.name)}`)}
//                   onWishlist={() => alert(`Wishlist: ${product.name}`)}
//                   product={product}
//                 />
//               </div>
//             ))}
//         </Slider>
//       </div>
//     </section>
//   );
// };

// export default NewArrivals;

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useProducts } from "@/context/ProductsContext";
import { useCartItem } from "@/context/CartItemContext";
import { useWishList } from "@/context/WishListContext";
import { useRouter } from "next/navigation";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import bg from "@/public/omsritara-new-arrivalas-bg.png";
import Image from "next/image";

export default function NewArrivals() {
  const { products, isLoading }: any = useProducts();
  const { cartItem }: any = useCartItem();
  const { wishList }: any = useWishList();
  const router = useRouter();

  /* ---------------- SCREEN WIDTH ---------------- */
  // const [screenWidth, setScreenWidth] = useState(0);

  const screenWidth =
    typeof window !== "undefined" ? window.innerWidth : 1280;


  // useEffect(() => {
  //   const resize = () => setScreenWidth(window.innerWidth);
  //   resize();
  //   window.addEventListener("resize", resize);
  //   return () => window.removeEventListener("resize", resize);
  // }, []);

  /* ---------------- MERGE + FILTER + SORT (FROM OLD CODE) ---------------- */
  const mergedProductData = useMemo(() => {
    if (!products?.data) return [];

    const activeProducts = products.data.filter((product: any) =>
      product.status === true ||
      product.status === 1 ||
      product.status === "1" ||
      product.status === "true" ||
      product.status === "TRUE" ||
      product.status === "active" ||
      product.status === "ACTIVE"
    );

    const withCart = activeProducts.map((product: any) => {
      const cart = cartItem?.data?.find(
        (ci: any) => ci.product === product.id
      );
      return cart
        ? {
          ...product,
          cartQty: cart.quantity,
          cartId: cart.id,
        }
        : product;
    });

    return withCart.map((product: any) => {
      const wish = wishList?.data?.find(
        (w: any) => w.product === product.id
      );
      return {
        ...product,
        isLike: !!wish,
        wishListId: wish?.id,
      };
    });
  }, [products, cartItem, wishList]);

  const sortedProducts = useMemo(() => {
    return [...mergedProductData].sort((a, b) => {
      if (a.created_at && b.created_at) {
        return (
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
        );
      }
      return Number(b.id) - Number(a.id);
    });
  }, [mergedProductData]);

  const total = sortedProducts.length;

  /* ---------------- RESPONSIVE ---------------- */
  const getItemsPerView = (w: number) => {
    if (w < 400) return 1;
    if (w < 768) return 2;
    if (w < 1024) return 3;
    return 5;
  };

  const itemsPerView = getItemsPerView(screenWidth);
  const gap = 16;

  const containerWidth = screenWidth
    ? Math.min(screenWidth - 32, 1280)
    : 0;

  const itemWidth =
    itemsPerView > 0
      ? (containerWidth - gap * (itemsPerView - 1)) / itemsPerView
      : 0;

  /* ---------------- INDEX ---------------- */
  const [index, setIndex] = useState(0);

  /* ---------------- AUTOPLAY ---------------- */
  // useEffect(() => {
  //   if (total <= itemsPerView) return;

  //   const id = setInterval(() => {
  //     setIndex((i) => (i + 1) % total);
  //   }, 3000);

  //   return () => clearInterval(id);
  // }, [total, itemsPerView]);

  useEffect(() => {
    if (total <= itemsPerView || screenWidth < 768) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 3000);

    return () => clearInterval(id);
  }, [total, itemsPerView, screenWidth]);


  /* ---------------- TOUCH SWIPE ---------------- */
  const startX = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - startX.current;

    if (Math.abs(diff) > 50) {
      if (diff < 0 && index < total - itemsPerView) {
        setIndex((i) => i + 1);
      }
      if (diff > 0 && index > 0) {
        setIndex((i) => i - 1);
      }
    }
  };

  /* ---------------- ONLY VISIBLE PRODUCTS ---------------- */
  const visibleProducts = useMemo(() => {
    if (isLoading) return Array(itemsPerView).fill(null);
    return sortedProducts.slice(index, index + itemsPerView);
  }, [sortedProducts, index, itemsPerView, isLoading]);

  const slugConvert = (name: string) =>
    name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  /* ---------------- UI ---------------- */
  return (
    // <section
    //   className="py-2 mt-20"
    //   style={{
    //     backgroundImage: `url(${bg.src})`,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //   }}
    // >
    //   <div className="max-w-7xl mx-auto px-4">
    //     <h2 className="text-4xl font-semibold text-center mb-4">
    //       New Arrivals
    //     </h2>

    //     <p className="text-center text-black mb-8">
    //       Discover new healing crystals online — freshly charged and added weekly.
    //     </p>

    //     <div
    //       className="overflow-hidden"
    //       onTouchStart={onTouchStart}
    //       onTouchEnd={onTouchEnd}
    //     >
    //       <div className="flex">
    //         {visibleProducts.map((p: any, i: number) => (
    //           <div
    //             key={i}
    //             style={{ width: itemWidth, marginRight: gap }}
    //           >
    //             {p ? (
    //             <ProductCard
    //               image={p.image_urls[0] || ''}
    //               hoverImage={p.image_urls[1] || ''}
    //               title={p.name}
    //               price={p.price}
    //               onAddToCart={() => alert(`Add to cart: ${p.name}`)}
    //               onView={() => router.push(`/shop/${slugConvert(p?.name)}`)}
    //               onWishlist={() => alert(`Wishlist: ${p.name}`)}
    //               product={p}
    //             />
    //             ) : (
    //               <ProductCardSkeleton />
    //             )}
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="relative mt-20 min-h-[520px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={bg}
        alt="New Arrivals Background"
        fill
        priority={false}          // ❌ NOT priority (important)
        sizes="100vw"
        className="object-cover"
        unoptimized 
      />

      {/* Overlay (optional for text readability) */}
      <div className="absolute inset-0 bg-white/80"></div>

      {/* CONTENT */}
      <div className="relative z-10 min-h-[520px] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4">
            New Arrivals
          </h2>

          <p className="text-center text-black mb-8">
            Discover new healing crystals online — freshly charged and added weekly.
          </p>

          <div
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="flex">
              {visibleProducts.map((p: any, i: number) => (
                <div
                  key={i}
                  style={{ width: itemWidth, marginRight: gap }}
                >
                  {p ? (
                    <ProductCard
                      image={p.image_urls[0] || ""}
                      hoverImage={p.image_urls[1] || ""}
                      title={p.name}
                      price={p.price}
                      onAddToCart={() => alert(`Add to cart: ${p.name}`)}
                      onView={() => router.push(`/shop/${slugConvert(p?.name)}`)}
                      onWishlist={() => alert(`Wishlist: ${p.name}`)}
                      product={p}
                    />
                  ) : (
                    <ProductCardSkeleton />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}
