import Image from "next/image";
import { brandAssets } from "@/data/brand";

/**
 * The Antonio Marco artwork in the footer — the one place on the site where the
 * corporate identity is shown at a legible size rather than as a small mark.
 *
 * The footer ground is deep navy and the artwork's lettering is brown and navy,
 * so it is placed on a light panel. That is deliberate: inverting or recolouring
 * a supplied logo to suit a dark background would be fabricating a variant the
 * company has not issued. A light container keeps the real mark intact.
 *
 * Placed, never redrawn — true intrinsic dimensions plus `w-auto` allow only
 * proportional scaling.
 */
export function FooterMark() {
  const logo = brandAssets.antonioMarcoLogo;
  if (!logo.available) return null;

  return (
    <div className="mt-10 inline-block bg-paper px-6 py-5">
      <Image
        src={logo.path}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        sizes="(min-width: 1024px) 240px, 200px"
        className="h-auto w-[200px] lg:w-[240px]"
      />
    </div>
  );
}
