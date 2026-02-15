import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SavedPaymentMethod, PaymentMethodType } from "@/lib/types";
import { generateId } from "@/lib/utils";

interface PaymentState {
  methods: SavedPaymentMethod[];
  defaultMethodId: string | null;
  addMethod: (method: Omit<SavedPaymentMethod, "id" | "isDefault">, setAsDefault?: boolean) => void;
  updateMethod: (id: string, updates: Partial<Omit<SavedPaymentMethod, "id" | "isDefault">>) => void;
  removeMethod: (id: string) => void;
  setDefault: (id: string) => void;
  getDefault: () => SavedPaymentMethod | undefined;
}

export const usePaymentStore = create<PaymentState>()(
  persist(
    (set, get) => ({
      methods: [],
      defaultMethodId: null,

      addMethod: (method, setAsDefault = false) => {
        const id = generateId();
        const isFirst = get().methods.length === 0;
        const isDefault = setAsDefault || isFirst;

        set((state) => ({
          methods: [
            ...state.methods.map((m) =>
              isDefault ? { ...m, isDefault: false } : m
            ),
            { ...method, id, isDefault },
          ],
          defaultMethodId: isDefault ? id : state.defaultMethodId,
        }));
      },

      updateMethod: (id, updates) => {
        set((state) => ({
          methods: state.methods.map((m) =>
            m.id === id ? { ...m, ...updates } : m
          ),
        }));
      },

      removeMethod: (id) => {
        set((state) => {
          const remaining = state.methods.filter((m) => m.id !== id);
          const wasDefault = state.defaultMethodId === id;
          const newDefaultId = wasDefault
            ? remaining[0]?.id ?? null
            : state.defaultMethodId;

          return {
            methods: remaining.map((m) => ({
              ...m,
              isDefault: m.id === newDefaultId,
            })),
            defaultMethodId: newDefaultId,
          };
        });
      },

      setDefault: (id) => {
        set((state) => ({
          methods: state.methods.map((m) => ({
            ...m,
            isDefault: m.id === id,
          })),
          defaultMethodId: id,
        }));
      },

      getDefault: () => {
        const state = get();
        return state.methods.find((m) => m.id === state.defaultMethodId);
      },
    }),
    {
      name: "novamart-payments",
    }
  )
);

export function getPaymentDisplayText(method: SavedPaymentMethod): string {
  switch (method.type) {
    case "credit_card":
      return `Credit Card ending in ${method.cardLast4}`;
    case "debit_card":
      return `Debit Card ending in ${method.cardLast4}`;
    case "upi":
      return `UPI - ${method.upiId}`;
    case "net_banking":
      return `Net Banking - ${method.bankName}`;
    default:
      return method.label;
  }
}

export function getPaymentMethodLabel(type: PaymentMethodType): string {
  switch (type) {
    case "credit_card":
      return "Credit Card";
    case "debit_card":
      return "Debit Card";
    case "upi":
      return "UPI";
    case "net_banking":
      return "Net Banking";
  }
}
