"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    shopName: "",
    tagline: "",
    supportPhone: "",
    email: "",
    address: "",
    vietqrBin: "",
    vietqrAccount: "",
    vietqrAccountName: "",
    vietqrTemplate: "",
    metaTitle: "",
    metaDesc: "",
    metaKeywords: "",
  });

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const res = await fetch("/api/config");
        const data = await res.json();
        
        setForm({
          shopName: data.shopName || "",
          tagline: data.tagline || "",
          supportPhone: data.supportPhone || "",
          email: data.email || "",
          address: data.address || "",
          vietqrBin: data.vietqrBin || "",
          vietqrAccount: data.vietqrAccount || "",
          vietqrAccountName: data.vietqrAccountName || "",
          vietqrTemplate: data.vietqrTemplate || "",
          metaTitle: data.metaTitle || "",
          metaDesc: data.metaDesc || "",
          metaKeywords: data.metaKeywords || "",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setFetching(false);
      }
    };

    loadConfig();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save config");

      alert("Đã lưu cấu hình thành công!");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi lưu cấu hình");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="text-gray-500">Đang tải cấu hình...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Cấu hình hệ thống</h1>

      <form onSubmit={handleSubmit}>
        <div className="max-w-2xl space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin cửa hàng</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tên cửa hàng</label>
                <Input value={form.shopName} onChange={(e) => setForm({ ...form, shopName: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Slogan</label>
                <Input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Hotline</label>
                <Input value={form.supportPhone} onChange={(e) => setForm({ ...form, supportPhone: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Địa chỉ</label>
                <Textarea rows={3} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Thanh toán VietQR</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">BIN ngân hàng</label>
                <Input value={form.vietqrBin} onChange={(e) => setForm({ ...form, vietqrBin: e.target.value })} placeholder="970415" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Số tài khoản</label>
                <Input value={form.vietqrAccount} onChange={(e) => setForm({ ...form, vietqrAccount: e.target.value })} placeholder="108867390718" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tên tài khoản</label>
                <Input value={form.vietqrAccountName} onChange={(e) => setForm({ ...form, vietqrAccountName: e.target.value })} placeholder="NGUYEN TUAN MINH" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Template QR</label>
                <Input value={form.vietqrTemplate} onChange={(e) => setForm({ ...form, vietqrTemplate: e.target.value })} placeholder="4QyF6L2" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">SEO mặc định</h2>
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

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={loading}>
              {loading ? "Đang lưu..." : "Lưu cấu hình"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
