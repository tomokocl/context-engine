"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ContextModal from "@/components/ContextModal";
import { useContexts } from "@/hooks/useContexts";
import { BUILT_IN_TEMPLATES } from "@/lib/templates";
import { Context } from "@/lib/types";
import { generateId } from "@/lib/storage";
import { CATEGORY_ICONS } from "@/lib/categories";

export default function TemplatesPage() {
  const { contexts, save } = useContexts();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInitial, setModalInitial] = useState<Context | null>(null);

  const useTemplate = (tpl: typeof BUILT_IN_TEMPLATES[0]) => {
    const now = new Date().toISOString();
    const draft: Context = {
      id: generateId(),
      title: tpl.name,
      content: tpl.contentTemplate,
      categoryType: tpl.categoryType,
      category: tpl.category,
      tags: tpl.tags,
      priority: "medium",
      createdAt: now,
      updatedAt: now,
    };
    setModalInitial(draft);
    setModalOpen(true);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar contexts={contexts} onCategoryFilter={setActiveCategory} activeCategory={activeCategory} />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-text mb-1">テンプレート</h2>
          <p className="text-sm text-text-muted">よく使うコンテキストのひな形 — クリックして使う</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {BUILT_IN_TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => useTemplate(tpl)}
              className="bg-surface border border-border rounded-2xl p-5 text-left hover:shadow-md transition-all hover:border-accent/40 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{CATEGORY_ICONS[tpl.category]}</span>
                <div>
                  <h3 className="font-semibold text-text text-sm group-hover:text-accent transition-colors">{tpl.name}</h3>
                  <span className="text-xs text-text-muted">{tpl.category}</span>
                </div>
                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                  tpl.categoryType === "private"
                    ? "bg-accent/10 text-accent"
                    : "bg-text/10 text-text-muted"
                }`}>
                  {tpl.categoryType === "private" ? "プライベート" : "仕事"}
                </span>
              </div>
              <p className="text-sm text-text-muted mb-3">{tpl.description}</p>
              <div className="flex flex-wrap gap-1">
                {tpl.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-base-dark text-text-muted px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-border text-xs text-accent font-medium group-hover:underline">
                このテンプレートを使う →
              </div>
            </button>
          ))}
        </div>
      </main>

      {modalOpen && (
        <ContextModal
          initial={modalInitial}
          onSave={(ctx) => { save(ctx); setModalOpen(false); setModalInitial(null); }}
          onClose={() => { setModalOpen(false); setModalInitial(null); }}
        />
      )}
    </div>
  );
}
