"use client";

import { useState, useEffect, useMemo } from "react";
import { Check, ShieldCheck, Truck, RotateCcw, Minus, Plus, Heart } from "lucide-react";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import RatingStars from "./RatingStars";
import PriceDisplay from "./PriceDisplay";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { toast } from "sonner";

interface ProductInfoProps {
  product: Product;
}

function getEstimatedDeliveryDate(): string {
  const today = new Date();
  let businessDays = 0;
  const targetDays = 5; // 3-5 business days, show the outer bound
  const date = new Date(today);
  while (businessDays < targetDays) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) {
      businessDays++;
    }
  }
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [mounted, setMounted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist);

  useEffect(() => {
    setMounted(true);
  }, []);

  const inWishlist = mounted ? isInWishlist(product.id) : false;

  const estimatedDelivery = useMemo(() => getEstimatedDeliveryDate(), []);

  const boughtCount = Math.round(product.reviewCount / 3);
  const boughtLabel =
    boughtCount >= 1000
      ? `${(boughtCount / 1000).toFixed(1).replace(/\.0$/, "")}K+`
      : `${boughtCount.toLocaleString()}+`;

  const handleAddToCart = () => {
    addItem(product, quantity);
    openCart();
  };

  const handleToggleWishlist = () => {
    toggleItem(product);
    if (inWishlist) {
      toast("Removed from Wishlist");
    } else {
      toast.success("Added to Wishlist");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-medium text-gray-900">
          {product.name}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          by <span className="text-blue-600 hover:text-[#FF9900] cursor-pointer">{product.brand}</span>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <RatingStars rating={product.rating} size="md" showValue />
        <Separator orientation="vertical" className="h-4" />
        <span className="text-sm text-blue-600 hover:text-[#FF9900] cursor-pointer">
          {product.reviewCount.toLocaleString()} ratings
        </span>
      </div>

      <p className="text-sm text-gray-700">
        <span className="font-medium">{boughtLabel} bought in past month</span>
      </p>

      <Separator />

      <PriceDisplay
        price={product.price}
        originalPrice={product.originalPrice}
        discount={product.discount}
        size="lg"
      />

      {product.price >= 35 && (
        <p className="text-sm text-gray-600">
          <span className="text-green-700 font-medium">FREE delivery</span>{" "}
          on orders over $35
        </p>
      )}

      <Separator />

      <p className="text-sm text-gray-700 leading-relaxed">
        {product.description}
      </p>

      {/* Features */}
      {product.features.length > 0 && (
        <ul className="space-y-1.5">
          {product.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
              {feature}
            </li>
          ))}
        </ul>
      )}

      <Separator />

      {/* Buy Box */}
      <div className="bg-gray-50 border rounded-lg p-4 space-y-3">
        <PriceDisplay
          price={product.price}
          originalPrice={product.originalPrice}
          discount={product.discount}
        />

        {product.inStock ? (
          <>
            <p className="text-green-700 font-medium text-sm">In Stock</p>

            {product.reviewCount < 500 ? (
              <p className="text-amber-600 text-xs font-medium">
                Only a few left in stock - order soon.
              </p>
            ) : product.reviewCount < 1000 ? (
              <p className="text-amber-700 text-xs font-medium">
                In stock. Order soon.
              </p>
            ) : null}

            <p className="text-green-700 text-xs font-medium">
              FREE delivery {estimatedDelivery}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Qty:</span>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-3 text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black font-medium border border-[#FCD200] shadow-none"
            >
              Add to Cart
            </Button>
            <Button
              onClick={() => {
                addItem(product, quantity);
                window.location.href = "/checkout";
              }}
              className="w-full bg-[#FF9900] hover:bg-[#FFa31a] text-black font-medium"
            >
              Buy Now
            </Button>
            <Button
              variant="outline"
              onClick={handleToggleWishlist}
              className="w-full text-sm"
            >
              <Heart
                className={`w-4 h-4 mr-2 ${
                  inWishlist ? "fill-red-500 text-red-500" : ""
                }`}
              />
              {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </Button>
          </>
        ) : (
          <p className="text-red-600 font-medium text-sm">Currently Unavailable</p>
        )}

        <div className="space-y-2 text-xs text-gray-600 pt-2">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <span>Free delivery on orders over $35</span>
          </div>
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            <span>30-day return policy</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure transaction</span>
          </div>
        </div>
      </div>

      {/* Specs */}
      {Object.keys(product.specs).length > 0 && (
        <div>
          <h3 className="font-bold text-base text-gray-900 mb-2">
            Technical Details
          </h3>
          <div className="border rounded-md overflow-hidden">
            {Object.entries(product.specs).map(([key, value], i) => (
              <div
                key={key}
                className={`flex text-sm ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <span className="w-40 px-3 py-2 font-medium text-gray-700 shrink-0">
                  {key}
                </span>
                <span className="px-3 py-2 text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
