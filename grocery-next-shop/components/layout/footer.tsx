import { Container } from "./container";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="bg-[var(--color-surface)] border-t border-gray-200 mt-16">
      <Container>
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-3 text-[var(--color-primary)]">
                {siteConfig.shopName}
              </h3>
              <p className="text-sm text-gray-600">{siteConfig.tagline}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Liên hệ</h4>
              <p className="text-sm text-gray-600">
                Hotline: {siteConfig.supportPhone || "Đang cập nhật"}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Thông tin</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Về chúng tôi</li>
                <li>Chính sách giao hàng</li>
                <li>Chính sách đổi trả</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            © 2026 {siteConfig.shopName}. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}
