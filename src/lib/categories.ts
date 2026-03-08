import { Category } from "./types";

export const ALL_CATEGORIES: Category[] = [
  "AI・ツール活用",
  "発信・コンテンツ",
  "仕事・ビジネス観",
  "スキル・成長",
  "思想・価値観",
  "育児・家族",
  "資産・お金",
  "健康・身体",
  "人間関係",
];

export const CATEGORY_ICONS: Record<string, string> = {
  "AI・ツール活用": "🤖",
  "発信・コンテンツ": "📢",
  "仕事・ビジネス観": "💼",
  "スキル・成長": "📈",
  "思想・価値観": "🧠",
  "育児・家族": "👶",
  "資産・お金": "💰",
  "健康・身体": "💪",
  "人間関係": "👥",
};

export const PRIORITY_LABELS: Record<string, string> = {
  high: "高",
  medium: "中",
  low: "低",
};

export const PRIORITY_COLORS: Record<string, string> = {
  high: "bg-accent text-white",
  medium: "bg-accent-light text-text",
  low: "bg-base-darker text-text-muted",
};
