import Link from "next/link";
import { Container } from "@/components/layout/container";
import { 
  LayoutDashboard, 
  Package, 
  FolderTree, 
  ShoppingCart, 
  Newspaper,
  Settings 
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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <Container>
          <div className="flex items-center justify-between h-16">
            <Link href="/admin" className="text-xl font-bold text-[var(--color-primary)]">
              Admin Panel
            </Link>
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
              ← Về trang chủ
            </Link>
          </div>
        </Container>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] sticky top-16">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[var(--color-primary)] transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
