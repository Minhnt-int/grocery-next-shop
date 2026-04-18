import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getThemeConfig } from "@/lib/theme";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grocery Shop - Hàng Tươi Mỗi Ngày",
  description: "Mua sắm tạp hóa online, giao hàng nhanh trong 2 giờ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getThemeConfig();

  return (
    <html
      lang="vi"
      className={`${inter.variable} h-full antialiased`}
      style={{
        '--color-primary': theme.primary,
        '--color-primary-dark': theme.primaryDark,
        '--color-primary-light': theme.primaryLight,
        '--color-secondary': theme.secondary,
        '--color-secondary-light': theme.secondaryLight,
        '--color-background': theme.background,
        '--color-surface': theme.surface,
        '--color-border': theme.border,
        '--color-text-primary': theme.textPrimary,
        '--color-text-secondary': theme.textSecondary,
        '--color-success': theme.success,
        '--color-warning': theme.warning,
        '--color-error': theme.error,
        '--color-info': theme.info,
      } as React.CSSProperties}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-background)] text-[var(--color-text-primary)]">
        {children}
      </body>
    </html>
  );
}
