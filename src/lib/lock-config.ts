// ロックするカテゴリ一覧（PINで解除するまで非表示）
export const LOCKED_CATEGORIES: string[] = [
  "思想・価値観",
  "育児・家族",
  "資産・お金",
  "健康・身体",
  "人間関係",
];

// PINコード（Railway環境変数 NEXT_PUBLIC_LOCK_PIN で変更可能）
export const LOCK_PIN = process.env.NEXT_PUBLIC_LOCK_PIN ?? "1234";
