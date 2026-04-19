import { Container } from "@/components/layout/container";
import { ProductGrid } from "@/components/store/product-grid";
import { CategoryPills } from "@/components/store/category-pills";
import { getAllCategories } from "@/lib/queries/categories";
import { getAllProducts, getProductsByCategory, searchProducts } from "@/lib/queries/products";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; search?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const categorySlug = resolvedSearchParams?.category;
  const search = resolvedSearchParams?.search?.trim();

  const [categories, products] = await Promise.all([
    getAllCategories(),
    search
      ? searchProducts(search)
      : categorySlug
      ? getProductsByCategory(categorySlug)
      : getAllProducts(),
  ]);

  return (
    <Container className="py-12">
      <h1 className="text-3xl font-bold mb-4">
        {search ? `Kết quả tìm kiếm: "${search}"` : "Tất cả sản phẩm"}
      </h1>

      <div className="mb-8">
        <CategoryPills categories={categories} activeSlug={categorySlug} />
      </div>

      <ProductGrid products={products} />
    </Container>
  );
}
