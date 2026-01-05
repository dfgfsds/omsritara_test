"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useProducts } from "@/context/ProductsContext";
import { useCurrency } from "@/context/CurrencyContext";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import LoginModal from "../LoginModal/page";
import { useVendor } from "@/context/VendorContext";
import { deleteCartitemsApi, postCartitemApi, postNewCartitemWithQtyApi, updateCartitemsApi } from "@/api-endpoints/CartsApi";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Script from "next/script";
import { CheckCircle, Sparkles } from "lucide-react";
import Head from "next/head";


export default function ComboOffers() {
    const { products, isLoading }: any = useProducts();
    const { convertPrice } = useCurrency();
    const [signInmodal, setSignInModal] = useState<boolean>(false);
    const { vendorId } = useVendor();
    const [getUserId, setUserId] = useState<string | null>(null);
    const [getCartId, setCartId] = useState<string | null>(null);
    const [getUserName, setUserName] = useState<string | null>(null);
    const queryClient = useQueryClient();
    const [timeLeft, setTimeLeft] = useState("");


    useEffect(() => {
        // 🎯 Automatically set target date to 3 days from now
        const target = new Date();
        target.setDate(target.getDate() + 3);

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const end = target.getTime();
            const distance = end - now;

            if (distance <= 0) {
                clearInterval(interval);
                setTimeLeft("Offer ended");
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            let formatted = "";
            if (days > 0) formatted += `${days}d `;
            formatted += `${hours}h ${minutes}m ${seconds}s`;

            setTimeLeft(formatted);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // ✅ Store quantity per product
    const [quantities, setQuantities] = useState<Record<number, number>>({});

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        const storedCartId = localStorage.getItem("cartId");
        const storedUserName = localStorage.getItem("userName");
        setUserId(storedUserId);
        setCartId(storedCartId);
        setUserName(storedUserName);
    }, []);

    const handleAddCart = async (productId: any) => {
        const quantity = quantities[productId] || 1;
        const payload = {
            cart: getCartId,
            product: productId,
            user: getUserId,
            vendor: vendorId,
            quantity,
            created_by: getUserName ? getUserName : "user",
        };
        try {
            const response = await postNewCartitemWithQtyApi(``, payload);

            if (response) {
                toast.success("Product added to cart!");
                queryClient.invalidateQueries(['getProductData'] as InvalidateQueryFilters);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // ✅ Functions to modify quantity per product
    const increaseQuantity = (id: number) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: (prev[id] || 1) + 1,
        }));
    };

    const decreaseQuantity = (id: number) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(1, (prev[id] || 1) - 1),
        }));
    };

    // ✅ Define only the products you want, in desired order
    const comboProductOrder: Record<number, number> = {
        19642: 1,
        19643: 2,
        19644: 3,
    };

    // ✅ Filter only matching products and sort by the given position
    const comboProducts = products?.data
        ?.filter((p: any) => comboProductOrder[p.id]) // only keep listed IDs
        ?.sort(
            (a: any, b: any) => comboProductOrder[a.id] - comboProductOrder[b.id]
        );

    const features = [
        "Encourage emotional balance and self-love",
        "Invite positivity and deeper connection in relationships",
        "Surround yourself with calm and uplifting energy"
    ];

    const benefits = [
        "Encourages feelings of love, peace, and harmony",
        "Inspires understanding and compassion in relationships",
        "Promotes relaxation and emotional clarity",
        "Creates a soothing and positive atmosphere",
        "Carries Tara Amma’s blessings and positive intentions",
    ];

    const perfectFor = [
        "Anyone seeking love, peace & harmony",
        "Those wishing to strengthen relationships",
        "People healing from emotional stress",
        "Anyone inviting positivity & joy daily",
        "Spiritual or meditation lovers",
        "A thoughtful gift for someone special",
    ];

    const kits = [
        { name: "Love Box ", price: "₹999" },
        { name: "Marriage Blessing Box", price: "₹1999" },
        { name: "Magnetic Energy Box ", price: "₹2499" },
    ];



    return (
        <>
            <Head>
                {/* ✅ Google Ads Tag (gtag.js) */}
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=AW-16600190683"
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
             gtag('config', 'AW-16600190683');
          `,
                    }}
                />


                {/* ✅ Facebook Meta Pixel Code */}
                <script
                    id="facebook-pixel-checkout"
                    dangerouslySetInnerHTML={{
                        __html: `
           !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1361054118856512');
            fbq('track', 'PageView');
          `,
                    }}
                />
                <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{ display: "none" }}
                        src="https://www.facebook.com/tr?id=1361054118856512&ev=PageView&noscript=1"
                    />
                </noscript>



            </Head>
            <div className="p-4 sm:p-6 bg-gradient-to-b from-pink-100 via-white to-pink-50 min-h-screen">

                <div className=" text-center py-6 px-6 md:px-16">
                    <div className="max-w-4xl mx-auto">
                        {/* Heading */}
                        <h1 className="text-3xl md:text-5xl font-bold text-pink-800 mb-4">
                            Welcome to <span className="text-pink-600">Om Sri Tara</span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-lg md:text-xl text-gray-700 mb-6">
                            Your Path to <span className="text-pink-700 font-semibold">Divine Energy</span> Begins Here
                        </p>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            Discover <span className="font-medium text-pink-700">crystals, energy tools, </span>
                            and <span className="font-medium text-pink-700">divine healing products</span> to attract abundance,
                            balance your aura, and align your energy with the cosmic power.
                        </p>

                        {/* Decorative Divider */}
                        <div className="mt-10 flex justify-center">
                            <div className="h-1 w-24 bg-pink-400 rounded-full animate-pulse"></div>
                        </div>
                        {/* <h2 className="text-2xl font-bold mb-6 text-center">Explore your Combo Offers!</h2> */}
                    </div>
                </div>

                <div className="flex flex-col gap-6 max-w-7xl mx-auto">
                    {isLoading ? (
                        // 🔥 Shimmer Loader (Responsive)
                        <div>
                            {[1, 2, 3].map((n) => (
                                <div
                                    key={n}
                                    className="relative flex flex-col md:flex-row bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden animate-pulse"
                                >
                                    {/* Image Skeleton */}
                                    <div className="w-full md:w-1/3 aspect-square bg-gray-200"></div>

                                    {/* Content Skeleton */}
                                    <div className="flex flex-col justify-between p-5 w-full md:w-2/3 space-y-3">
                                        <div>
                                            <div className="h-5 w-2/3 bg-gray-200 rounded mb-2"></div>
                                            <div className="h-3 w-1/3 bg-gray-200 rounded mb-3"></div>
                                            <div className="flex gap-3 mb-4">
                                                <div className="h-6 w-20 bg-gray-200 rounded"></div>
                                                <div className="h-6 w-16 bg-gray-200 rounded"></div>
                                                <div className="h-6 w-12 bg-gray-200 rounded"></div>
                                            </div>
                                            <div className="h-16 w-full bg-gray-200 rounded"></div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div className="h-8 w-32 bg-gray-200 rounded"></div>
                                            <div className="h-10 w-40 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // ✅ Actual Product Cards
                        comboProducts?.map((product: any) => (
                            <div
                                key={product.id}
                                className="relative flex flex-col md:flex-row bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] transition-all duration-300 overflow-hidden border border-gray-100"
                            >

                                {/* 🖼️ Image Section */}
                                <div className="w-full md:w-1/3 relative flex-shrink-0 aspect-[4/3] sm:aspect-square">
                                    {product?.image_urls?.length > 1 ? (
                                        <Slider
                                            dots={false}
                                            infinite={true}
                                            speed={500}
                                            slidesToShow={1}
                                            slidesToScroll={1}
                                            arrows={false}
                                            autoplay={true}
                                            autoplaySpeed={2500}
                                            className="h-full"
                                        >
                                            {product.image_urls.map((img: string, index: number) => (
                                                <div key={index} className="relative w-full h-full aspect-square">
                                                    <Image
                                                        src={img}
                                                        alt={`${product.name}-${index}`}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 768px) 100vw, 33vw"
                                                    />
                                                </div>
                                            ))}
                                        </Slider>
                                    ) : (
                                        <Image
                                            src={product?.image_urls?.[0]}
                                            alt={product.name}
                                            fill
                                            className="object-cover rounded-t-lg sm:rounded-none"
                                            sizes="(max-width: 768px) 90vw, 33vw"
                                        />
                                    )}
                                </div>

                                {/* 🧾 Content Section */}
                                <div className="flex flex-col justify-between p-5 w-full md:w-2/3">
                                    <div>
                                        <h3 className="text-2xl font-semibold mb-1 text-gray-800">{product?.name}</h3>
                                        <p className="text-gray-500 text-sm mb-3 italic">
                                            Hurry up! Limited stock available ⚡
                                        </p>

                                        <div className="flex gap-3 items-center mb-4">
                                            <div className="text-2xl font-bold text-red-600">
                                                {convertPrice(Number(product?.price))}
                                            </div>
                                            <div className="text-lg font-semibold text-gray-400 line-through">
                                                {convertPrice(Number(product?.discount))}
                                            </div>
                                            <div className="text-sm text-green-600 font-bold bg-green-50 px-2 py-1 rounded">
                                                Save{" "}
                                                {Math.round(
                                                    ((product?.discount - product?.price) / product?.discount) * 100
                                                )}
                                                %
                                            </div>
                                        </div>

                                        <div
                                            className="text-gray-700 text-sm prose max-w-none mb-1"
                                            dangerouslySetInnerHTML={{ __html: product?.description }}
                                        />
                                    </div>

                                    {/* Quantity + Cart Section */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div className="flex items-center gap-2 mb-4 text-sm text-red-600 font-semibold">
                                            ⏰ Offer ends in:
                                            <span className="bg-red-100 px-2 py-1 rounded">{timeLeft}</span>
                                        </div>
                                        <div className="flex items-center border rounded-lg overflow-hidden w-full sm:w-[180px]">
                                            <button
                                                className="h-10 w-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
                                                onClick={() => decreaseQuantity(product.id)}
                                                disabled={(quantities[product.id] || 1) <= 1}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>

                                            <div className="flex-1 h-10 flex items-center justify-center font-medium text-gray-800">
                                                {quantities[product.id] || 1}
                                            </div>

                                            <button
                                                className="h-10 w-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition"
                                                onClick={() => increaseQuantity(product.id)}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>

                                        <button
                                            className="bg-gradient-to-r from-pink-500 to-pink-700 w-full sm:w-[180px] text-white px-5 py-2 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2 font-semibold"
                                            onClick={() => {
                                                // ✅ Fire the Lead event
                                                if (typeof window !== "undefined" && (window as any).fbq) {
                                                    (window as any).fbq("track", "Lead");
                                                }

                                                // 🛒 Your existing add-to-cart logic
                                                if (getUserId) {
                                                    handleAddCart(product?.id);
                                                } else {
                                                    setSignInModal(true);
                                                }
                                            }}
                                        >
                                            <ShoppingCart size={18} /> Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <section className="bg-gradient-to-b from-pink-50 via-white to-pink-100 py-20 px-6 md:px-16">
                    <div className="max-w-6xl mx-auto text-center">
                        {/* Header */}
                        <h2 className="text-3xl md:text-5xl font-bold text-pink-800 mb-4 transition-all duration-500">
                            Why Choose <span className="text-pink-600">Om Sri Tara</span>
                        </h2>

                        <p className="text-gray-600 max-w-3xl mx-auto mb-10">
                            Each Love Divine Combo is carefully curated to support your emotional wellness and help you stay connected to loving and peaceful vibrations
                        </p>

                        {/* Features */}
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                            {features.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-start bg-white shadow-md rounded-2xl p-5 border border-pink-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                >
                                    <CheckCircle className="text-pink-500 mt-1 mr-3 flex-shrink-0" size={22} />
                                    <p className="text-gray-700 text-sm">{item}</p>
                                </div>
                            ))}
                        </div>

                        {/* Mission */}
                        <p className="text-gray-700 mb-16 text-lg font-medium">
                            Each kit is more than a product — it’s a gentle spiritual experience that helps you stay grounded in love and emotional balance.
                        </p>

                        {/* Benefits */}
                        <div className="mb-16">
                            <h3 className="text-2xl font-semibold text-pink-700 mb-4 flex justify-center items-center gap-2">
                                <Sparkles className="text-pink-500" /> Benefits of These Energy Kits
                            </h3>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {benefits.map((item, i) => (
                                    <div
                                        key={i}
                                        className="bg-white border border-pink-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <p className="text-gray-700 text-sm">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Perfect For */}
                        <div className="mb-20">
                            <h3 className="text-2xl font-semibold text-pink-700 mb-4">
                                Perfect For:
                            </h3>
                            <div className="flex flex-wrap justify-center gap-3">
                                {perfectFor.map((item, i) => (
                                    <span
                                        key={i}
                                        className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium border border-pink-200 hover:bg-pink-200 hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Grand Launch Offer */}
                        <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-10 rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl">
                            <h3 className="text-2xl font-bold mb-6">
                                🎁 Grand Launch Exclusive Offer
                            </h3>
                            <div className="grid sm:grid-cols-3 gap-6 mb-6">
                                {kits.map((kit, i) => (
                                    <div
                                        key={i}
                                        className="bg-white text-pink-800 rounded-2xl shadow-md p-6 border border-pink-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                                    >
                                        <p className="font-semibold text-lg mb-1">{kit.name}</p>
                                        <p className="text-pink-600 font-bold text-xl">{kit.price}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-white/90 max-w-2xl mx-auto mb-6">
                                Each box is energized for 3 days by <span className="font-bold ">Guru Matha Tara</span> with divine intention and spiritual blessings.
                            </p>
                        </div>

                        {/* Footer Note */}
                        <p className="text-gray-700 mt-12 text-sm italic">
                            Your transformation begins with awareness, belief, and aligned action.
                        </p>
                    </div>
                </section>

                {/* Login Modal */}
                {signInmodal && (
                    <LoginModal
                        open={signInmodal}
                        handleClose={() => setSignInModal(false)}
                        vendorId={vendorId}
                    />
                )}
            </div>
        </>
    );
}