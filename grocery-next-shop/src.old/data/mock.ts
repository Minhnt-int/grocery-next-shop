import { Category, Product } from '@/types';

export const categories: Category[] = [
  { id: 1, name: 'Rau Củ', slug: 'rau-cu', icon: '🥬' },
  { id: 2, name: 'Đồ Uống', slug: 'do-uong', icon: '🥤' },
  { id: 3, name: 'Gạo & Ngũ Cốc', slug: 'gao-ngu-coc', icon: '🍚' },
  { id: 4, name: 'Gia Vị', slug: 'gia-vi', icon: '🧂' },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Cà chua hữu cơ Đà Lạt',
    slug: 'ca-chua-huu-co-da-lat',
    price: 35000,
    stock: 120,
    image: 'https://images.unsplash.com/photo-1546470427-22797b77f73b?w=600&auto=format&fit=crop',
    description: 'Cà chua tươi, ngọt tự nhiên, phù hợp salad và nấu canh.',
    categoryId: 1,
    isFeatured: true,
  },
  {
    id: 2,
    name: 'Nước cam ép nguyên chất',
    slug: 'nuoc-cam-ep-nguyen-chat',
    price: 45000,
    stock: 80,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop',
    description: '100% cam tươi, không đường, giàu vitamin C.',
    categoryId: 2,
    isFeatured: true,
    isFlashSale: true,
  },
  {
    id: 3,
    name: 'Gạo ST25 thượng hạng 5kg',
    slug: 'gao-st25-thuong-hang-5kg',
    price: 195000,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31d?w=600&auto=format&fit=crop',
    description: 'Gạo thơm, dẻo, chuẩn chất lượng cao cấp.',
    categoryId: 3,
    isFlashSale: true,
  },
  {
    id: 4,
    name: 'Muối hồng Himalaya',
    slug: 'muoi-hong-himalaya',
    price: 65000,
    stock: 55,
    image: 'https://images.unsplash.com/photo-1518110925495-5fe2e53b8f96?w=600&auto=format&fit=crop',
    description: 'Gia vị cao cấp giúp bữa ăn thêm đậm đà.',
    categoryId: 4,
    isFeatured: true,
  },
];
