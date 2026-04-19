"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrencyVND } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
    });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {product.isFlashSale && (
            <Badge variant="danger" className="absolute top-2 right-2 z-10">
              Flash Sale
            </Badge>
          )}
          {product.isFeatured && !product.isFlashSale && (
            <Badge variant="warning" className="absolute top-2 right-2 z-10">
              Nổi bật
            </Badge>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-[var(--color-primary)] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-[var(--color-primary)]">
            {formatCurrencyVND(product.price)}
          </span>
          {product.stock < 10 && product.stock > 0 && (
            <Badge variant="warning">Còn {product.stock}</Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="danger">Hết hàng</Badge>
          )}
        </div>

        <Button 
          className="w-full gap-2" 
          disabled={product.stock === 0}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4 h-4" />
          {product.stock === 0 ? "Hết hàng" : "Thêm vào giỏ"}
        </Button>
      </div>
    </Card>
  );
}
