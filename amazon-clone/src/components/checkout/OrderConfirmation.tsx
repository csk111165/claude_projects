"use client";

import { CheckCircle, Package } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface OrderConfirmationProps {
  orderId: string;
}

export default function OrderConfirmation({ orderId }: OrderConfirmationProps) {
  return (
    <div className="text-center py-12 max-w-lg mx-auto">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-2">
          Thank you for your order. Your order number is:
        </p>
        <p className="text-lg font-mono font-bold text-[#FF9900] mb-6">
          #{orderId}
        </p>

        <div className="bg-gray-50 border rounded-lg p-4 mb-6 text-left">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-sm">Estimated Delivery</span>
          </div>
          <p className="text-sm text-gray-600 ml-8">
            Your items will arrive within 3-5 business days.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="outline">
            <Link href="/account/orders">View Orders</Link>
          </Button>
          <Button
            asChild
            className="bg-[#FF9900] hover:bg-[#FFa31a] text-black"
          >
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
