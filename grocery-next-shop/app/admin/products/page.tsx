import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllProducts } from "@/lib/queries/products";
import { formatCurrencyVND } from "@/lib/utils";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Quản lý sản phẩm</h1>
        <Link href="/admin/products/new">
          <Button>+ Thêm sản phẩm</Button>
        </Link>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-gray-700">Sản phẩm</th>
                <th className="text-left p-4 font-medium text-gray-700">Danh mục</th>
                <th className="text-left p-4 font-medium text-gray-700">Giá</th>
                <th className="text-left p-4 font-medium text-gray-700">Tồn kho</th>
                <th className="text-left p-4 font-medium text-gray-700">Trạng thái</th>
                <th className="text-right p-4 font-medium text-gray-700">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 last:border-0">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover" />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">/{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{product.category.name}</td>
                  <td className="p-4 font-medium">{formatCurrencyVND(product.price)}</td>
                  <td className="p-4">{product.stock}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {product.isFeatured && <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">Nổi bật</span>}
                      {product.isFlashSale && <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700">KM</span>}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/products/${product.id}`}>
                      <Button variant="outline" size="sm">Sửa</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
