"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { registerGsap, ScrollTrigger } from "@/lib/motion";

/**
 * Global motion setup. Renders nothing.
 *
 * Responsibilities:
 *
 *  • Registers ScrollTrigger once for the whole application.
 *
 *  • `ignoreMobileResize` — on Android and iOS the collapsing URL bar fires a
 *    resize on almost every scroll. Without this, ScrollTrigger recalculates
 *    constantly and scroll-linked sections visibly jump. This is the single
 *    most important setting for mobile stability.
 *
 *  • Refreshes trigger positions after web fonts settle, because oversized
 *    display type changes section heights when the real face swaps in.
 *
 *  • Refreshes again after each client-side route change, so animations built
 *    by the newly mounted page measure against the correct document height.
 */
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    registerGsap();
    ScrollTrigger.config({ ignoreMobileResize: true });

    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
  }, []);

  useEffect(() => {
    // Wait one frame so the incoming route has laid out before measuring.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
