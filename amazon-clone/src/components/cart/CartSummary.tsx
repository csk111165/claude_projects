"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import { SHIPPING_THRESHOLD } from "@/lib/constants";

export default function CartSummary() {
  const { totalItems, subtotal, tax, shipping, total } = useCartStore();

  const sub = subtotal();
  const freeShippingRemaining = SHIPPING_THRESHOLD - sub;

  return (
    <div className="bg-gray-50 border rounded-lg p-6 space-y-4">
      {freeShippingRemaining > 0 && sub > 0 && (
        <div className="bg-blue-50 text-blue-800 text-sm p-3 rounded-md">
          Add{" "}
          <span className="font-bold">
            {formatCurrency(freeShippingRemaining)}
          </span>{" "}
          more to qualify for <span className="font-bold">FREE Shipping</span>
        </div>
      )}

      {sub > 0 && freeShippingRemaining <= 0 && (
        <div className="bg-green-50 text-green-800 text-sm p-3 rounded-md">
          Your order qualifies for <span className="font-bold">FREE Shipping!</span>
        </div>
      )}

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({totalItems()} items)</span>
          <span>{formatCurrency(sub)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping() === 0 ? "FREE" : formatCurrency(shipping())}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Estimated tax</span>
          <span>{formatCurrency(tax())}</span>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between text-lg font-bold">
        <span>Order Total</span>
        <span className="text-[#B12704]">{formatCurrency(total())}</span>
      </div>

      <Button
        asChild
        className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black font-medium border border-[#FCD200] shadow-none"
        disabled={totalItems() === 0}
      >
        <Link href="/checkout">Proceed to Checkout</Link>
      </Button>
    </div>
  );
}
