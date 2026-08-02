/**
 * Decorative neural-network divider — the site's AI motif, in one place.
 *
 * Deliberately built as pure inline SVG rather than an image: it costs no
 * network request, stays crisp on every DPI, and inherits brand colours so a
 * palette change can't leave a stale asset behind.
 *
 * Responsive by construction — the viewBox scales with the container and the
 * node positions are percentages, so it works from 320px to ultrawide without
 * breakpoints. `preserveAspectRatio="none"` would distort the circles, so the
 * band keeps its ratio and simply crops.
 *
 * Motion is opacity-only (no layout, no paint of large areas), and the whole
 * animation is disabled under prefers-reduced-motion via the shared
 * `.motion-safe-pulse` rule in index.css.
 */

interface NeuralDividerProps {
  /** Vertical space the band occupies. Compact for between-section use. */
  height?: number;
  className?: string;
}

// Fixed layout — a random one would reflow differently on every render and
// make the page feel unstable between navigations.
const NODES = [
  { x: 6, y: 62, r: 2.5, d: 0 },
  { x: 18, y: 30, r: 3.5, d: 0.4 },
  { x: 30, y: 70, r: 2, d: 0.8 },
  { x: 42, y: 38, r: 4, d: 1.2 },
  { x: 54, y: 66, r: 2.5, d: 1.6 },
  { x: 66, y: 28, r: 3, d: 2.0 },
  { x: 78, y: 60, r: 2, d: 2.4 },
  { x: 90, y: 36, r: 3.5, d: 2.8 },
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
  [1, 3], [3, 5], [5, 7],
];

export function NeuralDivider({ height = 72, className = "" }: NeuralDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="nd-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f4b942" stopOpacity="0" />
            <stop offset="35%" stopColor="#f4b942" stopOpacity="0.55" />
            <stop offset="65%" stopColor="#ec4899" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="nd-node">
            <stop offset="0%" stopColor="#f4b942" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#f4b942" stopOpacity="0.15" />
          </radialGradient>
        </defs>

        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x} y1={NODES[a].y}
            x2={NODES[b].x} y2={NODES[b].y}
            stroke="url(#nd-line)"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.x} cy={n.y} r={n.r}
            fill="url(#nd-node)"
            className="neural-node"
            style={{ animationDelay: `${n.d}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
