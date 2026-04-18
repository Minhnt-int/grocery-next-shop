"use client";

import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/store/cart-item";
import { EmptyState } from "@/components/store/empty-state";
import { useCartStore } from "@/store/cart-store";
import { formatCurrencyVND } from "@/lib/utils";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const total = useCartStore((state) => state.getTotal());

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold">Giỏ hàng</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          {items.length === 0 ? (
            <EmptyState
              title="Giỏ hàng đang trống"
              description="Thêm vài món ngon vào đây rồi quay lại thanh toán nhé."
            />
          ) : (
            items.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                onQuantityChange={(quantity) => updateQuantity(item.productId, quantity)}
                onRemove={() => removeItem(item.productId)}
              />
            ))
          )}
        </div>

        <div className="rounded-[var(--radius)] bg-white p-5 shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-semibold">Tóm tắt đơn hàng</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Tạm tính</span>
              <span>{formatCurrencyVND(total)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Phí giao hàng</span>
              <span>Miễn phí</span>
            </div>
            <div className="border-t border-gray-100 pt-3 flex items-center justify-between font-semibold text-base">
              <span>Tổng cộng</span>
              <span className="text-[var(--color-primary)]">{formatCurrencyVND(total)}</span>
            </div>
          </div>

          <Link href="/checkout" className="mt-6 block">
            <Button className="w-full" size="lg" disabled={items.length === 0}>
              Tiến hành thanh toán
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
