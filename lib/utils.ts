/**
 * Minimal class-name joiner. Deliberately dependency-free — this project does
 * not need clsx/tailwind-merge for the small amount of conditional styling it
 * uses.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
