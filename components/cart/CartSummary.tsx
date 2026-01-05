"use client";

import { getDeliveryChargeApi, getVendorDeliveryDetailsApi, patchUserSelectAddressAPi } from '@/api-endpoints/authendication';
import { deleteCouponApi, getAddressApi, getAppliedCouponDataApi, getCartApi, postApplyCouponApi, postCODPaymentApi, postDtdcChargeApi, postPaymentApi, removeCartCoupon } from '@/api-endpoints/CartsApi';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Separator } from '@/components/ui/separator';
import { useUser } from '@/context/UserContext';
import { useVendor } from '@/context/VendorContext';
// import { formatPrice } from '@/lib/utils';
import { InvalidateQueryFilters, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import OrderSuccessModal from './OrderSucessModal';
import { formatPrice } from '@/lib/utils';
import { useCurrency } from '@/context/CurrencyContext';
import Image from 'next/image';
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function CartSummary({ totalAmount, selectedProducts }: any) {

  const [userId, setUserId] = useState<string | null>(null);
  const [getCartId, setCartId] = useState<string | null>(null);
  const [cartItems, setCartItem] = useState()
  const [DeliveryChargeValue, setDeliveryChargeValue] = useState<any>()
  const { user }: any = useUser();
  const { vendorId } = useVendor();
  const [code, setCode] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState('');
  const [getUserName, setUserName] = useState<string | null>(null);
  const router = useRouter();
  const [selectedAddressId, setSelectedAddressId] = useState<string>();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<any>()
  const [loading, setLoading] = useState(false);
  const [dtdcSelectValue, setDtdcSelectValue] = useState('');
  const [dtdcLoader, setDtdcLoader] = useState(false);
  const [paymentValue, setPaymentValue] = useState('')
  const [dtdcDeliveryCharge, setDtdcDeliveryCharge] = useState<any>();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [addressError, setAddressError] = useState('');
  const { convertPrice } = useCurrency();



  const paymentMethod = [
    { value: "", label: "Pay Online" },
    { value: "cod", label: "Cash on Delivery" }
  ]

  const handlePaymentMethod = (value: string) => {
    setPaymentValue(value)
  }



  const getVendorDeliveryDetailsData: any = useQuery({
    queryKey: ['getVendorDeliveryDetailsData', vendorId],
    queryFn: () => getVendorDeliveryDetailsApi(`${vendorId}`),
    enabled: !!vendorId
  })

  const { data, isLoading }: any = useQuery({
    queryKey: ['getAddressData', userId],
    queryFn: () => getAddressApi(`user/${userId}`),
    enabled: !!userId
  })


  // getAppliedCouponDataApi
  const getAppliedCouponData: any = useQuery({
    queryKey: ['getAppliedCouponDataData', userId],
    queryFn: () => getAppliedCouponDataApi(`?user_id=${userId}`),
    enabled: !!userId
  })


  const handleSelectAddress = async (id: any) => {
    try {
      const upadetApi = await patchUserSelectAddressAPi(`user/${userId}/address/${id?.id}`, { updated_by: user?.data?.name || 'user' });
      if (upadetApi) {
        fetchCartAndDeliveryCharge()
        queryClient.invalidateQueries(['getAddressData'] as InvalidateQueryFilters);

      }
    } catch (error) {

    }
  }

  const handleRemoveCartCoupon = async () => {
    try {
      const updateAPi = await removeCartCoupon(`${getCartId}`, `${getAppliedCouponData?.data?.data?.applied_coupons[0]?.coupon_id}`
      )
      if (updateAPi) {
        queryClient.invalidateQueries(['getAppliedCouponDataData'] as InvalidateQueryFilters);
        setError('');
        setCode('');
      }
    } catch (error) {
      console.log(error, "error");

    }
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setIsChecking(true);

    const payload = {
      user_id: Number(userId),
      coupon_code: 'FREEDELIVERY',
      vendor_id: vendorId,
      updated_by: getUserName || 'user'
    };

    try {
      const updateApi = await postApplyCouponApi("", payload);
      if (updateApi) {
        fetchCartAndDeliveryCharge()
      }
    } catch (error: any) {
      setError(error?.response?.data?.error || "Failed to apply coupon. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };


  useEffect(() => {
    try {
      const storedUserId = localStorage.getItem('userId');
      const storedCartId = localStorage.getItem('cartId');

      setUserId(storedUserId);
      setCartId(storedCartId);
      setUserId(storedUserId);

    } catch (e) {
      console.error("Failed to access localStorage", e);
    }
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    setErrorMessage('')
    try {
      if (paymentValue === 'cod') {
        const updateApi = await postCODPaymentApi("",
          {
            customer_phone: user?.data?.contact_number,
            vendor_id: vendorId,
            user_id: user?.data?.id,
          }
        );
        if (updateApi) {
          setPaymentSuccess(true);

        }
      } else {
        const paymentAPi = await postPaymentApi('', {
          customer_phone: user?.data?.contact_number,
          vendor_id: vendorId,
          user_id: user?.data?.id,
        });

        if (paymentAPi) {
          const { payment_order_id, final_price } = paymentAPi.data;

          const options = {
            key: "rzp_live_7SFblkbZy82Xwv",
            amount: final_price * 100,
            currency: "INR",
            name: "Omsritara",
            description: "Order Payment",
            order_id: payment_order_id,
            handler: function (response: any) {
              setPaymentSuccess(true);
            },
            prefill: {
              name: user?.data?.name,
              email: user?.data?.email,
              contact: user?.data?.contact_number,
            },
            notes: {
              address: "Selected Address",
              selectedProducts: Object.entries(selectedProducts)
                .map(([id, name]) => `${name} (ID: ${id})`)
                .join(", "),
            },
            theme: {
              color: "#a5291b",
            },
          };
          // toast.success("created successfully!");
          const razor = new (window as any).Razorpay(options);
          razor.open();
        }
      }
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.error || "Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const fetchCartAndDeliveryCharge = async () => {
    try {
      // 1. Fetch cart data
      const cartResponse: any = await getCartApi(getCartId);
      if (cartResponse) {
        setCartItem(cartResponse);
      }

      // 2. Fetch delivery charge
      if (user?.data?.contact_number && userId && vendorId) {
        const deliveryResponse: any = await getDeliveryChargeApi('', {
          user_id: userId,
          vendor_id: vendorId,
          payment_mode: paymentValue,
          customer_phone: user?.data?.contact_number,
        });
        if (deliveryResponse) {
          setDeliveryChargeValue(deliveryResponse?.data);
          setAddressError(null)
        }
      }
    } catch (error: any) {
      setAddressError(error?.response?.data?.error || "Please Add delivery addess to proceed with checkout.");
    }
  };

  useEffect(() => {
    if (paymentSuccess) {
      // ✅ Load gtag.js dynamically if not already loaded
      if (!window.gtag) {
        const script1 = document.createElement("script");
        script1.async = true;
        script1.src = "https://www.googletagmanager.com/gtag/js?id=AW-16600190683";
        document.head.appendChild(script1);

        const script2 = document.createElement("script");
        script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-16600190683');
      `;
        document.head.appendChild(script2);
      }

      // ✅ Wait a bit to ensure gtag is ready, then fire conversion event
      const timer = setTimeout(() => {
        if (typeof window.gtag === "function") {
          window.gtag('event', 'conversion', {
            send_to: 'AW-16600190683/Px31CLz2ibcbENudy-s9',
            value: 1500.0, // you can replace this with your actual order amount
            currency: 'INR',
            transaction_id: '' // if you have order_id, pass it here
          });
          console.log("Google Ads conversion event fired ✅");
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [paymentSuccess]);

  useEffect(() => {

    if (getCartId) {
      fetchCartAndDeliveryCharge();
    }
  }, [getCartId, userId, vendorId, user?.data?.contact_number, paymentValue, totalAmount]);

  useEffect(() => {
    if (data?.data?.length) {
      const selected = data?.data?.find((address: any) => address?.selected_address === true);
      if (selected?.id) {
        setSelectedAddressId(String(selected?.id));
      }
    }
  }, [data]);

  // user_id: Number(userId),
  //       coupon_code: 'FREEDELIVERY',
  //       vendor_id: vendorId,
  //       updated_by: getUserName || 'user'

  useEffect(() => {
    handleSubmit({ preventDefault: () => { } });
  }, [userId, vendorId, getUserName])

  return (
    <>
      {data?.data?.length ? (
        <div className="space-y-3 mb-3">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-bold text-black">Delivery Address</h3>
            <Link
              href="/profile?tab=addresses"
              className="text-sm text-[#a5291b] font-bold  hover:text-red-700"
            // onClick={() => {onClose(),setOpenMoadl(!openModal)}}
            >
              Manage addresses
            </Link>
          </div>

          <div className="space-y-2">

            {data?.data
              ?.slice() // Create a shallow copy to avoid mutating original data
              .sort((a: any, b: any) => a.created_at.localeCompare(b.created_at))
              .map((address: any) => (
                <label
                  key={address.id}
                  className={`flex items-start p-2 rounded-lg border cursor-pointer
        ${selectedAddressId === address.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <input
                    type="radio"
                    name="deliveryAddress"
                    value={address.id}
                    checked={selectedAddressId === String(address.id)}
                    onChange={() => { handleSelectAddress(address) }}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {address.street}
                      {address.isDefault && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          Default
                        </span>
                      )}
                    </p>
                    <h3>{address?.address_type}</h3>
                    <span className="text-sm font-semibold text-gray-500">
                      {address.customer_name}
                    </span>
                    <p className="text-sm text-gray-500">
                      {address.email_address} | {address.contact_number}
                    </p>
                    <p className="text-sm text-gray-500">
                      {address.city}, {address.state} - {address.postal_code}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">{address.country}</p>
                  </div>
                </label>
              ))}
          </div>

        </div>
      ) : (
        <div className="text-center p-4 bg-gray-50 rounded-lg mb-3">
          <MapPin className="mx-auto h-8 w-8 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">No delivery address found</p>
          <p className="mt-2 inline-block text-sm text-[#a5291b] hover:text-red-700 font-bold cursor-pointer"
            onClick={() => {
              router.push('/profile?tab=addresses')
            }
              //  setOpenMoadl(!openModal)
            }
          >
            Add a delivery address
          </p>
        </div>
      )}


      <div className="bg-[#F8F7F2] rounded-xl p-3">

        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

        <div className="space-y-4 font-bold !text-gray-600">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{convertPrice(Number(totalAmount))}</span>
          </div>
        </div>
        {
          addressError ?
            <span className='mt-4 p-2 text-red-500'>{addressError}</span>
            :
            <>
              <div className="space-y-4 font-bold !text-gray-600 mt-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Deliver Charge (incl transaction charges)</span>
                  <span>{convertPrice(Number(DeliveryChargeValue?.final_delivery_charge))}</span>
                </div >
              </div >

              <div className="space-y-4 font-bold !text-gray-600 mt-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span>{convertPrice(Number(DeliveryChargeValue?.final_price_including_delivery))}</span>
                </div>
              </div>
            </>

        }


        {/* final_delivery_charge */}
        <div className="mt-6 space-y-4">
          {getAppliedCouponData?.data?.data?.applied_coupons?.length ? (
            <>
              {/* <div className="bg-green-50 p-4 rounded-lg space-y-2 flex justify-between">
              <div className=''>
                 <p className="text-sm text-green-700 font-bold mb-2">
                  Applied Coupon: {getAppliedCouponData?.data?.data?.data[0]?.code}
                </p>

                <p className="text-sm text-green-700 font-bold">
                  Discount Amount: ₹{getAppliedCouponData?.data?.data?.applied_coupons[0]?.discount || 0}
                </p>
              </div>
              <button
                onClick={handleRemoveCoupon}
                className="text-[#a5291b] border-red-300 hover:bg-red-50"
              >
                Remove Coupon
              </button> 
            </div> */}
            </>
          ) : (
            <div>
              {/* <h2 className="text-lg font-semibold mb-1">Coupon</h2>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Discount code"
                  className="bg-white w-full p-2"
                  value={code}
                  onChange={(e: any) => setCode(e.target.value.toUpperCase())}
                />
                <button disabled={!code || isChecking} onClick={handleSubmit} className="whitespace-nowrap bg-[#a5291b] p-2 rounded-md text-white font-bold hover:bg-red-700">
                  
                  {isChecking ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Apply'
                  )}
                </button>
              </div>
              {error && (
                <p className="text-sm text-[#a5291b]">{error}</p>
              )} */}
            </div>
          )}

          <div>
            <label className='text-xl font-semibold mb-6'>Payment Method</label>
            {paymentMethod?.map((item: any) => (
              <label
                className={`flex items-start mt-2 mb-2 p-3 rounded-lg border cursor-pointer
          ${paymentValue === item?.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={item?.value}
                  checked={paymentValue === String(item?.value)}
                  onChange={() => { handlePaymentMethod(item?.value) }}
                  className="mt-1 h-4 w-4 text-[#a5291b] border-gray-300 focus:ring-red-700"
                />
                <div className="ml-3">
                  <p className="text-sm  text-black font-bold">
                    {item?.label}
                  </p>
                </div>
              </label>
            ))}
          </div>

          {!data?.data?.length ? (
            <button className="w-full p-2 bg-[#a5291b] cursor-pointer hover:bg-red-700 text-white font-bold"
              onClick={() => {
                router.push('/profile?tab=addresses')
              }}
            >
              Add a delivery address
            </button>
          ) : (
            <>
              <button className="w-full p-2 flex gap-2 justify-center bg-[#a5291b] cursor-pointer hover:bg-red-700 text-white font-bold"
                onClick={handleCheckout}
                disabled={!selectedAddressId || loading}
              >
                {loading ? 'Processing...' : 'Proceed to Checkout'}
                {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              </button>
              {errorMessage && (
                <div className='text-[#a5291b] mt-2'>
                  {errorMessage}
                </div>
              )}
            </>
          )}
          <div className="text-center text-sm text-muted-foreground">
            <p>We accept:</p>
            <div className="flex justify-center gap-2 mt-2">
              <Image height={10} width={10} src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/visa.svg" alt="Visa" className="h-6 w-auto opacity-70" />
              <Image height={10} width={10} src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/mastercard.svg" alt="Mastercard" className="h-6 w-auto opacity-70" />
              <Image height={10} width={10} src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/paypal.svg" alt="PayPal" className="h-6 w-auto opacity-70" />
              <Image height={10} width={10} src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/applepay.svg" alt="Apple Pay" className="h-6 w-auto opacity-70" />
            </div>
          </div>
        </div>
      </div >
      {paymentSuccess && <OrderSuccessModal />}

    </>
  );
}