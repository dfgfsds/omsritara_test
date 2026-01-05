'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Heart, ShoppingCart, Eye, ArrowLeft, Minus, Plus, ShoppingBasket, ArrowBigRight, ArrowBigRightDash, ArrowRight } from 'lucide-react';
import { InvalidateQueryFilters, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductApi, getProductVariantCartItemUpdate } from '@/api-endpoints/products';
import { useProducts } from '@/context/ProductsContext';
import ProductCard from '@/components/ProductCard';
import { useEffect, useRef, useState } from 'react';
import { useCartItem } from '@/context/CartItemContext';
import { deleteCartitemsApi, getAddressApi, getCartApi, postApplyCouponApi, postCartCreateApi, postCartitemApi, postPaymentApi, updateCartitemsApi } from '@/api-endpoints/CartsApi';
import { useVendor } from '@/context/VendorContext';
import { useCurrency } from '@/context/CurrencyContext';
import LoginModal from '@/pages/LoginModal/page';
import toast from 'react-hot-toast';
import ProductGallery from '@/pages/shop/[slug]/ProductGallery';
import SkeletonProduct from '@/components/SkeletonProduct';
import axios from 'axios';
import { useUser } from '@/context/UserContext';
import { getDeliveryChargeApi, patchUserSelectAddressAPi, postCreateUserAPi } from '@/api-endpoints/authendication';
import { useForm } from 'react-hook-form';
import addresses, { baseUrl } from "../../../api-endpoints/ApiUrls"
import Head from 'next/head';

