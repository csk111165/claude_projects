"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";
import ProductSort from "@/components/product/ProductSort";
import MobileFilterDrawer from "@/components/product/MobileFilterDrawer";
import { Product } from "@/lib/types";

function ProductsContent() {
  const searchParams = useSearchParams();

  const q = searchParams.get("q")?.toLowerCase() || "";
  const category = searchParams.get("category") || "";
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;
  const rating = Number(searchParams.get("rating")) || 0;
  const brand = searchParams.get("brand") || "";
  const sort = searchParams.get("sort") || "featured";

  let filtered: Product[] = [...products];

  // Search query
  if (q) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Category filter
  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  // Price filter
  filtered = filtered.filter((p) => p.price >= minPrice && p.price <= maxPrice);

  // Rating filter
  if (rating > 0) {
    filtered = filtered.filter((p) => p.rating >= rating);
  }

  // Brand filter
  if (brand) {
    filtered = filtered.filter((p) => p.brand === brand);
  }

  // Sorting
  switch (sort) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      filtered.sort((a, b) => b.id.localeCompare(a.id));
      break;
    default:
      // Featured - keep original order
      break;
  }

  const resultText = q
    ? `Search results for "${q}"`
    : category
    ? `${category.charAt(0).toUpperCase() + category.slice(1).replace("-", " & ")}`
    : "All Products";

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{resultText}</h1>
          <p className="text-sm text-gray-500">{filtered.length} results</p>
        </div>
        <div className="flex items-center gap-2">
          <MobileFilterDrawer />
          <ProductSort />
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-[110px]">
            <ProductFilters />
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="max-w-[1500px] mx-auto px-4 py-6">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
