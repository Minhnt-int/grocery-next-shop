import { Container } from '@/components/layout/container';
import { ProductCard } from '@/components/store/product-card';
import { getCategories, getProducts } from '@/lib/queries';

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  return (
    <div className="py-8">
      <Container>
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold">Tất cả sản phẩm</h1>
          <p className="mt-2 text-[var(--color-text-secondary)]">Chọn nhanh mặt hàng tạp hóa bạn cần hôm nay.</p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <span key={c.id} className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-sm">
              {c.icon} {c.name}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
