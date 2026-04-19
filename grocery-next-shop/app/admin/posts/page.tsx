import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllPosts } from "@/lib/queries/posts";

export default async function AdminPostsPage() {
  const posts = await getAllPosts(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Quản lý tin tức</h1>
        <Link href="/admin/posts/new">
          <Button>+ Viết bài mới</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="font-semibold text-lg">{post.title}</h2>
                  <span className={`text-xs px-2 py-1 rounded-full ${post.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                    {post.published ? "Đã xuất bản" : "Bản nháp"}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">/{post.slug}</p>
                {post.excerpt && (
                  <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                )}
              </div>
              <Link href={`/admin/posts/${post.id}`}>
                <Button variant="outline" size="sm">Sửa</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
