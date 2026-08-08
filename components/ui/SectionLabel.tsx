import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: string;
  /** Optional index shown before the label, e.g. "02". */
  index?: string;
  tone?: "dark" | "light";
  className?: string;
}

/**
 * The structural voice of the site: a tracked-out uppercase micro-label with a
 * short rule. Used once at the top of every major section so the page reads
 * like a document rather than a stack of cards.
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
        <span
          className={cn(
            "numeral",
            tone === "light" ? "text-brass-deep" : "text-brass",
          )}
        >
          {index}
        </span>
      ) : null}
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-8",
          tone === "light" ? "bg-paper-line" : "bg-charcoal",
        )}
      />
      <span>{children}</span>
    </p>
  );
}
