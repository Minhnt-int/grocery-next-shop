"use client";

import { Product } from '@/types';
import { useCartStore } from '@/lib/store';

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
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
      className="rounded-xl bg-[var(--color-primary)] px-5 py-3 font-semibold text-white hover:bg-[var(--color-primary-dark)]"
    >
      Thêm vào giỏ hàng
    </button>
  );
}
