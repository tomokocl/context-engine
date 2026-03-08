"use client";

import { Context } from "@/lib/types";
import { CATEGORY_ICONS, PRIORITY_LABELS, PRIORITY_COLORS } from "@/lib/categories";

interface ContextCardProps {
  context: Context;
  onEdit: (context: Context) => void;
  onDelete: (id: string) => void;
}

export default function ContextCard({ context, onEdit, onDelete }: ContextCardProps) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4 hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-lg flex-shrink-0">{CATEGORY_ICONS[context.category]}</span>
          <h3 className="font-medium text-text truncate">{context.title}</h3>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLORS[context.priority]}`}
          >
            {PRIORITY_LABELS[context.priority]}
          </span>
          <button
            onClick={() => onEdit(context)}
            className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-accent transition-all text-sm px-1.5 py-0.5 rounded"
          >
            編集
          </button>
          <button
            onClick={() => onDelete(context.id)}
            className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-red-400 transition-all text-sm px-1.5 py-0.5 rounded"
          >
            削除
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-text-muted bg-base-dark px-2 py-0.5 rounded-full">
          {context.category}
        </span>
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${
            context.categoryType === "private"
              ? "bg-accent/10 text-accent"
              : "bg-text/10 text-text-muted"
          }`}
        >
          {context.categoryType === "private" ? "プライベート" : "仕事"}
        </span>
      </div>

      <p className="text-sm text-text-muted line-clamp-2 mb-3">{context.content}</p>

      {context.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {context.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-base-dark text-text-muted px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
