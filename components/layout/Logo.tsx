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
 * Site identity.
 *
 * Renders the designed AM INDIA lockup (icon + wordmark, one supplied
 * artwork file) as a single image, not reconstructed from live text plus a
 * separate icon graphic — the two elements were drawn as one mark and are
 * placed as one.
 *
 * Sized close to the icon-only mark's old header height (h-7/h-8) so the
 * wordmark reads at a natural size next to the nav — the lockup is wider
 * than the icon alone was, but no taller, so it doesn't crowd the nav items.
 *
 * Placed, never redrawn: `Image` with the file's true intrinsic dimensions
 * plus `w-auto` means it can only ever scale proportionally.
 *
 * Genuinely transparent, so it renders on both light and dark grounds with
 * no container box — unlike the old Antonio Marco artwork, withholding it on
 * dark tone is no longer necessary. It stays visible through the mobile
 * menu's open (dark) state instead of disappearing.
 */
export function Logo({ tone = "light", className }: LogoProps) {
  const onDark = tone === "dark";
  const logo = brandAssets.fullLockup;

  return (
    <Link
      href="/"
      aria-label={`${brandLockup.primary} — home`}
      className={cn(
        "group inline-flex items-center transition-opacity duration-300 ease-brand hover:opacity-80",
        onDark ? "text-on-dark" : "text-on-light",
        className,
      )}
    >
      <Image
        src={logo.path}
        /* Concise nav-landmark alt, not the registry's fuller default — this
           is a header link back home, not the page's primary heading. */
        alt="AM INDIA"
        width={logo.width}
        height={logo.height}
        priority
        sizes="140px"
        className="h-8 w-auto xl:h-9"
      />
    </Link>
  );
}
