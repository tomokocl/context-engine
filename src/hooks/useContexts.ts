"use client";

import { useState, useEffect, useCallback } from "react";
import { Context } from "@/lib/types";
import { getContexts, saveContext, deleteContext } from "@/lib/storage";

export function useContexts() {
  const [contexts, setContexts] = useState<Context[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await getContexts();
    setContexts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const save = useCallback(
    async (context: Context) => {
      await saveContext(context);
      await refresh();
    },
    [refresh]
  );

  const remove = useCallback(
    async (id: string) => {
      await deleteContext(id);
      await refresh();
    },
    [refresh]
  );

  return { contexts, loading, save, remove, refresh };
}
