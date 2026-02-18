import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  maxQuantity?: number; // Nowe pole: limit magazynowy
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void; // Nowa funkcja
  totalPrice: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (newItem) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === newItem.id);
          if (existingItem) {
            // Sprawdzamy limit przed dodaniem
            const limit = existingItem.maxQuantity || 1;
            if (existingItem.quantity >= limit) return state; // Nie dodawaj powyżej limitu

            return {
              items: state.items.map((i) =>
                i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                ...newItem,
                quantity: 1,
                maxQuantity: newItem.maxQuantity || 1,
              },
            ],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      // Nowa logika zmiany ilości
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id !== id) return item;

            // Zabezpieczenia
            const limit = item.maxQuantity || 1;
            const newQuantity = Math.max(1, Math.min(quantity, limit)); // Min 1, Max limit

            return { ...item, quantity: newQuantity };
          }),
        })),

      totalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
