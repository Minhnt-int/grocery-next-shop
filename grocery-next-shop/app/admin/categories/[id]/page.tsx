"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AdminCategoryEditPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        const category = data.find((item: { id: number }) => item.id === Number(params.id));

        if (category) {
          setForm({
            name: category.name || "",
            slug: category.slug || "",
            icon: category.icon || "",
            banner: category.banner || "",
            description: category.description || "",
            metaTitle: category.metaTitle || "",
            metaDesc: category.metaDesc || "",
            metaKeywords: category.metaKeywords || "",
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
      const res = await fetch(`/api/categories/${form.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update category");

      router.push("/admin/categories");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi cập nhật danh mục");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Bạn có chắc muốn xóa danh mục này? Các sản phẩm thuộc danh mục này sẽ bị ảnh hưởng.")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/categories/${form.slug}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete category");

      router.push("/admin/categories");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi xóa danh mục");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="text-gray-500">Đang tải dữ liệu danh mục...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Chỉnh sửa danh mục</h1>
        <Button variant="outline" onClick={handleDelete} disabled={loading} className="text-red-600 border-red-300 hover:bg-red-50">
          Xóa danh mục
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="max-w-3xl space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin cơ bản</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tên danh mục *</label>
                <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Slug (URL) *</label>
                <Input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Icon (emoji)</label>
                <Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} maxLength={2} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">URL banner</label>
                <Input value={form.banner} onChange={(e) => setForm({ ...form, banner: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mô tả</label>
                <Textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">SEO</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Meta Title</label>
                <Input value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Meta Description</label>
                <Textarea rows={3} value={form.metaDesc} onChange={(e) => setForm({ ...form, metaDesc: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Meta Keywords</label>
                <Input value={form.metaKeywords} onChange={(e) => setForm({ ...form, metaKeywords: e.target.value })} />
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? "Đang lưu..." : "Cập nhật danh mục"}
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
