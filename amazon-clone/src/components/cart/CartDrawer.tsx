"use client";

import { ShoppingCart, X, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { formatCurrency } from "@/lib/utils";

export default function CartDrawer() {
  const { isCartOpen, closeCart } = useUIStore();
  const { items, removeItem, updateQuantity, saveForLater, subtotal, totalItems } =
    useCartStore();

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-4 py-3 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Cart ({totalItems()} items)
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
            <ShoppingCart className="w-16 h-16 text-gray-300" />
            <p className="text-lg font-medium text-gray-500">
              Your cart is empty
            </p>
            <Button asChild onClick={closeCart}>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.product.id}`}
                      onClick={closeCart}
                      className="text-sm font-medium line-clamp-2 hover:text-[#FF9900]"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm font-bold text-[#B12704] mt-1">
                      {formatCurrency(item.product.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="p-1 hover:bg-gray-100 disabled:opacity-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          className="p-1 hover:bg-gray-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => saveForLater(item.product.id)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Save for later
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span>
                  Subtotal ({totalItems()} items):
                </span>
                <span className="font-bold text-[#B12704]">
                  {formatCurrency(subtotal())}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" asChild onClick={closeCart}>
                  <Link href="/cart">View Cart</Link>
                </Button>
                <Button
                  asChild
                  className="bg-[#FF9900] hover:bg-[#FFa31a] text-black"
                  onClick={closeCart}
                >
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
