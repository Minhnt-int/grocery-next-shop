"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const bannerImages = [
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=1800&auto=format&fit=crop",
];

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % bannerImages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative isolate overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-20">
        {bannerImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/65 via-black/45 to-black/30" />

      <Container>
        <div className="max-w-2xl text-white">
          <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur-sm">
            Giao nhanh trong ngày
          </span>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            {siteConfig.shopName}
          </h1>

          <p className="mt-4 text-lg text-white/90 md:text-xl">
            {siteConfig.tagline} • Tươi ngon, giá hợp lý, đặt là có.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" className="bg-[var(--color-accent)] hover:bg-orange-600">
              Mua sắm ngay
            </Button>
            <Link href="/products?sale=true">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                Xem khuyến mãi
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-2">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                aria-label={`Xem banner ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex ? "w-7 bg-white" : "w-2.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
