import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { AddToCartButton } from "@/components/store/add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import { formatCurrencyVND } from "@/lib/utils";
import { getProductBySlug } from "@/lib/queries/products";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return generateSEO({
      title: "Sản phẩm không tồn tại",
      description: "Không tìm thấy sản phẩm bạn yêu cầu.",
    });
  }

  return generateSEO({
    title: product.metaTitle || product.name,
    description: product.metaDesc || product.description,
    keywords: product.metaKeywords || undefined,
    image: product.image,
    url: `https://yoursite.com/products/${product.slug}`,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
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
            {product.isFlashSale && <Badge variant="danger">Khuyến mãi</Badge>}
          </div>

          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-4 text-3xl font-bold text-[var(--color-primary)]">
            {formatCurrencyVND(product.price)}
          </p>
          <p className="mt-4 text-gray-600">{product.description}</p>

          {product.content && (
            <article
              className="prose prose-slate mt-6 max-w-none"
              dangerouslySetInnerHTML={{ __html: product.content }}
            />
          )}

          <p className="mt-3 text-sm text-gray-500">Tồn kho: {product.stock}</p>

          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </Container>
  );
}
