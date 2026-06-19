"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __fmRevealTimer?: number;
  }
}

/**
 * Confirms the app hydrated on the client. Cancels the "force reveal" failsafe
 * so framer-motion controls the entrance animations normally. If hydration
 * never happens (JS blocked / failed), the failsafe reveals content instead.
 */
export function HydrationReady() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.__fmRevealTimer) {
      clearTimeout(window.__fmRevealTimer);
      window.__fmRevealTimer = undefined;
    }
    document.documentElement.classList.remove("fm-force-reveal");
  }, []);

  return null;
}
