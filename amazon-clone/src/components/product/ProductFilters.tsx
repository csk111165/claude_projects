"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { PRICE_RANGES, RATING_FILTERS } from "@/lib/constants";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import RatingStars from "./RatingStars";

export default function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";
  const currentRating = searchParams.get("rating") || "";
  const currentBrand = searchParams.get("brand") || "";

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const toggleParam = useCallback(
    (key: string, value: string) => {
      const current = searchParams.get(key) || "";
      if (current === value) {
        updateParams(key, "");
      } else {
        updateParams(key, value);
      }
    },
    [searchParams, updateParams]
  );

  // Get unique brands from products
  const brands = [...new Set(products.map((p) => p.brand))].sort();

  const clearFilters = () => {
    const params = new URLSearchParams();
    const q = searchParams.get("q");
    const sort = searchParams.get("sort");
    if (q) params.set("q", q);
    if (sort) params.set("sort", sort);
    router.push(`${pathname}?${params.toString()}`);
  };

  const hasFilters = currentCategory || currentMinPrice || currentMaxPrice || currentRating || currentBrand;

  return (
    <div className="space-y-6">
      {hasFilters && (
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:underline"
        >
          Clear all filters
        </button>
      )}

      {/* Category Filter */}
      <div>
        <h3 className="font-bold text-sm text-gray-900 mb-2">Category</h3>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => toggleParam("category", cat.slug)}
              className={`block w-full text-left text-sm py-0.5 hover:text-[#FF9900] transition-colors ${
                currentCategory === cat.slug
                  ? "text-[#FF9900] font-medium"
                  : "text-gray-600"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="font-bold text-sm text-gray-900 mb-2">Price</h3>
        <div className="space-y-1.5">
          {PRICE_RANGES.map((range) => {
            const isActive =
              currentMinPrice === String(range.min) &&
              (range.max === Infinity
                ? !currentMaxPrice
                : currentMaxPrice === String(range.max));
            return (
              <button
                key={range.label}
                onClick={() => {
                  if (isActive) {
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete("minPrice");
                    params.delete("maxPrice");
                    router.push(`${pathname}?${params.toString()}`);
                  } else {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("minPrice", String(range.min));
                    if (range.max !== Infinity) {
                      params.set("maxPrice", String(range.max));
                    } else {
                      params.delete("maxPrice");
                    }
                    router.push(`${pathname}?${params.toString()}`);
                  }
                }}
                className={`block w-full text-left text-sm py-0.5 hover:text-[#FF9900] transition-colors ${
                  isActive ? "text-[#FF9900] font-medium" : "text-gray-600"
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Rating Filter */}
      <div>
        <h3 className="font-bold text-sm text-gray-900 mb-2">
          Customer Review
        </h3>
        <div className="space-y-1.5">
          {RATING_FILTERS.map((rating) => (
            <button
              key={rating}
              onClick={() => toggleParam("rating", String(rating))}
              className={`flex items-center gap-2 w-full text-left text-sm py-0.5 hover:text-[#FF9900] transition-colors ${
                currentRating === String(rating)
                  ? "text-[#FF9900] font-medium"
                  : "text-gray-600"
              }`}
            >
              <RatingStars rating={rating} />
              <span>& Up</span>
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Brand Filter */}
      <div>
        <h3 className="font-bold text-sm text-gray-900 mb-2">Brand</h3>
        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {brands.slice(0, 15).map((brand) => (
            <button
              key={brand}
              onClick={() => toggleParam("brand", brand)}
              className={`block w-full text-left text-sm py-0.5 hover:text-[#FF9900] transition-colors ${
                currentBrand === brand
                  ? "text-[#FF9900] font-medium"
                  : "text-gray-600"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
