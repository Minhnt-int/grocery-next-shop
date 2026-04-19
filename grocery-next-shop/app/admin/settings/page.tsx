import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Cấu hình hệ thống</h1>

      <div className="max-w-2xl space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Thông tin cửa hàng</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tên cửa hàng</label>
              <Input defaultValue="GreenBasket" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Slogan</label>
              <Input defaultValue="Tạp hoá tươi mỗi ngày" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hotline</label>
              <Input defaultValue="0900 123 456" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input defaultValue="contact@greenbasket.vn" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Địa chỉ</label>
              <Textarea rows={3} defaultValue="123 Đường ABC, Quận 1, TP.HCM" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Thanh toán VietQR</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">BIN ngân hàng</label>
              <Input defaultValue="970415" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Số tài khoản</label>
              <Input defaultValue="108867390718" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tên tài khoản</label>
              <Input defaultValue="NGUYEN TUAN MINH" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Template QR</label>
              <Input defaultValue="4QyF6L2" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">SEO mặc định</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Meta Title</label>
              <Input defaultValue="GreenBasket - Tạp hoá tươi mỗi ngày" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Meta Description</label>
              <Textarea rows={3} defaultValue="Mua sắm tạp hoá online tiện lợi, giao hàng nhanh trong ngày" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Meta Keywords</label>
              <Input defaultValue="tạp hoá, mua sắm online, giao hàng nhanh" />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button size="lg">Lưu cấu hình</Button>
        </div>
      </div>
    </div>
  );
}
