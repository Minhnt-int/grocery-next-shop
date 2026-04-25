import Link from "next/link";
import type { Category } from "@/types/category";

interface CategoryPillsProps {
  categories: Category[];
  activeSlug?: string;
  saleOnly?: boolean;
}

export function CategoryPills({ categories, activeSlug, saleOnly = false }: CategoryPillsProps) {
  const allProductsHref = saleOnly ? "/products?sale=true" : "/products";

  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href={allProductsHref}
        className={`px-4 py-2 rounded-full transition-colors ${
          !activeSlug
            ? "bg-[var(--color-primary)] text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Tất cả
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/products?category=${category.slug}${saleOnly ? "&sale=true" : ""}`}
          className={`px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${
            activeSlug === category.slug
              ? "bg-[var(--color-primary)] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category.icon && <span>{category.icon}</span>}
          {category.name}
        </Link>
      ))}
    </div>
  );
}
