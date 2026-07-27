import { useEffect, useRef, useState } from "react";

interface CountUpValueProps {
  value: string;
  className?: string;
  duration?: number;
}

export function CountUpValue({ value, className, duration = 1500 }: CountUpValueProps) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCount(value, duration, setDisplay);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

function animateCount(
  target: string,
  duration: number,
  setter: (s: string) => void
) {
  const numMatch = target.match(/[\d,]+/);
  if (!numMatch) {
    setter(target);
    return;
  }

  const prefix = target.slice(0, numMatch.index);
  const suffix = target.slice((numMatch.index || 0) + numMatch[0].length);
  const targetNum = parseInt(numMatch[0].replace(/,/g, ""), 10);

  if (isNaN(targetNum) || targetNum === 0) {
    setter(target);
    return;
  }

  const startTime = performance.now();

  function tick(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const current = Math.round(eased * targetNum);
    setter(`${prefix}${current.toLocaleString("en-US")}${suffix}`);

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  setter(`${prefix}0${suffix}`);
  requestAnimationFrame(tick);
}
