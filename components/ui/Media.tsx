import Image, { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import { getImage, type ImageAsset, type ImageKey } from "@/data/images";
import { cn } from "@/lib/utils";

/**
 * Tonal grounds used while a photograph has not been delivered. Built from the
 * brand tokens so an un-shot slot still reads as a deliberate composition
 * rather than a broken image — and no placeholder text is shown to a visitor.
 */
const TONE_BACKGROUNDS: Record<ImageAsset["tone"], string> = {
  ink: [
    "radial-gradient(120% 90% at 25% 15%, color-mix(in oklab, var(--brand-navy) 70%, transparent) 0%, transparent 62%)",
    "linear-gradient(160deg, var(--brand-navy) 0%, var(--brand-navy-deep) 100%)",
  ].join(","),
  forest: [
    "radial-gradient(110% 80% at 20% 20%, color-mix(in oklab, var(--brand-green) 55%, transparent) 0%, transparent 62%)",
    "linear-gradient(150deg, var(--brand-green-deep) 0%, var(--brand-brown-deep) 100%)",
  ].join(","),
  earth: [
    "radial-gradient(115% 85% at 30% 25%, color-mix(in oklab, var(--brand-red) 40%, transparent) 0%, transparent 60%)",
    "linear-gradient(155deg, var(--brand-brown) 0%, var(--brand-brown-deep) 100%)",
  ].join(","),
  paper: [
    "radial-gradient(110% 85% at 25% 20%, color-mix(in oklab, var(--brand-offwhite) 88%, transparent) 0%, transparent 65%)",
    "linear-gradient(150deg, var(--am-paper-dim) 0%, color-mix(in oklab, var(--brand-brown) 45%, var(--am-paper-dim)) 100%)",
  ].join(","),
};

/** Breakpoint at which the landscape crop takes over from the portrait one. */
const ART_DIRECTION_BREAKPOINT = "(min-width: 768px)";

interface MediaProps {
  imageKey: ImageKey;
  /**
   * `fill` stretches to a positioned parent (full-bleed sections). Otherwise
   * the manifest aspect ratio reserves the box, so activating a real asset
   * later causes zero layout shift.
   */
  fill?: boolean;
  /** Responsive sizes hint. Required for correct srcset selection. */
  sizes?: string;
  /** True only for the single first-painted frame. Everything else is lazy. */
  priority?: boolean;
  className?: string;
  /** Override the manifest alt where local context makes it more specific. */
  alt?: string;
}

/**
 * The only image primitive on the site. Every path, dimension, crop and alt
 * string comes from data/images.ts — nothing is passed in inline.
 *
 * When an asset declares a `mobile` variant it renders a real `<picture>` with
 * two `<source>` elements built by `getImageProps`, so the browser downloads
 * exactly one of the two crops and Next.js still serves AVIF/WebP. That is the
 * only way to art-direct through next/image; rendering two `<Image>` tags and
 * hiding one with CSS would download both.
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
  const resolvedAlt = alt ?? asset.alt;

  const wrapperStyle: CSSProperties | undefined = fill
    ? undefined
    : { aspectRatio: asset.aspectRatio.replace("/", " / ") };

  const imageStyle: CSSProperties = {
    objectFit: "cover",
    objectPosition: asset.objectPosition ?? "50% 50%",
  };

  return (
    <div
      className={cn(
        /* `relative` only in the non-fill case: custom and core position
           utilities share a layer, so listing both would let stylesheet order
           pick the winner rather than the one intended. */
        "overflow-hidden bg-ink",
        fill ? "absolute inset-0 h-full w-full" : "relative w-full",
        className,
      )}
      style={wrapperStyle}
    >
      {asset.available ? (
        asset.mobile ? (
          <ArtDirected
            asset={asset}
            alt={resolvedAlt}
            sizes={sizes}
            priority={priority}
            style={imageStyle}
          />
        ) : (
          <Image
            src={asset.path}
            alt={resolvedAlt}
            width={asset.width}
            height={asset.height}
            sizes={sizes}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="h-full w-full"
            style={imageStyle}
          />
        )
      ) : (
        /* Decorative tonal ground — carries no information, so it is hidden
           from assistive technology rather than given invented alt text. */
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ backgroundImage: TONE_BACKGROUNDS[asset.tone] }}
        />
      )}
    </div>
  );
}

interface ArtDirectedProps {
  asset: ImageAsset;
  alt: string;
  sizes: string;
  priority: boolean;
  style: CSSProperties;
}

/**
 * Landscape and portrait crops of the same scene, selected by media query.
 *
 * `getImageProps` gives us Next.js's optimised srcSet without rendering an
 * `<Image>`, which is what lets the two crops live inside one `<picture>`.
 */
function ArtDirected({ asset, alt, sizes, priority, style }: ArtDirectedProps) {
  const common = {
    alt,
    sizes,
    priority,
    loading: priority ? ("eager" as const) : ("lazy" as const),
  };

  const { props: desktop } = getImageProps({
    ...common,
    src: asset.path,
    width: asset.width,
    height: asset.height,
  });

  const { props: mobile } = getImageProps({
    ...common,
    src: asset.mobile!.path,
    width: asset.mobile!.width,
    height: asset.mobile!.height,
  });

  return (
    <picture>
      <source
        media={ART_DIRECTION_BREAKPOINT}
        srcSet={desktop.srcSet}
        sizes={desktop.sizes}
      />
      <source srcSet={mobile.srcSet} sizes={mobile.sizes} />
      {/* A plain <img> is correct here: the <source> elements above carry the
          optimised srcSets, and this is the documented getImageProps pattern
          for art direction. */}
      <img
        {...mobile}
        alt={alt}
        className="h-full w-full"
        style={style}
        decoding="async"
      />
    </picture>
  );
}
