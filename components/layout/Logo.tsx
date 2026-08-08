import Link from "next/link";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

interface LogoProps {
  tone?: "dark" | "light";
  /** `full` shows the complete wordmark; `mark` shows only the AM monogram. */
  variant?: "full" | "mark";
  className?: string;
}

/**
 * TEMPORARY TYPOGRAPHIC WORDMARK.
 *
 * The official AM Global Commodities logo has not been supplied yet. This is a
 * type-only stand-in built from the brand faces so the header, footer and
 * social cards are complete.
 *
 * WHEN THE OFFICIAL LOGO ARRIVES: replace the inner markup of this component
 * with the supplied asset and nothing else changes. The logo must be used
 * exactly as delivered — never recoloured, stretched, cropped or re-drawn. If
 * the official mark is a single fixed-colour file, request light and dark
 * variants rather than filtering this one.
 */
export function Logo({ tone = "dark", variant = "full", className }: LogoProps) {
  const onDark = tone === "dark";

  return (
    <Link
      href="/"
      aria-label={`${company.brand} — home`}
      className={cn(
        "group inline-flex items-baseline gap-2.5 transition-colors duration-300 ease-brand",
        onDark ? "text-on-dark" : "text-on-light",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="font-display text-[1.375rem] leading-none tracking-[-0.02em]"
      >
        AM
      </span>
      {variant === "full" ? (
        <span
          aria-hidden="true"
          className={cn(
            "label-xs pt-px transition-colors duration-300 ease-brand",
            onDark
              ? "text-on-dark-muted group-hover:text-brass"
              : "text-on-light-muted group-hover:text-brass-deep",
          )}
        >
          Global Commodities
        </span>
      ) : null}
    </Link>
  );
}
