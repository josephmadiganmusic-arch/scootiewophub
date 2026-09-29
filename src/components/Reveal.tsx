import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger index; each step adds 60ms, capped at 300ms. */
  index?: number;
  as?: "div" | "li" | "article" | "figure" | "span";
  style?: CSSProperties;
};

/**
 * Scroll reveal. Adds `.is-in` once the element enters the viewport, and the
 * stylesheet transitions opacity and transform. One observer per element is
 * cheap at this page size and keeps the component self contained.
 */
export function Reveal({ children, className, index = 0, as = "div", style }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as "div";
  const delay = Math.min(index * 60, 300);
  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", className)}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
