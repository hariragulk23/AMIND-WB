import Image from "next/image";
import type { CSSProperties } from "react";
import { getImage, type ImageAsset, type ImageKey } from "@/data/images";
import { cn } from "@/lib/utils";

/**
 * Tonal grounds used while a photograph has not yet been delivered. These are
 * built from the brand tokens so an un-shot section still reads as a
 * deliberate composition rather than a broken image — and no placeholder text
 * is ever shown to a visitor.
 */
const TONE_BACKGROUNDS: Record<ImageAsset["tone"], string> = {
  ink: [
    "radial-gradient(120% 90% at 25% 15%, color-mix(in oklab, var(--am-forest) 55%, transparent) 0%, transparent 60%)",
    "radial-gradient(90% 70% at 85% 90%, color-mix(in oklab, var(--am-brass) 22%, transparent) 0%, transparent 65%)",
    "linear-gradient(160deg, var(--am-ink-soft) 0%, var(--am-ink) 100%)",
  ].join(","),
  forest: [
    "radial-gradient(110% 80% at 20% 20%, color-mix(in oklab, var(--am-forest-light) 70%, transparent) 0%, transparent 62%)",
    "radial-gradient(80% 60% at 90% 85%, color-mix(in oklab, var(--am-brass) 18%, transparent) 0%, transparent 60%)",
    "linear-gradient(150deg, var(--am-forest) 0%, var(--am-forest-deep) 100%)",
  ].join(","),
  earth: [
    "radial-gradient(115% 85% at 30% 25%, color-mix(in oklab, var(--am-brass-deep) 65%, transparent) 0%, transparent 62%)",
    "radial-gradient(85% 65% at 88% 88%, color-mix(in oklab, var(--am-forest) 35%, transparent) 0%, transparent 60%)",
    "linear-gradient(155deg, #2a2118 0%, var(--am-ink) 100%)",
  ].join(","),
  paper: [
    "radial-gradient(110% 85% at 25% 20%, color-mix(in oklab, var(--am-paper) 85%, transparent) 0%, transparent 65%)",
    "radial-gradient(85% 70% at 90% 90%, color-mix(in oklab, var(--am-brass-deep) 28%, transparent) 0%, transparent 62%)",
    "linear-gradient(150deg, var(--am-paper-dim) 0%, #b9b0a0 100%)",
  ].join(","),
};

interface MediaProps {
  imageKey: ImageKey;
  /**
   * `fill` stretches to a positioned parent (used for full-bleed sections).
   * Otherwise the manifest aspect ratio reserves the box, so activating a real
   * asset later causes zero layout shift.
   */
  fill?: boolean;
  /** Responsive sizes hint. Required for correct srcset selection. */
  sizes?: string;
  /** Only true for the single above-the-fold hero image. */
  priority?: boolean;
  className?: string;
  /** Override the manifest alt when local context makes it more specific. */
  alt?: string;
}

/**
 * The only image primitive on the site.
 *
 * It reads every slot from the manifest in data/images.ts. While an asset's
 * `available` flag is false it paints a tonal ground of the correct aspect
 * ratio; the moment the real file is dropped in and the flag flipped, the same
 * box renders an optimised next/image with identical dimensions.
 */
export function Media({
  imageKey,
  fill = false,
  sizes = "100vw",
  priority = false,
  className,
  alt,
}: MediaProps) {
  const asset = getImage(imageKey);

  const wrapperStyle: CSSProperties | undefined = fill
    ? undefined
    : { aspectRatio: asset.aspectRatio.replace("/", " / ") };

  return (
    <div
      className={cn(
        /* `relative` is applied only in the non-fill case: custom and core
           position utilities live in the same layer, so listing both would let
           whichever Tailwind emits last win rather than the one intended. */
        "overflow-hidden bg-ink",
        fill ? "absolute inset-0 h-full w-full" : "relative w-full",
        className,
      )}
      style={wrapperStyle}
    >
      {asset.available ? (
        <Image
          src={asset.path}
          alt={alt ?? asset.alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="h-full w-full object-cover"
        />
      ) : (
        /* Decorative tonal ground — carries no information, so it is hidden
           from assistive technology rather than given invented alt text. */
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ backgroundImage: TONE_BACKGROUNDS[asset.tone] }}
        >
          <div className="grain-layer" />
        </div>
      )}
    </div>
  );
}
