"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuantityInput } from "@/components/store/quantity-input";
import { formatCurrencyVND } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types/product";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${params.slug}`);
        if (!res.ok) {
          setProduct(null);
          return;
        }
        const data = await res.json();
        setProduct(data);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    if (params.slug) {
      void loadProduct();
    }
  }, [params.slug]);

  if (!loading && !product) {
    notFound();
  }

  if (loading || !product) {
    return (
      <Container className="py-10">
        <div className="rounded-[var(--radius)] bg-white p-8 shadow-sm">Đang tải sản phẩm...</div>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative aspect-square overflow-hidden rounded-[var(--radius)] bg-white shadow-sm">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>

        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge>{product.category.name}</Badge>
            {product.isFeatured && <Badge variant="warning">Nổi bật</Badge>}
            {product.isFlashSale && <Badge variant="danger">Flash Sale</Badge>}
          </div>

          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-4 text-3xl font-bold text-[var(--color-primary)]">
            {formatCurrencyVND(product.price)}
          </p>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <p className="mt-3 text-sm text-gray-500">Tồn kho: {product.stock}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <QuantityInput value={quantity} onChange={setQuantity} />
            <Button
              size="lg"
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
              }}
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
