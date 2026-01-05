import React from 'react';

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow relative animate-pulse">
      {/* Image Placeholder */}
      <div className="relative h-[165px] md:h-[260px] w-full bg-gray-200">
        {/* Discount badge placeholder */}
        <div className="absolute top-2 left-2 bg-gray-300 h-5 w-14 rounded-md" />

        {/* Action buttons */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full" />
        <div className="absolute bottom-1.5 left-4 md:left-[calc(50%-80px)] w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full" />
        <div className="absolute bottom-1.5 right-4 md:right-[calc(50%-80px)] w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full" />
      </div>

      {/* Product Info Placeholder */}
      <div className="px-6 py-6">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="flex justify-between items-center">
          <div className="h-4 w-20 bg-gray-300 rounded" />
          <div className="h-4 w-12 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
