"use client";

import { useState } from "react";
import { ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { reviews as allReviews } from "@/data/reviews";
import RatingStars from "./RatingStars";
import { formatDate } from "@/lib/utils";

interface ProductReviewsProps {
  productId: string;
  rating: number;
  reviewCount: number;
}

export default function ProductReviews({
  productId,
  rating,
  reviewCount,
}: ProductReviewsProps) {
  const [showAll, setShowAll] = useState(false);

  const productReviews = allReviews.filter((r) => r.productId === productId);
  const displayedReviews = showAll
    ? productReviews
    : productReviews.slice(0, 5);

  // Rating distribution
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = productReviews.filter((r) => r.rating === star).length;
    const percentage =
      productReviews.length > 0
        ? Math.round((count / productReviews.length) * 100)
        : 0;
    return { star, count, percentage };
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>

      <div className="grid md:grid-cols-[280px_1fr] gap-8">
        {/* Rating Summary */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <RatingStars rating={rating} size="lg" />
            <span className="text-lg font-medium">
              {rating.toFixed(1)} out of 5
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {reviewCount.toLocaleString()} global ratings
          </p>

          <div className="space-y-2">
            {distribution.map(({ star, percentage }) => (
              <button
                key={star}
                className="flex items-center gap-2 w-full text-sm hover:text-[#FF9900]"
              >
                <span className="w-12 text-right text-blue-600">
                  {star} star
                </span>
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF9900] rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-10 text-right text-gray-600">
                  {percentage}%
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-4">
          {displayedReviews.length === 0 ? (
            <p className="text-gray-500">
              No reviews yet. Be the first to review this product!
            </p>
          ) : (
            displayedReviews.map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
                    {review.userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">{review.userName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <RatingStars rating={review.rating} />
                  <span className="font-bold text-sm">{review.title}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Reviewed on {formatDate(review.date)}
                </p>
                <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                    <ThumbsUp className="w-3 h-3" />
                    Helpful ({review.helpful})
                  </button>
                </div>
              </div>
            ))
          )}

          {productReviews.length > 5 && !showAll && (
            <Button
              variant="outline"
              onClick={() => setShowAll(true)}
              className="w-full"
            >
              See all {productReviews.length} reviews
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
