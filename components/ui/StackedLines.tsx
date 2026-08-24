import { Fragment, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StackedLinesProps {
  /** One string per visual line. */
  lines: readonly string[];
  as?: ElementType;
  className?: string;
  /** Applied to every line span. */
  lineClassName?: string;
  /**
   * Separator placed between lines in the text content. A single space suits
   * a sentence broken across lines; ", " suits a list of address lines that
   * should read as a sequence when flattened.
   */
  separator?: string;
}

/**
 * Renders an array of strings as stacked block lines — WITH a real
 * whitespace text node between them.
 *
 * THIS EXISTS BECAUSE OF A BUG THAT KEPT COMING BACK.
 * Mapping strings to adjacent `display: block` spans looks correct in a
 * browser: CSS puts each on its own line, and the visual result is exactly
 * right. But `textContent` — what search engines, answer engines and text
 * extractors read — simply concatenates the nodes, with nothing between
 * them. So a hero statement rendered as two block spans came out of the DOM
 * as "From origin.To opportunity.", and coordinates stacked above a locality
 * came out as "77.7983° ESivakasi, Tamil Nadu, India".
 *
 * It was fixed once in DisplayReveal, but the same pattern had been written
 * independently in several other components, so the fix did not travel. This
 * primitive is the fix in one place: every caller that stacks lines uses it,
 * and the separator cannot be forgotten because it is the component's whole
 * job.
 *
 * The separator is rendered inside an `sr-only` span, not as a bare text
 * node. A bare whitespace node would collapse harmlessly between block
 * elements, but anything else — ", " between address lines, say — would
 * paint a visible stray character on its own line. `sr-only` takes the
 * separator out of flow entirely, so it can be any string and still affects
 * only the extracted text, never the layout.
 */
export function StackedLines({
  lines,
  as: Tag = "span",
  className,
  lineClassName,
  separator = " ",
}: StackedLinesProps): ReactNode {
  return (
    <Tag className={cn(className)}>
      {lines.map((line, index) => (
        <Fragment key={`${index}-${line}`}>
          {index > 0 ? <span className="sr-only">{separator}</span> : null}
          <span className={cn("block", lineClassName)}>{line}</span>
        </Fragment>
      ))}
    </Tag>
  );
}
