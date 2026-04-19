"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AdminCategoryNewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    icon: "",
    banner: "",
    description: "",
    metaTitle: "",
    metaDesc: "",
    metaKeywords: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to create category");

      router.push("/admin/categories");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi tạo danh mục");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Thêm danh mục mới</h1>

      <form onSubmit={handleSubmit}>
        <div className="max-w-3xl space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin cơ bản</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tên danh mục *</label>
                <Input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Rau Củ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Slug (URL) *</label>
                <Input
                  required
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="rau-cu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Icon (emoji)</label>
                <Input
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  placeholder="🥬"
                  maxLength={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">URL banner</label>
                <Input
                  value={form.banner}
                  onChange={(e) => setForm({ ...form, banner: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mô tả</label>
                <Textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Mô tả ngắn về danh mục"
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
                  placeholder="Để trống sẽ dùng tên danh mục"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Meta Description</label>
                <Textarea
                  rows={3}
                  value={form.metaDesc}
                  onChange={(e) => setForm({ ...form, metaDesc: e.target.value })}
                  placeholder="Để trống sẽ dùng mô tả"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Meta Keywords</label>
                <Input
                  value={form.metaKeywords}
                  onChange={(e) => setForm({ ...form, metaKeywords: e.target.value })}
                  placeholder="rau củ, tươi ngon, hữu cơ"
                />
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? "Đang lưu..." : "Tạo danh mục"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
              Hủy
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
