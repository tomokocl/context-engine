import { Context } from "./types";
import { supabase } from "./supabase";

export async function getContexts(): Promise<Context[]> {
  const { data, error } = await supabase
    .from("contexts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contexts:", error);
    return [];
  }

  return (data || []).map((row) => ({
    id: row.id,
    title: row.title,
    content: row.content,
    categoryType: row.category_type as "private" | "work",
    category: row.category,
    tags: row.tags || [],
    priority: row.priority as "high" | "medium" | "low",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

export async function saveContext(context: Context): Promise<void> {
  const row = {
    id: context.id,
    title: context.title,
    content: context.content,
    category_type: context.categoryType,
    category: context.category,
    tags: context.tags,
    priority: context.priority,
    created_at: context.createdAt,
    updated_at: context.updatedAt,
  };

  const { error } = await supabase
    .from("contexts")
    .upsert(row, { onConflict: "id" });

  if (error) {
    console.error("Error saving context:", error);
    throw error;
  }
}

export async function deleteContext(id: string): Promise<void> {
  const { error } = await supabase
    .from("contexts")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting context:", error);
    throw error;
  }
}

export async function deleteAllContexts(): Promise<void> {
  const { error } = await supabase
    .from("contexts")
    .delete()
    .neq("id", "");

  if (error) {
    console.error("Error deleting all contexts:", error);
    throw error;
  }
}

export async function importContexts(contexts: Context[]): Promise<void> {
  const rows = contexts.map((c) => ({
    id: c.id,
    title: c.title,
    content: c.content,
    category_type: c.categoryType,
    category: c.category,
    tags: c.tags,
    priority: c.priority,
    created_at: c.createdAt,
    updated_at: c.updatedAt,
  }));

  const { error } = await supabase
    .from("contexts")
    .upsert(rows, { onConflict: "id" });

  if (error) {
    console.error("Error importing contexts:", error);
    throw error;
  }
}

export function generateId(): string {
  return `ctx_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}
