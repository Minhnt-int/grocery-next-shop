import { Card } from "@/components/ui/card";
import { getAllOrders } from "@/lib/queries/orders";
import { formatCurrencyVND } from "@/lib/utils";

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
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
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
