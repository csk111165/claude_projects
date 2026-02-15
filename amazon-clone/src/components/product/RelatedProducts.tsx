"use client";

import { products } from "@/data/products";
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

export default function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const related = products
    .filter((p) => p.category === category && p.id !== currentProductId)
    .slice(0, 6);

  if (related.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Customers who viewed this also bought
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} showAddToCart={false} />
        ))}
      </div>
    </div>
  );
}
