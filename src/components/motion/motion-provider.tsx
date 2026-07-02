"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * Loads only the DOM-animation feature set and enforces `m.*` components
 * (strict), keeping the initial framer-motion payload small.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
