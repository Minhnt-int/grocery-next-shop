"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AdminPostNewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to create post");

      router.push("/admin/posts");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi tạo bài viết");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Viết bài mới</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Nội dung bài viết</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tiêu đề *</label>
                  <Input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Tiêu đề bài viết"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Slug (URL) *</label>
                  <Input
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="tieu-de-bai-viet"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mô tả ngắn</label>
                  <Textarea
                    rows={3}
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    placeholder="Tóm tắt ngắn gọn nội dung bài viết"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nội dung *</label>
                  <Textarea
                    required
                    rows={16}
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="Nội dung chi tiết (hỗ trợ HTML)"
                  />
                  <p className="text-xs text-gray-500 mt-1">Hỗ trợ HTML: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, etc.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">URL ảnh đại diện</label>
                  <Input
                    value={form.featuredImage}
                    onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">SEO</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Meta Title</label>
                  <Input
                    value={form.metaTitle}
                    onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                    placeholder="Để trống sẽ dùng tiêu đề bài viết"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Meta Description</label>
                  <Textarea
                    rows={3}
                    value={form.metaDesc}
                    onChange={(e) => setForm({ ...form, metaDesc: e.target.value })}
                    placeholder="Để trống sẽ dùng mô tả ngắn"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Meta Keywords</label>
                  <Input
                    value={form.metaKeywords}
                    onChange={(e) => setForm({ ...form, metaKeywords: e.target.value })}
                    placeholder="tin tức, khuyến mãi, mẹo vặt"
                  />
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Xuất bản</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Xuất bản ngay</span>
                </label>
                <p className="text-xs text-gray-500">
                  {form.published ? "Bài viết sẽ hiển thị công khai" : "Lưu dưới dạng bản nháp"}
                </p>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Đang lưu..." : form.published ? "Xuất bản" : "Lưu nháp"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={loading}
              >
                Hủy
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
