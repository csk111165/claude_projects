import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface PriceDisplayProps {
  price: number;
  originalPrice: number;
  discount: number;
  size?: "sm" | "md" | "lg";
}

export default function PriceDisplay({
  price,
  originalPrice,
  discount,
  size = "md",
}: PriceDisplayProps) {
  const sizeClasses = {
    sm: { price: "text-lg", original: "text-sm", badge: "text-xs" },
    md: { price: "text-2xl", original: "text-base", badge: "text-xs" },
    lg: { price: "text-3xl", original: "text-lg", badge: "text-sm" },
  };

  const classes = sizeClasses[size];

  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <span className={`${classes.price} font-bold text-[#B12704]`}>
        {formatCurrency(price)}
      </span>
      {discount > 0 && (
        <>
          <span className={`${classes.original} text-gray-500 line-through`}>
            {formatCurrency(originalPrice)}
          </span>
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            -{discount}%
          </Badge>
        </>
      )}
    </div>
  );
}
