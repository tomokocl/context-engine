"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ALL_CATEGORIES, CATEGORY_ICONS } from "@/lib/categories";
import { Context } from "@/lib/types";
import { useLock } from "@/contexts/LockContext";
import CategoryLockModal from "./CategoryLockModal";

interface SidebarProps {
  contexts: Context[];
  onCategoryFilter: (category: string | null) => void;
  activeCategory: string | null;
}

export default function Sidebar({ contexts, onCategoryFilter, activeCategory }: SidebarProps) {
  const pathname = usePathname();
  const { isLocked, unlock } = useLock();
  const [lockModalCategory, setLockModalCategory] = useState<string | null>(null);

  const countByCategory = (cat: string) => contexts.filter((c) => c.category === cat).length;

  const handleCategoryClick = (cat: string) => {
    if (isLocked(cat)) {
      setLockModalCategory(cat);
    } else {
      onCategoryFilter(activeCategory === cat ? null : cat);
    }
  };

  const navItems = [
    { href: "/", label: "ダッシュボード" },
    { href: "/contexts", label: "コンテキスト" },
    { href: "/export", label: "エクスポート" },
    { href: "/templates", label: "テンプレート" },
    { href: "/settings", label: "設定" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-text text-base flex flex-col flex-shrink-0">
      <div className="px-6 py-5 border-b border-text-muted/30">
        <h1 className="text-lg font-semibold tracking-wide text-base">
          Context <span className="text-accent">Engine</span>
        </h1>
      </div>

      <nav className="px-3 py-4 border-b border-text-muted/30">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-3 py-2 rounded-lg text-sm mb-0.5 transition-colors ${
              pathname === item.href
                ? "bg-accent/20 text-accent font-medium"
                : "text-text-light hover:text-base hover:bg-white/5"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <button
          onClick={() => onCategoryFilter(null)}
          className="flex items-center gap-1 text-xs font-semibold text-text-light uppercase tracking-wider mb-2 px-3 w-full text-left hover:text-accent transition-colors"
        >
          <span className="text-accent">›</span> カテゴリ
        </button>

        {ALL_CATEGORIES.map((cat) => {
          const locked = isLocked(cat);
          const count = countByCategory(cat);
          const icon = CATEGORY_ICONS[cat] ?? "·";

          return (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-sm mb-0.5 transition-colors ${
                activeCategory === cat
                  ? "bg-accent/20 text-accent"
                  : "text-text-light hover:text-base hover:bg-white/5"
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{icon}</span>
                {cat}
                {locked && <span className="text-xs opacity-60">🔒</span>}
              </span>
              {!locked && count > 0 && (
                <span className="text-xs bg-white/10 px-1.5 py-0.5 rounded-full">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {lockModalCategory && (
        <CategoryLockModal
          category={lockModalCategory}
          onUnlock={() => {
            unlock(lockModalCategory);
            onCategoryFilter(lockModalCategory);
          }}
          onClose={() => setLockModalCategory(null)}
        />
      )}
    </aside>
  );
}
