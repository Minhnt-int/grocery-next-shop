"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    clearCart();
  };

  if (done) {
    return (
      <div className="py-16">
        <Container>
          <div className="mx-auto max-w-lg rounded-2xl border border-[var(--color-border)] bg-white p-8 text-center">
            <h1 className="text-2xl font-bold text-[var(--color-success)]">Đặt hàng thành công 🎉</h1>
            <p className="mt-2 text-[var(--color-text-secondary)]">Cảm ơn bạn! Đơn hàng đang được xử lý.</p>
            <Link href="/" className="mt-5 inline-block rounded-xl bg-[var(--color-primary)] px-5 py-3 font-semibold text-white">
              Về trang chủ
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <h1 className="mb-6 text-3xl font-extrabold">Thanh toán</h1>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-white p-5">
            <h2 className="text-lg font-bold">Thông tin giao hàng</h2>
            <input required placeholder="Họ và tên" className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 outline-none focus:border-[var(--color-primary)]" />
            <input required placeholder="Số điện thoại" className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 outline-none focus:border-[var(--color-primary)]" />
            <input required placeholder="Địa chỉ giao hàng" className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 outline-none focus:border-[var(--color-primary)]" />
            <textarea placeholder="Ghi chú" className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 outline-none focus:border-[var(--color-primary)]" />

            <button type="submit" className="rounded-xl bg-[var(--color-primary)] px-5 py-3 font-semibold text-white hover:bg-[var(--color-primary-dark)]">
              Xác nhận đặt hàng
            </button>
          </form>

          <aside className="h-fit rounded-2xl border border-[var(--color-border)] bg-white p-5">
            <h2 className="text-lg font-bold">Tóm tắt đơn hàng</h2>
            <div className="mt-3 space-y-2 text-sm">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <span>{item.name} x{item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <hr className="my-4" />
            <div className="flex items-center justify-between text-sm">
              <span>Tạm tính</span>
              <span>{formatPrice(totalPrice())}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span>Phí giao hàng</span>
              <span>{formatPrice(15000)}</span>
            </div>
            <div className="mt-4 flex items-center justify-between font-bold">
              <span>Tổng thanh toán</span>
              <span className="text-[var(--color-primary)]">{formatPrice(totalPrice() + 15000)}</span>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
