import { prisma } from '@/lib/prisma';
import { products as mockProducts, categories as mockCategories } from '@/data/mock';

type ProductLike = {
  id: number;
  categoryId: number;
  isFeatured?: boolean;
  isFlashSale?: boolean;
};

export async function getProducts() {
  try {
    const data = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
    if (data.length === 0) return mockProducts;
    return data;
  } catch {
    return mockProducts;
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const data = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });
    if (data) return data;
  } catch {
    // ignore and fallback below
  }
  return mockProducts.find((p) => p.slug === slug) ?? null;
}

export async function getCategories() {
  try {
    const data = await prisma.category.findMany({ orderBy: { id: 'asc' } });
    if (data.length === 0) return mockCategories;
    return data;
  } catch {
    return mockCategories;
  }
}

export async function getFeaturedProducts() {
  const all = (await getProducts()) as ProductLike[];
  return all.filter((p) => Boolean(p.isFeatured));
}

export async function getFlashSaleProducts() {
  const all = (await getProducts()) as ProductLike[];
  return all.filter((p) => Boolean(p.isFlashSale));
}
