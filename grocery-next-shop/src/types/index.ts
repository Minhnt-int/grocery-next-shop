export interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  categoryId: number;
  category?: Category;
  isFeatured?: boolean;
  isFlashSale?: boolean;
}

export interface Order {
  id: number;
  items: Array<{ productId: number; quantity: number; price: number }>;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface ThemeConfig {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  secondaryLight: string;
  background: string;
  surface: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  font: string;
}
