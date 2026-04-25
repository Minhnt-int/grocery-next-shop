import { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

type SEOProps = {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
};

export function generateSEO({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
}: SEOProps): Metadata {
  const fullTitle = `${title} | ${siteConfig.shopName}`;
  const fullUrl = url || `https://yoursite.com`;
  const ogImage = image || "https://yoursite.com/og-image.jpg";

  return {
    title: fullTitle,
    description,
    keywords: keywords || undefined,
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: siteConfig.shopName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "vi_VN",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}
