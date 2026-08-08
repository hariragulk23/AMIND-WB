import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "text";
type Tone = "dark" | "light";

interface CtaLinkProps {
  href: string;
  children: string;
  variant?: Variant;
  /** The ground the CTA sits on, not the colour of the CTA itself. */
  tone?: Tone;
  className?: string;
  /** Extra context for screen readers, e.g. which commodity a link explores. */
  srSuffix?: string;
}

/**
 * The only call-to-action component on the site.
 *
 * Deliberately rectangular, hairline-ruled and typographic — no pill shapes,
 * no gradients, no shadows. Hover and focus states are CSS-only transitions of
 * colour and a single translated rule, so nothing here depends on JavaScript.
 */
export function CtaLink({
  href,
  children,
  variant = "solid",
  tone = "light",
  className,
  srSuffix,
}: CtaLinkProps) {
  const onDark = tone === "dark";

  const base =
    "group relative inline-flex items-center gap-3 label-sm transition-colors duration-300 ease-brand";

  /* Solid is always Antonio Marco red — the primary action reads identically
     on either ground, which is what makes it recognisable as *the* action. */
  const styles: Record<Variant, string> = {
    solid: "bg-brand-red-cta px-7 py-4 text-white hover:bg-brand-red-deep",
    outline: cn(
      "px-7 py-4 border",
      onDark
        ? "border-charcoal text-on-dark hover:border-brass hover:text-brass"
        : "border-paper-line text-on-light hover:border-brand-red hover:text-brand-red-deep",
    ),
    text: cn(
      "py-1",
      onDark
        ? "text-on-dark hover:text-brass"
        : "text-on-light hover:text-brand-red-deep",
    ),
  };

  return (
    <Link href={href} className={cn(base, styles[variant], className)}>
      <span>
        {children}
        {srSuffix ? <span className="sr-only"> {srSuffix}</span> : null}
      </span>
      <span
        aria-hidden="true"
        className="relative block h-px w-6 overflow-hidden bg-current opacity-60"
      >
        <span className="absolute inset-0 block origin-left scale-x-0 bg-current transition-transform duration-500 ease-brand group-hover:scale-x-100" />
      </span>
    </Link>
  );
}
