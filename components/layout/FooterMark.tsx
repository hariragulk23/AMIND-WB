import Image from "next/image";
import { brandAssets } from "@/data/brand";

/**
 * The footer mark — the AM INDIA icon, set inline immediately before the live
 * "AM INDIA" wordmark in `SiteFooter.tsx` so the two read as one lockup on a
 * single line, the same arrangement the header's artwork depicts.
 *
 * NOT the full-lockup image: the wordmark beside this is real, selectable,
 * indexable text, so a combined icon+wordmark graphic here would both flatten
 * that text into a raster and repeat "AM INDIA" twice in the same block.
 * `brandAssets.fullLockup` is used in the header, where no separate live-text
 * wordmark carries the name.
 *
 * DECORATIVE, so `alt=""`. The adjacent live text already announces the brand;
 * giving this image the registry's "AM INDIA" alt would make a screen reader
 * read the name twice in a row.
 *
 * Height is the same clamp as the wordmark's font-size, so the mark tracks the
 * type at every viewport instead of needing its own breakpoints.
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
      alt=""
      width={icon.width}
      height={icon.height}
      sizes="56px"
      className="h-[clamp(1.75rem,3vw,2.5rem)] w-auto shrink-0"
    />
  );
}
