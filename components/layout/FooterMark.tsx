import Image from "next/image";
import { brandAssets } from "@/data/brand";

/**
 * The official Antonio Marco artwork in the footer — the one place on the site
 * where the corporate identity is shown at a legible size rather than as a
 * descriptor.
 *
 * The file is placed, never redrawn: fixed intrinsic dimensions plus `h-auto`
 * mean it can only ever scale proportionally. Renders nothing until the asset
 * exists (see data/brand.ts), because an approximation of a supplied logo is
 * worse than no logo.
 */
export function FooterMark() {
  const logo = brandAssets.antonioMarcoLogo;
  if (!logo.available) return null;

  return (
    <div className="mt-10">
      <Image
        src={logo.path}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        sizes="(min-width: 1024px) 18rem, 14rem"
        className="h-auto w-56 lg:w-64"
      />
    </div>
  );
}
