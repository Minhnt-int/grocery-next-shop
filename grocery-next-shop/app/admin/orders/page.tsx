import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllOrders } from "@/lib/queries/orders";
import { formatCurrencyVND } from "@/lib/utils";

function getStatusLabel(status: string) {
  switch (status) {
    case "pending":
      return "Chờ xử lý";
    case "confirmed":
      return "Đã xác nhận";
    case "shipping":
      return "Đang giao";
    case "completed":
      return "Hoàn thành";
    case "cancelled":
      return "Đã hủy";
    default:
      return status;
  }
}

function getStatusClass(status: string) {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "confirmed":
      return "bg-blue-100 text-blue-700";
    case "shipping":
      return "bg-purple-100 text-purple-700";
    case "completed":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Quản lý đơn hàng</h1>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-gray-700">Mã đơn</th>
                <th className="text-left p-4 font-medium text-gray-700">Khách hàng</th>
                <th className="text-left p-4 font-medium text-gray-700">Điện thoại</th>
                <th className="text-left p-4 font-medium text-gray-700">Tổng tiền</th>
                <th className="text-left p-4 font-medium text-gray-700">Trạng thái</th>
                <th className="text-left p-4 font-medium text-gray-700">Ngày tạo</th>
                <th className="text-right p-4 font-medium text-gray-700">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 last:border-0">
                  <td className="p-4 font-medium">#{order.id}</td>
                  <td className="p-4">{order.customer || "-"}</td>
                  <td className="p-4">{order.phone || "-"}</td>
                  <td className="p-4 font-medium">{formatCurrencyVND(order.total)}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/orders/${order.id}`}>
                      <Button variant="outline" size="sm">Chi tiết</Button>
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
