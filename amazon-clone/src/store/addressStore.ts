import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SavedAddress, ShippingAddress } from "@/lib/types";
import { generateId } from "@/lib/utils";

interface AddressState {
  addresses: SavedAddress[];
  defaultAddressId: string | null;
  addAddress: (
    address: ShippingAddress,
    label: string,
    setAsDefault?: boolean
  ) => void;
  updateAddress: (
    id: string,
    updates: Partial<ShippingAddress & { label: string }>
  ) => void;
  removeAddress: (id: string) => void;
  setDefault: (id: string) => void;
  getDefault: () => SavedAddress | undefined;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: [],
      defaultAddressId: null,

      addAddress: (
        address: ShippingAddress,
        label: string,
        setAsDefault = false
      ) => {
        const id = generateId();
        const isFirst = get().addresses.length === 0;
        const isDefault = setAsDefault || isFirst;

        set((state) => ({
          addresses: [
            ...state.addresses.map((a) =>
              isDefault ? { ...a, isDefault: false } : a
            ),
            { ...address, id, label, isDefault },
          ],
          defaultAddressId: isDefault ? id : state.defaultAddressId,
        }));
      },

      updateAddress: (
        id: string,
        updates: Partial<ShippingAddress & { label: string }>
      ) => {
        set((state) => ({
          addresses: state.addresses.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          ),
        }));
      },

      removeAddress: (id: string) => {
        set((state) => {
          const remaining = state.addresses.filter((a) => a.id !== id);
          const wasDefault = state.defaultAddressId === id;
          const newDefaultId = wasDefault
            ? remaining[0]?.id ?? null
            : state.defaultAddressId;

          return {
            addresses: remaining.map((a) => ({
              ...a,
              isDefault: a.id === newDefaultId,
            })),
            defaultAddressId: newDefaultId,
          };
        });
      },

      setDefault: (id: string) => {
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
          defaultAddressId: id,
        }));
      },

      getDefault: () => {
        const state = get();
        return state.addresses.find((a) => a.id === state.defaultAddressId);
      },
    }),
    {
      name: "novamart-addresses",
    }
  )
);
