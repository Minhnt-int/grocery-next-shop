import { prisma } from "@/lib/db";
import type { Product } from "@/types/product";

export async function searchProducts(query: string): Promise<Product[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { description: { contains: query } },
      ],
    },
    include: {
      category: true,
    },
    take: 5,
    orderBy: {
      name: "asc",
    },
  });

  return products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    stock: p.stock,
    image: p.image,
    description: p.description,
    isFeatured: p.isFeatured,
    isFlashSale: p.isFlashSale,
    category: {
      id: p.category.id,
      name: p.category.name,
      slug: p.category.slug,
      icon: p.category.icon,
    },
  }));
}

export async function getAllProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    stock: p.stock,
    image: p.image,
    description: p.description,
    isFeatured: p.isFeatured,
    isFlashSale: p.isFlashSale,
    category: {
      id: p.category.id,
      name: p.category.name,
      slug: p.category.slug,
      icon: p.category.icon,
    },
  }));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });

  if (!product) return null;

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    stock: product.stock,
    image: product.image,
    description: product.description,
    isFeatured: product.isFeatured,
    isFlashSale: product.isFlashSale,
    category: {
      id: product.category.id,
      name: product.category.name,
      slug: product.category.slug,
      icon: product.category.icon,
    },
  };
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { isFeatured: true },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    stock: p.stock,
    image: p.image,
    description: p.description,
    isFeatured: p.isFeatured,
    isFlashSale: p.isFlashSale,
    category: {
      id: p.category.id,
      name: p.category.name,
      slug: p.category.slug,
      icon: p.category.icon,
    },
  }));
}

export async function getFlashSaleProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { isFlashSale: true },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    stock: p.stock,
    image: p.image,
    description: p.description,
    isFeatured: p.isFeatured,
    isFlashSale: p.isFlashSale,
    category: {
      id: p.category.id,
      name: p.category.name,
      slug: p.category.slug,
      icon: p.category.icon,
    },
  }));
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: categorySlug,
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    stock: p.stock,
    image: p.image,
    description: p.description,
    isFeatured: p.isFeatured,
    isFlashSale: p.isFlashSale,
    category: {
      id: p.category.id,
      name: p.category.name,
      slug: p.category.slug,
      icon: p.category.icon,
    },
  }));
}
