import Link from "next/link";
import { Container } from "@/components/layout/container";
import { getAllPosts } from "@/lib/queries/posts";
import { generateSEO } from "@/lib/seo";
import { formatCurrencyVND } from "@/lib/utils";

export const metadata = generateSEO({
  title: "Tin tức",
  description: "Cập nhật tin tức mới nhất về sản phẩm, khuyến mãi và mẹo vặt mua sắm.",
  keywords: "tin tức, khuyến mãi, mẹo vặt, tạp hoá",
});

export default async function NewsPage() {
  const posts = await getAllPosts(true);

  return (
    <Container className="py-12">
      <h1 className="text-3xl font-bold mb-8">Tin tức</h1>

      {posts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Chưa có bài viết nào
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="group rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow bg-white"
            >
              {post.featuredImage && (
                <div className="aspect-video relative overflow-hidden bg-gray-100">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="font-semibold text-lg mb-2 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
                )}
                <p className="text-xs text-gray-400 mt-3">
                  {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
