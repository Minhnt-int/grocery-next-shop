"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AdminPostEditPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    published: false,
    metaTitle: "",
    metaDesc: "",
    metaKeywords: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        const post = data.find((item: { id: number }) => item.id === Number(params.id));

        if (post) {
          setForm({
            title: post.title || "",
            slug: post.slug || "",
            excerpt: post.excerpt || "",
            content: post.content || "",
            featuredImage: post.featuredImage || "",
            published: post.published || false,
            metaTitle: post.metaTitle || "",
            metaDesc: post.metaDesc || "",
            metaKeywords: post.metaKeywords || "",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setFetching(false);
      }
    };

    loadData();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/posts/${form.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update post");

      router.push("/admin/posts");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi cập nhật bài viết");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Bạn có chắc muốn xóa bài viết này?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${form.slug}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete post");

      router.push("/admin/posts");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi xóa bài viết");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="text-gray-500">Đang tải dữ liệu bài viết...</div>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Chỉnh sửa bài viết</h1>
        <Button variant="outline" onClick={handleDelete} disabled={loading} className="border-red-300 text-red-600 hover:bg-red-50">
          Xóa bài viết
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Nội dung bài viết</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Tiêu đề *</label>
                  <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Slug (URL) *</label>
                  <Input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Mô tả ngắn</label>
                  <Textarea rows={3} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Nội dung *</label>
                  <Textarea required rows={16} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
                  <p className="mt-1 text-xs text-gray-500">Hỗ trợ HTML cơ bản để hiển thị ở frontend.</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">URL ảnh đại diện</label>
                  <Input value={form.featuredImage} onChange={(e) => setForm({ ...form, featuredImage: e.target.value })} />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">SEO</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Meta Title</label>
                  <Input value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Meta Description</label>
                  <Textarea rows={3} value={form.metaDesc} onChange={(e) => setForm({ ...form, metaDesc: e.target.value })} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Meta Keywords</label>
                  <Input value={form.metaKeywords} onChange={(e) => setForm({ ...form, metaKeywords: e.target.value })} />
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Xuất bản</h2>
              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <span className="text-sm">Xuất bản công khai</span>
                </label>
                <p className="text-xs text-gray-500">
                  {form.published ? "Bài viết đang hiển thị ngoài frontend" : "Bài viết đang ở trạng thái nháp"}
                </p>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Đang lưu..." : "Cập nhật bài viết"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
                Hủy
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
