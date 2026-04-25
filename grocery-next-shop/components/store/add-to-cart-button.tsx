"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuantityInput } from "@/components/store/quantity-input";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import type { Product } from "@/types/product";

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const openCartSidebar = useUIStore((state) => state.openCartSidebar);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <QuantityInput value={quantity} onChange={setQuantity} />
      <Button
        size="lg"
        disabled={product.stock === 0}
        onClick={() => {
          for (let i = 0; i < quantity; i += 1) {
            addItem({
              productId: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              slug: product.slug,
            });
          }
          openCartSidebar();
        }}
      >
        {product.stock === 0 ? "Hết hàng" : "Thêm vào giỏ hàng"}
      </Button>
    </div>
  );
}
