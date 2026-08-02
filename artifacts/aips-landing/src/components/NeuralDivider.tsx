/**
 * Decorative neural-network divider — the site's AI motif, in one place.
 *
 * Deliberately built as pure inline SVG rather than an image: it costs no
 * network request, stays crisp on every DPI, and inherits brand colours so a
 * palette change can't leave a stale asset behind.
 *
 * Responsive by construction — one 20:1 viewBox that matches the band's own
 * aspect ratio, so nodes stay round and stay visible from 320px to ultrawide
 * without a single breakpoint. (A square viewBox here scaled 14x and cropped
 * every node out of frame, leaving only bare diagonal lines.)
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
  { x: 8, y: 6.4, r: 0.9, d: 0 },
  { x: 32, y: 2.9, r: 1.3, d: 0.4 },
  { x: 56, y: 7.2, r: 0.8, d: 0.8 },
  { x: 84, y: 3.6, r: 1.5, d: 1.2 },
  { x: 110, y: 6.8, r: 0.9, d: 1.6 },
  { x: 138, y: 2.6, r: 1.2, d: 2.0 },
  { x: 164, y: 6.2, r: 0.8, d: 2.4 },
  { x: 190, y: 3.4, r: 1.3, d: 2.8 },
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
      <svg viewBox="0 0 200 10" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
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
