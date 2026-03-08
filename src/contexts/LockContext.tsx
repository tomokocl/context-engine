"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getUserLockedCategories } from "@/lib/user-settings";

type LockContextType = {
  isLocked: (category: string) => boolean;
  unlock: (category: string) => void;
};

const LockContext = createContext<LockContextType>({
  isLocked: () => false,
  unlock: () => {},
});

export function LockProvider({ children }: { children: ReactNode }) {
  // ユーザーが設定した「ロック対象カテゴリ」をlocalStorageから読む
  const [lockedCategories, setLockedCategories] = useState<string[]>([]);

  // セッション中に解除したカテゴリ（ページ更新でリセット）
  const [unlockedCategories, setUnlockedCategories] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const stored = sessionStorage.getItem("ce-unlocked");
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    setLockedCategories(getUserLockedCategories());
  }, []);

  const isLocked = (category: string) =>
    lockedCategories.includes(category) && !unlockedCategories.has(category);

  const unlock = (category: string) => {
    setUnlockedCategories((prev) => {
      const next = new Set(prev);
      next.add(category);
      try {
        sessionStorage.setItem("ce-unlocked", JSON.stringify([...next]));
      } catch {}
      return next;
    });
  };

  return (
    <LockContext.Provider value={{ isLocked, unlock }}>
      {children}
    </LockContext.Provider>
  );
}

export const useLock = () => useContext(LockContext);
