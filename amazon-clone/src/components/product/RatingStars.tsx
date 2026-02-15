import { Star, StarHalf } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export default function RatingStars({ rating, size = "sm", showValue = false }: RatingStarsProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const iconSize = sizeClasses[size];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0) - (rating % 1 >= 0.75 ? 1 : 0);
  const extraFull = rating % 1 >= 0.75 ? 1 : 0;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: fullStars + extraFull }, (_, i) => (
        <Star
          key={`full-${i}`}
          className={`${iconSize} fill-[#FF9900] text-[#FF9900]`}
        />
      ))}
      {hasHalf && (
        <div className="relative">
          <Star className={`${iconSize} text-gray-300`} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className={`${iconSize} fill-[#FF9900] text-[#FF9900]`} />
          </div>
        </div>
      )}
      {Array.from({ length: emptyStars }, (_, i) => (
        <Star key={`empty-${i}`} className={`${iconSize} text-gray-300`} />
      ))}
      {showValue && (
        <span className="ml-1 text-sm text-gray-600 font-medium">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
