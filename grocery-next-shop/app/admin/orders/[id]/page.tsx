"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrencyVND } from "@/lib/utils";

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: {
    id: number;
    name: string;
    image: string;
  };
}

interface Order {
  id: number;
  customer: string;
  phone: string;
  address: string;
  note: string | null;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

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

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [params.id]);

  const handleStatusChange = async (newStatus: string) => {
    if (!order) return;
    setUpdating(true);

    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updated = await res.json();
        setOrder(updated);
      } else {
        alert("Có lỗi khi cập nhật trạng thái");
      }
    } catch (error) {
      console.error(error);
      alert("Có lỗi khi cập nhật trạng thái");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="text-gray-500">Đang tải thông tin đơn hàng...</div>;
  }

  if (!order) {
    return <div className="text-gray-500">Không tìm thấy đơn hàng</div>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Đơn hàng #{order.id}</h1>
        <Button variant="outline" onClick={() => router.back()}>
          ← Quay lại
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin khách hàng</h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Họ tên:</span>
                <p className="font-medium">{order.customer}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Số điện thoại:</span>
                <p className="font-medium">{order.phone}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Địa chỉ giao hàng:</span>
                <p className="font-medium">{order.address}</p>
              </div>
              {order.note && (
                <div>
                  <span className="text-sm text-gray-500">Ghi chú:</span>
                  <p className="font-medium">{order.note}</p>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Sản phẩm</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded object-cover" />
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatCurrencyVND(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">{formatCurrencyVND(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
              <span className="text-lg font-semibold">Tổng cộng</span>
              <span className="text-xl font-bold text-[var(--color-primary)]">{formatCurrencyVND(order.total)}</span>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Trạng thái đơn hàng</h2>
            <div className="space-y-3">
              <p className="text-sm text-gray-500">Trạng thái hiện tại:</p>
              <p className="text-lg font-semibold">{getStatusLabel(order.status)}</p>

              <div className="pt-4 space-y-2">
                <p className="text-sm font-medium mb-2">Cập nhật trạng thái:</p>
                {["pending", "confirmed", "shipping", "completed", "cancelled"].map((status) => (
                  <Button
                    key={status}
                    variant={order.status === status ? "primary" : "outline"}
                    size="sm"
                    className="w-full"
                    onClick={() => handleStatusChange(status)}
                    disabled={updating || order.status === status}
                  >
                    {getStatusLabel(status)}
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin đơn hàng</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Mã đơn:</span>
                <span className="font-medium">#{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ngày tạo:</span>
                <span className="font-medium">{new Date(order.createdAt).toLocaleString("vi-VN")}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
