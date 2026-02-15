import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";

export default function Loading() {
  return (
    <div className="bg-gray-100">
      {/* Hero Banner Skeleton */}
      <Skeleton className="h-[300px] sm:h-[400px] lg:h-[500px] w-full rounded-none" />

      <div className="max-w-[1500px] mx-auto px-4 -mt-24 relative z-10 space-y-6 pb-8">
        {/* Category Cards Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-4">
              <Skeleton className="h-5 w-24 mb-2" />
              <Skeleton className="aspect-[4/3] w-full rounded-md" />
              <Skeleton className="h-4 w-16 mt-2" />
            </div>
          ))}
        </div>

        {/* Deal of the Day Skeleton */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="grid md:grid-cols-[300px_1fr] gap-6">
            <Skeleton className="aspect-square w-full rounded-md" />
            <div className="space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-10 w-36 rounded-md" />
            </div>
          </div>
        </div>

        {/* Product Row Skeleton */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
