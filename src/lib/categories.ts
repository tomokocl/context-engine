import { PrivateCategory, WorkCategory } from "./types";

export const PRIVATE_CATEGORIES: PrivateCategory[] = [
  "旅行",
  "食事・グルメ",
  "人間関係",
  "趣味",
  "健康",
  "資産・お金",
  "ライフスタイル",
  "その他（プライベート）",
];

export const WORK_CATEGORIES: WorkCategory[] = [
  "職歴",
  "現在の仕事",
  "スキル",
  "プロジェクト",
  "目標",
  "学歴・学習",
  "ネットワーキング",
  "その他（仕事）",
];

export const CATEGORY_ICONS: Record<string, string> = {
  旅行: "✈️",
  "食事・グルメ": "🍽️",
  人間関係: "👥",
  趣味: "🎨",
  健康: "💪",
  "資産・お金": "💰",
  ライフスタイル: "🌿",
  "その他（プライベート）": "···",
  職歴: "📋",
  現在の仕事: "💼",
  スキル: "⚡",
  プロジェクト: "📁",
  目標: "🎯",
  "学歴・学習": "📚",
  ネットワーキング: "🤝",
  "その他（仕事）": "···",
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
