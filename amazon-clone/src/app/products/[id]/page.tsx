"use client";

import { use, useEffect } from "react";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductReviews from "@/components/product/ProductReviews";
import RelatedProducts from "@/components/product/RelatedProducts";
import RecentlyViewed from "@/components/product/RecentlyViewed";
import { useRecentlyViewedStore } from "@/store/recentlyViewedStore";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const addRecentlyViewed = useRecentlyViewedStore((s) => s.addItem);

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
    }
  }, [product, addRecentlyViewed]);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-6 space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#FF9900]">Home</Link>
        <span>/</span>
        <Link href={`/category/${product.category}`} className="hover:text-[#FF9900] capitalize">
          {product.category.replace("-", " & ")}
        </Link>
        <span>/</span>
        <span className="text-gray-900 truncate">{product.name}</span>
      </nav>

      {/* Product Main Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        <ProductGallery images={product.images} name={product.name} />
        <ProductInfo product={product} />
      </div>

      <Separator />

      {/* Reviews */}
      <ProductReviews
        productId={product.id}
        rating={product.rating}
        reviewCount={product.reviewCount}
      />

      <Separator />

      {/* Related Products */}
      <RelatedProducts
        currentProductId={product.id}
        category={product.category}
      />

      <Separator />

      {/* Recently Viewed */}
      <RecentlyViewed />
    </div>
  );
}
