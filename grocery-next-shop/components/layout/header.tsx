"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { Container } from "./container";
import { SearchBar } from "@/components/store/search-bar";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import type { Category } from "@/types/category";

export function Header() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const openCartSidebar = useUIStore((state) => state.openCartSidebar);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const openMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setShowDropdown(true);
  };

  const closeMenuWithDelay = () => {
    closeTimerRef.current = setTimeout(() => setShowDropdown(false), 140);
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-surface)] border-b border-gray-200 shadow-sm relative">
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

            <button
              type="button"
              onMouseEnter={openMenu}
              onMouseLeave={closeMenuWithDelay}
              className="flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
            >
              Sản phẩm
              <ChevronDown className="w-4 h-4" />
            </button>

            <Link href="/news" className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors">
              Tin tức
            </Link>
          </nav>

          <div className="flex-1 max-w-md hidden md:block">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-4 flex-shrink-0">
            <Button variant="ghost" size="sm" className="relative" onClick={openCartSidebar}>
              <ShoppingCart className="w-5 h-5" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--color-accent)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <SearchBar />
        </div>
      </Container>

      {showDropdown && categories.length > 0 && (
        <div
          className="hidden md:block absolute top-full left-0 right-0 border-t border-gray-200 bg-white/98 backdrop-blur shadow-lg"
          onMouseEnter={openMenu}
          onMouseLeave={closeMenuWithDelay}
        >
          <Container>
            <div className="flex items-center gap-3 overflow-x-auto py-3 scrollbar-hide whitespace-nowrap">
              <Link
                href="/products"
                className="inline-flex rounded-full px-4 py-2 text-sm font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/15 transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                Tất cả
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  className="inline-flex rounded-full px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
