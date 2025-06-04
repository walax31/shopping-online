import { ProductItem } from "./product";

export interface CartItem extends ProductItem {
  quantity: number;
}

export interface CartStore {
  cart: CartItem[];
  addToCart: (product: ProductItem) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;
}
