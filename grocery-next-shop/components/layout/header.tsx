"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { Container } from "./container";
import { SearchBar } from "@/components/store/search-bar";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import type { Category } from "@/types/category";

export function Header() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    }
    void loadCategories();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-surface)] border-b border-gray-200 shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-2xl font-bold text-[var(--color-primary)]">
              {siteConfig.logoText}
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors">
              Trang chủ
            </Link>
            
            <div 
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <Link 
                href="/products" 
                className="flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
              >
                Sản phẩm
                <ChevronDown className="w-4 h-4" />
              </Link>

              {showDropdown && categories.length > 0 && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-48">
                  <Link
                    href="/products"
                    className="block px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    Tất cả sản phẩm
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${cat.slug}`}
                      className="block px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      {cat.icon && <span className="mr-2">{cat.icon}</span>}
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="flex-1 max-w-md hidden md:block">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-4 flex-shrink-0">
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--color-accent)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <SearchBar />
        </div>
      </Container>
    </header>
  );
}
