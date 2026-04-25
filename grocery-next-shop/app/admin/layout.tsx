import Link from "next/link";
import { Container } from "@/components/layout/container";
import { AdminLogoutButton } from "@/components/admin/logout-button";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Newspaper,
  Settings,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Sản phẩm", icon: Package },
    { href: "/admin/categories", label: "Danh mục", icon: FolderTree },
    { href: "/admin/orders", label: "Đơn hàng", icon: ShoppingCart },
    { href: "/admin/posts", label: "Tin tức", icon: Newspaper },
    { href: "/admin/settings", label: "Cấu hình", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/admin" className="text-xl font-bold text-[var(--color-primary)]">
              Admin Panel
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                ← Về trang chủ
              </Link>
              <AdminLogoutButton />
            </div>
          </div>
        </Container>
      </header>

      <div className="flex">
        <aside className="sticky top-16 min-h-[calc(100vh-4rem)] w-64 border-r border-gray-200 bg-white">
          <nav className="space-y-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100 hover:text-[var(--color-primary)]"
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
