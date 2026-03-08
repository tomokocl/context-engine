"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useContexts } from "@/hooks/useContexts";
import { exportContexts } from "@/lib/export";
import { ExportFormat } from "@/lib/types";
import { CATEGORY_ICONS } from "@/lib/categories";

export default function ExportPage() {
  const { contexts } = useContexts();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [format, setFormat] = useState<ExportFormat>("markdown");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(contexts.map((c) => c.id)));
  const clearAll = () => setSelected(new Set());

  const targetContexts = selected.size > 0 ? contexts.filter((c) => selected.has(c.id)) : contexts;
  const output = exportContexts(targetContexts, format);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = format === "markdown" ? "md" : format === "xml" ? "xml" : format === "json" ? "json" : "txt";
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `context-export.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formats: { value: ExportFormat; label: string; desc: string }[] = [
    { value: "markdown", label: "Markdown", desc: "ChatGPT・Claude等に最適" },
    { value: "xml", label: "XML", desc: "構造化データ形式" },
    { value: "json", label: "JSON", desc: "プログラム連携用" },
    { value: "plain", label: "プレーンテキスト", desc: "シンプルなテキスト" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar contexts={contexts} onCategoryFilter={setActiveCategory} activeCategory={activeCategory} />

      <main className="flex-1 p-8 flex gap-6">
        {/* Left: Settings */}
        <div className="w-80 flex-shrink-0 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-text mb-1">エクスポート</h2>
            <p className="text-sm text-text-muted">AIプロンプト用にエクスポート</p>
          </div>

          {/* Format */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-3">出力形式</h3>
            <div className="space-y-2">
              {formats.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFormat(f.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${
                    format === f.value
                      ? "border-accent bg-accent/5"
                      : "border-border bg-surface hover:border-accent/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text">{f.label}</span>
                    {format === f.value && <span className="text-accent text-xs">✓</span>}
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">{f.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Select */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-text">対象を選択</h3>
              <div className="flex gap-2">
                <button onClick={selectAll} className="text-xs text-accent hover:text-accent-dark">全選択</button>
                <span className="text-text-light text-xs">|</span>
                <button onClick={clearAll} className="text-xs text-text-muted hover:text-text">解除</button>
              </div>
            </div>
            <p className="text-xs text-text-muted mb-3">
              {selected.size === 0 ? "未選択（全件エクスポート）" : `${selected.size} 件選択中`}
            </p>
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {contexts.map((ctx) => (
                <label key={ctx.id} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selected.has(ctx.id)}
                    onChange={() => toggleSelect(ctx.id)}
                    className="accent-[#CBA890] w-4 h-4"
                  />
                  <span className="text-sm text-text-muted group-hover:text-text transition-colors flex items-center gap-1.5 min-w-0">
                    <span className="flex-shrink-0">{CATEGORY_ICONS[ctx.category]}</span>
                    <span className="truncate">{ctx.title}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={handleCopy}
              className="w-full py-2.5 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent-dark transition-colors"
            >
              {copied ? "コピーしました ✓" : "クリップボードにコピー"}
            </button>
            <button
              onClick={handleDownload}
              className="w-full py-2.5 bg-surface border border-border text-text rounded-xl text-sm font-medium hover:bg-base-dark transition-colors"
            >
              ファイルとしてダウンロード
            </button>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-text">プレビュー</h3>
            <span className="text-xs text-text-muted">{targetContexts.length} 件 / {output.length} 文字</span>
          </div>
          <pre className="flex-1 bg-text text-base/80 text-xs rounded-2xl p-6 overflow-auto font-mono leading-relaxed whitespace-pre-wrap">
            {output || "エクスポートするコンテキストがありません"}
          </pre>
        </div>
      </main>
    </div>
  );
}
