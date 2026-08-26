"use client";

import { useEffect, useRef, type RefObject } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { company } from "@/data/company";
import { primaryCta, primaryNav } from "@/data/navigation";
import {
  duration as dur,
  ease,
  gsap,
  prefersReducedMotion,
  registerGsap,
  stagger as staggerTokens,
  travel,
} from "@/lib/motion";

registerGsap();

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  /** Id shared with the toggle button's aria-controls. */
  id: string;
  /**
   * The header's Menu/Close button. It is the panel's only close control — a
   * second one inside the panel would sit directly beneath it, duplicating the
   * action for pointer users and the tab order for keyboard users. It is
   * included in the focus cycle so the panel can still be dismissed from the
   * keyboard without tabbing out to the page behind.
   */
  toggleRef: RefObject<HTMLButtonElement | null>;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen mobile navigation.
 *
 * Kept mounted (hidden) so it can animate both in and out. Behaviour that must
 * not depend on animation: Escape closes it, focus moves into the panel on
 * open and returns to the toggle on close, focus is kept inside while open,
 * and background scrolling is locked.
 */
export function MobileMenu({ open, onClose, id, toggleRef }: MobileMenuProps) {
  const scope = useRef<HTMLDivElement>(null);

  /* ---- Escape to close, and a lightweight focus trap ------------------- */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !scope.current) return;

      const panelItems = Array.from(
        scope.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);

      const items: HTMLElement[] = toggleRef.current
        ? [toggleRef.current, ...panelItems]
        : panelItems;
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, toggleRef]);

  /* ---- Lock background scrolling while the panel is open --------------- */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Move focus to the first destination rather than to the toggle, which
    // already has focus from the click that opened the panel.
    scope.current?.querySelector<HTMLElement>("a[href]")?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /* ---- Animation ------------------------------------------------------- */
  useGSAP(
    () => {
      const panel = scope.current;
      if (!panel) return;

      if (prefersReducedMotion()) {
        gsap.set(panel, { autoAlpha: open ? 1 : 0, clipPath: "none" });
        gsap.set("[data-menu-item]", { opacity: 1, y: 0 });
        return;
      }

      /* OPEN AND CLOSE ARE SYMMETRICAL. Close used to be a bare 0.32s
         autoAlpha fade on a different curve — less than half the open
         duration, with no clip-path — so the panel unrolled deliberately and
         then simply blinked out. It now retracts the way it arrived, just
         faster, which is the normal relationship between an opening and a
         closing gesture. */
      if (open) {
        gsap.set(panel, { autoAlpha: 1 });
        gsap.fromTo(
          panel,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: dur.ui,
            ease: ease.out,
          },
        );
        gsap.fromTo(
          "[data-menu-item]",
          { y: travel.sm, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: dur.base,
            delay: 0.16,
            stagger: staggerTokens.tight,
            ease: ease.out,
          },
        );
      } else {
        gsap.to(panel, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: dur.fast,
          ease: ease.inOut,
          onComplete: () => gsap.set(panel, { autoAlpha: 0 }),
        });
      }
    },
    { scope, dependencies: [open] },
  );

  return (
    <div
      ref={scope}
      id={id}
      /* Hidden by default so the panel never flashes before GSAP initialises
         and never covers the page when JavaScript is unavailable. */
      style={{ visibility: "hidden", opacity: 0 }}
      aria-hidden={!open}
      className="fixed inset-0 z-40 flex flex-col bg-ink lg:hidden"
    >
      {/* Clears the fixed header, whose Menu/Close button sits above. */}
      <div aria-hidden="true" style={{ height: "var(--am-header-h)" }} />

      <nav
        aria-label="Main"
        className="relative flex flex-1 flex-col justify-between gutter pb-10"
      >
        <ul className="flex flex-col">
          {primaryNav.map((item) => (
            <li key={item.href} data-menu-item className="border-t border-charcoal">
              <Link
                href={item.href}
                onClick={onClose}
                className="block py-5 transition-colors duration-300 hover:text-brass"
              >
                <span className="display-md block font-display uppercase tracking-[0.04em] text-on-dark">{item.label}</span>
                {item.description ? (
                  <>
                    {/* Separates "Commodities" from its descriptor, which
                        otherwise extract as one run-on string. */}
                    <span className="sr-only"> — </span>
                    <span className="mt-1 block text-sm text-on-dark-muted">
                      {item.description}
                    </span>
                  </>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>

        <div data-menu-item className="mt-10">
          <Link
            href={primaryCta.href}
            onClick={onClose}
            className="label-sm flex w-full items-center justify-between bg-brand-red-cta px-6 py-5 text-white transition-colors duration-300 hover:bg-brand-red-deep"
          >
            <span>{primaryCta.labelLong}</span>
            <span aria-hidden="true">→</span>
          </Link>

          <address className="mt-8 not-italic text-sm text-on-dark-muted">
            <a
              href={`mailto:${company.email}`}
              className="block transition-colors duration-300 hover:text-brass"
            >
              {company.email}
            </a>
            <a
              href={`tel:${company.phoneHref}`}
              className="mt-1 block transition-colors duration-300 hover:text-brass"
            >
              {company.phone}
            </a>
          </address>
        </div>
      </nav>
    </div>
  );
}
