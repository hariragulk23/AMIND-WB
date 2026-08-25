import Image from "next/image";
import Link from "next/link";
import { brandAssets, brandLockup } from "@/data/brand";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** The ground the mark sits on. */
  tone?: "dark" | "light";
  className?: string;
}

/**
 * Site identity: the icon mark beside live "AM INDIA" text, one line — the
 * same pairing the footer uses (icon graphic plus a live wordmark), not the
 * full-lockup artwork. The lockup's own "GLOBAL COMMODITIES" subtitle doesn't
 * carry over: at header scale a second, smaller line of type read as clutter
 * next to the nav rather than as a subtitle.
 *
 * The icon (`brandAssets.icon`) is genuinely transparent and decorative here
 * — the adjacent text already names the brand, so its alt is empty and the
 * link's `aria-label` carries the accessible name, matching the pattern
 * FooterMark uses below the footer's own live "AM INDIA" text.
 *
 * `tone` controls the wordmark's colour so the header can flip it to light
 * text once its own background goes dark (on scroll, or while the mobile
 * panel is open) — the icon needs no such switch, since it is already
 * transparent artwork rather than something CSS colours.
 */
export function Logo({ tone = "light", className }: LogoProps) {
  const onDark = tone === "dark";
  const icon = brandAssets.icon;

  return (
    <Link
      href="/"
      aria-label={`${brandLockup.primary} — home`}
      className={cn(
        "group inline-flex items-center gap-2.5 transition-opacity duration-300 ease-brand hover:opacity-80",
        className,
      )}
    >
      <Image
        src={icon.path}
        alt=""
        width={icon.width}
        height={icon.height}
        priority
        sizes="28px"
        className="h-6 w-auto xl:h-7"
      />
      <span
        className={cn(
          "font-display text-lg font-semibold uppercase leading-none tracking-[0.08em] xl:text-xl",
          onDark ? "text-on-dark" : "text-on-light",
        )}
      >
        {brandLockup.primary}
      </span>
    </Link>
  );
}
