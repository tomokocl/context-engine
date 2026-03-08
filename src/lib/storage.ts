import { Context } from "./types";

const STORAGE_KEY = "context-engine-data";

export function getContexts(): Context[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveContext(context: Context): void {
  const contexts = getContexts();
  const idx = contexts.findIndex((c) => c.id === context.id);
  if (idx >= 0) {
    contexts[idx] = context;
  } else {
    contexts.unshift(context);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contexts));
}

export function deleteContext(id: string): void {
  const contexts = getContexts().filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contexts));
}

export function generateId(): string {
  return `ctx_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}
