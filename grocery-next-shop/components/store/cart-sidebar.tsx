"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/store/cart-item";
import { EmptyState } from "@/components/store/empty-state";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { formatCurrencyVND } from "@/lib/utils";

export function CartSidebar() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const total = useCartStore((state) => state.getTotal());

  const isOpen = useUIStore((state) => state.isCartSidebarOpen);
  const close = useUIStore((state) => state.closeCartSidebar);

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Đóng giỏ hàng"
        onClick={close}
        className="fixed inset-0 z-[60] bg-black/35"
      />

      <aside className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl border-l border-gray-200 flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Giỏ hàng ({items.length})</h2>
          <Button variant="ghost" size="sm" onClick={close}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <EmptyState
              title="Giỏ hàng đang trống"
              description="Thêm sản phẩm để tiếp tục mua sắm nhé."
              actionHref="/products"
              actionLabel="Xem sản phẩm"
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

        <div className="border-t border-gray-200 p-5 bg-gray-50">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Tạm tính</span>
            <span>{formatCurrencyVND(total)}</span>
          </div>
          <div className="flex items-center justify-between font-semibold text-base mb-4">
            <span>Tổng cộng</span>
            <span className="text-[var(--color-primary)]">{formatCurrencyVND(total)}</span>
          </div>

          <Link href="/checkout" onClick={close}>
            <Button className="w-full" size="lg" disabled={items.length === 0}>
              Tiến hành thanh toán
            </Button>
          </Link>
        </div>
      </aside>
    </>
  );
}
