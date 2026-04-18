import type { Category } from "./category";

export type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  isFeatured: boolean;
  isFlashSale: boolean;
  category: Category;
};