export default function ProductLandingPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params?.slug;
    const { products, isAuthenticated, isLoading }: any = useProducts();
    const queryClient = useQueryClient();
    const { vendorId } = useVendor();
    const [selectedVariant, setSelectedVariant] = useState<any | null>(
        products?.variants && products?.variants?.length > 0 ? products?.variants[0] : null
    );
    const [mobileModal, setMobileModal] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');
    const [loadingMobile, setLoadingMobile] = useState(false);
    const [signInmodal, setSignInModal] = useState<boolean>(false);
    const [localQty, setLocalQty] = useState<number>(1);
    const { convertPrice } = useCurrency();
    const { setUser, user }: any = useUser();
    const [DeliveryChargeValue, setDeliveryChargeValue] = useState<any>();
    const [selectedAddressId, setSelectedAddressId] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<any>();
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [userId, setUserId] = useState<any>(null);
    const [cartId, setCartId] = useState<string | null>(null);
    const { register, handleSubmit, setValue, reset, watch, clearErrors, formState: { errors } } = useForm();
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [userExists, setUserExists] = useState<any>(null); // null initially
    const [registeringUserData, setRegisteringUserData] = useState<any>(null); // to hold values from address form
    const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

    const inputClass = "w-full border border-gray-300 px-4 py-1 rounded";


    if (!userExists) {
        setValue('contact_number', mobileNumber)
    }

    const pincode = watch('postal_code');


    useEffect(() => {
        const fetchAddressByPincode = async () => {
            if (pincode && pincode.length === 6) {
                try {
                    const res = await axios.get(`${baseUrl}/pincode/?pincode=${pincode}`);
                    if (res.data.success) {
                        const { district_name, state_name } = res.data.pincode;
                        setValue('city', district_name);
                        setValue('state', state_name);
                        clearErrors(['state', 'city']);
                    }
                } catch (err) {
                    console.error('Error fetching district/state:', err);
                }
            }
        };

        fetchAddressByPincode();
    }, [pincode, setValue]);

    console.log(slug, "slug");


    function slugConvert(name: string) {
        return name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')         // Replace spaces with hyphens
            .replace(/[^\w-]+/g, '');     // Remove non-word characters except hyphens
    }
    const productDetails = products?.data?.find((item: any) => slugConvert(item.name) === slug);

    const handleAddCart = async (id: any, qty: any) => {
        const payload = {
            cart: localStorage.getItem('cartId') ? Number(localStorage.getItem('cartId')) : '',
            product: id,
            user: localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : '',
            vendor: vendorId,
            quantity: qty,
            created_by: localStorage.getItem('userName') ? localStorage.getItem('userName') : 'user'
        }
        try {
            // const response = await postCartitemApi(``, payload)
            const response = await axios.post(`${baseUrl}/api/cart_items/`, payload)
            if (response) {
                // toast.success('Product added in cart!')
                queryClient.invalidateQueries(['getProductData'] as InvalidateQueryFilters);
            }
        } catch (error: any) {
            console.log(error?.response);
            toast.error(error?.response?.data?.message || 'Something went wrong!')

        }
    }


    const handleMobileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingMobile(true);
        try {
            const response = await axios.get(
                `${baseUrl}/get-user-by-email-or-contact-role-vendor-id/`,
                {
                    params: {
                        vendorId,
                        contactNumber: mobileNumber,
                        roleName: 'User'
                    }
                }
            );
            const data = response.data;

            if (data?.user) {
                setUser(data?.user);
                setUserId(data?.user?.id);
                setUserExists(true);
                // toast.success('User found!');
                localStorage.setItem('userId', data?.user?.id);
                localStorage.setItem('userName', data?.user?.name);
                localStorage.setItem('contact_number', data?.user?.contact_number);
                const updateApi = await getCartApi(`user/${data?.user?.id}/`);
                if (updateApi) {
                    localStorage.setItem('cartId', updateApi?.data[0]?.id);
                }
                // ✅ Add to cart right after user is verified
                await handleAddCart(productDetails?.id, localQty);
                await handleCouponSubmit({ preventDefault: () => { } });
                setMobileModal(false);
                setShowAddressModal(true);
                fetchCartAndDeliveryCharge();
                // optionally store or redirect or call next step
            } else {
                // toast.error('No user found!');
                setUserExists(false); // <- important
                setShowAddressModal(true); // open address form
            }
        } catch (error) {

            // toast.error(error?.response?.data?.message || 'API error');
            console.error(error);
            setUserExists(false);
            // Add details form button
            setMobileModal(false);
            setShowAddressModal(true);
        } finally {
            setLoadingMobile(false);
        }
    };

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId);
        const storedCartId = localStorage.getItem('cartId');
        setCartId(storedCartId);
    }, []);



    const { data: address, isLoading: addressLoading } = useQuery({
        queryKey: ['getAddressData', userId],
        queryFn: () => getAddressApi(`user/${userId}`),
        enabled: !!userId
    });

    const fetchCartAndDeliveryCharge = async () => {
        try {

            const deliveryResponse: any = await getDeliveryChargeApi('', {
                user_id: localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : '',
                vendor_id: vendorId,
                payment_mode: '',
                customer_phone: user?.contact_number,
            });
            if (deliveryResponse) {
                setDeliveryChargeValue(deliveryResponse?.data);
            }

        } catch (error) {
            console.error("Error in cart/delivery API:", error);
        }
    };

    useEffect(() => {
        if (userId && vendorId && cartId && user?.contact_number) {
            fetchCartAndDeliveryCharge();
        }
    }, [cartId, userId, vendorId, user?.contact_number, selectedAddressId]);

    useEffect(() => {
        if (address?.data?.length) {
            const selected = address?.data?.find((address: any) => address?.selected_address === true);
            if (selected?.id) {
                setSelectedAddressId(String(selected?.id));
            }
        }
    }, [address]);

    const handleSelectAddress = async (id: any) => {
        try {
            const upadetApi = await patchUserSelectAddressAPi(`user/${userId}/address/${id?.id}`, { updated_by: user?.data?.name || 'user' });
            if (upadetApi) {
                queryClient.invalidateQueries(['getAddressData'] as InvalidateQueryFilters);
                fetchCartAndDeliveryCharge()
            }
        } catch (error) {
        }
    }

    const handleCheckout = async () => {
        setLoading(true);
        setErrorMessage('')
        try {
            const paymentAPi = await postPaymentApi('', {
                customer_phone: user?.contact_number || localStorage.getItem('contact_number') ? Number(localStorage.getItem('contact_number')) : '',
                vendor_id: vendorId,
                user_id: user?.id || localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : '',
            });
            if (paymentAPi) {
                const { payment_order_id, final_price } = paymentAPi.data;
                const options = {
                    key: "rzp_live_7SFblkbZy82Xwv",
                    amount: final_price * 100,
                    currency: "INR",
                    name: "OMSRITARA",
                    description: "Order Payment",
                    order_id: payment_order_id,
                    handler: function (response: any) {
                        setPaymentSuccess(true);
                        router.push('/thankYouPage')
                    },
                    prefill: {
                        name: user?.data?.name,
                        email: user?.data?.email,
                        contact: user?.data?.contact_number,
                    },
                    notes: {
                        address: "Selected Address",
                    },
                    theme: {
                        color: "#a5291b",
                    },
                };
                // toast.success("created successfully!");
                const razor = new (window as any).Razorpay(options);
                razor.open();
            }
        } catch (error: any) {
            setErrorMessage(error?.response?.data?.error || "Failed to initiate payment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const relatedProducts = products?.data?.filter((product: any) => product?.category === productDetails?.category)
        ?.slice(0, 4)

    const onSubmit = async (formData: any) => {
        try {
            if (userExists === false) {
                const userPayload = {
                    name: formData.name,
                    email: formData.email_address,
                    contact_number: formData.contact_number,
                    vendor: vendorId,
                    created_by: 'user',
                    profile_image: '',
                    password: formData.email_address
                };
                const userResponse = await postCreateUserAPi(userPayload);
                const newUser = userResponse?.data?.user;
                setUser(newUser);
                setUserId(newUser.id);
                // save user in localStorage
                localStorage.setItem('userId', newUser?.id);
                localStorage.setItem('userName', newUser?.name);
                localStorage.setItem('contact_number', newUser?.contact_number);

                // Create cart
                const cartRes = await postCartCreateApi('', {
                    user: newUser?.id,
                    vendor: vendorId,
                    created_by: newUser?.name,
                });
                localStorage.setItem('cartId', cartRes?.data?.id);
                setCartId(cartRes?.data?.id);
            }
            const addressPayload = {
                ...formData,
                customer_name: formData.name,
                user: localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : '',
                vendor: vendorId,
                selected_address: true,
                created_by: 'User'
            };
            delete formData.password,
                await axios.post(`${addresses?.addresses}`, addressPayload);
            toast.success('Address saved successfully!');
            setUserExists(true);
            queryClient.invalidateQueries(['getAddressData'] as InvalidateQueryFilters);
            await handleAddCart(productDetails?.id, localQty);
            await handleCouponSubmit({ preventDefault: () => { } }); // Apply coupon
            setIsAddingNewAddress(false); // Reset to show address list
            setShowAddressModal(true); // Keep modal open to show address list
            reset();
            fetchCartAndDeliveryCharge();
            // Optional: reload address list or move to payment
        } catch (error) {
            toast.error('Failed to save address or register user');
            console.error(error);
        }
    };

    const handleCouponSubmit = async (e: any) => {
        e.preventDefault();
        const payload = {
            user_id: Number(userId) || Number(localStorage.getItem('userId')),
            coupon_code: 'FREEDELIVERY',
            vendor_id: vendorId,
            updated_by: 'user'
        };
        try {
            const updateApi = await postApplyCouponApi("", payload);
            if (updateApi) {
                fetchCartAndDeliveryCharge()
            }
        } catch (error: any) {
            console.log(error?.response?.data?.error);
        } finally {
            console.log("Coupon applied successfully");
        }
    };

    // useEffect(() => {
    //     handleCouponSubmit({ preventDefault: () => { } });
    // }, [userId, vendorId])


    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <SkeletonProduct />
            </div>
        );
    }

    return (
        <>
            {/* Facebook Pixel Base Code */}
            <Head>
                <script
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
              fbq('init', '769753435410050');
              fbq('track', 'PageView');
            `,
                    }}
                />
            </Head>

            {/* Fallback noscript pixel */}
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: 'none' }}
                    src="https://www.facebook.com/tr?id=769753435410050&ev=PageView&noscript=1"
                />
            </noscript>
            <div className="container mx-auto px-4 py-6 md:py-12">

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left - Product Image + Thumbnails */}
                    <ProductGallery images={productDetails?.image_urls} name={productDetails?.name} />

                    {/* Right - Product Info */}
                    <div>
                        <h1 className="text-2xl font-semibold border-b-2 border-gray-500 capitalize mb-5">{productDetails?.name}</h1>
                        <div className='flex items-center gap-2 text-sm text-gray-500 mb-4'>
                            <div className="mt-4 text-2xl font-bold text-red-600 py-2 border-gray-200">{convertPrice(Number(productDetails?.price))}</div>
                            {/* {productDetails?.price !== productDetails?.discount && (
                            <div className="mt-4 text-xl font-bold text-gray-600  py-2 border-gray-200 line-through">{convertPrice(Number(productDetails?.discount))}</div>
                        )} */}
                            {productDetails?.price === productDetails?.discount || productDetails?.discount === 0 || productDetails?.discount === '' ?
                                ('') : (
                                    <>
                                        <span className="mt-4 text-xl font-bold text-gray-600  py-2 border-gray-200 line-through">{convertPrice(Number(productDetails?.discount))}</span><br />
                                    </>
                                )}

                        </div>
                        <ul className="mt-6 mb-3 space-y-2 text-sm text-gray-700 border-y py-2 border-gray-200">
                            <li><strong>Brand:</strong> OMSRITARA</li>
                            <li><strong>Availability: </strong>
                                <span
                                    className={`font-semibold ${productDetails?.stock_quantity === 0 || productDetails?.status === false
                                        ? 'text-red-600'
                                        : 'text-green-600'
                                        }`}
                                >
                                    {productDetails?.stock_quantity === 0 || productDetails?.status === false
                                        ? 'Out Of Stock'
                                        : 'In Stock'}
                                </span>
                            </li>
                        </ul>

                        <div className="text-sm text-orange-600 font-medium mt-1">🔥 Hurry! Only 49 left in stock.</div>

                        <div className='mt-4'>
                            <label className="mt-6 space-y-2 text-md font-bold text-black py-5">Quantity</label>
                            <div className="flex items-center w-full md:w-[180px] mt-2">
                                <button
                                    className="rounded-r-none h-10 w-10"
                                    onClick={() => setLocalQty((prev) => Math.max(1, prev - 1))}
                                >
                                    <Minus className="h-4 w-4" />
                                </button>

                                <div className="text-gray-800 flex-1 h-10 border border-input flex items-center justify-center font-medium">
                                    {localQty}
                                </div>

                                <button
                                    className="rounded-l-none ml-5 h-10 w-10"
                                    onClick={() => setLocalQty((prev) => prev + 1)}
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-2">
                            <button
                                className="bg-[#a5291b] text-white px-5 py-2 rounded hover:bg-red-700 flex items-center gap-2"
                                onClick={() => setMobileModal(true)}
                            >
                                <ShoppingBasket size={18} /> Buy Now
                            </button>

                        </div>
                        {/* Mobile Sticky Buy Bar */}
                        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-300 p-4 md:hidden">
                            <div className="flex items-center justify-between gap-1 flex-wrap">
                                {/* Quantity Selector */}
                                <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                                    <button
                                        className="w-8 h-8 text-md  font-bold text-gray-600"
                                        onClick={() => setLocalQty((prev) => Math.max(1, prev - 1))}
                                    >
                                        <Minus className="h-4 w-4 mx-auto" />
                                    </button>
                                    <div className="w-8 text-center border-l border-r border-gray-300 flex items-center justify-center font-semibold">
                                        {localQty}
                                    </div>
                                    <button
                                        className="w-8 h-8 text-md font-bold text-gray-600"
                                        onClick={() => setLocalQty((prev) => prev + 1)}
                                    >
                                        <Plus className="h-4 w-4 mx-auto" />
                                    </button>
                                </div>

                                {/* Total Price */}
                                <div className="text-sm font-semibold text-red-600 whitespace-nowrap">
                                    ₹{(Number(productDetails?.price) * localQty).toLocaleString("en-IN", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </div>

                                {/* Buy Now Button */}
                                <button
                                    className="flex bg-[#a5291b] text-white py-3 px-2 rounded-lg shadow-lg hover:bg-red-700 flex items-center justify-center gap-2"
                                    onClick={() => setMobileModal(true)}
                                >
                                    <ShoppingBasket size={18} /> Buy Now
                                </button>
                            </div>
                        </div>

                        <div className='mt-6'>
                            <h2 className='text-md font-bold'>Description:</h2>
                            <div dangerouslySetInnerHTML={{ __html: productDetails?.description }} className="quill-content text-gray-600 mt-2" />
                        </div>

                    </div>
                </div>


                {/* Related Products */}
                {/* <div className="mt-5 border-t pt-5">
                    <h2 className="text-xl font-bold mb-4">Related Products</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts?.map((product: any, idx: number) => (
                            <div
                                key={idx}
                                className=""
                            >
                                <ProductCard
                                    image={product?.image_urls[0] ? product?.image_urls[0] : ''}
                                    hoverImage={product?.image_urls[1] ? product?.image_urls[1] : ''}
                                    title={product?.name}
                                    price={product?.price}
                                    onAddToCart={() => alert(`Add to cart: ${product?.name}`)}
                                    onView={() => router.push(`/shop/${slugConvert(product?.name)}`)}
                                    onWishlist={() => alert(`Wishlist: ${product?.name}`)}
                                    product={product}
                                />
                            </div>
                        ))}
                    </div>
                </div> */}

                {/* Details */}
                {productDetails?.id == 18432 && (
                    <section className="max-w-7xl mx-auto px-4 py-12 text-gray-800">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 leading-snug">
                            Attract Wealth and Opportunity with Our <span className="text-[#a5291b]">Money Magnet Fusion Bracelet</span>
                        </h2>

                        <p className="text-center text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Featuring <strong>Pyrite</strong>, <strong>Tiger Eye</strong>, <strong>Citrine</strong>, <strong>Aventurine</strong>, <strong>Clear Quartz</strong>, & <strong>Malachite</strong> Beads.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                {
                                    title: "Tiger Eye",
                                    desc: "Boosts confidence, sharpens focus, and strengthens willpower, helping you overcome fear and make clear decisions.",
                                },
                                {
                                    title: "Pyrite",
                                    desc: "Known as “Fool’s Gold,” it draws wealth, shields from negativity, and inspires an abundant, prosperous mindset.",
                                },
                                {
                                    title: "Citrine",
                                    desc: "The “Merchant’s Stone,” it radiates positivity, enhances creativity, and encourages success, joy, and abundance in all areas of life.",
                                },
                                {
                                    title: "Aventurine",
                                    desc: "A stone of luck and growth, it attracts opportunities, promotes emotional balance, and supports personal development.",
                                },
                                {
                                    title: "Clear Quartz",
                                    desc: "The “Master Healer,” it amplifies the energy of all other stones, providing clarity, spiritual balance, and focused intentions.",
                                },
                                {
                                    title: "Malachite",
                                    desc: "The “Stone of Transformation,” it absorbs negativity, promotes emotional healing, and encourages positive change and protection.",
                                },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
                                    <h3 className="text-xl font-semibold text-[#a5291b] mb-2">{item.title}</h3>
                                    <p className="text-gray-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <hr className="my-12 border-t border-gray-300" />

                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">✨ FIT & STYLE</h3>
                                <p className="text-gray-600">
                                    The soft elastic band ensures a comfortable fit for most wrist sizes. Its versatile style makes it easy to pair with everyday outfits or special occasions.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">🛠️ CRAFTSMANSHIP</h3>
                                <p className="text-gray-600">
                                    Each bracelet is carefully handcrafted and quality-checked for durability. Every bead is polished to highlight its natural glow and earthy charm.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">🧼 CARE TIPS</h3>
                                <p className="text-gray-600">
                                    Keep away from water, soaps, lotions, perfumes, and harsh chemicals. Store in a dry zip-lock pouch to maintain its beauty and energy.
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 bg-yellow-50 border-l-4 border-[#a5291b] p-6 rounded-md">
                            <h3 className="text-xl font-bold text-[#a5291b] mb-4">🔍 Benefits at a glance:</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li><strong>Confidence & focus</strong> – Tiger Eye</li>
                                <li><strong>Wealth attraction & prosperity mindset</strong> – Pyrite</li>
                                <li><strong>Positivity, joy & abundance</strong> – Citrine</li>
                                <li><strong>Luck, growth & opportunity</strong> – Aventurine</li>
                                <li><strong>Clarity, balance & energy amplification</strong> – Clear Quartz</li>
                                <li><strong>Transformation, protection & emotional healing</strong> – Malachite</li>
                            </ul>
                        </div>
                    </section>
                )}


                {
                    productDetails?.id == 19403 && (
                        <div className="bg-white text-gray-800 mt-10">
                            {/* Hero Section */}
                            <section className="bg-gradient-to-r from-yellow-100 to-orange-100 py-16 px-6 text-center">
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                    Welcome to Om Sri Tara – Your Path to Divine Energy Begins Here
                                </h1>
                                <p className="text-lg max-w-2xl mx-auto text-gray-700">
                                    Discover crystals, energy tools, and divine healing products to attract abundance and align your energy.
                                </p>
                            </section>

                            {/* Launch Offer */}
                            <section className="py-12 px-6 max-w-5xl mx-auto">
                                <h2 className="text-3xl font-semibold mb-4 text-center">🌟 Grand Launch Exclusive Offer</h2>
                                <p className="text-gray-700 text-center mb-8">
                                    Celebrate our website’s inauguration with our <span className="font-semibold">Money Intention Combo</span> –
                                    a powerful trio designed to attract wealth, remove blockages, and energize your financial journey.
                                </p>
                            </section>

                            {/* What's Included */}
                            <section className="bg-gray-50 py-12 px-6">
                                <h3 className="text-2xl font-semibold mb-6 text-center">What’s Included?</h3>
                                <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
                                    {[
                                        { title: 'Money Magnet Bracelet', desc: 'Crafted with high-vibrational crystals for wealth attraction and protection.' },
                                        { title: 'Shreem Card', desc: 'Infused with the sacred Shreem mantra vibrations – the sound of abundance.' },
                                        { title: 'Little Ganesha Idol', desc: 'A divine symbol of new beginnings and obstacle removal.' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-white shadow-md rounded-lg p-6 text-center">
                                            <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                                            <p className="text-gray-600">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Benefits */}
                            <section className="py-12 px-6 max-w-5xl mx-auto">
                                <h3 className="text-2xl font-semibold mb-4 text-center">Benefits of These Items</h3>
                                <ul className="grid gap-3 sm:grid-cols-2 text-gray-700">
                                    <li>💰 Attracts wealth & financial opportunities</li>
                                    <li>🚫 Clears money & abundance blockages</li>
                                    <li>📈 Supports business success & job growth</li>
                                    <li>✨ Promotes positive vibrations in personal & workspace</li>
                                    <li>🕉️ Strengthens intention & aligns with divine energies</li>
                                </ul>
                            </section>

                            {/* Product Details */}
                            <section className="bg-gray-50 py-12 px-6">
                                <h3 className="text-2xl font-semibold mb-8 text-center">Product Details</h3>
                                <div className="space-y-8 max-w-4xl mx-auto">
                                    {/* Bracelet */}
                                    <div className="bg-white rounded-lg shadow p-6">
                                        <h4 className="text-xl font-semibold mb-2">1. Money Magnet Bracelet</h4>
                                        <p className="mb-2">Crafted with crystals like Citrine, Green Aventurine, and Pyrite.</p>
                                        <ul className="list-disc list-inside text-gray-700">
                                            <li><strong>Meaning:</strong> Magnetizes financial success when worn on the wrist.</li>
                                            <li><strong>Benefits:</strong> Enhances luck, opens money channels, protects from loss.</li>
                                            <li><strong>How it Works:</strong> Energized with wealth intention & crystal vibrations.</li>
                                        </ul>
                                    </div>
                                    {/* Shreem Card */}
                                    <div className="bg-white rounded-lg shadow p-6">
                                        <h4 className="text-xl font-semibold mb-2">2. Shreem Card</h4>
                                        <ul className="list-disc list-inside text-gray-700">
                                            <li><strong>Purpose:</strong> Brings wealth energy into your life and space.</li>
                                            <li><strong>Placement:</strong> Wallet, cash box, locker, or work desk.</li>
                                            <li><strong>Vibrations:</strong> Activates Goddess Lakshmi’s abundance energy.</li>
                                        </ul>
                                    </div>
                                    {/* Ganesha Idol */}
                                    <div className="bg-white rounded-lg shadow p-6">
                                        <h4 className="text-xl font-semibold mb-2">3. Little Ganesha Idol</h4>
                                        <ul className="list-disc list-inside text-gray-700">
                                            <li><strong>Symbolism:</strong> Brings wisdom, clarity, and good fortune.</li>
                                            <li><strong>Ideal Placement:</strong> Home entrance, office, or altar for blessings.</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Why Together */}
                            <section className="py-12 px-6 max-w-5xl mx-auto">
                                <h3 className="text-2xl font-semibold mb-4 text-center">Why Take All Three Together?</h3>
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                                    <p className="mb-2">This power trio works in harmony:</p>
                                    <ul className="list-disc list-inside text-gray-700 mb-4">
                                        <li>💎 Bracelet sets your personal vibration for wealth.</li>
                                        <li>📜 Shreem Card energizes material money flow.</li>
                                        <li>🐘 Ganesha clears obstacles & invites blessings.</li>
                                    </ul>
                                    <p className="font-semibold">Together, they create a powerful money manifestation field.</p>
                                </div>
                            </section>

                            {/* Trust Section */}
                            <section className="bg-gray-50 py-12 px-6">
                                <h3 className="text-2xl font-semibold mb-6 text-center">Trusted by Our Spiritual Family</h3>
                                <ul className="grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto text-gray-700 text-center">
                                    <li>✔️ 100% Genuine Crystals</li>
                                    <li>✔️ Energized with Mantras & Rituals</li>
                                    <li>✔️ Secure Payments & WhatsApp Support</li>
                                </ul>
                            </section>

                            {/* CTA */}
                            <section className="py-12 px-6 text-center">
                                <h3 className="text-3xl font-bold mb-4">Ready to Attract Abundance?</h3>
                                <p className="text-gray-700 mb-6">Begin your money manifestation journey today with our limited-time inaugural offer.</p>
                                <button onClick={() => setMobileModal(true)} className="bg-[#a5291b] text-white px-6 py-3 rounded-lg hover:bg-[#a5291b] transition">
                                    Grab Your Combo Now
                                </button>
                            </section>
                        </div>
                    )
                }

                {mobileModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center px-4">
                        <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative">
                            <button
                                className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
                                onClick={() => setMobileModal(false)}
                            >
                                &times;
                            </button>
                            <h2 className="text-xl font-bold mb-4">Enter Your Mobile Number</h2>
                            <form onSubmit={handleMobileSubmit} className="space-y-4">
                                <input
                                    type="tel"
                                    value={mobileNumber}
                                    onChange={(e) => {
                                        const input = e.target.value;
                                        // Allow only digits and limit to 10 characters
                                        if (/^\d{0,10}$/.test(input)) {
                                            setMobileNumber(input);
                                        }
                                    }}
                                    placeholder="Please enter mobile number"
                                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    maxLength={10}
                                    pattern="^\d{10}$"
                                    title="Enter a valid 10-digit mobile number"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-[#a5291b] text-white py-2 rounded hover:bg-red-700"
                                    disabled={loadingMobile}
                                >
                                    {loadingMobile ? 'Checking...' : 'Submit'}
                                </button>
                            </form>

                        </div>
                    </div>
                )}

            </div>

            {showAddressModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex justify-center px-4 overflow-auto">
                    <div className="bg-white mt-4 max-w-lg p-6 rounded shadow-lg relative max-h-[90vh] overflow-y-auto w-full">
                        <button
                            className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
                            onClick={() => {
                                setShowAddressModal(false);
                                setIsAddingNewAddress(false); // Reset form view on close
                            }}
                        >
                            &times;
                        </button>

                        {/* ✅ Show form directly if no address or isAddingNewAddress is true */}
                        {(!userExists || address?.data?.length === 0 || isAddingNewAddress) ? (
                            <>
                                <h2 className="text-xl font-bold mb-4 flex gap-3">
                                    <ArrowLeft onClick={() => setIsAddingNewAddress(false)} className='mt-1 cursor-pointer' size={18} /> Add Shipping Address</h2>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    {/* Name */}
                                    <div>
                                        <label className="block mb-1 font-medium text-xs">Name</label>
                                        <input
                                            type="text"
                                            {...register('name', { required: 'Name is required' })}
                                            placeholder="Name"
                                            className={`${inputClass} ${errors.name ? 'border-red-500' : ''}`}
                                        />
                                        {typeof errors.name?.message === 'string' && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block mb-1 font-medium text-xs">Email</label>
                                        <input
                                            type="email"
                                            {...register('email_address', { required: 'Email is required' })}
                                            placeholder="Email"
                                            className={`${inputClass} ${errors.email_address ? 'border-red-500' : ''}`}
                                        />
                                        {typeof errors.email_address?.message === 'string' && <p className="text-red-500 text-xs mt-1">{errors.email_address.message}</p>}
                                    </div>

                                    {/* Contact Number */}
                                    <div>
                                        <label className="block mb-1 font-medium text-xs">Mobile Number</label>
                                        <input
                                            type="text"
                                            {...register('contact_number', {
                                                required: 'Mobile number is required',
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message: 'Enter a valid 10-digit number',
                                                },
                                            })}
                                            placeholder="Mobile Number"
                                            maxLength={10}
                                            className={`${inputClass} ${errors.contact_number ? 'border-red-500' : ''}`}
                                        />
                                        {typeof errors.contact_number?.message === 'string' && <p className="text-red-500 text-xs mt-1">{errors.contact_number.message}</p>}
                                    </div>

                                    {/* Address Line 1 */}
                                    <div>
                                        <label className="block mb-1 font-medium text-xs">Address Line 1</label>
                                        <textarea
                                            {...register('address_line1', { required: 'Address Line 1 is required' })}
                                            placeholder="Address Line 1"
                                            className={`${inputClass} ${errors.address_line1 ? 'border-red-500' : ''}`}
                                            rows={4}
                                        />
                                        {typeof errors.address_line1?.message === 'string' && <p className="text-red-500 text-xs mt-1">{errors.address_line1.message}</p>}
                                    </div>

                                    {/* Address Line 2 (Hidden) */}
                                    <input
                                        {...register('address_line2')}
                                        placeholder="Address Line 2"
                                        className={`${inputClass} hidden`}
                                    />

                                    {/* Landmark (Optional) */}
                                    <div>
                                        <label className="block mb-1 font-medium text-xs">Landmark <span className="text-gray-400 text-sm">(optional)</span></label>
                                        <input
                                            {...register('landmark')}
                                            placeholder="Landmark"
                                            className={inputClass}
                                        />
                                    </div>

                                    {/* Postal Code */}
                                    <div>
                                        <label className="block mb-1 font-medium text-xs">Postal Code</label>
                                        <input
                                            {...register('postal_code', { required: 'Postal code is required' })}
                                            placeholder="Postal Code"
                                            className={`${inputClass} ${errors.postal_code ? 'border-red-500' : ''}`}
                                        />
                                        {typeof errors.postal_code?.message === 'string' && <p className="text-red-500 text-xs mt-1">{errors.postal_code.message}</p>}
                                    </div>

                                    {/* City */}
                                    <div>
                                        <label className="block mb-1 font-medium text-xs">City</label>
                                        <input
                                            {...register('city', { required: 'City is required' })}
                                            placeholder="City"
                                            className={`${inputClass} ${errors.city ? 'border-red-500' : ''}`}
                                        />
                                        {typeof errors.city?.message === 'string' && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                                    </div>

                                    {/* State */}
                                    <div>
                                        <label className="block mb-1 font-medium text-xs">State</label>
                                        <input
                                            {...register('state', { required: 'State is required' })}
                                            placeholder="State"
                                            className={`${inputClass} ${errors.state ? 'border-red-500' : ''}`}
                                        />
                                        {typeof errors.state?.message === 'string' && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                                    </div>

                                    {/* Country */}
                                    <div>
                                        <label className="block mb-1 font-medium text-xs">Country</label>
                                        <input
                                            {...register('country', { required: 'Country is required' })}
                                            placeholder="Country"
                                            defaultValue='India'
                                            className={`${inputClass} ${errors.country ? 'border-red-500' : ''}`}
                                        />
                                        {typeof errors.country?.message === 'string' && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                                    </div>

                                    {/* Address Type */}
                                    <div>
                                        <label className="block mb-1 font-medium text-xs">Address Type</label>
                                        <select
                                            {...register('address_type', { required: 'Please select an address type' })}
                                            className={`${inputClass} ${errors.address_type ? 'border-red-500' : ''}`}
                                        >
                                            <option value="">Select Address Type</option>
                                            <option value="Home">Home</option>
                                            <option value="Work">Work</option>
                                        </select>
                                        {typeof errors.address_type?.message === 'string' && <p className="text-red-500 text-xs mt-1">{errors.address_type.message}</p>}
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full text-center bg-[#a5291b] text-white py-2 rounded hover:bg-red-700"
                                    >
                                        <span className='flex gap-2 justify-center'>Next <ArrowRight className='mt-1' size={18} /></span>
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                {/* ✅ Address List */}
                                <h3 className="font-semibold text-lg mb-4">Select a Shipping Address:</h3>
                                <div className="space-y-3">
                                    {address?.data
                                        ?.slice() // create a shallow copy to avoid mutating original data
                                        .sort((a: any, b: any) => a.address_line1.localeCompare(b.address_line1))
                                        .map((address: any) => (
                                            <label
                                                key={address.id}
                                                className="flex items-start gap-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition"
                                            >
                                                <input
                                                    type="radio"
                                                    name="selectedAddress"
                                                    value={address.id}
                                                    checked={selectedAddressId == address.id}
                                                    onChange={() => handleSelectAddress(address)}
                                                    className="mt-1 accent-[#a5291b] focus:ring-[#a5291b] h-4 w-4 border-gray-300 rounded"
                                                />

                                                <div className="flex flex-col space-y-1 text-gray-800">
                                                    <span className="font-semibold">{address.address_type}</span>
                                                    <span>{address.address_line1}</span>
                                                    <span>
                                                        {address.city}, {address.state} - {address.postal_code}
                                                    </span>
                                                </div>
                                            </label>
                                        ))}
                                </div>


                                {/* ✅ Add new address CTA */}
                                <button
                                    className="mt-4 text-blue-600 hover:underline"
                                    onClick={() => setIsAddingNewAddress(true)} // show the form
                                >
                                    + Add New Address
                                </button>

                                {DeliveryChargeValue && (
                                    <div className="bg-white rounded-md shadow p-4 mt-4 space-y-2">
                                        <h3 className="text-xl font-semibold border-b pb-2">Payment Details</h3>
                                        <div className="flex justify-between text-gray-700">
                                            <span>Subtotal:</span>
                                            <span className="font-medium text-black">₹{productDetails?.price * localQty}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-700">
                                            <span>Delivery Charge:</span>
                                            <span className="font-medium text-black">₹{DeliveryChargeValue.final_delivery_charge}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-700">
                                            <span>Total Price:</span>
                                            <span className="font-medium text-black">₹{DeliveryChargeValue.final_price_including_delivery}</span>
                                        </div>
                                    </div>
                                )}

                                <button className="w-full mt-10 p-2 flex gap-2 justify-center bg-[#a5291b] cursor-pointer hover:bg-red-700 text-white font-bold" onClick={handleCheckout}>Proceed to Checkout</button>
                                <span className='text-red-500 p-2'>{errorMessage}</span>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
