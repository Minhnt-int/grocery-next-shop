"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="py-16">
        <Container>
          <div className="mx-auto max-w-lg rounded-2xl border border-[var(--color-border)] bg-white p-8 text-center">
            <h1 className="text-2xl font-bold">Giỏ hàng trống</h1>
            <p className="mt-2 text-[var(--color-text-secondary)]">Thêm sản phẩm để bắt đầu đơn hàng của bạn.</p>
            <Link href="/products" className="mt-5 inline-block rounded-xl bg-[var(--color-primary)] px-5 py-3 font-semibold text-white">
              Mua sắm ngay
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <h1 className="mb-6 text-3xl font-extrabold">Giỏ hàng</h1>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-xl">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{formatPrice(item.price)}</p>

                  <div className="mt-3 flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded-md border px-2 py-1">-</button>
                    <span className="min-w-8 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded-md border px-2 py-1">+</button>
                    <button onClick={() => removeItem(item.id)} className="ml-4 text-sm text-[var(--color-error)]">Xóa</button>
                  </div>
                </div>

                <p className="font-bold text-[var(--color-primary)]">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-2xl border border-[var(--color-border)] bg-white p-5">
            <h2 className="text-lg font-bold">Tóm tắt đơn hàng</h2>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span>Tạm tính</span>
              <span>{formatPrice(totalPrice())}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span>Phí giao hàng</span>
              <span>{formatPrice(15000)}</span>
            </div>
            <hr className="my-4" />
            <div className="flex items-center justify-between font-bold">
              <span>Tổng cộng</span>
              <span className="text-[var(--color-primary)]">{formatPrice(totalPrice() + 15000)}</span>
            </div>

            <Link href="/checkout" className="mt-5 block rounded-xl bg-[var(--color-primary)] px-4 py-3 text-center font-semibold text-white">
              Tiến hành thanh toán
            </Link>
          </aside>
        </div>
      </Container>
    </div>
  );
}
