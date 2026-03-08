"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LockProvider } from "@/contexts/LockContext";
import { isSetupComplete } from "@/lib/user-settings";

function SetupGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/setup/" && pathname !== "/setup" && !isSetupComplete()) {
      router.replace("/setup/");
    }
  }, [pathname, router]);

  return <>{children}</>;
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LockProvider>
      <SetupGuard>{children}</SetupGuard>
    </LockProvider>
  );
}
