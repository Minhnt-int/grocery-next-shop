import { prisma } from "@/lib/db";
import type { Category } from "@/types/category";

export async function getAllCategories(): Promise<Category[]> {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return categories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    icon: c.icon,
    banner: c.banner,
    description: c.description,
    metaTitle: c.metaTitle,
    metaDesc: c.metaDesc,
    metaKeywords: c.metaKeywords,
  }));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) return null;

  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    icon: category.icon,
    banner: category.banner,
    description: category.description,
    metaTitle: category.metaTitle,
    metaDesc: category.metaDesc,
    metaKeywords: category.metaKeywords,
  };
}
