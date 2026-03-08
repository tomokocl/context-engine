export type CategoryType = "private" | "work"; // DB互換のため保持（UI非表示）

export type Category =
  | "AI・ツール活用"
  | "発信・コンテンツ"
  | "仕事・ビジネス観"
  | "スキル・成長"
  | "思想・価値観"
  | "育児・家族"
  | "資産・お金"
  | "健康・身体"
  | "人間関係";

export type Priority = "high" | "medium" | "low";

export type ExportFormat = "markdown" | "xml" | "json" | "plain";

export interface Context {
  id: string;
  title: string;
  content: string;
  categoryType: CategoryType; // legacy（Supabase列保持用）
  category: Category;
  tags: string[];
  priority: Priority;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  categoryType: CategoryType;
  category: Category;
  contentTemplate: string;
  tags: string[];
}
