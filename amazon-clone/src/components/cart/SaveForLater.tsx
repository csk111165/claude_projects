"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import RatingStars from "@/components/product/RatingStars";

export default function SaveForLater() {
  const { savedItems, moveToCart, removeSavedItem } = useCartStore();

  if (savedItems.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        Saved for Later ({savedItems.length} items)
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {savedItems.map((item) => (
          <div
            key={item.product.id}
            className="bg-white border rounded-lg overflow-hidden"
          >
            <Link
              href={`/products/${item.product.id}`}
              className="relative aspect-square bg-gray-50 block"
            >
              <Image
                src={item.product.images[0]}
                alt={item.product.name}
                fill
                className="object-cover"
                sizes="200px"
              />
            </Link>
            <div className="p-3 space-y-2">
              <Link
                href={`/products/${item.product.id}`}
                className="text-sm font-medium line-clamp-2 hover:text-[#FF9900]"
              >
                {item.product.name}
              </Link>
              <p className="text-lg font-bold text-[#B12704]">
                {formatCurrency(item.product.price)}
              </p>
              <RatingStars rating={item.product.rating} />
              <div className="flex flex-col gap-1.5">
                <Button
                  size="sm"
                  onClick={() => moveToCart(item.product.id)}
                  className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black text-xs border border-[#FCD200] shadow-none"
                >
                  Move to Cart
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeSavedItem(item.product.id)}
                  className="w-full text-xs"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
