"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity, saveForLater } = useCartStore();

  return (
    <div className="flex gap-4 py-4 border-b last:border-b-0">
      <Link
        href={`/products/${item.product.id}`}
        className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-md overflow-hidden shrink-0"
      >
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          className="object-cover"
          sizes="128px"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${item.product.id}`}
          className="text-base font-medium text-gray-900 hover:text-[#FF9900] line-clamp-2"
        >
          {item.product.name}
        </Link>
        <p className="text-sm text-gray-500 mt-0.5">{item.product.brand}</p>

        {item.product.inStock ? (
          <p className="text-sm text-green-700 mt-1">In Stock</p>
        ) : (
          <p className="text-sm text-red-600 mt-1">Out of Stock</p>
        )}

        <div className="flex flex-wrap items-center gap-3 mt-2">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() =>
                updateQuantity(item.product.id, item.quantity - 1)
              }
              disabled={item.quantity <= 1}
              className="p-2 hover:bg-gray-100 disabled:opacity-50"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-3 text-sm font-medium min-w-[2rem] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                updateQuantity(item.product.id, item.quantity + 1)
              }
              className="p-2 hover:bg-gray-100"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <span className="text-gray-300">|</span>
          <button
            onClick={() => removeItem(item.product.id)}
            className="text-sm text-blue-600 hover:text-[#FF9900] hover:underline"
          >
            Delete
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => saveForLater(item.product.id)}
            className="text-sm text-blue-600 hover:text-[#FF9900] hover:underline"
          >
            Save for later
          </button>
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className="text-lg font-bold text-[#B12704]">
          {formatCurrency(item.product.price * item.quantity)}
        </p>
        {item.quantity > 1 && (
          <p className="text-xs text-gray-500">
            {formatCurrency(item.product.price)} each
          </p>
        )}
      </div>
    </div>
  );
}
