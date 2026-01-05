import { GetServerSideProps } from "next";
import Head from "next/head";
import ProductGallery from "./ProductGallery";
import ProductCard from "@/components/ProductCard";
import { useCurrency } from "@/context/CurrencyContext";
import { useState, useEffect } from "react";
import CartControls from "./CartControls";
import toast from "react-hot-toast";
import { postCartitemApi, updateCartitemsApi, deleteCartitemsApi } from "@/api-endpoints/CartsApi";
import { baseUrl } from "@/api-endpoints/ApiUrls";
import { useCartItem } from "@/context/CartItemContext";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { useVendor } from "@/context/VendorContext";
import { useRouter } from "next/router";
import LoginModal from "@/pages/LoginModal/page";

interface Product {
    id: number;
    name: string;
    description: string;
    description_2?: string;
    price: number;
    discount?: number;
    stock_quantity: number;
    status: boolean;
    category: string;
    image_urls: string[];
    ratingValue?: number;
    ratingCount?: number;
}

interface SingleProductViewProps {
    productDetails: Product;
    relatedProducts: Product[];
    schemaData: Record<string, any>;
}

export default function SingleProductView({
    productDetails,
    relatedProducts,
    schemaData,
}: SingleProductViewProps) {
    const { convertPrice } = useCurrency();
    const [signInmodal, setSignInModal] = useState(false);
    const [getUserId, setUserId] = useState<string | null>(null);
    const [getCartId, setCartId] = useState<string | null>(null);
    const { cartItem }: any = useCartItem();
    const queryClient = useQueryClient();
    const { vendorId } = useVendor();
    const router = useRouter();

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    // === Hydrate cart info from localStorage ===
    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        const storedCartId = localStorage.getItem("cartId");

        setUserId(storedUserId);
        setCartId(storedCartId);
    }, []);

    const matchingData = cartItem?.data?.map((item: any, index: number) => {
        const product = productDetails;
        const isProductMatch = product?.id === item?.product;

        if (isProductMatch) {
            return {
                Aid: index,
                cartId: item?.id,
                cartQty: item?.quantity,
                ...product,
            };
        }

        return null;
    }).filter(Boolean);

    const totalQty = matchingData?.reduce((sum: number, item: any) => sum + (item?.cartQty || 0), 0);

    // === Cart handlers ===
    const handleAddCart = async (id: any) => {
        if (!getUserId) {
            setSignInModal(true);
            return;
        }

        const payload = {
            cart: getCartId,
            product: productDetails?.id,
            user: getUserId,
            quantity: 1,
            created_by: "user",
            vendor: vendorId,
        };

        try {
            const response = await postCartitemApi("", payload);
            if (response) {
                toast.success("Product added in cart!");
                // Update local cart data
                queryClient.invalidateQueries(['getCartitemsData'] as InvalidateQueryFilters);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateCart = async (cartId: string, type: "increase" | "decrease", qty: number) => {
        if (!getUserId) {
            setSignInModal(true);
            return;
        }

        try {
            if (qty === 1 && type === "decrease") {
                const res = await deleteCartitemsApi(`${cartId}`);
                if (res) {
                    toast.success("Product removed!");

                }
            } else {
                if (qty) {
                    const response = await updateCartitemsApi(`${cartId}/${type}/`)
                    if (response) {
                        toast.success('Product updated in cart!')
                        queryClient.invalidateQueries(['getCartitemsData'] as InvalidateQueryFilters);
                    }
                } else {
                    handleAddCart(productDetails?.id)
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Head>
                <title>{productDetails?.name} | Om Sri Tara</title>
                <meta name="description" content={productDetails?.description_2 || productDetails?.name} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            </Head>

            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-8">
                    <ProductGallery images={productDetails?.image_urls} name={productDetails?.name} />

                    <div>
                        <h1 className="text-2xl font-semibold border-b-2 border-gray-500 capitalize mb-5">
                            {productDetails?.name}
                        </h1>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <div className="mt-4 text-2xl font-bold text-red-600 py-2 border-gray-200">
                                {convertPrice(Number(productDetails?.price))}
                            </div>
                            {productDetails?.discount &&
                                productDetails.discount > 0 &&
                                productDetails.discount !== productDetails.price && (
                                    <span className="mt-4 text-xl font-bold text-gray-600 py-2 border-gray-200 line-through">
                                        {convertPrice(Number(productDetails?.discount))}
                                    </span>
                                )}
                        </div>

                        <div dangerouslySetInnerHTML={{ __html: productDetails?.description }} className="quill-content" />

                        {/* Cart Controls */}
                        <CartControls
                            totalQty={totalQty}
                            userId={getUserId}
                            cartId={getCartId}
                            handleUpdateCart={handleUpdateCart}
                            handleAddCart={handleAddCart}
                            setSignInModal={setSignInModal}
                            signInmodal={signInmodal}
                            productId={productDetails?.id}
                            cartItemId={matchingData?.[0]?.cartId}
                            vendorId={vendorId}
                        />

                        <ul className="mt-6 mb-3 space-y-2 text-sm text-gray-700 border-y py-2 border-gray-200">
                            <li>
                                <strong>Brand:</strong> OMSRITARA
                            </li>
                            <li>
                                <strong>Availability: </strong>
                                <span
                                    className={`font-semibold ${productDetails?.stock_quantity === 0 || !productDetails?.status ? "text-red-600" : "text-green-600"
                                        }`}
                                >
                                    {productDetails?.stock_quantity === 0 || !productDetails?.status ? "Out Of Stock" : "In Stock"}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-5 border-t pt-5">
                    <h2 className="text-xl font-bold mb-4">Related Products</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts?.map((product, idx) => (
                            <ProductCard
                                key={idx}
                                image={product?.image_urls[0] || ""}
                                hoverImage={product?.image_urls[1] || ""}
                                title={product?.name}
                                price={product?.price}
                                onAddToCart={() => alert(`Add to cart: ${product?.name}`)}
                                onView={() => router.push(`/shop/${slugConvert(product?.name)}`)}
                                onWishlist={() => alert(`Wishlist: ${product?.name}`)}
                                product={product}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
}

// Helper
function slugConvert(name: string) {
    return name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

// SSR Data Fetching
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.params as { slug: string };

    const res: any = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/?vendor_id=63`);
    const products = await res.json();

    const productDetails = products?.find((p: any) => slugConvert(p.name) === slug) || null;

    if (!productDetails) {
        return { notFound: true };
    }

    const relatedProducts = products.filter(
        (p: any) => p.category === productDetails.category && p.id !== productDetails.id
    ).slice(0, 4);

    const schemaData = {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: productDetails?.name,
        image: productDetails?.image_urls || [],
        description: productDetails?.description_2 || productDetails?.name,
        brand: { "@type": "Brand", name: "Om Sri Tara" },
        offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: productDetails?.discount > 0 ? productDetails.discount : productDetails?.price,
            availability: productDetails?.stock_quantity === 0 ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: productDetails?.ratingValue || "4.8",
            bestRating: "5",
            ratingCount: productDetails?.ratingCount || "6",
        },
    };

    return { props: { productDetails, relatedProducts, schemaData } };
};
