"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import ContextModal from "@/components/ContextModal";
import { useContexts } from "@/hooks/useContexts";
import { Context } from "@/lib/types";
import { CATEGORY_ICONS, PRIORITY_COLORS, PRIORITY_LABELS } from "@/lib/categories";

export default function Dashboard() {
  const { contexts, save, remove } = useContexts();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Context | null>(null);

  const privateCount = contexts.filter((c) => c.categoryType === "private").length;
  const workCount = contexts.filter((c) => c.categoryType === "work").length;
  const recent = contexts.slice(0, 5);

  const handleSave = (ctx: Context) => {
    save(ctx);
    setModalOpen(false);
    setEditing(null);
  };

  const handleEdit = (ctx: Context) => {
    setEditing(ctx);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("このコンテキストを削除しますか？")) remove(id);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar contexts={contexts} onCategoryFilter={setActiveCategory} activeCategory={activeCategory} />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-text">ダッシュボード</h2>
            <p className="text-sm text-text-muted mt-1">コンテキストの概要</p>
          </div>
          <button
            onClick={() => { setEditing(null); setModalOpen(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent-dark transition-colors shadow-sm"
          >
            <span>＋</span> 新規コンテキスト
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "合計コンテキスト", value: contexts.length },
            { label: "プライベート", value: privateCount },
            { label: "仕事", value: workCount },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <p className="text-sm text-text-muted mb-2">{stat.label}</p>
              <p className="text-4xl font-bold text-text">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => { setEditing(null); setModalOpen(true); }}
            className="bg-surface border border-border rounded-2xl p-5 text-left hover:shadow-md transition-shadow hover:border-accent/40 group"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">＋</span>
              <span className="font-medium text-text text-sm">コンテキスト追加</span>
            </div>
            <p className="text-xs text-text-muted">新しいコンテキストを登録</p>
          </button>

          <Link href="/export" className="bg-surface border border-border rounded-2xl p-5 text-left hover:shadow-md transition-shadow hover:border-accent/40 group block">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">↓</span>
              <span className="font-medium text-text text-sm">エクスポート</span>
            </div>
            <p className="text-xs text-text-muted">AIプロンプト用にエクスポート</p>
          </Link>

          <Link href="/templates" className="bg-surface border border-border rounded-2xl p-5 text-left hover:shadow-md transition-shadow hover:border-accent/40 group block">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">⊡</span>
              <span className="font-medium text-text text-sm">テンプレート</span>
            </div>
            <p className="text-xs text-text-muted">テンプレートを閲覧・作成</p>
          </Link>
        </div>

        {/* Recent */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text">最近のコンテキスト</h3>
            <Link href="/contexts" className="text-sm text-accent hover:text-accent-dark transition-colors">
              すべて表示
            </Link>
          </div>

          {recent.length === 0 ? (
            <div className="bg-surface border border-dashed border-border rounded-2xl p-12 text-center">
              <p className="text-text-muted mb-3">まだコンテキストがありません</p>
              <button
                onClick={() => { setEditing(null); setModalOpen(true); }}
                className="text-sm text-accent hover:text-accent-dark font-medium transition-colors"
              >
                最初のコンテキストを追加する →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {recent.map((ctx) => (
                <div
                  key={ctx.id}
                  className="bg-surface border border-border rounded-xl px-5 py-4 flex items-center justify-between hover:shadow-sm transition-shadow group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{CATEGORY_ICONS[ctx.category]}</span>
                      <span className="font-medium text-text text-sm">{ctx.title}</span>
                      <span className="text-xs bg-base-dark text-text-muted px-2 py-0.5 rounded-full">{ctx.category}</span>
                    </div>
                    <p className="text-sm text-text-muted truncate max-w-xl">{ctx.content}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLORS[ctx.priority]}`}>
                      {PRIORITY_LABELS[ctx.priority]}
                    </span>
                    <span className="text-xs text-text-light">
                      {ctx.categoryType === "private" ? "プライベート" : "仕事"}
                    </span>
                    <button onClick={() => handleEdit(ctx)} className="opacity-0 group-hover:opacity-100 text-xs text-text-muted hover:text-accent transition-all">編集</button>
                    <button onClick={() => handleDelete(ctx.id)} className="opacity-0 group-hover:opacity-100 text-xs text-text-muted hover:text-red-400 transition-all">削除</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
