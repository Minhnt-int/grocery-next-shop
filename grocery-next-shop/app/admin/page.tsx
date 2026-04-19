import { Card } from "@/components/ui/card";
import { Package, ShoppingCart, Newspaper, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  // TODO: Fetch real stats from API
  const stats = [
    {
      label: "Tổng sản phẩm",
      value: "24",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Đơn hàng mới",
      value: "12",
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Bài viết",
      value: "5",
      icon: Newspaper,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "Doanh thu tháng",
      value: "15.2M",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Đơn hàng gần đây</h2>
          <p className="text-gray-500 text-sm">Chưa có dữ liệu</p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Sản phẩm bán chạy</h2>
          <p className="text-gray-500 text-sm">Chưa có dữ liệu</p>
        </Card>
      </div>
    </div>
  );
}
