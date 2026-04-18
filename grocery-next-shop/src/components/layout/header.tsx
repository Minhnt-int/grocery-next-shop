"use client";

import Link from 'next/link';
import { ShoppingCart, Search, Shield } from 'lucide-react';
import { useCartStore } from '@/lib/store';

export function Header() {
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="text-xl font-bold text-[var(--color-primary)]">
          Grocery<span className="text-[var(--color-text-primary)]">Shop</span>
        </Link>

        <div className="hidden flex-1 items-center gap-2 rounded-xl border border-[var(--color-border)] px-3 py-2 md:flex">
          <Search className="h-4 w-4 text-[var(--color-text-secondary)]" />
          <input
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--color-text-secondary)]"
          />
        </div>

        <nav className="ml-auto flex items-center gap-2">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm font-medium hover:bg-[var(--color-primary-light)]"
          >
            <Shield className="h-4 w-4" />
            Admin
          </Link>

          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-3 py-2 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)]"
          >
            <ShoppingCart className="h-4 w-4" />
            Giỏ hàng
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 min-w-5 rounded-full bg-[var(--color-error)] px-1 text-center text-xs text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
