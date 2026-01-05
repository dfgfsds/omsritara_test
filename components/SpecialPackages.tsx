// 'use client';
// import React from 'react';
// import Slider from 'react-slick';
// import ProductCard from './ProductCard';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { useProducts } from '@/context/ProductsContext';
// import { useRouter } from 'next/router';
// import { useCartItem } from '@/context/CartItemContext';
// import { useWishList } from '@/context/WishListContext';
// import ProductCardSkeleton from './ProductCardSkeleton';


// const sliderSettings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     arrows: false,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: false,
//     cssEase: 'linear',

//     responsive: [
//         { breakpoint: 1024, settings: { slidesToShow: 3 } },
//         { breakpoint: 768, settings: { slidesToShow: 2 } },
//         { breakpoint: 640, settings: { slidesToShow: 2 } },
//     ],
// };


// const Bracelets: React.FC = () => {

//     const { products, isAuthenticated, isLoading }: any = useProducts();
//     const { wishList, wishListLoading }: any = useWishList();


//     const router = useRouter();
//     const { cartItem }: any = useCartItem();

//     // const matchingProductsArray = products?.data?.map((product: any, index: number) => {
//     //     const matchingCartItem = cartItem?.data?.find(
//     //         (item: any) => item?.product === product?.id
//     //     );

//     //     if (matchingCartItem) {
//     //         return {
//     //             ...product,
//     //             Aid: index,
//     //             cartQty: matchingCartItem?.quantity,
//     //             cartId: matchingCartItem.id,
//     //         };
//     //     }
//     //     return product;
//     // });


//     // const finalProductData = matchingProductsArray?.map((item: any) => {
//     //     const wishLists = wishList?.data?.find(
//     //         (wish: any) => wish?.product === item?.id
//     //     );
//     //     return {
//     //         ...item,
//     //         isLike: wishLists ? true : false,
//     //         wishListId: wishLists?.id
//     //     };
//     // });

//     // Filter products with status true
//     const activeProducts = products?.data?.filter((product: any) =>
//         product.status === true ||
//         product.status === 1 ||
//         product.status === '1' ||
//         product.status === 'true' ||
//         product.status === 'TRUE' ||
//         product.status === 'active' ||
//         product.status === 'ACTIVE'
//     );

//     // Merge cart info
//     const matchingProductsArray = activeProducts?.map((product: any, index: number) => {
//         const matchingCartItem = cartItem?.data?.find(
//             (item: any) => item?.product === product?.id
//         );

//         if (matchingCartItem) {
//             return {
//                 ...product,
//                 Aid: index,
//                 cartQty: matchingCartItem?.quantity,
//                 cartId: matchingCartItem.id,
//             };
//         }
//         return product;
//     });

//     // Merge wishlist info
//     const finalProductData = matchingProductsArray?.map((item: any) => {
//         const wishLists = wishList?.data?.find(
//             (wish: any) => wish?.product === item?.id
//         );
//         return {
//             ...item,
//             isLike: !!wishLists,
//             wishListId: wishLists?.id
//         };
//     });

//     const braceletId = "204";
//     const pendulumsId = "290";

//     const braceletsData = finalProductData?.filter(
//         (product: any) => product.category?.toString() === braceletId
//     );

//     const pendulumsData = finalProductData?.filter(
//         (product: any) => product.category?.toString() === pendulumsId
//     );

//     function slugConvert(name: string) {
//         return name
//             .toLowerCase()
//             .trim()
//             .replace(/\s+/g, '-')         // Replace spaces with hyphens
//             .replace(/[^\w-]+/g, '');     // Remove non-word characters except hyphens
//     }

//     return (
//         <section className="mt-6">
//             <div className="container mx-auto md:px-4 max-w-7xl">
//                 <h2 className="text-4xl font-semibold text-center  mb-8">Bracelets</h2>
//                 <p className='text-black md:mx-24 mx-12  my-4 text-center'>
//                     Wear your healing power daily with our Reiki-charged crystal bracelets — crafted to balance your chakras and uplift your spirit.
//                 </p>
//                 <Slider {...sliderSettings}>
//                     {isLoading
//                         ? Array.from({ length: 5 }).map((_, idx) => (
//                             <div key={idx} className="px-2">
//                                 <ProductCardSkeleton />
//                             </div>
//                         ))
//                         : braceletsData?.slice(0, 8)?.map((product: any, idx: any) => (
//                             <div key={idx} className="px-2">
//                                 <ProductCard
//                                     image={product.image_urls[0] || ''}
//                                     hoverImage={product.image_urls[1] || ''}
//                                     title={product.name}
//                                     price={product.price}
//                                     onAddToCart={() => alert(`Add to cart: ${product.name}`)}
//                                     onView={() => router.push(`/shop/${slugConvert(product?.name)}`)}
//                                     onWishlist={() => alert(`Wishlist: ${product.name}`)}
//                                     product={product}
//                                 />
//                             </div>
//                         ))}
//                 </Slider>
//             </div>
//             <div className="container mx-auto px-4 max-w-7xl">
//                 <h2 className="text-4xl font-semibold text-center mt-6 mb-8">Pendulums</h2>
//                 <p className='text-black md:mx-24 mx-12  my-4 text-center'>
//                     Shop high-vibration crystal pendulums online for Reiki, dowsing, and energy work — each piece cleansed and attuned by Om Sritara experts.
//                 </p>
//                 <Slider {...sliderSettings}>
//                     {isLoading
//                         ? Array.from({ length: 5 }).map((_, idx) => (
//                             <div key={idx} className="px-2">
//                                 <ProductCardSkeleton />
//                             </div>
//                         ))
//                         : pendulumsData?.slice(0, 8)?.map((product: any, idx: any) => (
//                             <div key={idx} className="px-2">
//                                 <ProductCard
//                                     image={product.image_urls[0] || ''}
//                                     hoverImage={product.image_urls[1] || ''}
//                                     title={product.name}
//                                     price={product.price}
//                                     onAddToCart={() => alert(`Add to cart: ${product.name}`)}
//                                     onView={() => router.push(`/shop/${slugConvert(product?.name)}`)}
//                                     onWishlist={() => alert(`Wishlist: ${product.name}`)}
//                                     product={product}
//                                 />
//                             </div>
//                         ))}
//                 </Slider>
//             </div>
//         </section>
//     );
// };

