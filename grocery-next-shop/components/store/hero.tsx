import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 py-16">
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--color-text)]">
            {siteConfig.shopName}
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            {siteConfig.tagline}
          </p>
          <Button size="lg">
            Mua sắm ngay
          </Button>
        </div>
      </Container>
    </div>
  );
}
