import Image from "next/image";
import { brandAssets } from "@/data/brand";

/**
 * The footer mark.
 *
 * The old Antonio Marco artwork this rendered has been retired. This shows
 * the AM INDIA icon alone, at a larger size than the header — not the full
 * lockup: `company.brand` is already set as a large text wordmark directly
 * above this in `SiteFooter.tsx`, so a combined icon+wordmark image here
 * would repeat "AM INDIA" a second time in the same block. The header now
 * pairs this same icon with its own live "AM INDIA" text for the same
 * reason; `brandAssets.fullLockup` (the combined icon+wordmark artwork) is
 * currently unused by any component — see data/brand.ts.
 *
 * The icon is genuinely transparent, so it renders directly on the footer's
 * dark ground with no container panel needed.
 *
 * Placed, never redrawn — true intrinsic dimensions plus `w-auto` allow only
 * proportional scaling.
 */
export function FooterMark() {
  const icon = brandAssets.icon;
  if (!icon.available) return null;

  return (
    <Image
      src={icon.path}
      alt={icon.alt}
      width={icon.width}
      height={icon.height}
      sizes="80px"
      className="mt-6 h-12 w-auto lg:h-14"
    />
  );
}
