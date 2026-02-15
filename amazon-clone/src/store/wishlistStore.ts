import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/types";

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (product: Product) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          if (state.items.find((p) => p.id === product.id)) return state;
          return { items: [...state.items, product] };
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((p) => p.id !== productId) })),
      isInWishlist: (productId) => get().items.some((p) => p.id === productId),
      toggleItem: (product) => {
        const exists = get().items.some((p) => p.id === product.id);
        if (exists) {
          set((state) => ({ items: state.items.filter((p) => p.id !== product.id) }));
        } else {
          set((state) => ({ items: [...state.items, product] }));
        }
      },
    }),
    { name: "novamart-wishlist" }
  )
);
