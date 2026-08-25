/**
 * Minimal class-name joiner. Deliberately dependency-free — this project does
 * not need clsx/tailwind-merge for the small amount of conditional styling it
 * uses.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Divider rules for a responsive data grid: a border-top on every item that
 * starts a new row, a border-left on every item that isn't first in its row,
 * computed per breakpoint from the actual column count at that breakpoint.
 *
 * Written this way after two real bugs, in order:
 *  1. Layering "index > 0 → border-t" (meant for the single-column case)
 *     alongside a separate "index is odd → border-l" (meant for two columns)
 *     gave the second item in a two-column row BOTH borders at once, drawing
 *     a stray box-corner around it, because neither rule was cancelled at
 *     the breakpoint the other one owned.
 *  2. Fixing that by computing "sm:border-t-0" etc. via string interpolation
 *     (`` `${prefix}:border-t-0` ``) silently produced dead classes: Tailwind
 *     finds candidate utilities by scanning the literal source text, and a
 *     prefix built at runtime never appears as the literal substring
 *     "sm:border-t-0" anywhere in the file, so no such rule was ever
 *     compiled — only the unprefixed base rule existed, and it won at every
 *     width. Every class name below is therefore written out in full and
 *     verbatim per breakpoint, never assembled from a variable, so the
 *     scanner can find exactly the strings that get used.
 */
const DIVIDER_CLASSES = {
  "": {
    topOn: "border-t pt-6",
    topOff: "border-t-0 pt-0",
    leftOn: "border-l pl-8",
    leftOff: "border-l-0 pl-0",
  },
  sm: {
    topOn: "sm:border-t sm:pt-6",
    topOff: "sm:border-t-0 sm:pt-0",
    leftOn: "sm:border-l sm:pl-8",
    leftOff: "sm:border-l-0 sm:pl-0",
  },
  lg: {
    topOn: "lg:border-t lg:pt-6",
    topOff: "lg:border-t-0 lg:pt-0",
    leftOn: "lg:border-l lg:pl-8",
    leftOff: "lg:border-l-0 lg:pl-0",
  },
} as const;

export function gridDividers(
  index: number,
  colsByBreakpoint: readonly {
    prefix: keyof typeof DIVIDER_CLASSES;
    cols: number;
  }[],
): string {
  return colsByBreakpoint
    .map(({ prefix, cols }) => {
      /* top: anything past the first row. left: anything past the first
         column. These are independent — a second-row, second-column cell
         legitimately gets both at once, the same cross-hatch a plain HTML
         table's borders would produce. Gating top on "is this cell also a
         row start" (an earlier version of this function did) suppresses
         the top rule on every non-first-column cell in row 2+, which is
         wrong: that cell still needs to be visually separated from the row
         above it. */
      const top = index >= cols;
      const left = index % cols !== 0;
      const c = DIVIDER_CLASSES[prefix];
      return cn(top ? c.topOn : c.topOff, left ? c.leftOn : c.leftOff);
    })
    .join(" ");
}
