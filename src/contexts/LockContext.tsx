"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { LOCKED_CATEGORIES } from "@/lib/lock-config";

type LockContextType = {
  isLocked: (category: string) => boolean;
  unlock: (category: string) => void;
};

const LockContext = createContext<LockContextType>({
  isLocked: () => false,
  unlock: () => {},
});

export function LockProvider({ children }: { children: ReactNode }) {
  const [unlockedCategories, setUnlockedCategories] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const stored = sessionStorage.getItem("ce-unlocked");
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  const isLocked = (category: string) =>
    LOCKED_CATEGORIES.includes(category) && !unlockedCategories.has(category);

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
