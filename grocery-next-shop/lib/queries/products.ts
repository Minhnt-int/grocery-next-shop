import { prisma } from "@/lib/db";
import type { Product } from "@/types/product";

function mapProduct(p: {
  id: number;
  name: string;
  slug: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  content: string | null;
  isFeatured: boolean;
  isFlashSale: boolean;
  metaTitle: string | null;
  metaDesc: string | null;
  metaKeywords: string | null;
  category: {
    id: number;
    name: string;
    slug: string;
    icon: string | null;
    banner: string | null;
    description: string | null;
    metaTitle: string | null;
    metaDesc: string | null;
    metaKeywords: string | null;
  };
}): Product {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    stock: p.stock,
    image: p.image,
    description: p.description,
    content: p.content,
    isFeatured: p.isFeatured,
    isFlashSale: p.isFlashSale,
    metaTitle: p.metaTitle,
    metaDesc: p.metaDesc,
    metaKeywords: p.metaKeywords,
    category: {
      id: p.category.id,
      name: p.category.name,
      slug: p.category.slug,
      icon: p.category.icon,
      banner: p.category.banner,
      description: p.category.description,
      metaTitle: p.category.metaTitle,
      metaDesc: p.category.metaDesc,
      metaKeywords: p.category.metaKeywords,
    },
  };
}

export async function searchProducts(query: string, saleOnly = false): Promise<Product[]> {
  if (!query || query.trim().length < 2) return [];

  const products = await prisma.product.findMany({
    where: {
      AND: [
        saleOnly ? { isFlashSale: true } : {},
        {
          OR: [{ name: { contains: query } }, { description: { contains: query } }],
        },
      ],
    },
    include: { category: true },
    take: 5,
    orderBy: { name: "asc" },
  });

  return products.map(mapProduct);
}

export async function getAllProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return products.map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
  return product ? mapProduct(product) : null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { isFeatured: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return products.map(mapProduct);
}

export async function getFlashSaleProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { isFlashSale: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return products.map(mapProduct);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { category: { slug: categorySlug } },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return products.map(mapProduct);
}
