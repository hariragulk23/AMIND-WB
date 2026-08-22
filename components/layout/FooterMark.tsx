import Image from "next/image";
import { brandAssets } from "@/data/brand";

/**
 * The footer mark.
 *
 * The old Antonio Marco artwork this rendered has been retired. This shows
 * the AM INDIA icon alone, at a larger size than the header — not the full
 * lockup: `company.brand` is already set as a large text wordmark directly
 * above this in `SiteFooter.tsx`, so a combined icon+wordmark image here
 * would repeat "AM INDIA" a second time in the same block. The full lockup
 * (`brandAssets.fullLockup`) stays reserved, unused, for a context that
 * doesn't already carry the wordmark as text — a letterhead, say.
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
      sizes="56px"
      className="mt-10 h-12 w-auto lg:h-14"
    />
  );
}
