import { create } from "zustand";
import { CartStore } from "@/types/cart";

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  addToCart: (product) => {
    const existing = get().cart.find((item) => item.id === product.id);
    if (existing) {
      set({
        cart: get().cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({
        cart: [...get().cart, { ...product, quantity: 1 }],
      });
    }
  },
  increaseQuantity: (id) => {
    set({
      cart: get().cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
  },
  decreaseQuantity: (id) => {
    const target = get().cart.find((item) => item.id === id);
    if (target && target.quantity === 1) {
      get().removeItem(id);
    } else {
      set({
        cart: get().cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ),
      });
    }
  },
  removeItem: (id) => {
    set({
      cart: get().cart.filter((item) => item.id !== id),
    });
  },
}));
