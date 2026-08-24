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

    /* Images settle after fonts do, and they change section heights more than
       type does — an unloaded commodity frame reserves its box, but a hero
       that swaps in at a different rendered height still moves everything
       below it. Measuring before that leaves every start position downstream
       slightly wrong. */
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      requestAnimationFrame(onLoad);
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    /* FAILSAFE — nothing stays invisible because a trigger did not fire.
       The reveals hide their target first and animate it in, so a trigger
       that never fires leaves real content at opacity 0 while still taking
       up layout height: a blank band the visitor cannot read or scroll past.
       Rather than trust that never happens, this sweeps up anything still
       hidden a few seconds after load and simply shows it. A missed reveal
       then costs the animation, not the content.
       `data-reveal-pending` is set by the reveal components and cleared by
       their own onComplete, so this only ever touches elements whose
       animation genuinely did not run. */
    const failsafe = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal-pending]")
        .forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
          el.removeAttribute("data-reveal-pending");
        });
    }, 4000);

    return () => {
      window.clearTimeout(failsafe);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    // Wait one frame so the incoming route has laid out before measuring.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
