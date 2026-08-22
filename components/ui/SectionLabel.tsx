import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: string;
  /**
   * Shown before the label, e.g. "03". Only the three anchor sections carry
   * one — see the note below.
   */
  index?: string;
  tone?: "dark" | "light";
  className?: string;
}

/**
 * The structural voice of the site: a tracked-out uppercase micro-label.
 *
 * TWO WEIGHTS, ON PURPOSE.
 * Running the full numeral-plus-rule treatment on all six homepage sections
 * turned a signal into wallpaper: if every section is numbered, the numbering
 * stops marking anything, and the repetition compounds the density it was
 * meant to relieve. So the full treatment — numeral, rule, label — is now
 * carried only by the three anchor sections (03 Positioning, 05 How we work,
 * 07 Corporate foundation). Everywhere else the label appears bare, which
 * still names the section without asserting a place in a sequence.
 *
 * Passing `index` is what selects the full treatment; omitting it gives the
 * light one. No caller needs to know about the rule.
 */
export function SectionLabel({
  children,
  index,
  tone = "light",
  className,
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "label-xs flex items-center gap-3",
        tone === "light" ? "text-on-light-muted" : "text-on-dark-muted",
        className,
      )}
    >
      {index ? (
        <>
          <span
            className={cn(
              "numeral",
              tone === "light" ? "text-brass-deep" : "text-brass",
            )}
          >
            {index}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "h-px w-8",
              tone === "light" ? "bg-paper-line" : "bg-charcoal",
            )}
          />
        </>
      ) : null}
      <span>{children}</span>
    </p>
  );
}
