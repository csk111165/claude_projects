import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, CartItem } from "@/lib/types";
import { SHIPPING_THRESHOLD, SHIPPING_COST, TAX_RATE } from "@/lib/constants";

interface CartState {
  items: CartItem[];
  savedItems: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  saveForLater: (productId: string) => void;
  moveToCart: (productId: string) => void;
  removeSavedItem: (productId: string) => void;
  totalItems: () => number;
  subtotal: () => number;
  tax: () => number;
  shipping: () => number;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      savedItems: [],

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { items: [...state.items, { product, quantity }] };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      saveForLater: (productId: string) => {
        const item = get().items.find((i) => i.product.id === productId);
        if (!item) return;
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
          savedItems: [...state.savedItems, { ...item, quantity: 1 }],
        }));
      },

      moveToCart: (productId: string) => {
        const item = get().savedItems.find((i) => i.product.id === productId);
        if (!item) return;
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.product.id === productId
          );
          if (existingItem) {
            return {
              savedItems: state.savedItems.filter(
                (i) => i.product.id !== productId
              ),
              items: state.items.map((i) =>
                i.product.id === productId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return {
            savedItems: state.savedItems.filter(
              (i) => i.product.id !== productId
            ),
            items: [...state.items, { ...item, quantity: 1 }],
          };
        });
      },

      removeSavedItem: (productId: string) => {
        set((state) => ({
          savedItems: state.savedItems.filter(
            (i) => i.product.id !== productId
          ),
        }));
      },

      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      subtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      tax: () => {
        return get().subtotal() * TAX_RATE;
      },

      shipping: () => {
        const subtotal = get().subtotal();
        if (subtotal === 0) return 0;
        return subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
      },

      total: () => {
        return get().subtotal() + get().tax() + get().shipping();
      },
    }),
    {
      name: "novamart-cart",
    }
  )
);
