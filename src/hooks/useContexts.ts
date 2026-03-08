"use client";

import { useState, useEffect, useCallback } from "react";
import { Context } from "@/lib/types";
import { getContexts, saveContext, deleteContext } from "@/lib/storage";

export function useContexts() {
  const [contexts, setContexts] = useState<Context[]>([]);

  useEffect(() => {
    setContexts(getContexts());
  }, []);

  const save = useCallback((context: Context) => {
    saveContext(context);
    setContexts(getContexts());
  }, []);

  const remove = useCallback((id: string) => {
    deleteContext(id);
    setContexts(getContexts());
  }, []);

  return { contexts, save, remove };
}
