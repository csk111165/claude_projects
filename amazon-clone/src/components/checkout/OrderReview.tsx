"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cartStore";
import { ShippingAddress, PaymentInfo } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface OrderReviewProps {
  shippingAddress: ShippingAddress;
  paymentInfo?: PaymentInfo | null;
  onPlaceOrder: () => void;
  onBack: () => void;
  isPlacing: boolean;
}

export default function OrderReview({
  shippingAddress,
  paymentInfo,
  onPlaceOrder,
  onBack,
  isPlacing,
}: OrderReviewProps) {
  const { items, subtotal, tax, shipping, total } = useCartStore();

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-lg font-bold text-gray-900">Review Your Order</h2>

      {/* Shipping Address */}
      <div className="bg-gray-50 border rounded-lg p-4">
        <h3 className="font-medium text-sm text-gray-900 mb-2">
          Shipping Address
        </h3>
        <p className="text-sm text-gray-600">
          {shippingAddress.fullName}
          <br />
          {shippingAddress.address}
          <br />
          {shippingAddress.city}, {shippingAddress.state}{" "}
          {shippingAddress.zipCode}
          <br />
          {shippingAddress.country}
          <br />
          Phone: {shippingAddress.phone}
        </p>
      </div>

      {/* Payment */}
      <div className="bg-gray-50 border rounded-lg p-4">
        <h3 className="font-medium text-sm text-gray-900 mb-2">
          Payment Method
        </h3>
        <p className="text-sm text-gray-600">
          {paymentInfo?.displayText || "Credit Card ending in ****"}
        </p>
      </div>

      {/* Items */}
      <div className="border rounded-lg p-4">
        <h3 className="font-medium text-sm text-gray-900 mb-3">
          Order Items ({items.length})
        </h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-3">
              <div className="relative w-16 h-16 bg-gray-50 rounded overflow-hidden shrink-0">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-1">
                  {item.product.name}
                </p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-bold shrink-0">
                {formatCurrency(item.product.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Total */}
      <div className="border rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span>{formatCurrency(subtotal())}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping() === 0 ? "FREE" : formatCurrency(shipping())}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span>{formatCurrency(tax())}</span>
        </div>
        <Separator />
        <div className="flex justify-between text-lg font-bold">
          <span>Order Total</span>
          <span className="text-[#B12704]">{formatCurrency(total())}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={onPlaceOrder}
          disabled={isPlacing}
          className="bg-[#FFD814] hover:bg-[#F7CA00] text-black font-bold border border-[#FCD200] shadow-none"
        >
          {isPlacing ? "Placing Order..." : "Place Your Order"}
        </Button>
      </div>
    </div>
  );
}
