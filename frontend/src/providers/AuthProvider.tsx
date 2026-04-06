"use client";

import { useAuthStore } from "@/stores/auth";
import { PropsWithChildren, useEffect } from "react";
import { useClientOnly } from "@/hooks/useClientOnly";
// import Loading from "@/app/loading";

export function AuthProvider({ children }: PropsWithChildren) {
  const mounted = useClientOnly();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      window.location.href = "/login";
    }
  }, [mounted, isAuthenticated, token]);

  // if (!mounted) {
  //   return <Loading />;
  // }

  return <>{children}</>;
}
