import Image from "next/image";
import Link from "next/link";
import { brandAssets, brandLockup } from "@/data/brand";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** The ground the mark sits on, not the colour of the mark. */
  tone?: "dark" | "light";
  /** `full` pairs the wordmark with the corporate mark; `mark` is wordmark only. */
  variant?: "full" | "mark";
  className?: string;
}

/**
 * Site identity.
 *
 * BRAND HIERARCHY — AM INDIA is the public brand and leads, set in the
 * display face as live text. The supplied icon mark sits beside it, behind a
 * hairline, as the corporate/visual mark — icon only, not the combined
 * icon+wordmark artwork, since the text wordmark is already live here.
 *
 * The artwork is placed, never redrawn: `Image` with the file's true intrinsic
 * dimensions plus `w-auto` means it can only ever scale proportionally.
 *
 * The icon mark is withheld on the dark tone (the mobile panel open state) so
 * the header stays minimal there, same as before — not because the icon needs
 * a light ground; it is genuinely transparent and would render fine on navy.
 */
export function Logo({ tone = "light", variant = "full", className }: LogoProps) {
  const onDark = tone === "dark";
  const icon = brandAssets.icon;
  const showMark = variant === "full" && icon.available && !onDark;

  return (
    <Link
      href="/"
      aria-label={`${brandLockup.primary} — home`}
      className={cn(
        "group inline-flex items-center gap-3 transition-opacity duration-300 ease-brand hover:opacity-80 md:gap-4",
        onDark ? "text-on-dark" : "text-on-light",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "font-display whitespace-nowrap font-semibold uppercase leading-none",
          variant === "full"
            ? "text-[1.0625rem] tracking-[0.16em] md:text-[1.25rem]"
            : "text-[1.125rem] tracking-[0.1em]",
        )}
      >
        {brandLockup.primary}
      </span>

      {/* The corporate mark. Held back until `md`: below that the header must
          stay minimal, and the wordmark alone carries the public brand. */}
      {showMark ? (
        <>
          <span
            aria-hidden="true"
            className="hidden h-9 w-px bg-paper-line md:block"
          />
          <Image
            src={icon.path}
            alt={icon.alt}
            width={icon.width}
            height={icon.height}
            priority
            sizes="48px"
            className="hidden h-7 w-auto md:block xl:h-8"
          />
        </>
      ) : null}
    </Link>
  );
}
