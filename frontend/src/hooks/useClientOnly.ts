"use client";

import { useEffect, useState } from "react";

/**
 * Hook to ensure component only renders on client-side
 * Prevents hydration mismatch errors
 */
export function useClientOnly() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
