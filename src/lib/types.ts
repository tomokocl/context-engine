export type CategoryType = "private" | "work";

export type PrivateCategory =
  | "旅行"
  | "食事・グルメ"
  | "人間関係"
  | "趣味"
  | "健康"
  | "資産・お金"
  | "ライフスタイル"
  | "その他（プライベート）";

export type WorkCategory =
  | "職歴"
  | "現在の仕事"
  | "スキル"
  | "プロジェクト"
  | "目標"
  | "学歴・学習"
  | "ネットワーキング"
  | "その他（仕事）";

export type Category = PrivateCategory | WorkCategory;

export type Priority = "high" | "medium" | "low";

export type ExportFormat = "markdown" | "xml" | "json" | "plain";

export interface Context {
  id: string;
  title: string;
  content: string;
  categoryType: CategoryType;
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
