// components/SkeletonProduct.tsx
export default function SkeletonProduct() {
    return (
        <div className="animate-pulse grid md:grid-cols-2 gap-8">
            {/* Image Skeleton */}
            <div className="w-full h-[400px] bg-gray-300 rounded-lg" />

            {/* Info Skeleton */}
            <div className="space-y-4">
                <div className="w-3/4 h-6 bg-gray-300 rounded" />
                <div className="w-1/2 h-6 bg-gray-300 rounded" />
                <div className="w-full h-4 bg-gray-200 rounded" />
                <div className="w-full h-4 bg-gray-200 rounded" />
                <div className="w-full h-10 bg-gray-200 rounded mt-4" />
                <div className="w-1/2 h-10 bg-gray-400 rounded" />
            </div>
        </div>
    );
}
