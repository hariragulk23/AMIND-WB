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
 * BRAND HIERARCHY — AM INDIA is the public brand and leads, set in
 * the display face. The supplied Antonio Marco artwork sits beside it, smaller
 * and behind a hairline, as the corporate identity.
 *
 * The "by Antonio Marco" line that stood here while the artwork was missing has
 * been REMOVED. The logo already reads "ANTONIO MARCO / EXPORTS AND TRADE
 * PRIVATE LIMITED", so keeping the text as well said the same name three times
 * in one lockup. The logo states the relationship better than the caption did.
 *
 * The artwork is placed, never redrawn: `Image` with the file's true intrinsic
 * dimensions plus `w-auto` means it can only ever scale proportionally.
 *
 * On dark grounds the mark is withheld rather than inverted — its lettering is
 * brown and navy, so it needs a light ground. The footer gives it one.
 */
export function Logo({ tone = "light", variant = "full", className }: LogoProps) {
  const onDark = tone === "dark";
  const logo = brandAssets.antonioMarcoLogo;
  const showMark = variant === "full" && logo.available && !onDark;

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
            src={logo.path}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            priority
            sizes="160px"
            className="hidden h-7 w-auto md:block xl:h-8"
          />
        </>
      ) : null}
    </Link>
  );
}
