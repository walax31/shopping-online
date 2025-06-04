import { FavoriteStore } from "@/types/favorite";
import { create } from "zustand";

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorites: [],
  addFavorite: (product) => {
    const exists = get().favorites.find((p) => p.id === product.id);
    if (!exists) {
      set({ favorites: [...get().favorites, product] });
    }
  },
  removeFavorite: (id) => {
    set({ favorites: get().favorites.filter((p) => p.id !== id) });
  },
  isFavorite: (id) => get().favorites.some((p) => p.id === id),
}));
