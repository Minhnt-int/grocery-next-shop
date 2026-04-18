import { Container } from "@/components/layout/container";
import { Hero } from "@/components/store/hero";
import { ProductGrid } from "@/components/store/product-grid";
import { CategoryPills } from "@/components/store/category-pills";
import { getAllCategories } from "@/lib/queries/categories";
import { getFeaturedProducts, getFlashSaleProducts } from "@/lib/queries/products";

export default async function HomePage() {
  const [categories, featuredProducts, flashSaleProducts] = await Promise.all([
    getAllCategories(),
    getFeaturedProducts(),
    getFlashSaleProducts(),
  ]);

  return (
    <>
      <Hero />

      <Container className="py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Danh mục</h2>
          <CategoryPills categories={categories} />
        </section>

        {flashSaleProducts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[var(--color-accent)]">
              ⚡ Flash Sale
            </h2>
            <ProductGrid products={flashSaleProducts} />
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold mb-6">Sản phẩm nổi bật</h2>
          <ProductGrid products={featuredProducts} />
        </section>
      </Container>
    </>
  );
}
