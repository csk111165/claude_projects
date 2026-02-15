"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import ProductGrid from "@/components/product/ProductGrid";
import ProductSort from "@/components/product/ProductSort";
import { Product } from "@/lib/types";
import { SORT_OPTIONS } from "@/lib/constants";

function CategoryContent({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const sub = searchParams.get("sub") || "";
  const sort = searchParams.get("sort") || "featured";

  let filtered: Product[] = products.filter((p) => p.category === slug);

  if (sub) {
    filtered = filtered.filter((p) => p.subcategory === sub);
  }

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
      break;
  }

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#FF9900]">Home</Link>
        <span>/</span>
        <span className="text-gray-900">{category.name}</span>
        {sub && (
          <>
            <span>/</span>
            <span className="text-gray-900 capitalize">
              {sub.replace(/-/g, " ")}
            </span>
          </>
        )}
      </nav>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
          <p className="text-sm text-gray-500">{filtered.length} products</p>
        </div>
        <ProductSort />
      </div>

      {/* Subcategory Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href={`/category/${slug}`}
          className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
            !sub
              ? "bg-[#131921] text-white border-[#131921]"
              : "bg-white text-gray-700 border-gray-300 hover:border-[#FF9900]"
          }`}
        >
          All
        </Link>
        {category.subcategories.map((subcat) => (
          <Link
            key={subcat.id}
            href={`/category/${slug}?sub=${subcat.slug}`}
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
              sub === subcat.slug
                ? "bg-[#131921] text-white border-[#131921]"
                : "bg-white text-gray-700 border-gray-300 hover:border-[#FF9900]"
            }`}
          >
            {subcat.name}
          </Link>
        ))}
      </div>

      <ProductGrid products={filtered} />
    </div>
  );
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  return (
    <Suspense fallback={<div className="max-w-[1500px] mx-auto px-4 py-6">Loading...</div>}>
      <CategoryContent slug={slug} />
    </Suspense>
  );
}
