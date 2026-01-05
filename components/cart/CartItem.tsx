"use client";

import { useState } from "react";
import { Minus, Plus, Trash2Icon, ChevronDown } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { deleteCartitemsApi, updateCartitemsApi } from "@/api-endpoints/CartsApi";
import { formatPrice } from "@/lib/utils";
import { useCurrency } from "@/context/CurrencyContext";

interface CartItemProps {
  product: any;
  quantity: number;
  selectedProduct: string;
  onSelectProduct: any;
}

const productOptions = [
  "AMETHYST RING",
  "BLACK TOURMALINE RING",
  "CARNELIAN RING",
  "EVIL EYE RING",
  "GOMATHI RING",
  "GREEN AVENTURINE RING",
  "JASPER RING",
  "LAPIS LAZULI RING",
  "OBSIDIAN RING",
  "PEARL RING",
  "PEARL RING BIG",
  "PILOT RING",
  "PYRITE POLISHED RING",
  "PYRITE RING",
  "RAW STONE PYRITE RING",
  "ROSE QUARTZ RING",
  "SHELL RING",
  "TIGER METAL RING",
  "Amitabha Buddhist CARD",
  "AMOGHAPASHA CARD",
  "ANGEL CARD",
  "CLAUNECK CARD",
  "COMPASS CARD",
  "DOOR MANTRA CARD",
  "KARMA REMOVE CARD",
  "KWAN YIN CARD",
  "MAMMON CARD",
  "MONEY SYMBOL CARD",
  "MONEY TREE CARD",
  "NAVAKUNJARAM CARD",
  "NITHIKA CARD",
  "RELATIONSHIP CARD",
  "SREE OM CARD",
  "WOLF CARD",
  "UTCHAISIRAVAS CARD",
];

// ✅ Allowed IDs that should show dropdown
const allowedProductIds = [19647, 19646, 19645, 19644, 19643, 19642, 19641, 19640, 19639, 19638, 19637, 19636, 19635, 19634, 19633]; // you can add more later


export default function CartItem({ product, quantity: initialQuantity, selectedProduct, onSelectProduct }: CartItemProps) {
  const queryClient = useQueryClient();
  const { convertPrice } = useCurrency();

  const handleUpdateCart = async (id: any, type: any, qty: any) => {
    try {
      if (qty === 1) {
        const updateApi = await deleteCartitemsApi(`${id}`);
        if (updateApi) {
          toast.success("Product removed!");
          queryClient.invalidateQueries(["getCartitemsData"] as InvalidateQueryFilters);
        }
      } else {
        const response = await updateCartitemsApi(`${id}/${type}/`);
        if (response) {
          toast.success("Product updated in cart!");
          queryClient.invalidateQueries(["getCartitemsData"] as InvalidateQueryFilters);
        }
      }
    } catch (error) { }
  };

  const handleRemoveItem = async (id: any) => {
    try {
      const updateApi = await deleteCartitemsApi(`${id}`);
      if (updateApi) {
        toast.success("Product removed!");
        queryClient.invalidateQueries(["getCartitemsData"] as InvalidateQueryFilters);
      }
    } catch (error: any) { }
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProduct = e.target.value;
    onSelectProduct(product.id, newProduct);
    toast.success(`Selected: ${newProduct}`);
  };
  const showDropdown = allowedProductIds.includes(Number(product?.id));

  return (
    <div className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-border last:border-0 last:pb-0">
      <div className="w-full sm:w-24 h-24 bg-white rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={
            product?.image_urls?.[0] ||
            product?.product_variant_image_urls?.[0] ||
            "https://semantic-ui.com/images/wireframe/image.png"
          }
          alt={product.name}
          className="w-full h-full object-cover"
          width={100}
          height={100}
        />
      </div>

      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold mb-1">
              {product?.name}
            </h3>



            <p className="text-sm font-bold text-muted-foreground py-1">
              Price: {convertPrice(Number(product?.price))}
            </p>
          </div>
          {/* ✅ Dropdown only for allowed IDs */}
          {showDropdown && (
            <div className="relative w-56 mb-3">
              <label
                htmlFor={`product-select-${product?.id}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Your free product!
              </label>

              <div className="relative">
                <select
                  id={`product-select-${product?.id}`}
                  value={selectedProduct}
                  onChange={handleDropdownChange}
                  className="appearance-none w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:border-black bg-white"
                >
                  <option value="">Select product</option>
                  {productOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          )}


          <button
            className="h-8 w-8 text-muted-foreground"
            onClick={() => handleRemoveItem(product?.cartId)}
          >
            <Trash2Icon className="h-4 w-4 hover:text-red-500" />
          </button>
        </div>

        <div className="flex justify-between items-end mt-2">
          <div className="flex items-center border-2 border-border rounded-md">
            <button
              className="h-8 w-8"
              onClick={() => handleUpdateCart(product?.cartId, "decrease", product?.cartQty)}
            >
              <Minus className="h-3 w-3 ml-2" />
            </button>

            <div className="w-10 text-center text-sm font-medium border-x-2">
              {product?.cartQty}
            </div>

            <button
              className="h-8 w-8"
              onClick={() => handleUpdateCart(product?.cartId, "increase", "")}
            >
              <Plus className="h-3 w-3 ml-2" />
            </button>
          </div>

          <div className="text-right font-semibold text-sm">
            <div>
              {convertPrice(Number(product?.price))} × {product?.cartQty}
            </div>
            <div>{convertPrice(Number(product?.price * product?.cartQty))}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
