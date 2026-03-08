"use client";

import { useState, useEffect } from "react";
import { Context, Priority, CategoryType } from "@/lib/types";
import { PRIVATE_CATEGORIES, WORK_CATEGORIES } from "@/lib/categories";
import { generateId } from "@/lib/storage";

interface ContextModalProps {
  initial?: Context | null;
  onSave: (context: Context) => void;
  onClose: () => void;
}

export default function ContextModal({ initial, onSave, onClose }: ContextModalProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [categoryType, setCategoryType] = useState<CategoryType>(
    initial?.categoryType ?? "private"
  );
  const [category, setCategory] = useState(
    initial?.category ?? PRIVATE_CATEGORIES[0]
  );
  const [priority, setPriority] = useState<Priority>(initial?.priority ?? "medium");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(initial?.tags ?? []);

  const categories = categoryType === "private" ? PRIVATE_CATEGORIES : WORK_CATEGORIES;

  useEffect(() => {
    if (!initial) {
      setCategory(categories[0]);
    }
  }, [categoryType]); // eslint-disable-line

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    const now = new Date().toISOString();
    onSave({
      id: initial?.id ?? generateId(),
      title: title.trim(),
      content: content.trim(),
      categoryType,
      category: category as Context["category"],
      priority,
      tags,
      createdAt: initial?.createdAt ?? now,
      updatedAt: now,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-text/60 backdrop-blur-sm">
      <div className="bg-surface w-full max-w-2xl mx-4 rounded-2xl shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text">
            {initial ? "コンテキストを編集" : "新しいコンテキスト"}
          </h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">タイトル</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例：旅行の好み"
              className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-base focus:outline-none focus:ring-2 focus:ring-accent/50 text-text"
            />
          </div>

          {/* Category Type */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">種別</label>
            <div className="flex gap-2">
              {(["private", "work"] as CategoryType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setCategoryType(t)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    categoryType === t
                      ? "bg-accent text-white"
                      : "bg-base-dark text-text-muted hover:bg-base-darker"
                  }`}
                >
                  {t === "private" ? "プライベート" : "仕事"}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">カテゴリ</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Context["category"])}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-base focus:outline-none focus:ring-2 focus:ring-accent/50 text-text"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">優先度</label>
            <div className="flex gap-2">
              {(["high", "medium", "low"] as Priority[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    priority === p
                      ? "bg-accent text-white"
                      : "bg-base-dark text-text-muted hover:bg-base-darker"
                  }`}
                >
                  {p === "high" ? "高" : p === "medium" ? "中" : "低"}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">内容</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="AIに渡したい情報を自由に書いてください"
              rows={6}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-base focus:outline-none focus:ring-2 focus:ring-accent/50 text-text resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">タグ</label>
            <div className="flex gap-2 mb-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="タグを入力してEnter"
                className="flex-1 border border-border rounded-lg px-3 py-2 text-sm bg-base focus:outline-none focus:ring-2 focus:ring-accent/50 text-text"
              />
              <button
                onClick={addTag}
                className="px-4 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent-dark transition-colors"
              >
                追加
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-xs bg-base-dark text-text-muted px-2 py-1 rounded-full"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-400 transition-colors leading-none"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-border">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-sm text-text-muted hover:bg-base-dark transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim()}
            className="px-5 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
