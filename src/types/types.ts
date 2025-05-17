export interface Product {
  toFixed(arg0: number): unknown;
  id: number;
  name: string;
  price: number;
  quantity?: number;
  discountPrice: number | null;
  rating: number;
  image: string;
  category: string;
}