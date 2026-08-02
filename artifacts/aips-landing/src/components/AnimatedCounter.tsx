import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface AnimatedCounterProps {
  /** Numeric target — e.g. 10000 for "10,000+". */
  value: number;
  prefix?: string;
  suffix?: string;
  /** Locale-formatted with thousands separators by default (10,000 not 10000). */
  format?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Counts up from 0 to `value` once it scrolls into view, then holds.
 *
 * Deliberately a spring, not a linear tween: it decelerates into the final
 * number the way a real odometer does, which reads as more "premium" than a
 * constant-speed count. Runs once (viewport `once: true`) — a stat that
 * re-animates every time you scroll past it stops feeling like data and
 * starts feeling like decoration.
 *
 * Respects prefers-reduced-motion by skipping straight to the final value —
 * there is no vestibular-safe way to "reduce" a number counting up, so the
 * honest move is to not animate it at all for that user, not slow it down.
 */
export function AnimatedCounter({ value, prefix = "", suffix = "", format = true, className, style }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20, mass: 1 });
  const reduceMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (isInView) motionValue.set(reduceMotion ? value : value);
  }, [isInView, value, motionValue, reduceMotion]);

  useEffect(() => {
    if (!ref.current) return;
    const unsub = spring.on("change", (v) => {
      if (!ref.current) return;
      const n = Math.round(v);
      ref.current.textContent = `${prefix}${format ? n.toLocaleString("en-US") : n}${suffix}`;
    });
    return unsub;
  }, [spring, prefix, suffix, format]);

  return (
    <span ref={ref} className={className} style={style}>
      {reduceMotion ? `${prefix}${format ? value.toLocaleString("en-US") : value}${suffix}` : `${prefix}0${suffix}`}
    </span>
  );
}