// export default Bracelets;
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useProducts } from "@/context/ProductsContext";
import { useCartItem } from "@/context/CartItemContext";
import { useWishList } from "@/context/WishListContext";
import { useRouter } from "next/navigation";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

/* ================== REUSABLE SLIDER ================== */

function ProductSlider({
    title,
    description,
    products,
    isLoading,
}: {
    title: string;
    description: string;
    products: any[];
    isLoading: boolean;
}) {
    const router = useRouter();

    /* ---------- SCREEN WIDTH ---------- */
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const resize = () => setWidth(window.innerWidth);
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    /* ---------- RESPONSIVE COUNT ---------- */
    const getItemsPerView = (w: number) => {
        if (w < 400) return 1;
        if (w < 768) return 2;
        if (w < 1024) return 3;
        return 5;
    };

    const itemsPerView = getItemsPerView(width);
    const gap = 16;
    const containerWidth = width ? Math.min(width - 32, 1280) : 0;
    const itemWidth =
        (containerWidth - gap * (itemsPerView - 1)) / itemsPerView;

    /* ---------- INDEX ---------- */
    const total = products.length;
    const [index, setIndex] = useState(0);

    /* ---------- AUTOPLAY ---------- */
    useEffect(() => {
        if (total <= itemsPerView) return;
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % (total - itemsPerView + 1));
        }, 3000);
        return () => clearInterval(id);
    }, [total, itemsPerView]);

    /* ---------- SWIPE ---------- */
    const startX = useRef(0);

    const onTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        const diff = e.changedTouches[0].clientX - startX.current;
        if (Math.abs(diff) > 50) {
            if (diff < 0 && index < total - itemsPerView) setIndex(index + 1);
            if (diff > 0 && index > 0) setIndex(index - 1);
        }
    };

    /* ---------- ONLY VISIBLE PRODUCTS ---------- */
    const visibleProducts = useMemo(() => {
        if (isLoading) return Array(itemsPerView).fill(null);
        return products.slice(index, index + itemsPerView);
    }, [products, index, itemsPerView, isLoading]);

    const slugConvert = (n: string) =>
        n.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

    return (
        <div className="container mx-auto px-4 max-w-7xl mt-10">
            <h2 className="text-4xl font-semibold text-center mb-4">{title}</h2>
            <p className="text-black md:mx-24 mx-6 my-4 text-center">
                {description}
            </p>

            <div
                className="overflow-hidden"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                <div className="flex transition-transform duration-300 ease-out">
                    {visibleProducts.map((product: any, i: number) => (
                        <div key={i} style={{ width: itemWidth, marginRight: gap }}>
                            {product ? (
                                <ProductCard
                                    image={product.image_urls[0] || ''}
                                    hoverImage={product.image_urls[1] || ''}
                                    title={product.name}
                                    price={product.price}
                                    onAddToCart={() => alert(`Add to cart: ${product.name}`)}
                                    onView={() => router.push(`/shop/${slugConvert(product?.name)}`)}
                                    onWishlist={() => alert(`Wishlist: ${product.name}`)}
                                    product={product}
                                />
                            ) : (
                                <ProductCardSkeleton />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ================== MAIN PAGE ================== */

export default function Bracelets() {
    const { products, isLoading }: any = useProducts();
    const { cartItem }: any = useCartItem();
    const { wishList }: any = useWishList();

    /* ---------- MERGE LOGIC (FROM react-slick CODE) ---------- */
    const finalProducts = useMemo(() => {
        if (!products?.data) return [];

        const active = products.data.filter(
            (p: any) =>
                p.status === true ||
                p.status === 1 ||
                p.status === "1" ||
                p.status === "true" ||
                p.status === "TRUE" ||
                p.status === "active" ||
                p.status === "ACTIVE"
        );

        const withCart = active.map((p: any, idx: number) => {
            const cart = cartItem?.data?.find((c: any) => c.product === p.id);
            return cart
                ? { ...p, Aid: idx, cartQty: cart.quantity, cartId: cart.id }
                : p;
        });

        return withCart.map((p: any) => {
            const wish = wishList?.data?.find((w: any) => w.product === p.id);
            return { ...p, isLike: !!wish, wishListId: wish?.id };
        });
    }, [products, cartItem, wishList]);

    /* ---------- CATEGORY FILTER ---------- */
    const braceletsData = finalProducts.filter(
        (p: any) => p.category?.toString() === "204"
    );

    const pendulumsData = finalProducts.filter(
        (p: any) => p.category?.toString() === "290"
    );

    if (isLoading) {
        return (
            <div className="container mx-auto max-w-7xl px-4 flex gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    return (
        <section className="mt-6">
            <ProductSlider
                title="Bracelets"
                description="Wear your healing power daily with our Reiki-charged crystal bracelets — crafted to balance your chakras and uplift your spirit."
                products={braceletsData}
                isLoading={isLoading}
            />

            <ProductSlider
                title="Pendulums"
                description="Shop high-vibration crystal pendulums online for Reiki, dowsing, and energy work — each piece cleansed and attuned by Om Sritara experts."
                products={pendulumsData}
                isLoading={isLoading}
            />
        </section>
    );
}
