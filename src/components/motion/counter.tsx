"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

type CounterProps = {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
};

/** Counts up from 0 when scrolled into view. Skips animation under reduced motion. */
export function Counter({ value, decimals = 0, suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const node = ref.current;
    if (!node) return;

    const format = (v: number) => `${v.toFixed(decimals)}${suffix}`;

    if (reduce) {
      node.textContent = format(value);
      return;
    }

    const controls = animate(motionValue, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals, suffix, reduce, motionValue]);

  return (
    <span ref={ref} className={className} aria-label={`${value.toFixed(decimals)}${suffix}`}>
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}
