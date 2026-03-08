"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useContexts } from "@/hooks/useContexts";

export default function SettingsPage() {
  const { contexts } = useContexts();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [cleared, setCleared] = useState(false);

  const handleClearAll = () => {
    if (confirm("全コンテキストを削除します。この操作は取り消せません。続けますか？")) {
      localStorage.removeItem("context-engine-data");
      setCleared(true);
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  const handleExportBackup = () => {
    const data = localStorage.getItem("context-engine-data") || "[]";
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `context-engine-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (Array.isArray(data)) {
          localStorage.setItem("context-engine-data", JSON.stringify(data));
          alert(`${data.length} 件のコンテキストをインポートしました`);
          window.location.reload();
        }
      } catch {
        alert("ファイルの形式が正しくありません");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar contexts={contexts} onCategoryFilter={setActiveCategory} activeCategory={activeCategory} />

      <main className="flex-1 p-8 max-w-2xl">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-text mb-1">設定</h2>
          <p className="text-sm text-text-muted">データの管理・バックアップ</p>
        </div>

        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <h3 className="font-semibold text-text mb-4">データ概要</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "総コンテキスト", value: contexts.length },
                { label: "プライベート", value: contexts.filter((c) => c.categoryType === "private").length },
                { label: "仕事", value: contexts.filter((c) => c.categoryType === "work").length },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-bold text-text">{s.value}</p>
                  <p className="text-xs text-text-muted mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Backup & Restore */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <h3 className="font-semibold text-text mb-4">バックアップ・復元</h3>
            <div className="space-y-3">
              <button
                onClick={handleExportBackup}
                className="w-full py-2.5 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent-dark transition-colors"
              >
                JSONでバックアップ
              </button>
              <label className="block w-full py-2.5 bg-surface border border-border text-text rounded-xl text-sm font-medium hover:bg-base-dark transition-colors text-center cursor-pointer">
                JSONから復元
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-surface border border-red-200 rounded-2xl p-6">
            <h3 className="font-semibold text-red-400 mb-2">危険な操作</h3>
            <p className="text-sm text-text-muted mb-4">全コンテキストを削除します。この操作は取り消せません。</p>
            <button
              onClick={handleClearAll}
              className="px-5 py-2 bg-red-400 text-white rounded-xl text-sm font-medium hover:bg-red-500 transition-colors"
            >
              {cleared ? "削除しました..." : "全データを削除"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
