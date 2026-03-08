import { CategoryMeta, CATEGORY_POOL_MAP } from "./category-pool";

const CATEGORIES_KEY = "ce-user-categories";
const LOCKED_KEY = "ce-user-locked";
const SETUP_KEY = "ce-setup-complete";

export function isSetupComplete(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(SETUP_KEY) === "1";
}

export function completeSetup(categories: CategoryMeta[], lockedNames: string[]): void {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  localStorage.setItem(LOCKED_KEY, JSON.stringify(lockedNames));
  localStorage.setItem(SETUP_KEY, "1");
}

export function getUserCategories(): CategoryMeta[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CATEGORIES_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as CategoryMeta[];
  } catch {
    return [];
  }
}

export function getUserLockedCategories(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(LOCKED_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as string[];
  } catch {
    return [];
  }
}

export function saveUserCategories(categories: CategoryMeta[]): void {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

export function saveUserLockedCategories(lockedNames: string[]): void {
  localStorage.setItem(LOCKED_KEY, JSON.stringify(lockedNames));
}

export function resetSetup(): void {
  localStorage.removeItem(CATEGORIES_KEY);
  localStorage.removeItem(LOCKED_KEY);
  localStorage.removeItem(SETUP_KEY);
}

export function getCategoryIcon(name: string): string {
  return CATEGORY_POOL_MAP[name]?.icon ?? "·";
}
