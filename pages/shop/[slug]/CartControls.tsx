// components/CartControls.tsx
"use client";
import LoginModal from "@/pages/LoginModal/page";
import { Minus, Plus, ShoppingCart } from "lucide-react";

interface CartControlsProps {
    totalQty: number;
    userId: string | null;
    cartId: string | null;
    handleUpdateCart: (id: any, type: string, qty: any) => void;
    handleAddCart: (id: any) => void;
    setSignInModal: (open: boolean) => void;
    productId: string | number | undefined;
    cartItemId?: any;
    signInmodal?: any
    vendorId?:any
}

export default function CartControls({
    totalQty,
    userId,
    cartId,
    handleUpdateCart,
    handleAddCart,
    setSignInModal,
    productId,
    cartItemId,
    signInmodal,
    vendorId
}: CartControlsProps) {


    return (
        <div className="space-y-4">
            {/* Quantity Selector */}
            <div>
                <label className="block text-md font-bold text-black">Quantity</label>
                <div className="flex items-center w-full md:w-[180px] mt-2">
                    {/* Decrease */}
                    <button
                        className="h-10 w-10 border rounded-l flex items-center justify-center disabled:opacity-50"
                        onClick={() => {
                            if (userId) {
                                handleUpdateCart(cartItemId, "decrease", totalQty);
                            } else {
                                setSignInModal(true);
                            }
                        }}
                        // disabled={!totalQty}
                        disabled={!cartItemId || totalQty == 0}
                    >
                        <Minus className="h-4 w-4" />
                    </button>

                    {/* Qty Display */}
                    <div className="flex-1 h-10 border-t border-b flex items-center justify-center font-medium">
                        {totalQty || 0}
                    </div>

                    {/* Increase */}
                    <button
                        className="h-10 w-10 border rounded-r flex items-center justify-center"
                        onClick={() => {
                            if (userId) {
                                handleUpdateCart(cartItemId, "increase", '');
                            } else {
                                setSignInModal(true);
                            }
                        }}
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Add to Cart Button */}
            <button
                className="bg-[#a5291b] text-white px-5 py-2 rounded hover:bg-red-700 flex items-center gap-2"
                onClick={() => {
                    if (userId) {
                        handleAddCart(productId);
                    } else {
                        setSignInModal(true);
                    }
                }}
            >
                <ShoppingCart size={18} /> Add to Cart
            </button>
            {signInmodal && (
                <LoginModal
                    open={signInmodal}
                    handleClose={() => setSignInModal(false)}
                    vendorId={vendorId}
                />
            )}
        </div>
    );
}
