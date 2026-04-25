import { prisma } from "@/lib/db";
import type { Post } from "@/types/post";

export async function getAllPosts(publishedOnly = true): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    where: publishedOnly ? { published: true } : undefined,
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  return post;
}

export async function getRecentPosts(limit = 5): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });

  return posts;
}
