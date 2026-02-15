"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentForm from "@/components/checkout/PaymentForm";
import OrderReview from "@/components/checkout/OrderReview";
import OrderConfirmation from "@/components/checkout/OrderConfirmation";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { ShippingAddress, PaymentInfo, Order } from "@/lib/types";
import { generateId } from "@/lib/utils";
import PageTransition from "@/components/ui/PageTransition";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isPlacing, setIsPlacing] = useState(false);

  const { items, total, clearCart } = useCartStore();
  const { addOrder } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-[1500px] mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        <p className="text-gray-500 mt-4">Loading...</p>
      </div>
    );
  }

  if (items.length === 0 && !orderId) {
    return (
      <div className="max-w-[1500px] mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mb-6">
          Add some items to your cart before checking out.
        </p>
        <Button asChild className="bg-[#FF9900] hover:bg-[#FFa31a] text-black">
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  if (orderId) {
    return (
      <div className="max-w-[1500px] mx-auto px-4 py-6">
        <OrderConfirmation orderId={orderId} />
      </div>
    );
  }

  const handleShippingSubmit = (address: ShippingAddress) => {
    setShippingAddress(address);
    setStep(1);
  };

  const handlePaymentSubmit = (info: PaymentInfo) => {
    setPaymentInfo(info);
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddress) return;
    setIsPlacing(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newOrderId = generateId().toUpperCase();
    const order: Order = {
      id: newOrderId,
      items: [...items],
      total: total(),
      status: "processing",
      date: new Date().toISOString(),
      shippingAddress,
    };

    addOrder(order);
    clearCart();
    setOrderId(newOrderId);
    setIsPlacing(false);
  };

  return (
    <PageTransition>
      <div className="max-w-[1500px] mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
        <CheckoutSteps currentStep={step} />

        {step === 0 && (
          <ShippingForm
            onSubmit={handleShippingSubmit}
            initialData={shippingAddress || undefined}
          />
        )}
        {step === 1 && (
          <PaymentForm
            onSubmit={handlePaymentSubmit}
            onBack={() => setStep(0)}
          />
        )}
        {step === 2 && shippingAddress && (
          <OrderReview
            shippingAddress={shippingAddress}
            paymentInfo={paymentInfo}
            onPlaceOrder={handlePlaceOrder}
            onBack={() => setStep(1)}
            isPlacing={isPlacing}
          />
        )}
      </div>
    </PageTransition>
  );
}
