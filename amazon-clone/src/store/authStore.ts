import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Order } from "@/lib/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  orders: Order[];
  signIn: (email: string, password: string) => boolean;
  signUp: (name: string, email: string, password: string) => boolean;
  signOut: () => void;
  addOrder: (order: Order) => void;
  cancelOrder: (orderId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      orders: [],

      signIn: (email: string, _password: string) => {
        // Mock authentication - accept any valid-looking email
        if (email && email.includes("@")) {
          const name = email.split("@")[0];
          set({
            user: {
              id: "user-1",
              name: name.charAt(0).toUpperCase() + name.slice(1),
              email,
            },
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },

      signUp: (name: string, email: string, _password: string) => {
        if (name && email && email.includes("@")) {
          set({
            user: {
              id: "user-" + Date.now(),
              name,
              email,
            },
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },

      signOut: () => {
        set({ user: null, isAuthenticated: false });
      },

      addOrder: (order: Order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },

      cancelOrder: (orderId: string) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status: "cancelled" as const } : order
          ),
        }));
      },
    }),
    {
      name: "novamart-auth",
    }
  )
);
