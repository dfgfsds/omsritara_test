import React, { useState } from 'react';
import { ArrowLeft, Heart, Trash2 } from 'lucide-react';
import { useProducts } from '@/context/ProductsContext';
import { useWishList } from '@/context/WishListContext';
import { useCartItem } from '@/context/CartItemContext';
import ProductCard from '@/components/ProductCard';
import { useRouter } from 'next/navigation';


function WishList() {
  const { products, isAuthenticated, isLoading }: any = useProducts();
  const { wishList, wishListLoading }: any = useWishList();
  const { cartItem }: any = useCartItem();
  const router = useRouter();

  const matchingProductsArray = products?.data?.map((product: any, index: number) => {
    const matchingCartItem = cartItem?.data?.find(
      (item: any) => item?.product === product?.id
    );

    if (matchingCartItem) {
      return {
        ...product,
        Aid: index,
        cartQty: matchingCartItem?.quantity,
        cartId: matchingCartItem.id,
      };
    }
    return product;
  });


  const finalProductData = matchingProductsArray?.map((item: any) => {
    const wishLists = wishList?.data?.find(
      (wish: any) => wish?.product === item?.id
    );
    return {
      ...item,
      isLike: wishLists ? true : false,
      wishListId: wishLists?.id
    };
  });

  const likedProducts = finalProductData?.filter((item: any) => item?.isLike);

  function slugConvert(name: string) {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')         // Replace spaces with hyphens
      .replace(/[^\w-]+/g, '');     // Remove non-word characters except hyphens
  }


  return (
    <div className="max-w-6xl mx-auto py-10 px-2 md:px-4">
      <div className="my-2 mb-5 flex">
        <ArrowLeft onClick={() => router.back()} className='text-gray-400 cursor-pointer' />
        <p className="text-md text-gray-400 flex mt-0.5 gap-1">
          <span className='cursor-pointer flex' onClick={() => router.back()} >
            Back</span> / <span className='text-[#a5291b]'>Wishlist</span></p>

      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">My Wishlist</h2>

      {/* Product Grid */}
      {likedProducts?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6" >
          {likedProducts?.map((product: any, idx: any) => (
            <div
              key={idx}
              className=""
            // onClick={() => router.push(`/shop/${product?.id}`)}
            >
              <ProductCard
                image={product?.image_urls[0] || ''}
                hoverImage={product?.image_urls[1] || ''}
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
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mb-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 13h6m2 9H7a2 2 0 01-2-2V5a2 2 0 012-2h5l2 2h5a2 2 0 012 2v13a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="text-lg font-semibold">No Products Found</h3>
          <p className="text-sm mt-1">Try adjusting your filters or search term.</p>
        </div>
      )}

    </div>
  );
}

export default WishList;
