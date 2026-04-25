import type { Category } from "./category";

export type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  content?: string | null;
  isFeatured: boolean;
  isFlashSale: boolean;
  metaTitle?: string | null;
  metaDesc?: string | null;
  metaKeywords?: string | null;
  category: Category;
};
