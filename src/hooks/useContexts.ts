"use client";

import { useState, useEffect, useCallback } from "react";
import { Context } from "@/lib/types";
import { getContexts, saveContext, deleteContext } from "@/lib/storage";

export function useContexts() {
  const [contexts, setContexts] = useState<Context[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setContexts(getContexts());
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const save = useCallback(
    (context: Context) => {
      saveContext(context);
      refresh();
    },
    [refresh]
  );

  const remove = useCallback(
    (id: string) => {
      deleteContext(id);
      refresh();
    },
    [refresh]
  );

  return { contexts, loading, save, remove, refresh };
}
