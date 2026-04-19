"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Category {
  id: number;
  name: string;
}

export default function AdminProductEditPage() {
  const params = useParams();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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
    const loadData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/products"),
        ]);

        const categoriesData = await categoriesRes.json();
        const productsData = await productsRes.json();
        const product = productsData.find((item: { id: number }) => item.id === Number(params.id));

        setCategories(categoriesData);

        if (product) {
          setForm({
            name: product.name || "",
            slug: product.slug || "",
            price: String(product.price || ""),
            stock: String(product.stock || ""),
            image: product.image || "",
            description: product.description || "",
            content: product.content || "",
            categoryId: String(product.category?.id || ""),
            isFeatured: product.isFeatured || false,
            isFlashSale: product.isFlashSale || false,
            metaTitle: product.metaTitle || "",
            metaDesc: product.metaDesc || "",
            metaKeywords: product.metaKeywords || "",
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
      const res = await fetch(`/api/products/${form.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          stock: parseInt(form.stock),
          categoryId: parseInt(form.categoryId),
        }),
      });

      if (!res.ok) throw new Error("Failed to update product");

      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi cập nhật sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/products/${form.slug}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi xóa sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="text-gray-500">Đang tải dữ liệu sản phẩm...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Chỉnh sửa sản phẩm</h1>
        <Button variant="outline" onClick={handleDelete} disabled={loading} className="text-red-600 border-red-300 hover:bg-red-50">
          Xóa sản phẩm
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Thông tin cơ bản</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tên sản phẩm *</label>
                  <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Slug (URL) *</label>
                  <Input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Giá (VNĐ) *</label>
                    <Input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tồn kho *</label>
                    <Input required type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">URL ảnh *</label>
                  <Input required value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mô tả ngắn *</label>
                  <Textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nội dung chi tiết</label>
                  <Textarea rows={6} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
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
                  <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="w-4 h-4" />
                  <span className="text-sm">Sản phẩm nổi bật</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isFlashSale} onChange={(e) => setForm({ ...form, isFlashSale: e.target.checked })} className="w-4 h-4" />
                  <span className="text-sm">Khuyến mãi</span>
                </label>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Đang lưu..." : "Cập nhật sản phẩm"}
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
