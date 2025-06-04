import { ProductItem } from "./product";

export interface FavoriteStore {
  favorites: ProductItem[];
  addFavorite: (product: ProductItem) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}
