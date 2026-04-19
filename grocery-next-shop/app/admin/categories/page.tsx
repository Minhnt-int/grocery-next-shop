import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllCategories } from "@/lib/queries/categories";

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Quản lý danh mục</h1>
        <Link href="/admin/categories/new">
          <Button>+ Thêm danh mục</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {category.icon && <span className="text-xl">{category.icon}</span>}
                  <h2 className="font-semibold text-lg">{category.name}</h2>
                </div>
                <p className="text-sm text-gray-500 mb-2">/{category.slug}</p>
                {category.description && (
                  <p className="text-sm text-gray-600 line-clamp-3">{category.description}</p>
                )}
              </div>
              <Link href={`/admin/categories/${category.id}`}>
                <Button variant="outline" size="sm">Sửa</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
