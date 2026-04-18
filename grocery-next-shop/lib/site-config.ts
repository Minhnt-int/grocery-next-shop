import type { SiteConfig } from "@/types/config";
import siteConfigData from "@/data/site.config.json";

export const siteConfig: SiteConfig = siteConfigData as SiteConfig;

export function getThemeVariables(config: SiteConfig = siteConfig) {
  return {
    "--color-primary": config.primaryColor,
    "--color-secondary": config.secondaryColor,
    "--color-accent": config.accentColor,
    "--color-background": config.backgroundColor,
    "--color-surface": config.surfaceColor,
    "--color-text": config.textColor,
    "--radius": config.radius,
  };
}
