"use client";

import { m, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to delay the entrance, for simple stagger effects. */
  delay?: number;
  /** Render as a different HTML tag (div by default). */
  as?: "div" | "section" | "li" | "span";
  y?: number;
};

/** Scroll-triggered fade-up. Fires once, respects prefers-reduced-motion. */
export function Reveal({ children, className, delay = 0, as = "div", y = 24 }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = m[as];

  return (
    <Tag
      className={cn(className)}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98], delay }}
    >
      {children}
    </Tag>
  );
}
