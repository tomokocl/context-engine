export interface CategoryMeta {
  name: string;
  icon: string;
  defaultLocked: boolean;
}

export const CATEGORY_POOL: CategoryMeta[] = [
  // 仕事・キャリア
  { name: "現在の仕事", icon: "💼", defaultLocked: false },
  { name: "職歴・経歴", icon: "📋", defaultLocked: false },
  { name: "スキル・専門知識", icon: "⚡", defaultLocked: false },
  { name: "キャリア・目標", icon: "🎯", defaultLocked: false },
  { name: "フリーランス・仕事観", icon: "🚀", defaultLocked: false },
  { name: "収益・売上", icon: "💹", defaultLocked: false },
  { name: "副業・収益", icon: "💡", defaultLocked: false },
  { name: "学業・研究", icon: "📚", defaultLocked: false },
  // テクノロジー・発信
  { name: "AI・ツール活用", icon: "🤖", defaultLocked: false },
  { name: "発信・SNS", icon: "📢", defaultLocked: false },
  { name: "ライティング・文章", icon: "✍️", defaultLocked: false },
  { name: "ブランディング", icon: "✨", defaultLocked: false },
  // 生活・趣味
  { name: "旅行", icon: "✈️", defaultLocked: false },
  { name: "食事・グルメ", icon: "🍽️", defaultLocked: false },
  { name: "スポーツ・フィットネス", icon: "🏃", defaultLocked: false },
  { name: "カルチャー・趣味", icon: "🎬", defaultLocked: false },
  { name: "アート・クリエイティブ", icon: "🎨", defaultLocked: false },
  { name: "ゲーム", icon: "🎮", defaultLocked: false },
  // 家族
  { name: "育児・子育て", icon: "👶", defaultLocked: true },
  { name: "家族・パートナー", icon: "🏠", defaultLocked: true },
  { name: "家事・生活管理", icon: "🏡", defaultLocked: false },
  // 自己
  { name: "思想・価値観", icon: "🧠", defaultLocked: true },
  { name: "健康・身体", icon: "💪", defaultLocked: true },
  { name: "人間関係", icon: "👥", defaultLocked: true },
  { name: "資産・お金", icon: "💰", defaultLocked: true },
  { name: "メンタル・心", icon: "🌱", defaultLocked: true },
];

export const CATEGORY_POOL_MAP: Record<string, CategoryMeta> = Object.fromEntries(
  CATEGORY_POOL.map((c) => [c.name, c])
);

// 仕事スタイル → カテゴリ名リスト
export const WORK_STYLE_MAP: Record<string, string[]> = {
  "会社員・正社員": ["現在の仕事", "職歴・経歴", "スキル・専門知識", "キャリア・目標"],
  "フリーランス・個人事業主": ["フリーランス・仕事観", "スキル・専門知識", "収益・売上", "キャリア・目標"],
  "副業・複業中": ["副業・収益", "現在の仕事", "スキル・専門知識"],
  "求職中・転職検討中": ["職歴・経歴", "スキル・専門知識", "キャリア・目標"],
  "専業主婦・主夫": ["家事・生活管理", "キャリア・目標"],
  "学生": ["学業・研究", "スキル・専門知識", "キャリア・目標"],
  "その他": ["キャリア・目標"],
};

// 興味・活動 → カテゴリ名リスト
export const INTEREST_MAP: Record<string, string[]> = {
  "AI・ツール活用": ["AI・ツール活用"],
  "SNSで発信": ["発信・SNS", "ブランディング"],
  "ライティング・文章": ["ライティング・文章"],
  "投資・資産管理": ["資産・お金"],
  "旅行": ["旅行"],
  "グルメ・料理": ["食事・グルメ"],
  "スポーツ・フィットネス": ["スポーツ・フィットネス"],
  "カルチャー（映画・音楽・本）": ["カルチャー・趣味"],
  "アート・クリエイティブ": ["アート・クリエイティブ"],
  "ゲーム": ["ゲーム"],
};

// 家族構成 → カテゴリ名リスト
export const FAMILY_MAP: Record<string, string[]> = {
  "子どもがいる": ["育児・子育て"],
  "パートナー・配偶者がいる": ["家族・パートナー"],
  "親と同居している": ["家族・パートナー"],
  "一人暮らし": [],
};

// 常に追加する基本カテゴリ
export const DEFAULT_CATEGORIES = ["思想・価値観", "健康・身体", "人間関係"];

export function generateCategories(
  workStyle: string,
  interests: string[],
  familyStatuses: string[]
): CategoryMeta[] {
  const selected = new Set<string>();

  (WORK_STYLE_MAP[workStyle] ?? []).forEach((c) => selected.add(c));
  interests.forEach((i) => (INTEREST_MAP[i] ?? []).forEach((c) => selected.add(c)));
  familyStatuses.forEach((f) => (FAMILY_MAP[f] ?? []).forEach((c) => selected.add(c)));
  DEFAULT_CATEGORIES.forEach((c) => selected.add(c));

  return Array.from(selected)
    .map((name) => CATEGORY_POOL_MAP[name])
    .filter(Boolean);
}
