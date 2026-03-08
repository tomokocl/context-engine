"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ContextCard from "@/components/ContextCard";
import ContextModal from "@/components/ContextModal";
import { useContexts } from "@/hooks/useContexts";
import { Context } from "@/lib/types";
import { useLock } from "@/contexts/LockContext";

export default function ContextsPage() {
  const { contexts, save, remove } = useContexts();
  const { isLocked } = useLock();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Context | null>(null);

  const filtered = contexts.filter((c) => {
    if (isLocked(c.category)) return false;
    const matchCat = !activeCategory || c.category === activeCategory;
    const matchSearch =
      !search ||
      c.title.includes(search) ||
      c.content.includes(search) ||
      c.tags.some((t) => t.includes(search));
    return matchCat && matchSearch;
  });

  const handleSave = (ctx: Context) => {
    save(ctx);
    setModalOpen(false);
    setEditing(null);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar contexts={contexts} onCategoryFilter={setActiveCategory} activeCategory={activeCategory} />

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-text">コンテキスト</h2>
            <p className="text-sm text-text-muted mt-1">{filtered.length} 件</p>
          </div>
          <button
            onClick={() => { setEditing(null); setModalOpen(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent-dark transition-colors"
          >
            ＋ 新規コンテキスト
          </button>
        </div>

        <div className="mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="タイトル・内容・タグで検索..."
            className="w-full max-w-md border border-border rounded-xl px-4 py-2.5 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-accent/50 text-text"
          />
        </div>

        {activeCategory && isLocked(activeCategory) ? (
          <div className="bg-surface border border-border rounded-2xl p-12 text-center">
            <div className="text-3xl mb-3">🔒</div>
            <p className="text-text-muted">このカテゴリはロックされています</p>
            <p className="text-sm text-text-light mt-1">サイドバーのカテゴリをクリックして解除してください</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-surface border border-dashed border-border rounded-2xl p-12 text-center">
            <p className="text-text-muted mb-3">
              {search || activeCategory ? "条件に一致するコンテキストがありません" : "まだコンテキストがありません"}
            </p>
            {!search && !activeCategory && (
              <button
                onClick={() => { setEditing(null); setModalOpen(true); }}
                className="text-sm text-accent hover:text-accent-dark font-medium"
              >
                最初のコンテキストを追加する →
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((ctx) => (
              <ContextCard
                key={ctx.id}
                context={ctx}
                onEdit={(c) => { setEditing(c); setModalOpen(true); }}
                onDelete={(id) => { if (confirm("削除しますか？")) remove(id); }}
              />
            ))}
          </div>
        )}
      </main>

      {modalOpen && (
        <ContextModal
          initial={editing}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditing(null); }}
        />
      )}
    </div>
  );
}
