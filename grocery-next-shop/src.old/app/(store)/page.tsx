import { Container } from '@/components/layout/container';
import Link from 'next/link';
import { CategoryPills } from '@/components/store/category-pills';
import { Hero } from '@/components/store/hero';
import { ProductCard } from '@/components/store/product-card';
import { getFeaturedProducts, getFlashSaleProducts, getProducts } from '@/lib/queries';

export default async function HomePage() {
  const [featured, flashSale, products] = await Promise.all([
    getFeaturedProducts(),
    getFlashSaleProducts(),
    getProducts(),
  ]);

  return (
    <div className="py-6 md:py-8">
      <Container>
        <div className="space-y-10">
          <Hero />

          <section>
            <h2 className="mb-3 text-xl font-bold md:text-2xl">Danh mục phổ biến</h2>
            <CategoryPills />
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold md:text-2xl">Sản phẩm nổi bật ⭐</h2>
              <Link href="/products" className="text-sm font-medium text-[var(--color-primary)] hover:underline">
                Xem tất cả →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {featured.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold md:text-2xl">Flash Sale hôm nay ⚡</h2>
              <span className="rounded-full bg-[var(--color-secondary)] px-3 py-1 text-xs font-bold">
                Chỉ hôm nay!
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {flashSale.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold md:text-2xl">Tất cả sản phẩm 🛒</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
