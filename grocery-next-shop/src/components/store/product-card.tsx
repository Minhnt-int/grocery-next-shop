"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store';

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link href={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        {product.isFlashSale && (
          <span className="absolute left-2 top-2 rounded-md bg-[var(--color-secondary)] px-2 py-1 text-xs font-semibold text-[var(--color-text-primary)]">
            Flash Sale
          </span>
        )}
      </Link>

      <div className="space-y-3 p-4">
        <Link href={`/products/${product.slug}`} className="line-clamp-2 font-semibold">
          {product.name}
        </Link>

        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-[var(--color-primary)]">{formatPrice(product.price)}</p>
          <span className="text-xs text-[var(--color-text-secondary)]">Còn {product.stock}</span>
        </div>

        <button
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              slug: product.slug,
            })
          }
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-3 py-2 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)]"
        >
          <ShoppingCart className="h-4 w-4" />
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}
