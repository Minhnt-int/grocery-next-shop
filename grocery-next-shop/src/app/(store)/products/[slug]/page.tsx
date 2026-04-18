import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { formatPrice } from '@/lib/utils';
import { AddToCartButton } from '@/components/store/add-to-cart-button';
import { getProductBySlug, getProducts } from '@/lib/queries';

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return notFound();

  const allProducts = await getProducts();
  const related = allProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="py-8">
      <Container>
        <div className="mb-4 text-sm text-[var(--color-text-secondary)]">
          <Link href="/products" className="hover:text-[var(--color-primary)]">Sản phẩm</Link> / <span>{product.name}</span>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold">{product.name}</h1>
            <p className="mt-4 text-2xl font-bold text-[var(--color-primary)]">{formatPrice(product.price)}</p>
            <p className="mt-4 text-[var(--color-text-secondary)]">{product.description}</p>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Tồn kho: {product.stock}</p>

            <div className="mt-6">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-bold">Sản phẩm liên quan</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((item) => (
                <Link key={item.id} href={`/products/${item.slug}`} className="rounded-xl border border-[var(--color-border)] p-3 hover:bg-white">
                  <p className="line-clamp-2 font-medium">{item.name}</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--color-primary)]">{formatPrice(item.price)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
