import { create } from "zustand";
import { persist } from "zustand/middleware";

import { priceStringToCents } from "@/lib/price";

export type CartLine = {
  id: string;
  quantity: number;
  name: string;
  image: string;
  /** Display string e.g. "$1,249" */
  priceFormatted: string;
  /** For subtotal math */
  unitPriceCents: number;
};

type CartPayload = {
  id: string;
  name: string;
  image: string;
  priceFormatted: string;
  unitPriceCents?: number;
};

type CartState = {
  items: CartLine[];
  /** Increments on each add-to-cart for header cart icon animation */
  cartAnimationGeneration: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addItem: (payload: CartPayload, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  /** Subtotal in cents (derived from current lines) */
  getTotal: () => number;
};

function normalizeLine(line: Partial<CartLine> & { id: string }): CartLine | null {
  if (!line.name || !line.image || !line.priceFormatted) return null;
  const unitPriceCents =
    line.unitPriceCents ?? priceStringToCents(line.priceFormatted);
  const qty = Math.max(1, Math.floor(line.quantity ?? 1));
  return {
    id: line.id,
    quantity: qty,
    name: line.name,
    image: line.image,
    priceFormatted: line.priceFormatted,
    unitPriceCents,
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      cartAnimationGeneration: 0,
      isDrawerOpen: false,
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set({ isDrawerOpen: !get().isDrawerOpen }),
      addItem: (payload, quantity = 1) => {
        const addQty = Math.max(1, Math.floor(quantity));
        const unitPriceCents =
          payload.unitPriceCents ?? priceStringToCents(payload.priceFormatted);
        const { items } = get();
        const existing = items.find((i) => i.id === payload.id);
        if (existing) {
          set({
            items: items.map((i) =>
              i.id === payload.id
                ? { ...i, quantity: i.quantity + addQty }
                : i
            ),
            cartAnimationGeneration: get().cartAnimationGeneration + 1,
          });
        } else {
          set({
            items: [
              ...items,
              {
                id: payload.id,
                quantity: addQty,
                name: payload.name,
                image: payload.image,
                priceFormatted: payload.priceFormatted,
                unitPriceCents,
              },
            ],
            cartAnimationGeneration: get().cartAnimationGeneration + 1,
          });
        }
      },
      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),
      updateQuantity: (id, quantity) => {
        const q = Math.floor(quantity);
        if (q <= 0) {
          set({ items: get().items.filter((i) => i.id !== id) });
          return;
        }
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: q } : i
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotal: () =>
        get().items.reduce(
          (n, i) => n + i.unitPriceCents * i.quantity,
          0
        ),
    }),
    {
      name: "jp-parts-cart-v2",
      partialize: (state) => ({ items: state.items }),
      merge: (persistedState, currentState) => {
        if (persistedState == null) return currentState;
        const p = persistedState as { items?: unknown };
        const raw = p.items;
        const items = Array.isArray(raw)
          ? raw
              .map((line) =>
                normalizeLine(line as Partial<CartLine> & { id: string })
              )
              .filter((x): x is CartLine => x !== null)
          : currentState.items;
        return { ...currentState, items };
      },
    }
  )
);

export function selectCartCount(state: CartState): number {
  return state.items.reduce((n, i) => n + i.quantity, 0);
}

export function selectCartSubtotalCents(state: CartState): number {
  return state.items.reduce(
    (n, i) => n + i.unitPriceCents * i.quantity,
    0
  );
}
