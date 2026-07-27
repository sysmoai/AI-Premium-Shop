/**
 * AIPS Cinematic Design Tokens — Higgsfield-grade
 * Dark near-black base with category gradients, glass cards, and motion.
 */

export const tokens = {
  // Core palette
  colors: {
    // Base
    neutral: {
      0: "#0A0A0F", // Near-black, darkest
      50: "#1A1A2E",
      100: "#2D2D44",
      200: "#3F3F5C",
      300: "#525274",
      400: "#656589",
      500: "#7A7A9E",
      600: "#9191B0",
      700: "#ABABC3",
      800: "#D0D0DC",
      900: "#F5F5F7", // Near-white, brightest
    },
    // Accents (per-category)
    accent: {
      aiAssistant: "#10a37f", // Emerald (ChatGPT)
      aiCode: "#7c3aed", // Violet
      aiImage: "#ec4899", // Pink
      aiVideo: "#f97316", // Orange
      aiVoice: "#f59e0b", // Amber
      aiWorkspace: "#0ea5e9", // Sky
      aiWriting: "#14b8a6", // Teal
    },
    // Semantic
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#06b6d4",
  },

  // Typography
  typography: {
    family: {
      sans: '"Noto Sans", "Segoe UI", system-ui, sans-serif',
      bengali: '"Noto Sans Bengali", "Hind Siliguri", sans-serif',
      mono: '"JetBrains Mono", "Fira Code", monospace',
    },
    heading: {
      xl: { size: "3rem", weight: 700, lineHeight: 1.1 },
      lg: { size: "2.25rem", weight: 700, lineHeight: 1.2 },
      md: { size: "1.875rem", weight: 700, lineHeight: 1.25 },
      sm: { size: "1.5rem", weight: 700, lineHeight: 1.3 },
      xs: { size: "1.25rem", weight: 600, lineHeight: 1.4 },
    },
    body: {
      lg: { size: "1.125rem", weight: 400, lineHeight: 1.6 },
      base: { size: "1rem", weight: 400, lineHeight: 1.6 },
      sm: { size: "0.875rem", weight: 400, lineHeight: 1.5 },
      xs: { size: "0.75rem", weight: 400, lineHeight: 1.5 },
    },
    mono: {
      base: { size: "0.875rem", weight: 500, lineHeight: 1.5 },
      sm: { size: "0.75rem", weight: 500, lineHeight: 1.5 },
    },
  },

  // Motion (reduced-motion aware)
  motion: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    easing: {
      easeInQuad: "cubic-bezier(0.11, 0, 0.5, 0)",
      easeOutQuad: "cubic-bezier(0.5, 1, 0.89, 1)",
      easeInOutQuad: "cubic-bezier(0.45, 0.03, 0.515, 0.955)",
      easeInCubic: "cubic-bezier(0.32, 0, 0.67, 0)",
      easeOutCubic: "cubic-bezier(0.33, 1, 0.68, 1)",
    },
  },

  // Spacing
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
    "3xl": "4rem", // 64px
  },

  // Radius
  radius: {
    sm: "0.375rem", // 6px
    base: "0.5rem", // 8px
    md: "0.75rem", // 12px
    lg: "1rem", // 16px
    xl: "1.5rem", // 24px
    full: "9999px",
  },

  // Shadows (dark theme optimized)
  shadow: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.5)",
    base: "0 4px 6px rgba(0, 0, 0, 0.4)",
    md: "0 10px 15px rgba(0, 0, 0, 0.3)",
    lg: "0 20px 25px rgba(0, 0, 0, 0.25)",
    xl: "0 25px 50px rgba(0, 0, 0, 0.15)",
    glow: "0 0 20px rgba(255, 255, 255, 0.1)",
  },

  // Glass (Glassmorphism)
  glass: {
    sm: {
      backdropFilter: "blur(8px)",
      background: "rgba(255, 255, 255, 0.02)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
    },
    md: {
      backdropFilter: "blur(12px)",
      background: "rgba(255, 255, 255, 0.04)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
    },
    lg: {
      backdropFilter: "blur(16px)",
      background: "rgba(255, 255, 255, 0.06)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
  },

  // Category gradients (from → to)
  gradients: {
    aiAssistant: "from-emerald-400/20 to-cyan-400/20",
    aiCode: "from-violet-400/20 to-fuchsia-400/20",
    aiImage: "from-pink-400/20 to-rose-400/20",
    aiVideo: "from-orange-400/20 to-red-400/20",
    aiVoice: "from-amber-400/20 to-yellow-400/20",
    aiWorkspace: "from-sky-400/20 to-blue-400/20",
    aiWriting: "from-teal-400/20 to-emerald-400/20",
    hero: "from-indigo-500/10 via-purple-500/5 to-pink-500/10",
  },
};

export type DesignTokens = typeof tokens;
