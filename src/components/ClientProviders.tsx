"use client";

import { LockProvider } from "@/contexts/LockContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <LockProvider>{children}</LockProvider>;
}
