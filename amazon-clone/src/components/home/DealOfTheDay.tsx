"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { deals } from "@/data/deals";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import RatingStars from "@/components/product/RatingStars";

function CountdownTimer({ endTime }: { endTime: string }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(endTime).getTime() - Date.now();
      if (diff <= 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex items-center gap-1">
      {[
        { value: timeLeft.hours, label: "hrs" },
        { value: timeLeft.minutes, label: "min" },
        { value: timeLeft.seconds, label: "sec" },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-1">
          {i > 0 && <span className="text-[#B12704] font-bold">:</span>}
          <span className="bg-[#131921] text-white px-2 py-1 rounded text-sm font-mono font-bold min-w-[2.5rem] text-center">
            {String(item.value).padStart(2, "0")}
          </span>
          <span className="text-xs text-gray-500">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function DealOfTheDay() {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);
  const deal = deals[0];

  if (!deal) return null;

  const handleAddToCart = () => {
    addItem(deal.product);
    openCart();
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Deal of the Day</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Ends in:</span>
          <CountdownTimer endTime={deal.endTime} />
        </div>
      </div>

      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        <Link href={`/products/${deal.product.id}`} className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden group">
          <Image
            src={deal.product.images[0]}
            alt={deal.product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="300px"
          />
          <Badge className="absolute top-3 left-3 bg-red-600 text-white hover:bg-red-600">
            -{deal.product.discount}% OFF
          </Badge>
        </Link>

        <div>
          <Link href={`/products/${deal.product.id}`} className="text-lg font-medium text-gray-900 hover:text-[#FF9900] line-clamp-2">
            {deal.product.name}
          </Link>
          <div className="flex items-center gap-2 mt-2">
            <RatingStars rating={deal.product.rating} />
            <span className="text-sm text-blue-600">{deal.product.reviewCount.toLocaleString()} ratings</span>
          </div>
          <div className="flex items-baseline gap-3 mt-3">
            <span className="text-3xl font-bold text-[#B12704]">
              {formatCurrency(deal.dealPrice)}
            </span>
            <span className="text-lg text-gray-500 line-through">
              {formatCurrency(deal.originalPrice)}
            </span>
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              Save {formatCurrency(deal.originalPrice - deal.dealPrice)}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mt-3 line-clamp-2">
            {deal.product.description}
          </p>
          <div className="flex gap-3 mt-4">
            <Button
              onClick={handleAddToCart}
              className="bg-[#FF9900] hover:bg-[#FFa31a] text-black font-bold"
            >
              Add to Cart
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/products/${deal.product.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
