"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { formatCurrencyVND } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.getTotal());
  const clearCart = useCartStore((state) => state.clearCart);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    customer: "",
    phone: "",
    address: "",
    note: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.customer || !form.phone || !form.address || items.length === 0) {
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: form.customer,
          phone: form.phone,
          address: form.address,
          note: form.note,
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create order");
      }

      clearCart();
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold">Thanh toán</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <form onSubmit={handleSubmit} className="rounded-[var(--radius)] bg-white p-6 shadow-sm border border-gray-100 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Họ và tên</label>
            <Input value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} placeholder="Nguyễn Văn A" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Số điện thoại</label>
            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="09xx xxx xxx" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Địa chỉ giao hàng</label>
            <Textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={4} placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Ghi chú</label>
            <Textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={3} placeholder="Ví dụ: giao giờ hành chính" />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={submitting || items.length === 0}>
            {submitting ? "Đang xử lý..." : "Xác nhận đặt hàng"}
          </Button>
        </form>

        <div className="rounded-[var(--radius)] bg-white p-5 shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-semibold">Tóm tắt thanh toán</h2>
          <p className="mt-3 text-sm text-gray-500">Số mặt hàng: {items.length}</p>
          <div className="mt-4 border-t border-gray-100 pt-4 flex items-center justify-between font-semibold text-base">
            <span>Tổng thanh toán</span>
            <span className="text-[var(--color-primary)]">{formatCurrencyVND(total)}</span>
          </div>
        </div>
      </div>
    </Container>
  );
}
