"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import RatingStars from "./RatingStars";
import PriceDisplay from "./PriceDisplay";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
}: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${product.name} added to cart`, {
      description: `Quantity: ${quantity}`,
    });
    setQuantity(1);
    onClose();
  };

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 10));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-5 gap-0"
            >
              {/* Product Image - 40% on desktop */}
              <div className="md:col-span-2 relative aspect-square bg-gray-50">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                {product.discount > 0 && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    -{product.discount}%
                  </span>
                )}
              </div>

              {/* Product Info - 60% on desktop */}
              <div className="md:col-span-3 p-6 flex flex-col gap-3">
                <DialogTitle className="text-lg font-bold text-gray-900 leading-tight">
                  {product.name}
                </DialogTitle>

                <p className="text-sm text-gray-500">
                  by <span className="text-blue-600 hover:underline">{product.brand}</span>
                </p>

                <div className="flex items-center gap-2">
                  <RatingStars rating={product.rating} size="sm" />
                  <span className="text-sm text-blue-600">
                    {product.reviewCount.toLocaleString()} ratings
                  </span>
                </div>

                <PriceDisplay
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  size="md"
                />

                <p className="text-sm text-gray-600 line-clamp-3">
                  {product.description}
                </p>

                {product.inStock ? (
                  <span className="text-sm font-medium text-green-700">In Stock</span>
                ) : (
                  <span className="text-sm font-medium text-red-600">Out of Stock</span>
                )}

                {/* Quantity Selector */}
                {product.inStock && (
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm font-medium text-gray-700">Qty:</span>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={decrementQuantity}
                        className="p-1.5 hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={incrementQuantity}
                        className="p-1.5 hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Add to Cart Button */}
                {product.inStock && (
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black font-medium border border-[#FCD200] shadow-none mt-2"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                )}

                {/* View Full Details Link */}
                <Link
                  href={`/products/${product.id}`}
                  onClick={onClose}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline text-center mt-1"
                >
                  View Full Details
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
