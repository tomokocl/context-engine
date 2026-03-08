"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRIVATE_CATEGORIES, WORK_CATEGORIES } from "@/lib/categories";
import { Context } from "@/lib/types";

interface SidebarProps {
  contexts: Context[];
  onCategoryFilter: (category: string | null) => void;
  activeCategory: string | null;
}

export default function Sidebar({ contexts, onCategoryFilter, activeCategory }: SidebarProps) {
  const pathname = usePathname();

  const countByCategory = (cat: string) => contexts.filter((c) => c.category === cat).length;

  const navItems = [
    { href: "/", label: "ダッシュボード" },
    { href: "/contexts", label: "コンテキスト" },
    { href: "/export", label: "エクスポート" },
    { href: "/templates", label: "テンプレート" },
    { href: "/settings", label: "設定" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-text text-base flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-text-muted/30">
        <h1 className="text-lg font-semibold tracking-wide text-base">
          Context <span className="text-accent">Engine</span>
        </h1>
      </div>

      {/* Nav */}
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

      {/* Categories */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {/* Private */}
        <div className="mb-4">
          <button
            onClick={() => onCategoryFilter(null)}
            className="flex items-center gap-1 text-xs font-semibold text-text-light uppercase tracking-wider mb-2 px-3 w-full text-left hover:text-accent transition-colors"
          >
            <span className="text-accent">›</span> プライベート
          </button>
          {PRIVATE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryFilter(activeCategory === cat ? null : cat)}
              className={`flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-sm mb-0.5 transition-colors ${
                activeCategory === cat
                  ? "bg-accent/20 text-accent"
                  : "text-text-light hover:text-base hover:bg-white/5"
              }`}
            >
              <span className="flex items-center gap-2">
                {cat.replace("（プライベート）", "")}
              </span>
              {countByCategory(cat) > 0 && (
                <span className="text-xs bg-white/10 px-1.5 py-0.5 rounded-full">
                  {countByCategory(cat)}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Work */}
        <div>
          <button
            onClick={() => onCategoryFilter(null)}
            className="flex items-center gap-1 text-xs font-semibold text-text-light uppercase tracking-wider mb-2 px-3 w-full text-left hover:text-accent transition-colors"
          >
            <span className="text-accent">›</span> 仕事
          </button>
          {WORK_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryFilter(activeCategory === cat ? null : cat)}
              className={`flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-sm mb-0.5 transition-colors ${
                activeCategory === cat
                  ? "bg-accent/20 text-accent"
                  : "text-text-light hover:text-base hover:bg-white/5"
              }`}
            >
              <span className="flex items-center gap-2">
                {cat.replace("（仕事）", "")}
              </span>
              {countByCategory(cat) > 0 && (
                <span className="text-xs bg-white/10 px-1.5 py-0.5 rounded-full">
                  {countByCategory(cat)}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
