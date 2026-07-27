import React, { useEffect, useRef, useState } from "react";

export interface LazyMediaProps {
  children: React.ReactNode;
  /** Placeholder shown until the element enters the viewport. */
  placeholder?: React.ReactNode;
  rootMargin?: string;
  className?: string;
}

/**
 * Defers rendering of heavy media (video players, iframes, galleries)
 * until the wrapper scrolls near the viewport, via IntersectionObserver.
 */
export function LazyMedia({
  children,
  placeholder = null,
  rootMargin = "200px",
  className,
}: LazyMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, visible]);

  return (
    <div ref={ref} className={className}>
      {visible ? children : placeholder}
    </div>
  );
}
