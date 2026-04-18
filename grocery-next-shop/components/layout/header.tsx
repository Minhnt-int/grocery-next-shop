import Link from "next/link";
import { ShoppingCart, Search } from "lucide-react";
import { Container } from "./container";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-surface)] border-b border-gray-200 shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-[var(--color-primary)]">
              {siteConfig.logoText}
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors">
              Trang chủ
            </Link>
            <Link href="/products" className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors">
              Sản phẩm
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:inline-flex">
              <Search className="w-5 h-5" />
            </Button>
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-[var(--color-accent)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
