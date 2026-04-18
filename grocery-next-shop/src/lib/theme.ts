import { readFile } from 'fs/promises';
import { join } from 'path';

export interface ThemeConfig {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  secondaryLight: string;
  background: string;
  surface: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  font: string;
}

const defaultTheme: ThemeConfig = {
  primary: '#22c55e',
  primaryDark: '#16a34a',
  primaryLight: '#dcfce7',
  secondary: '#fbbf24',
  secondaryLight: '#fef3c7',
  background: '#f8fafc',
  surface: '#ffffff',
  border: '#e2e8f0',
  textPrimary: '#0f172a',
  textSecondary: '#64748b',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  font: 'Inter',
};

export async function getThemeConfig(): Promise<ThemeConfig> {
  try {
    const configPath = join(process.cwd(), 'theme.config.json');
    const data = await readFile(configPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.warn('Failed to load theme.config.json, using defaults:', error);
    return defaultTheme;
  }
}
