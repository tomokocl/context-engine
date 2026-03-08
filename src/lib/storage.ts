import { Context } from "./types";

const STORAGE_KEY = "ce-contexts";

function load(): Context[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function save(contexts: Context[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contexts));
}

export function getContexts(): Context[] {
  return load().sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function saveContext(context: Context): void {
  const all = load();
  const idx = all.findIndex((c) => c.id === context.id);
  if (idx >= 0) {
    all[idx] = context;
  } else {
    all.unshift(context);
  }
  save(all);
}

export function deleteContext(id: string): void {
  save(load().filter((c) => c.id !== id));
}

export function deleteAllContexts(): void {
  save([]);
}

export function importContexts(contexts: Context[]): void {
  const all = load();
  const map = new Map(all.map((c) => [c.id, c]));
  contexts.forEach((c) => map.set(c.id, c));
  save(Array.from(map.values()));
}

export function generateId(): string {
  return `ctx_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}
