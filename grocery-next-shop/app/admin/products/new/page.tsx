"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Category {
  id: number;
  name: string;
}

export default function AdminProductNewPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: "",
    stock: "",
    image: "",
    description: "",
    content: "",
    categoryId: "",
    isFeatured: false,
    isFlashSale: false,
    metaTitle: "",
    metaDesc: "",
    metaKeywords: "",
  });

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          stock: parseInt(form.stock),
          categoryId: parseInt(form.categoryId),
        }),
      });

      if (!res.ok) throw new Error("Failed to create product");

      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi tạo sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Thêm sản phẩm mới</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Thông tin cơ bản</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tên sản phẩm *</label>
                  <Input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Cà chua hữu cơ Đà Lạt"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Slug (URL) *</label>
                  <Input
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="ca-chua-huu-co-da-lat"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Giá (VNĐ) *</label>
                    <Input
                      required
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      placeholder="35000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tồn kho *</label>
                    <Input
                      required
                      type="number"
                      value={form.stock}
                      onChange={(e) => setForm({ ...form, stock: e.target.value })}
                      placeholder="100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">URL ảnh *</label>
                  <Input
                    required
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mô tả ngắn *</label>
                  <Textarea
                    required
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Mô tả ngắn gọn về sản phẩm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nội dung chi tiết</label>
                  <Textarea
                    rows={6}
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="Nội dung chi tiết (hỗ trợ HTML)"
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
                    placeholder="Để trống sẽ dùng tên sản phẩm"
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
                    placeholder="rau củ, hữu cơ, đà lạt"
                  />
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Phân loại</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Danh mục *</label>
                <select
                  required
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Trạng thái</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Sản phẩm nổi bật</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isFlashSale}
                    onChange={(e) => setForm({ ...form, isFlashSale: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Khuyến mãi</span>
                </label>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Đang lưu..." : "Tạo sản phẩm"}
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
