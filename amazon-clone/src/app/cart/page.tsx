"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import SaveForLater from "@/components/cart/SaveForLater";
import { useCartStore } from "@/store/cartStore";
import PageTransition from "@/components/ui/PageTransition";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, totalItems, clearCart } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-[1500px] mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="text-gray-500 mt-4">Loading...</p>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-[1500px] mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Button asChild className="bg-[#FF9900] hover:bg-[#FFa31a] text-black">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_350px] gap-6">
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">
                  {totalItems()} items in your cart
                </p>
                <button
                  onClick={clearCart}
                  className="text-sm text-blue-600 hover:text-[#FF9900] hover:underline"
                >
                  Clear cart
                </button>
              </div>
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            <div className="lg:sticky lg:top-[110px] lg:self-start">
              <CartSummary />
            </div>
          </div>
        )}

        <SaveForLater />
      </div>
    </PageTransition>
  );
}
