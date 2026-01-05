"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getOrderApi,
  getOrdersAndOrdersItemsApi,
} from "@/api-endpoints/CartsApi";
import { useVendor } from "@/context/VendorContext";
import { useCurrency } from "@/context/CurrencyContext";
import Image from "next/image";
import { Eye, Package } from "lucide-react";

// ✅ Declare fbq globally so TypeScript won’t complain
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

export default function ProfileOrders() {
  const router = useRouter();
  const { vendorId } = useVendor();
  const { convertPrice } = useCurrency();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);



  // ✅ React Query for orders
  const { data, isLoading }: any = useQuery({
    queryKey: ["getOrderData", userId, vendorId],
    queryFn: () => getOrderApi(`${userId}/vendor/${vendorId}`),
    enabled: !!userId && !!vendorId,
  });

  const getOrdersAndOrdersItemsApiData: any = useQuery({
    queryKey: ["getOrdersAndOrdersItemsApiData", userId, vendorId],
    queryFn: () =>
      getOrdersAndOrdersItemsApi(`?vendor_id=${vendorId}&user_id=${userId}`),
    enabled: !!userId && !!vendorId,
  });

  function slugConvert(name: string) {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Your Orders</h2>
      {getOrdersAndOrdersItemsApiData?.data?.data?.length ? (
        <div className="space-y-6">
          {getOrdersAndOrdersItemsApiData?.data?.data
            ?.sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((order: any) => (
              <div
                key={order?.id}
                className="border border-border rounded-lg overflow-hidden"
              >
                <div className="bg-[#F8F7F2] p-4 flex justify-between items-center flex-wrap">
                  <div>
                    <div className="text-sm text-muted-foreground font-bold">
                      Order placed
                    </div>
                    <div className="font-medium">
                      {new Date(order?.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground font-bold">
                      Order number
                    </div>
                    <div className="font-medium">{order?.id}</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground font-bold">
                      Total
                    </div>
                    <div className="font-medium">
                      {convertPrice(Number(order?.total_amount))}
                    </div>
                  </div>

                  <div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-md font-bold ${order?.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order?.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order?.status === "Processing"
                            ? "bg-blue-50 text-blue-700"
                            : order?.status === "Shipped"
                              ? "bg-indigo-50 text-indigo-700"
                              : order?.status === "Cancelled"
                                ? "bg-red-50 text-red-700"
                                : "bg-red-100 text-[#a5291b]"
                        }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="space-y-4">
                    {order?.order_items?.map((product: any) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-4"
                      >
                        <div className="w-16 h-16 bg-[#F8F7F2] rounded-md overflow-hidden flex-shrink-0">
                          {product?.product?.image_urls?.[0] && (
                            <Image
                              src={
                                product.product?.image_urls?.[0] ||
                                "https://semantic-ui.com/images/wireframe/image.png"
                              }
                              alt={product.name}
                              className="w-full h-full object-cover"
                              height={100}
                              width={100}
                            />
                          )}
                        </div>

                        <div className="flex-grow">
                          <h3 className="font-bold">
                            {product?.product?.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Qty: {product?.quantity}
                          </p>
                        </div>

                        <div>
                          <button
                            className="rounded bg-[#a5291b] text-white font-bold px-4 py-2 hover:bg-red-700 transition-colors"
                            onClick={() =>
                              router.push(
                                `/shop/${slugConvert(product?.product?.name)}`
                              )
                            }
                          >
                            Buy Again
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex py-1 justify-between font-bold hover:text-[#a5291b]">
                    <button
                      onClick={() => router.push(`/order-view/${order.id}`)}
                      className="flex gap-2"
                    >
                      <Eye />
                      View Order Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-center py-6 bg-gray-50 rounded-lg">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No orders yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a new order.
          </p>
        </div>
      )}
    </div>
  );
}
