"use client";

import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";

export default function TrendingGrid() {
  // Pick products with high ratings as "trending"
  const trending = [...products]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 8);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Trending Now</h2>
        <Link
          href="/products?sort=rating"
          className="text-sm text-blue-600 hover:text-[#FF9900] hover:underline"
        >
          See all deals
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {trending.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
