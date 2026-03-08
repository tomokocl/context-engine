// ロックするカテゴリ一覧
export const LOCKED_CATEGORIES: string[] = ["人間関係", "健康"];

// PINコード（Railway環境変数 NEXT_PUBLIC_LOCK_PIN で変更可能）
export const LOCK_PIN = process.env.NEXT_PUBLIC_LOCK_PIN ?? "1234";
