export interface ProductItem {
  id: string;
  name: string;
  desc: string;
  image: string;
  price: number;
  rating: RatingItem;
}

export interface RatingItem {
  rate: number;
  count: number;
}
