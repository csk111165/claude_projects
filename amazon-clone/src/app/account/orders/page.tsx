"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Package, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function OrdersPage() {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, orders, cancelOrder } = useAuthStore();
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/auth/signin");
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !isAuthenticated) {
    return (
      <div className="max-w-[1500px] mx-auto px-4 py-6">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-yellow-100 text-yellow-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            No orders yet
          </h2>
          <p className="text-gray-500 mb-6">
            When you place an order, it will show up here.
          </p>
          <Button asChild className="bg-[#FF9900] hover:bg-[#FFa31a] text-black">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-sm">
                <div className="flex flex-wrap gap-6">
                  <div>
                    <span className="text-gray-500">ORDER PLACED</span>
                    <p className="font-medium">{formatDate(order.date)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">TOTAL</span>
                    <p className="font-medium">{formatCurrency(order.total)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">ORDER #</span>
                    <p className="font-medium">{order.id}</p>
                  </div>
                </div>
                <Badge className={statusColors[order.status]}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>

              {/* Order Items */}
              <div className="p-4 space-y-3">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <Link
                      href={`/products/${item.product.id}`}
                      className="relative w-20 h-20 bg-gray-50 rounded overflow-hidden shrink-0"
                    >
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.product.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-[#FF9900] line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-bold">
                        {formatCurrency(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cancel Order */}
              {order.status === "processing" && (
                <div className="px-4 pb-4">
                  {confirmingId === order.id ? (
                    <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800 flex-1">
                        Are you sure you want to cancel this order?
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setConfirmingId(null)}
                      >
                        No, Keep It
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          cancelOrder(order.id);
                          setConfirmingId(null);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Yes, Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setConfirmingId(order.id)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Cancel Order
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
