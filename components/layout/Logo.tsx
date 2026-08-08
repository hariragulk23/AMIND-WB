import Image from "next/image";
import Link from "next/link";
import { brandAssets, brandLockup } from "@/data/brand";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** The ground the mark sits on, not the colour of the mark. */
  tone?: "dark" | "light";
  /** `full` shows the wordmark plus descriptor; `mark` shows AM only. */
  variant?: "full" | "mark";
  className?: string;
}

/**
 * Site identity.
 *
 * BRAND HIERARCHY (option B of the two considered): the public brand
 * AM GLOBAL COMMODITIES is primary and set in the display face; Antonio Marco
 * appears beneath it as a quiet corporate descriptor. A visitor should leave
 * remembering AM Global Commodities, while recognising Antonio Marco as the
 * corporate identity behind it — so the descriptor is deliberately one third
 * the size of the wordmark and never competes with it.
 *
 * The official Antonio Marco artwork is rendered here as an image the moment
 * it exists in the repository (see data/brand.ts). It is placed, never
 * redrawn: `Image` with fixed intrinsic dimensions and `h-auto` scales it
 * proportionally, so it cannot be stretched or distorted. Until the file is
 * supplied the component sets the AM Global Commodities name typographically —
 * which is the public brand, not a reconstruction of the Antonio Marco mark.
 */
export function Logo({ tone = "light", variant = "full", className }: LogoProps) {
  const onDark = tone === "dark";
  const logo = brandAssets.antonioMarcoLogo;

  return (
    <Link
      href="/"
      aria-label={`${brandLockup.primary} — home`}
      className={cn(
        "group inline-flex items-center gap-3 transition-opacity duration-300 ease-brand hover:opacity-80",
        onDark ? "text-on-dark" : "text-on-light",
        className,
      )}
    >
      <span className="flex flex-col leading-none">
        <span
          aria-hidden="true"
          className={cn(
            "font-display font-semibold uppercase leading-none",
            variant === "full"
              ? "text-[0.95rem] tracking-[0.13em] md:text-[1.0625rem]"
              : "text-[1.125rem] tracking-[0.08em]",
          )}
        >
          {variant === "full" ? "AM Global" : "AM"}
          {variant === "full" ? (
            <span className="block">Commodities</span>
          ) : null}
        </span>

        {variant === "full" ? (
          <span
            aria-hidden="true"
            className={cn(
              "mt-1.5 text-[0.5625rem] uppercase tracking-[0.18em]",
              onDark ? "text-on-dark-muted" : "text-on-light-muted",
            )}
          >
            {brandLockup.descriptor}
          </span>
        ) : null}
      </span>

      {/* The supplied artwork, once it exists. Separated by a hairline so the
          two identities read as related but distinct. */}
      {variant === "full" && logo.available ? (
        <>
          <span
            aria-hidden="true"
            className={cn(
              "h-8 w-px",
              onDark ? "bg-charcoal" : "bg-paper-line",
            )}
          />
          <Image
            src={logo.path}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            priority
            className="h-7 w-auto md:h-8"
          />
        </>
      ) : null}
    </Link>
  );
}
