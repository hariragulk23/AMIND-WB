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
 * Sits transparent over the hero and transitions to a solid, minimal bar once
 * the visitor scrolls past it. The state is driven by a passive scroll
 * listener throttled to one animation frame — deliberately not a ScrollTrigger,
 * so the header stays correct even before ScrollTrigger has measured the page
 * (which matters on mobile, where the collapsing URL bar changes heights).
 *
 * Every page hero on this site uses a dark ground, so the header's light
 * treatment is consistent across all routes.
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
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-brand",
          scrolled
            ? "border-b border-charcoal bg-ink/92 backdrop-blur-[6px]"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className="gutter mx-auto flex max-w-[100rem] items-center justify-between"
          style={{ height: "var(--am-header-h)" }}
        >
          <Logo tone="dark" />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9">
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
                          ? "text-on-dark"
                          : "text-on-dark-muted hover:text-on-dark",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-0 -bottom-0.5 block h-px origin-left bg-brass transition-transform duration-500 ease-brand",
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

          <div className="flex items-center gap-2">
            <Link
              href={primaryCta.href}
              className="label-xs hidden bg-paper px-6 py-3.5 text-ink transition-colors duration-300 ease-brand hover:bg-brass lg:block"
            >
              {primaryCta.label}
            </Link>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              className="label-xs -mr-2 p-2 text-on-dark transition-colors duration-300 hover:text-brass lg:hidden"
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
