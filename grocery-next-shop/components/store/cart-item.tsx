"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { formatCurrencyVND } from "@/lib/utils";
import { QuantityInput } from "./quantity-input";
import { Button } from "@/components/ui/button";

type CartItemData = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
};

interface CartItemProps {
  item: CartItemData;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 rounded-[var(--radius)] bg-white p-4 shadow-sm border border-gray-100">
      <div className="relative h-24 w-24 overflow-hidden rounded-xl">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <Link href={`/products/${item.slug}`} className="font-semibold hover:text-[var(--color-primary)]">
          {item.name}
        </Link>
        <p className="mt-1 text-sm text-gray-500">{formatCurrencyVND(item.price)}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <QuantityInput value={item.quantity} onChange={onQuantityChange} />
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[var(--color-primary)]">
              {formatCurrencyVND(item.price * item.quantity)}
            </span>
            <Button variant="ghost" size="sm" onClick={onRemove} aria-label="Xoá sản phẩm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
