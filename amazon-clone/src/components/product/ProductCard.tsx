"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Heart } from "lucide-react";
import { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import RatingStars from "./RatingStars";
import QuickViewModal from "./QuickViewModal";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

export default function ProductCard({ product, showAddToCart = true }: ProductCardProps) {
  const [mounted, setMounted] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist);

  useEffect(() => {
    setMounted(true);
  }, []);

  const inWishlist = mounted ? isInWishlist(product.id) : false;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    openCart();
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    if (inWishlist) {
      toast("Removed from Wishlist");
    } else {
      toast.success("Added to Wishlist");
    }
  };

  const isBestSeller = product.tags?.includes("best-seller");
  const isTopRated = product.tags?.includes("top-rated");

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
          {product.discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-600 text-white hover:bg-red-600">
              -{product.discount}%
            </Badge>
          )}
          {isBestSeller && (
            <Badge className="absolute top-9 left-2 bg-orange-500 text-white hover:bg-orange-500 text-[10px] px-1.5 py-0.5">
              Best Seller
            </Badge>
          )}
          {isTopRated && (
            <Badge
              className="absolute left-2 bg-blue-600 text-white hover:bg-blue-600 text-[10px] px-1.5 py-0.5"
              style={{ top: isBestSeller ? "4.25rem" : product.discount > 0 ? "2.25rem" : "0.5rem" }}
            >
              Top Rated
            </Badge>
          )}
          {/* Wishlist Heart Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-sm transition-all ${
              inWishlist ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                inWishlist
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400 hover:text-red-400"
              }`}
            />
          </button>
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-sm bg-black/70 px-3 py-1 rounded">
                Out of Stock
              </span>
            </div>
          )}
          <button
            onClick={handleQuickView}
            className="absolute bottom-2 right-2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        <div className="p-3">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-[#FF9900] transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <RatingStars rating={product.rating} />
            <span className="text-xs text-blue-600">
              {product.reviewCount.toLocaleString()}
            </span>
          </div>
          <div className="mt-1.5">
            <span className="text-lg font-bold text-[#B12704]">
              {formatCurrency(product.price)}
            </span>
            {product.discount > 0 && (
              <span className="text-xs text-gray-500 line-through ml-2">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {product.price >= 35 ? (
              <span className="text-green-700">FREE Shipping</span>
            ) : (
              "Shipping from $5.99"
            )}
          </p>
        </div>
      </Link>

      {showAddToCart && product.inStock && (
        <div className="px-3 pb-3">
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black text-xs font-medium border border-[#FCD200] shadow-none"
          >
            Add to Cart
          </Button>
        </div>
      )}

      <QuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </motion.div>
  );
}
