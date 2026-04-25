import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ProductGrid } from "@/components/store/product-grid";
import { CategoryPills } from "@/components/store/category-pills";
import { Badge } from "@/components/ui/badge";
import { getAllCategories } from "@/lib/queries/categories";
import {
  getAllProducts,
  getProductsByCategory,
  searchProducts,
  getFlashSaleProducts,
} from "@/lib/queries/products";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; search?: string; sale?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const categorySlug = resolvedSearchParams?.category;
  const search = resolvedSearchParams?.search?.trim();
  const saleOnly = resolvedSearchParams?.sale === "true";

  const [categories, products] = await Promise.all([
    getAllCategories(),
    search
      ? searchProducts(search, saleOnly)
      : saleOnly && categorySlug
      ? getProductsByCategory(categorySlug).then((items) => items.filter((item) => item.isFlashSale))
      : saleOnly
      ? getFlashSaleProducts()
      : categorySlug
      ? getProductsByCategory(categorySlug)
      : getAllProducts(),
  ]);

  return (
    <Container className="py-12">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">
          {search
            ? `Kết quả tìm kiếm: "${search}"${saleOnly ? " (khuyến mãi)" : ""}`
            : saleOnly
            ? "Sản phẩm khuyến mãi"
            : "Tất cả sản phẩm"}
        </h1>

        <Link href={saleOnly ? "/products" : "/products?sale=true"}>
          <Badge
            variant={saleOnly ? "danger" : "default"}
            className="cursor-pointer px-4 py-2 text-sm"
          >
            {saleOnly ? "✓ Đang lọc khuyến mãi" : "Xem khuyến mãi"}
          </Badge>
        </Link>
      </div>

      <div className="mb-8">
        <CategoryPills categories={categories} activeSlug={categorySlug} saleOnly={saleOnly} />
      </div>

      <ProductGrid products={products} />
    </Container>
  );
}
