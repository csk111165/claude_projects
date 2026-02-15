"use client";

import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";

export default function RecommendedSection() {
  // Pick a diverse set of recommended products (different categories)
  const categorySet = new Set<string>();
  const recommended = products.filter((p) => {
    if (categorySet.has(p.category)) return false;
    if (categorySet.size >= 4) {
      // After covering 4 categories, add remaining high-rated
      return p.rating >= 4.3;
    }
    categorySet.add(p.category);
    return true;
  }).slice(0, 8);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Recommended For You</h2>
        <Link
          href="/products"
          className="text-sm text-blue-600 hover:text-[#FF9900] hover:underline"
        >
          Browse all
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommended.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
