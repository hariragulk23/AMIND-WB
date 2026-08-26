"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryCta, primaryNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

/**
 * Site header.
 *
 * Sits transparent over the off-white hero and settles into a solid bar with a
 * hairline once the visitor scrolls past it. The state is driven by a passive
 * scroll listener throttled to one animation frame — deliberately not a
 * ScrollTrigger, so the header stays correct even before ScrollTrigger has
 * measured the page (which matters on mobile, where the collapsing URL bar
 * changes heights).
 *
 * Every page hero on this site now uses the light canvas, so the header keeps
 * one consistent dark-on-light treatment across all routes. The only exception
 * is while the mobile panel is open, when the toggle sits over a navy ground
 * and inverts.
 *
 * The active navigation state uses the logo's red/green/red rule — one of the
 * three places that motif is allowed to appear.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const menuId = useId();

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Close the panel on navigation and return focus to the toggle. */
  useEffect(() => {
    setMenuOpen((wasOpen) => {
      if (wasOpen) toggleRef.current?.focus();
      return false;
    });
  }, [pathname]);

  return (
    <>
      {/* `backdrop-filter` is deliberately NOT in the transition list. It was,
          and animating it meant 600ms of continuous backdrop re-blurring every
          time the visitor crossed the 24px scroll threshold — one of the most
          expensive things a compositor can be asked to interpolate, on the one
          element that is composited over everything else. The blur now snaps
          while the background colour fades under it, which is imperceptible
          because the colour is what carries the transition. */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-[600ms] ease-brand",
          scrolled && !menuOpen
            ? "border-b border-paper-line bg-paper/92 backdrop-blur-[6px]"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className="gutter mx-auto flex max-w-[100rem] items-center justify-between gap-6"
          style={{ height: "var(--am-header-h)" }}
        >
          <Logo tone={menuOpen ? "dark" : "light"} />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {primaryNav.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "label-xs group relative block py-2 transition-colors duration-300 ease-brand",
                        active
                          ? "text-on-light"
                          : "text-on-light-muted hover:text-on-light",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "brand-rule absolute inset-x-0 -bottom-1 block origin-left transition-transform duration-500 ease-brand",
                          active
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={primaryCta.href}
              className="label-xs hidden bg-brand-red-cta px-6 py-3.5 text-white transition-colors duration-300 ease-brand hover:bg-brand-red-deep lg:block"
            >
              {primaryCta.label}
            </Link>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              className={cn(
                "label-xs -mr-2 p-2 transition-colors duration-300 lg:hidden",
                menuOpen
                  ? "text-on-dark hover:text-brass"
                  : "text-on-light hover:text-brand-red",
              )}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        id={menuId}
        toggleRef={toggleRef}
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false);
          toggleRef.current?.focus();
        }}
      />
    </>
  );
}
