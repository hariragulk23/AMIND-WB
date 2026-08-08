import type { ReactNode, ElementType } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  /** `wide` is the editorial default; `text` constrains to a reading measure. */
  width?: "wide" | "text" | "full";
  as?: ElementType;
  className?: string;
}

/**
 * The site's horizontal rhythm. Gutters come from the `--am-gutter` token so
 * every section breathes identically at each breakpoint.
 */
export function Container({
  children,
  width = "wide",
  as: Tag = "div",
  className,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "gutter mx-auto w-full",
        width === "wide" && "max-w-[100rem]",
        width === "text" && "max-w-[60rem]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
