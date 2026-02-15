"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

interface ProductCarouselProps {
  title: string;
  filterTag?: string;
}

export default function ProductCarousel({ title, filterTag }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredProducts = filterTag
    ? products.filter((p) => p.tags.includes(filterTag))
    : products;

  // If no products match the tag, show a random selection
  const displayProducts = filteredProducts.length > 0
    ? filteredProducts.slice(0, 12)
    : products.slice(0, 12);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="relative group">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-24 bg-white/90 hover:bg-white shadow-md rounded-r-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 scroll-smooth"
        >
          {displayProducts.map((product) => (
            <div key={product.id} className="shrink-0 w-[200px]">
              <ProductCard product={product} showAddToCart={false} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-24 bg-white/90 hover:bg-white shadow-md rounded-l-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
