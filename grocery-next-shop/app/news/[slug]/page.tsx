import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { getPostBySlug } from "@/lib/queries/posts";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return generateSEO({
      title: "Bài viết không tồn tại",
      description: "Không tìm thấy bài viết bạn yêu cầu.",
      type: "article",
    });
  }

  return generateSEO({
    title: post.metaTitle || post.title,
    description: post.metaDesc || post.excerpt || post.title,
    keywords: post.metaKeywords || undefined,
    image: post.featuredImage || undefined,
    url: `https://yoursite.com/news/${post.slug}`,
    type: "article",
  });
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <Container className="py-12">
      <article className="mx-auto max-w-3xl bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-sm text-gray-400 mb-6">
          {new Date(post.createdAt).toLocaleDateString("vi-VN")}
        </p>

        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full rounded-lg mb-6"
          />
        )}

        <div
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </Container>
  );
}
