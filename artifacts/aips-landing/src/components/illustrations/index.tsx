
export function StudentStorySVG({ small = false }: { small?: boolean }) {
  const w = small ? 80 : 200;
  const h = small ? 60 : 150;
  return (
    <svg viewBox="0 0 200 150" width={w} height={h} style={{ display: "block" }} aria-hidden="true">
      {/* Desk */}
      <rect x="8" y="118" width="184" height="26" rx="5" fill="#1e293b" />
      <rect x="8" y="118" width="184" height="5" rx="3" fill="#2d3f5a" />

      {/* Laptop base */}
      <rect x="58" y="112" width="84" height="7" rx="3" fill="#1e40af" />
      {/* Laptop screen hinge */}
      <rect x="62" y="110" width="76" height="3" rx="1" fill="#1d4ed8" />
      {/* Laptop screen */}
      <rect x="62" y="68" width="76" height="44" rx="4" fill="#1e40af" />
      {/* Screen face */}
      <rect x="65" y="71" width="70" height="38" rx="3" fill="#060b1a" />
      {/* Screen subtle glow */}
      <rect x="65" y="71" width="70" height="38" rx="3" fill="#4285f4" fillOpacity="0.07" />
      {/* Chat bubbles on screen */}
      <rect x="69" y="75" width="34" height="7" rx="3.5" fill="#3b82f6" fillOpacity="0.8" />
      <rect x="69" y="85" width="24" height="6" rx="3" fill="#1e40af" />
      <rect x="88" y="93" width="30" height="7" rx="3.5" fill="#3b82f6" fillOpacity="0.5" />
      {/* Screen edge indicator */}
      <circle cx="100" cy="107" r="2" fill="#3b82f6" fillOpacity="0.5" />

      {/* Books stacked (right side of desk) */}
      <rect x="154" y="100" width="28" height="8" rx="2" fill="#7c3aed" />
      <rect x="154" y="107" width="28" height="8" rx="2" fill="#4f46e5" />
      <rect x="154" y="114" width="28" height="6" rx="2" fill="#3b82f6" />
      {/* Book spines */}
      <rect x="154" y="100" width="3" height="8" rx="1" fill="#8b5cf6" />
      <rect x="154" y="107" width="3" height="8" rx="1" fill="#6366f1" />
      <rect x="154" y="114" width="3" height="6" rx="1" fill="#60a5fa" />

      {/* Student figure */}
      {/* Head */}
      <circle cx="30" cy="76" r="15" fill="#d4a574" />
      {/* Hair */}
      <ellipse cx="30" cy="63" rx="13" ry="6" fill="#78350f" />
      {/* Eyes */}
      <circle cx="25" cy="75" r="2" fill="#3b1a07" />
      <circle cx="35" cy="75" r="2" fill="#3b1a07" />
      {/* Eye shine */}
      <circle cx="26" cy="74" r="0.7" fill="white" />
      <circle cx="36" cy="74" r="0.7" fill="white" />
      {/* Smile */}
      <path d="M26 80 Q30 84 34 80" stroke="#7c5228" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Body - slight forward lean */}
      <rect x="18" y="90" width="24" height="28" rx="5" fill="#3b82f6" />
      {/* Arms toward laptop */}
      <path d="M42 98 Q52 102 62 100" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* Collar */}
      <path d="M24 90 Q30 95 36 90" stroke="#2563eb" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* A+ paper — floating */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-5;0,0" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
        <rect x="112" y="46" width="26" height="32" rx="3" fill="white" fillOpacity="0.95" transform="rotate(-10,125,62)" />
        <rect x="114" y="48" width="22" height="2" rx="1" fill="#e5e7eb" transform="rotate(-10,125,62)" />
        <rect x="114" y="52" width="16" height="1.5" rx="0.75" fill="#e5e7eb" transform="rotate(-10,125,62)" />
        <text x="117" y="68" fontSize="14" fontWeight="bold" fill="#10b981" transform="rotate(-10,125,62)">A+</text>
      </g>

      {/* Clock on wall */}
      <circle cx="184" cy="32" r="15" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
      <circle cx="184" cy="32" r="12" fill="#0f172a" />
      <circle cx="184" cy="32" r="2" fill="#3b82f6" />
      {/* Clock hands: 0:15 */}
      <line x1="184" y1="32" x2="184" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="184" y1="32" x2="191" y2="36" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
      {/* Tick marks */}
      <line x1="184" y1="21" x2="184" y2="23" stroke="#374151" strokeWidth="1" />
      <line x1="193" y1="32" x2="191" y2="32" stroke="#374151" strokeWidth="1" />
      <line x1="184" y1="43" x2="184" y2="41" stroke="#374151" strokeWidth="1" />
      <line x1="175" y1="32" x2="177" y2="32" stroke="#374151" strokeWidth="1" />

      {/* Sparkle 1 */}
      <g>
        <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2s" repeatCount="indefinite" />
        <path d="M148,55 L150,50 L152,55 L157,57 L152,59 L150,64 L148,59 L143,57 Z" fill="#f4b942" />
      </g>
      {/* Sparkle 2 */}
      <g>
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.7s" repeatCount="indefinite" />
        <path d="M96,60 L97.5,56 L99,60 L103,61.5 L99,63 L97.5,67 L96,63 L92,61.5 Z" fill="#f4b942" fillOpacity="0.7" />
      </g>
      {/* Sparkle 3 */}
      <g>
        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="1.9s" repeatCount="indefinite" />
        <path d="M133,78 L134,75 L135,78 L138,79 L135,80 L134,83 L133,80 L130,79 Z" fill="#f4b942" fillOpacity="0.6" />
      </g>
    </svg>
  );
}

export function FreelancerStorySVG({ small = false }: { small?: boolean }) {
  const w = small ? 80 : 200;
  const h = small ? 60 : 150;
  return (
    <svg viewBox="0 0 200 150" width={w} height={h} style={{ display: "block" }} aria-hidden="true">
      {/* Desk */}
      <rect x="5" y="115" width="190" height="30" rx="5" fill="#064e3b" />
      <rect x="5" y="115" width="190" height="5" rx="3" fill="#065f46" />

      {/* Left monitor */}
      <rect x="10" y="62" width="72" height="55" rx="4" fill="#065f46" />
      <rect x="13" y="65" width="66" height="47" rx="3" fill="#022c22" />
      {/* Upwork logo on left monitor */}
      <rect x="16" y="68" width="60" height="12" rx="2" fill="#10a37f" fillOpacity="0.3" />
      <text x="22" y="77" fontSize="7" fill="#10a37f" fontWeight="bold">Upwork</text>
      {/* Proposal text lines */}
      <rect x="16" y="83" width="50" height="2" rx="1" fill="#10a37f" fillOpacity="0.5" />
      <rect x="16" y="87" width="40" height="2" rx="1" fill="#10a37f" fillOpacity="0.4" />
      <rect x="16" y="91" width="45" height="2" rx="1" fill="#10a37f" fillOpacity="0.3" />
      {/* Green checkmark */}
      <circle cx="68" cy="100" r="6" fill="#10a37f" />
      <path d="M65 100 L67 102 L71 97" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Monitor stand */}
      <rect x="42" y="117" width="8" height="4" rx="1" fill="#065f46" />

      {/* Right monitor */}
      <rect x="100" y="62" width="72" height="55" rx="4" fill="#065f46" />
      <rect x="103" y="65" width="66" height="47" rx="3" fill="#022c22" />
      {/* AI chat bubbles on right monitor */}
      <rect x="106" y="69" width="40" height="8" rx="4" fill="#3b82f6" fillOpacity="0.7" />
      <rect x="106" y="80" width="30" height="7" rx="3.5" fill="#10a37f" fillOpacity="0.7" />
      <rect x="120" y="90" width="38" height="8" rx="4" fill="#3b82f6" fillOpacity="0.5" />
      <rect x="106" y="101" width="35" height="7" rx="3.5" fill="#10a37f" fillOpacity="0.5" />
      {/* Pulsing dot */}
      <circle cx="164" cy="103" r="3" fill="#10a37f">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
      </circle>
      {/* Monitor stand */}
      <rect x="132" y="117" width="8" height="4" rx="1" fill="#065f46" />

      {/* Freelancer figure */}
      {/* Head */}
      <circle cx="85" cy="72" r="14" fill="#d4a574" />
      {/* Hair */}
      <ellipse cx="85" cy="60" rx="12" ry="5" fill="#1c0a00" />
      {/* Eyes */}
      <circle cx="80" cy="71" r="1.8" fill="#3b1a07" />
      <circle cx="90" cy="71" r="1.8" fill="#3b1a07" />
      {/* Body */}
      <rect x="73" y="85" width="24" height="30" rx="5" fill="#10a37f" />
      {/* Arms to keyboards */}
      <path d="M73 95 Q55 100 44 98" stroke="#10a37f" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M97 95 Q112 100 118 98" stroke="#10a37f" strokeWidth="6" strokeLinecap="round" fill="none" />

      {/* Coffee cup */}
      <rect x="83" y="108" width="14" height="12" rx="3" fill="#78350f" />
      <rect x="82" y="106" width="16" height="4" rx="2" fill="#92400e" />
      {/* Steam */}
      <path d="M87 104 Q88 100 87 97" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" fill="none">
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.5s" repeatCount="indefinite" />
      </path>
      <path d="M91 104 Q92 100 91 97" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" fill="none">
        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="1.8s" repeatCount="indefinite" />
      </path>

      {/* Dollar signs floating up */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-20;0,-20" dur="3s" repeatCount="indefinite" begin="0s" />
        <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="0s" />
        <text x="172" y="105" fontSize="14" fill="#10a37f" fontWeight="bold">$</text>
      </g>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-18;0,-18" dur="3s" repeatCount="indefinite" begin="1s" />
        <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="1s" />
        <text x="182" y="100" fontSize="11" fill="#10a37f" fontWeight="bold">$</text>
      </g>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-16;0,-16" dur="3s" repeatCount="indefinite" begin="2s" />
        <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="2s" />
        <text x="176" y="95" fontSize="12" fill="#f4b942" fontWeight="bold">$</text>
      </g>
    </svg>
  );
}

export function BusinessStorySVG({ small = false }: { small?: boolean }) {
  const w = small ? 80 : 200;
  const h = small ? 60 : 150;
  return (
    <svg viewBox="0 0 200 150" width={w} height={h} style={{ display: "block" }} aria-hidden="true">
      {/* Desk */}
      <rect x="5" y="118" width="190" height="27" rx="5" fill="#451a03" />
      <rect x="5" y="118" width="190" height="5" rx="3" fill="#78350f" />

      {/* Growth chart background */}
      <rect x="100" y="40" width="88" height="76" rx="6" fill="#0a1628" />
      <rect x="100" y="40" width="88" height="76" rx="6" fill="#f59e0b" fillOpacity="0.04" />
      {/* Grid lines */}
      <line x1="100" y1="60" x2="188" y2="60" stroke="#f59e0b" strokeWidth="0.5" strokeOpacity="0.15" />
      <line x1="100" y1="78" x2="188" y2="78" stroke="#f59e0b" strokeWidth="0.5" strokeOpacity="0.15" />
      <line x1="100" y1="96" x2="188" y2="96" stroke="#f59e0b" strokeWidth="0.5" strokeOpacity="0.15" />
      {/* Chart line — animated draw */}
      <polyline points="108,110 124,98 140,84 156,68 172,56 188,44" stroke="#10a37f" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <animate attributeName="stroke-dasharray" values="0 200;200 0" dur="2s" repeatCount="indefinite" />
      </polyline>
      {/* Chart area fill */}
      <polyline points="108,110 124,98 140,84 156,68 172,56 188,44 188,116 108,116" fill="#10a37f" fillOpacity="0.08" />
      {/* Chart dots */}
      <circle cx="108" cy="110" r="3" fill="#10a37f" />
      <circle cx="140" cy="84" r="3" fill="#10a37f" />
      <circle cx="172" cy="56" r="3" fill="#10a37f" />
      {/* Chart label */}
      <text x="106" y="54" fontSize="7" fill="#f59e0b" fontWeight="bold">Revenue</text>

      {/* Business owner figure */}
      {/* Head */}
      <circle cx="55" cy="70" r="15" fill="#d4a574" />
      {/* Hair */}
      <ellipse cx="55" cy="57" rx="13" ry="5" fill="#1c0a00" />
      {/* Eyes */}
      <circle cx="50" cy="69" r="1.8" fill="#3b1a07" />
      <circle cx="60" cy="69" r="1.8" fill="#3b1a07" />
      {/* Body */}
      <rect x="43" y="84" width="24" height="34" rx="5" fill="#f59e0b" />
      {/* Tie */}
      <polygon points="55,84 57,84 56,100 55,100" fill="#b45309" />
      {/* Arms */}
      <path d="M43 94 Q30 100 25 98" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M67 94 Q80 100 85 98" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" fill="none" />

      {/* WhatsApp messages */}
      <rect x="8" y="42" width="50" height="36" rx="6" fill="#064e3b" />
      {/* WA icon */}
      <circle cx="20" cy="50" r="7" fill="#25d366" />
      <path d="M16 52 Q16 48 20 46 Q24 44 26 48 Q28 52 25 54 L26 58 L22 56 Q18 56 16 52 Z" fill="white" fillOpacity="0.9" />
      {/* Message bubbles appearing */}
      <rect x="30" y="44" width="22" height="5" rx="2.5" fill="#25d366" fillOpacity="0.7">
        <animate attributeName="opacity" values="0;1;1" dur="2s" repeatCount="indefinite" begin="0s" />
      </rect>
      <rect x="30" y="51" width="16" height="5" rx="2.5" fill="#25d366" fillOpacity="0.6">
        <animate attributeName="opacity" values="0;0;1;1" dur="2s" repeatCount="indefinite" begin="0.5s" />
      </rect>
      <rect x="30" y="58" width="24" height="5" rx="2.5" fill="#25d366" fillOpacity="0.5">
        <animate attributeName="opacity" values="0;0;0;1;1" dur="2s" repeatCount="indefinite" begin="1s" />
      </rect>
      {/* Robot auto-reply icon */}
      <circle cx="52" cy="73" r="8" fill="#8b5cf6" />
      <rect x="48" y="70" width="8" height="7" rx="2" fill="#7c3aed" />
      <circle cx="50" cy="72" r="1" fill="white" />
      <circle cx="54" cy="72" r="1" fill="white" />
      <rect x="49" y="75" width="6" height="1.5" rx="0.75" fill="white" fillOpacity="0.6" />
    </svg>
  );
}

export function JobSeekerStorySVG({ small = false }: { small?: boolean }) {
  const w = small ? 80 : 200;
  const h = small ? 60 : 150;
  return (
    <svg viewBox="0 0 200 150" width={w} height={h} style={{ display: "block" }} aria-hidden="true">
      {/* Background panels */}
      <rect x="5" y="25" width="88" height="115" rx="6" fill="#1c0a2e" />
      <rect x="107" y="25" width="88" height="115" rx="6" fill="#022c1a" />

      {/* Center divider — dashed */}
      <line x1="100" y1="20" x2="100" y2="145" stroke="#4b5563" strokeWidth="1" strokeDasharray="4 3" />

      {/* LEFT — Before (sad, crumpled CV) */}
      {/* Crumpled CV */}
      <polygon points="15,50 75,45 80,110 20,115" fill="#7f1d1d" />
      <polygon points="15,50 75,45 70,42 12,48" fill="#991b1b" />
      <rect x="22" y="58" width="45" height="3" rx="1" fill="#ef4444" fillOpacity="0.4" />
      <rect x="22" y="65" width="35" height="2" rx="1" fill="#ef4444" fillOpacity="0.3" />
      <rect x="22" y="72" width="40" height="2" rx="1" fill="#ef4444" fillOpacity="0.3" />
      {/* Red X over CV */}
      <line x1="25" y1="78" x2="72" y2="108" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
      <line x1="72" y1="78" x2="25" y2="108" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
      {/* Sad face */}
      <circle cx="47" cy="38" r="12" fill="#ef4444" fillOpacity="0.8" />
      <circle cx="43" cy="36" r="1.5" fill="#7f1d1d" />
      <circle cx="51" cy="36" r="1.5" fill="#7f1d1d" />
      <path d="M43 41 Q47 38 51 41" stroke="#7f1d1d" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* "6 months" label */}
      <text x="18" y="128" fontSize="8" fill="#ef4444" fontWeight="bold">6 months</text>
      <text x="20" y="137" fontSize="6" fill="#9ca3af">to get hired</text>

      {/* RIGHT — After (polished CV, happy) */}
      {/* Polished CV */}
      <rect x="115" y="44" width="72" height="82" rx="4" fill="white" fillOpacity="0.95" />
      {/* CV header */}
      <rect x="118" y="48" width="30" height="3" rx="1.5" fill="#10a37f" />
      <rect x="118" y="53" width="20" height="2" rx="1" fill="#6b7280" />
      {/* CV lines */}
      <rect x="118" y="60" width="60" height="2" rx="1" fill="#e5e7eb" />
      <rect x="118" y="65" width="45" height="2" rx="1" fill="#e5e7eb" />
      <rect x="118" y="70" width="52" height="2" rx="1" fill="#e5e7eb" />
      <rect x="118" y="78" width="55" height="2" rx="1" fill="#e5e7eb" />
      <rect x="118" y="83" width="40" height="2" rx="1" fill="#e5e7eb" />
      <rect x="118" y="88" width="48" height="2" rx="1" fill="#e5e7eb" />
      {/* Green checkmark on CV */}
      <circle cx="175" cy="50" r="9" fill="#10a37f" />
      <path d="M171 50 L174 53 L179 46" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Company icons in background */}
      <rect x="118" y="98" width="18" height="12" rx="3" fill="#10a37f" fillOpacity="0.2" />
      <rect x="140" y="100" width="18" height="10" rx="3" fill="#3b82f6" fillOpacity="0.2" />
      <rect x="162" y="99" width="16" height="11" rx="3" fill="#8b5cf6" fillOpacity="0.2" />
      {/* Happy face */}
      <circle cx="153" cy="36" r="12" fill="#10a37f" fillOpacity="0.9" />
      <circle cx="149" cy="34" r="1.5" fill="#064e3b" />
      <circle cx="157" cy="34" r="1.5" fill="#064e3b" />
      <path d="M149 38 Q153 42 157 38" stroke="#064e3b" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Glow around right side */}
      <rect x="107" y="25" width="88" height="115" rx="6" fill="#10a37f" fillOpacity="0.04" />

      {/* 1-3 months label */}
      <text x="113" y="128" fontSize="8" fill="#10a37f" fontWeight="bold">1-3 months</text>
      <text x="120" y="137" fontSize="6" fill="#9ca3af">to get hired</text>

      {/* Center arrow — pulsing */}
      <g>
        <animateTransform attributeName="transform" type="scale" values="1,1;1.15,1;1,1" additive="sum" dur="2s" repeatCount="indefinite" />
        <polygon points="88,80 112,74 112,78 120,80 112,82 112,86" fill="#f4b942" />
      </g>
    </svg>
  );
}

export function DeveloperStorySVG({ small = false }: { small?: boolean }) {
  const w = small ? 80 : 200;
  const h = small ? 60 : 150;
  return (
    <svg viewBox="0 0 200 150" width={w} height={h} style={{ display: "block" }} aria-hidden="true">
      {/* Desk */}
      <rect x="5" y="118" width="190" height="28" rx="5" fill="#083344" />
      <rect x="5" y="118" width="190" height="5" rx="3" fill="#0e4f66" />

      {/* Code editor */}
      <rect x="8" y="32" width="115" height="84" rx="6" fill="#0a0e27" />
      {/* Editor title bar */}
      <rect x="8" y="32" width="115" height="12" rx="6" fill="#0e1535" />
      <rect x="8" y="38" width="115" height="6" rx="0" fill="#0e1535" />
      {/* Traffic light dots */}
      <circle cx="18" cy="38" r="3" fill="#ef4444" />
      <circle cx="26" cy="38" r="3" fill="#f59e0b" />
      <circle cx="34" cy="38" r="3" fill="#10b981" />
      {/* Code lines — appearing one by one */}
      <rect x="14" y="50" width="70" height="3" rx="1.5" fill="#06b6d4" fillOpacity="0.8">
        <animate attributeName="opacity" values="0;1;1;1" dur="3s" repeatCount="indefinite" begin="0s" />
      </rect>
      <rect x="14" y="57" width="50" height="3" rx="1.5" fill="#10b981" fillOpacity="0.7">
        <animate attributeName="opacity" values="0;0;1;1" dur="3s" repeatCount="indefinite" begin="0.3s" />
      </rect>
      <rect x="14" y="64" width="84" height="3" rx="1.5" fill="#a78bfa" fillOpacity="0.6">
        <animate attributeName="opacity" values="0;0;0;1" dur="3s" repeatCount="indefinite" begin="0.6s" />
      </rect>
      <rect x="14" y="71" width="60" height="3" rx="1.5" fill="#10b981" fillOpacity="0.7">
        <animate attributeName="opacity" values="0;0;0;0;1" dur="3s" repeatCount="indefinite" begin="0.9s" />
      </rect>
      <rect x="14" y="78" width="40" height="3" rx="1.5" fill="#06b6d4" fillOpacity="0.5">
        <animate attributeName="opacity" values="0;0;0;0;0;1" dur="3s" repeatCount="indefinite" begin="1.2s" />
      </rect>
      {/* Line numbers */}
      <text x="10" y="53" fontSize="5" fill="#374151">1</text>
      <text x="10" y="60" fontSize="5" fill="#374151">2</text>
      <text x="10" y="67" fontSize="5" fill="#374151">3</text>
      <text x="10" y="74" fontSize="5" fill="#374151">4</text>
      <text x="10" y="81" fontSize="5" fill="#374151">5</text>
      {/* Terminal below editor */}
      <rect x="8" y="98" width="115" height="18" rx="0" fill="#000" />
      <rect x="8" y="114" width="115" height="2" rx="0" fill="#000" />
      <text x="12" y="108" fontSize="6" fill="#10b981">✓ All 24 tests passing</text>
      <text x="12" y="115" fontSize="5" fill="#4b5563">$ npm test — done in 1.2s</text>

      {/* Developer figure */}
      <circle cx="160" cy="76" r="14" fill="#d4a574" />
      <ellipse cx="160" cy="64" rx="12" ry="5" fill="#1c0a00" />
      <circle cx="155" cy="75" r="1.8" fill="#3b1a07" />
      <circle cx="165" cy="75" r="1.8" fill="#3b1a07" />
      {/* Glasses */}
      <rect x="152" y="72" width="7" height="5" rx="2" fill="none" stroke="#06b6d4" strokeWidth="1" />
      <rect x="161" y="72" width="7" height="5" rx="2" fill="none" stroke="#06b6d4" strokeWidth="1" />
      <line x1="159" y1="74" x2="161" y2="74" stroke="#06b6d4" strokeWidth="1" />
      {/* Body */}
      <rect x="148" y="89" width="24" height="29" rx="5" fill="#6e40c9" />
      {/* Arms */}
      <path d="M148 98 Q136 104 128 102" stroke="#6e40c9" strokeWidth="6" strokeLinecap="round" fill="none" />

      {/* Bug icon with X */}
      <circle cx="148" cy="52" r="10" fill="#7f1d1d" fillOpacity="0.9" />
      <ellipse cx="148" cy="52" rx="5" ry="7" fill="#b91c1c" />
      <circle cx="148" cy="48" r="3" fill="#b91c1c" />
      {/* Bug legs */}
      <line x1="143" y1="50" x2="139" y2="48" stroke="#7f1d1d" strokeWidth="1.5" />
      <line x1="143" y1="53" x2="139" y2="53" stroke="#7f1d1d" strokeWidth="1.5" />
      <line x1="153" y1="50" x2="157" y2="48" stroke="#7f1d1d" strokeWidth="1.5" />
      <line x1="153" y1="53" x2="157" y2="53" stroke="#7f1d1d" strokeWidth="1.5" />
      {/* Big X over bug */}
      <line x1="141" y1="45" x2="155" y2="59" stroke="#ef4444" strokeWidth="3" strokeLinecap="round">
        <animate attributeName="stroke-dasharray" values="0 20;20 0" dur="0.5s" repeatCount="1" fill="freeze" />
      </line>
      <line x1="155" y1="45" x2="141" y2="59" stroke="#ef4444" strokeWidth="3" strokeLinecap="round">
        <animate attributeName="stroke-dasharray" values="0 20;20 0" dur="0.5s" begin="0.3s" repeatCount="1" fill="freeze" />
      </line>

      {/* Rocket */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-8;0,0" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
        <polygon points="178,108 184,88 190,108" fill="#06b6d4" />
        <ellipse cx="184" cy="86" rx="6" ry="8" fill="#06b6d4" />
        <circle cx="184" cy="90" r="3" fill="#0a0e27" />
        <path d="M178 108 Q184 114 190 108" fill="#ef4444" fillOpacity="0.7" />
        {/* Rocket exhaust */}
        <ellipse cx="184" cy="114" rx="4" ry="6" fill="#f59e0b" fillOpacity="0.5">
          <animate attributeName="ry" values="4;8;4" dur="0.5s" repeatCount="indefinite" />
        </ellipse>
        {/* 55% label */}
        <text x="174" y="84" fontSize="9" fill="#f4b942" fontWeight="bold">55%</text>
        <text x="172" y="93" fontSize="5" fill="#f4b942">faster</text>
      </g>
    </svg>
  );
}

export function CreatorStorySVG({ small = false }: { small?: boolean }) {
  const w = small ? 80 : 200;
  const h = small ? 60 : 150;
  return (
    <svg viewBox="0 0 200 150" width={w} height={h} style={{ display: "block" }} aria-hidden="true">
      {/* Background */}
      <rect x="0" y="0" width="200" height="150" rx="0" fill="transparent" />

      {/* Camera on tripod */}
      {/* Camera body */}
      <rect x="20" y="45" width="52" height="36" rx="6" fill="#1f2937" />
      <rect x="22" y="47" width="48" height="32" rx="5" fill="#111827" />
      {/* Lens */}
      <circle cx="46" cy="63" r="13" fill="#374151" />
      <circle cx="46" cy="63" r="10" fill="#1f2937" />
      <circle cx="46" cy="63" r="7" fill="#111827" />
      <circle cx="46" cy="63" r="4" fill="#1a1a2e" />
      <circle cx="44" cy="61" r="1.5" fill="white" fillOpacity="0.4" />
      {/* Record button */}
      <circle cx="63" cy="53" r="4" fill="#ec4899" />
      <circle cx="63" cy="53" r="2.5" fill="#f9a8d4">
        <animate attributeName="opacity" values="1;0.4;1" dur="1s" repeatCount="indefinite" />
      </circle>
      {/* Viewfinder */}
      <rect x="67" y="48" width="2" height="8" rx="1" fill="#374151" />
      {/* Tripod legs */}
      <line x1="46" y1="81" x2="30" y2="120" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
      <line x1="46" y1="81" x2="46" y2="120" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
      <line x1="46" y1="81" x2="62" y2="120" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
      {/* Crossbar */}
      <line x1="35" y1="105" x2="57" y2="105" stroke="#374151" strokeWidth="2" strokeLinecap="round" />

      {/* AI Generated Thumbnail */}
      <rect x="100" y="38" width="88" height="56" rx="6" fill="#1f2937" />
      <rect x="102" y="40" width="84" height="52" rx="5" fill="linear-gradient(135deg, #7c3aed, #ec4899)" />
      {/* Gradient fill using two overlapping rects */}
      <rect x="102" y="40" width="84" height="52" rx="5" fill="#7c3aed" />
      <rect x="102" y="40" width="84" height="52" rx="5" fill="#ec4899" fillOpacity="0.4" />
      {/* Thumbnail content */}
      <rect x="105" y="55" width="78" height="4" rx="2" fill="white" fillOpacity="0.9" />
      <rect x="112" y="62" width="62" height="3" rx="1.5" fill="white" fillOpacity="0.6" />
      {/* AI sparkle over thumbnail */}
      <circle cx="170" cy="48" r="8" fill="#f4b942" fillOpacity="0.2" />
      <text x="165" y="51" fontSize="8" fill="#f4b942">✦</text>
      {/* AI badge */}
      <rect x="104" y="84" width="26" height="6" rx="3" fill="#10a37f" fillOpacity="0.9" />
      <text x="107" y="89" fontSize="5" fill="white" fontWeight="bold">AI Made</text>

      {/* YouTube play button */}
      <rect x="120" y="58" width="38" height="26" rx="6" fill="#ec4899" />
      <polygon points="132,64 132,76 148,70" fill="white" />

      {/* Music notes floating */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;-5,-15;-5,-15" dur="3s" repeatCount="indefinite" begin="0s" />
        <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="0s" />
        <text x="86" y="65" fontSize="14" fill="#ec4899">♪</text>
      </g>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;3,-12;3,-12" dur="3s" repeatCount="indefinite" begin="1s" />
        <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="1s" />
        <text x="92" y="75" fontSize="11" fill="#f97316">♫</text>
      </g>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;-3,-10;-3,-10" dur="3s" repeatCount="indefinite" begin="2s" />
        <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="2s" />
        <text x="80" y="80" fontSize="9" fill="#ec4899">♪</text>
      </g>

      {/* Subscriber count */}
      <rect x="102" y="98" width="84" height="18" rx="4" fill="#0a0e27" />
      <text x="112" y="108" fontSize="7" fill="#f4b942" fontWeight="bold">+12,000 subscribers</text>
      <text x="114" y="115" fontSize="5" fill="#10a37f">AI content strategy ✓</text>
    </svg>
  );
}

export function FOMOSplitSVG() {
  return (
    <svg viewBox="0 0 400 160" width="100%" style={{ display: "block", height: "auto", maxHeight: 200 }} aria-hidden="true">
      {/* Left panel — red/dark */}
      <rect x="0" y="0" width="195" height="160" rx="0" fill="#1c0a0a" />

      {/* Left figure — slumped */}
      {/* Desk */}
      <rect x="20" y="110" width="140" height="20" rx="4" fill="#3b1111" />
      {/* Person head */}
      <circle cx="80" cy="75" r="18" fill="#c4a87a" fillOpacity="0.8" />
      {/* Drooping head posture */}
      <ellipse cx="82" cy="83" rx="12" ry="8" fill="#1c0a0a" fillOpacity="0.3" />
      {/* Body slumped */}
      <rect x="65" y="92" width="28" height="18" rx="5" fill="#6b7280" />
      {/* Clock — late: 3:00 AM */}
      <circle cx="150" cy="50" r="18" fill="#3b1111" stroke="#ef4444" strokeWidth="1.5" />
      <circle cx="150" cy="50" r="2" fill="#ef4444" />
      <line x1="150" y1="50" x2="150" y2="36" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
      <line x1="150" y1="50" x2="164" y2="50" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
      <text x="140" y="75" fontSize="8" fill="#ef4444">3:00 AM</text>
      {/* Papers scattered */}
      <rect x="25" y="90" width="30" height="20" rx="2" fill="#7f1d1d" fillOpacity="0.7" transform="rotate(-15,40,100)" />
      <rect x="55" y="88" width="30" height="20" rx="2" fill="#7f1d1d" fillOpacity="0.6" transform="rotate(10,70,98)" />
      <rect x="85" y="92" width="30" height="20" rx="2" fill="#7f1d1d" fillOpacity="0.5" transform="rotate(-5,100,102)" />
      {/* Red X marks */}
      <text x="30" y="82" fontSize="12" fill="#ef4444">✗</text>
      <text x="62" y="78" fontSize="10" fill="#ef4444" fillOpacity="0.7">✗</text>
      {/* Declining chart */}
      <polyline points="25,60 55,62 85,72 115,85 145,100" stroke="#ef4444" strokeWidth="2" fill="none" strokeLinecap="round">
        <animate attributeName="stroke-dasharray" values="0 200;200 0" dur="2s" repeatCount="indefinite" />
      </polyline>
      {/* Without AI label */}
      <text x="40" y="18" fontSize="10" fill="#ef4444" fontWeight="bold">❌ Without AI</text>
      <text x="30" y="145" fontSize="7" fill="#9ca3af">Falling behind every day</text>

      {/* Center dashed divider */}
      <line x1="200" y1="0" x2="200" y2="160" stroke="#4b5563" strokeWidth="1.5" strokeDasharray="6 4" />

      {/* Right panel — green */}
      <rect x="205" y="0" width="195" height="160" rx="0" fill="#022c1a" />

      {/* Right figure — upright, energetic */}
      {/* Desk */}
      <rect x="240" y="110" width="140" height="20" rx="4" fill="#064e3b" />
      {/* Person head — upright */}
      <circle cx="320" cy="68" r="18" fill="#d4a574" />
      {/* Smile */}
      <path d="M312 74 Q320 80 328 74" stroke="#7c5228" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="315" cy="67" r="2" fill="#3b1a07" />
      <circle cx="325" cy="67" r="2" fill="#3b1a07" />
      {/* Body upright */}
      <rect x="308" y="85" width="28" height="25" rx="5" fill="#10a37f" />
      {/* Clock — fast: 0:15 */}
      <circle cx="250" cy="50" r="18" fill="#064e3b" stroke="#10a37f" strokeWidth="1.5" />
      <circle cx="250" cy="50" r="2" fill="#10a37f" />
      <line x1="250" y1="50" x2="250" y2="36" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="250" y1="50" x2="257" y2="54" stroke="#10a37f" strokeWidth="2" strokeLinecap="round" />
      <text x="238" y="75" fontSize="8" fill="#10a37f">0:15 min</text>
      {/* Papers stacked neatly */}
      <rect x="246" y="95" width="30" height="18" rx="2" fill="#065f46" />
      <rect x="248" y="92" width="30" height="18" rx="2" fill="#047857" />
      <rect x="250" y="89" width="30" height="18" rx="2" fill="#10a37f" fillOpacity="0.8" />
      {/* Green checkmarks */}
      <text x="270" y="100" fontSize="10" fill="#34d399">✓</text>
      <text x="290" y="88" fontSize="9" fill="#34d399" fillOpacity="0.8">✓</text>
      {/* Rising chart */}
      <polyline points="255,120 275,108 295,92 315,74 340,58" stroke="#10a37f" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <animate attributeName="stroke-dasharray" values="0 200;200 0" dur="2s" repeatCount="indefinite" />
      </polyline>
      {/* Gold sparkles */}
      <text x="345" y="55" fontSize="10" fill="#f4b942">✦</text>
      <text x="320" y="45" fontSize="8" fill="#f4b942" fillOpacity="0.7">✦</text>
      {/* With AI label */}
      <text x="228" y="18" fontSize="10" fill="#10a37f" fontWeight="bold">✅ With ChatGPT</text>
      <text x="232" y="145" fontSize="7" fill="#9ca3af">Getting ahead every day</text>
    </svg>
  );
}

export function AgenticRobotSVG({ small = false }: { small?: boolean }) {
  const w = small ? 120 : 200;
  const h = small ? 120 : 200;
  return (
    <svg viewBox="0 0 200 200" width={w} height={h} style={{ display: "block" }} aria-hidden="true">
      {/* Outer glow ring */}
      <circle cx="100" cy="100" r="90" fill="none" stroke="#10a37f" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="5 3">
        <animateTransform attributeName="transform" type="rotate" values="0 100 100;360 100 100" dur="20s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="100" r="75" fill="none" stroke="#8b5cf6" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="3 4">
        <animateTransform attributeName="transform" type="rotate" values="360 100 100;0 100 100" dur="15s" repeatCount="indefinite" />
      </circle>

      {/* Energy lines radiating — pulsing */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + Math.cos(rad) * 40;
        const y1 = 100 + Math.sin(rad) * 40;
        const x2 = 100 + Math.cos(rad) * 70;
        const y2 = 100 + Math.sin(rad) * 70;
        return (
          <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#f4b942" strokeWidth="0.8" strokeOpacity="0.3">
            <animate attributeName="stroke-opacity" values="0.1;0.5;0.1" dur="2s" repeatCount="indefinite" begin={`${i * 0.25}s`} />
          </line>
        );
      })}

      {/* Robot body */}
      <rect x="72" y="78" width="56" height="54" rx="10" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1.5" />
      {/* Body highlight */}
      <rect x="74" y="80" width="52" height="8" rx="4" fill="#8b5cf6" fillOpacity="0.2" />
      {/* Chest panel */}
      <rect x="82" y="96" width="36" height="24" rx="4" fill="#0f172a" />
      {/* Activity indicators */}
      <circle cx="90" cy="104" r="3" fill="#10a37f">
        <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="104" r="3" fill="#3b82f6">
        <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" begin="0.3s" />
      </circle>
      <circle cx="110" cy="104" r="3" fill="#8b5cf6">
        <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" begin="0.6s" />
      </circle>
      <rect x="84" y="112" width="32" height="2" rx="1" fill="#10a37f" fillOpacity="0.5" />
      <rect x="84" y="116" width="22" height="2" rx="1" fill="#3b82f6" fillOpacity="0.4" />

      {/* Robot head */}
      <rect x="76" y="52" width="48" height="30" rx="10" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1.5" />
      {/* Antenna */}
      <line x1="100" y1="52" x2="100" y2="40" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
      <circle cx="100" cy="38" r="4" fill="#8b5cf6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
      </circle>
      {/* Eyes */}
      <rect x="83" y="60" width="12" height="8" rx="4" fill="#10a37f" />
      <rect x="105" y="60" width="12" height="8" rx="4" fill="#10a37f" />
      {/* Eye glow */}
      <rect x="84" y="61" width="10" height="6" rx="3" fill="#34d399" fillOpacity="0.6">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
      </rect>
      <rect x="106" y="61" width="10" height="6" rx="3" fill="#34d399" fillOpacity="0.6">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.5s" />
      </rect>
      {/* Smile */}
      <path d="M88 74 Q100 80 112 74" stroke="#8b5cf6" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* 4 Arms + Task icons */}

      {/* Top-left arm — WRITE */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 72 90;-5 72 90;0 72 90;5 72 90;0 72 90" dur="4s" repeatCount="indefinite" />
        <line x1="72" y1="90" x2="32" y2="52" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
        <circle cx="28" cy="48" r="8" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5" />
        {/* Pen icon */}
        <line x1="24" y1="51" x2="32" y2="45" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
        <polygon points="24,51 27,54 28,48 25,47" fill="#3b82f6" />
      </g>
      <text x="8" y="46" fontSize="7" fill="#3b82f6" fontWeight="bold">Write</text>

      {/* Top-right arm — CODE */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 128 90;5 128 90;0 128 90;-5 128 90;0 128 90" dur="4s" repeatCount="indefinite" begin="1s" />
        <line x1="128" y1="90" x2="168" y2="52" stroke="#10a37f" strokeWidth="3" strokeLinecap="round" />
        <circle cx="172" cy="48" r="8" fill="#022c1a" stroke="#10a37f" strokeWidth="1.5" />
        {/* Code brackets */}
        <text x="167" y="52" fontSize="9" fill="#34d399">{"<>"}</text>
      </g>
      <text x="162" y="46" fontSize="7" fill="#10a37f" fontWeight="bold">Code</text>

      {/* Bottom-left arm — RESEARCH */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 72 120;5 72 120;0 72 120;-5 72 120;0 72 120" dur="4s" repeatCount="indefinite" begin="2s" />
        <line x1="72" y1="120" x2="32" y2="152" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
        <circle cx="28" cy="156" r="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
        {/* Search icon */}
        <circle cx="26" cy="154" r="3.5" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
        <line x1="29" y1="157" x2="32" y2="160" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <text x="5" y="168" fontSize="7" fill="#f59e0b" fontWeight="bold">Research</text>

      {/* Bottom-right arm — EMAIL */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 128 120;-5 128 120;0 128 120;5 128 120;0 128 120" dur="4s" repeatCount="indefinite" begin="3s" />
        <line x1="128" y1="120" x2="168" y2="152" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
        <circle cx="172" cy="156" r="8" fill="#4c0519" stroke="#ec4899" strokeWidth="1.5" />
        {/* Envelope icon */}
        <rect x="167" y="152" width="10" height="7" rx="1" fill="none" stroke="#f9a8d4" strokeWidth="1" />
        <polyline points="167,152 172,156 177,152" stroke="#f9a8d4" strokeWidth="1" fill="none" />
      </g>
      <text x="157" y="170" fontSize="7" fill="#ec4899" fontWeight="bold">Email</text>
    </svg>
  );
}

export function OrderFlowSVG() {
  return (
    <svg viewBox="0 0 420 110" width="100%" style={{ display: "block", height: "auto", maxHeight: 120 }} aria-hidden="true">
      {/* Step 1 — WhatsApp */}
      <circle cx="52" cy="50" r="28" fill="#064e3b" stroke="#25d366" strokeWidth="1.5" />
      <circle cx="52" cy="50" r="22" fill="#022c1a" />
      <path d="M42 56 Q42 48 52 44 Q62 40 66 48 Q70 56 65 60 L67 68 L59 64 Q50 64 42 56 Z" fill="#25d366" fillOpacity="0.9" />
      <text x="42" y="88" fontSize="8" fill="#25d366" fontWeight="bold">Message</text>
      <text x="44" y="97" fontSize="7" fill="#6b7280">WhatsApp</text>

      {/* Connector 1→2 */}
      <line x1="82" y1="50" x2="138" y2="50" stroke="#374151" strokeWidth="1.5" strokeDasharray="5 3" />
      {/* Traveling dot 1→2 */}
      <circle cx="82" cy="50" r="4" fill="#f4b942">
        <animateMotion path="M0,0 L56,0" dur="3s" repeatCount="indefinite" begin="0s" />
        <animate attributeName="opacity" values="1;1;0" dur="3s" repeatCount="indefinite" begin="0s" />
      </circle>

      {/* Step 2 — bKash */}
      <circle cx="158" cy="50" r="28" fill="#2d0a14" stroke="#E2136E" strokeWidth="1.5" />
      <circle cx="158" cy="50" r="22" fill="#1a0209" />
      <circle cx="158" cy="50" r="14" fill="#E2136E" fillOpacity="0.9" />
      <text x="152" y="55" fontSize="12" fill="white" fontWeight="bold">৳</text>
      <text x="142" y="88" fontSize="8" fill="#E2136E" fontWeight="bold">bKash/Nagad</text>
      <text x="150" y="97" fontSize="7" fill="#6b7280">Payment</text>

      {/* Connector 2→3 */}
      <line x1="188" y1="50" x2="244" y2="50" stroke="#374151" strokeWidth="1.5" strokeDasharray="5 3" />
      <circle cx="188" cy="50" r="4" fill="#f4b942">
        <animateMotion path="M0,0 L56,0" dur="3s" repeatCount="indefinite" begin="1s" />
        <animate attributeName="opacity" values="1;1;0" dur="3s" repeatCount="indefinite" begin="1s" />
      </circle>

      {/* Step 3 — Package */}
      <circle cx="264" cy="50" r="28" fill="#0c1a3b" stroke="#3b82f6" strokeWidth="1.5" />
      <circle cx="264" cy="50" r="22" fill="#060b1a" />
      {/* Package icon */}
      <rect x="251" y="42" width="26" height="20" rx="3" fill="#1e40af" fillOpacity="0.8" />
      <line x1="264" y1="42" x2="264" y2="62" stroke="#60a5fa" strokeWidth="1.5" />
      <line x1="251" y1="50" x2="277" y2="50" stroke="#60a5fa" strokeWidth="1.5" />
      {/* Checkmark on package */}
      <circle cx="272" cy="42" r="7" fill="#10a37f" />
      <path d="M269 42 L271 44 L275 39" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <text x="250" y="88" fontSize="8" fill="#3b82f6" fontWeight="bold">Processing</text>
      <text x="252" y="97" fontSize="7" fill="#6b7280">5–30 minutes</text>

      {/* Connector 3→4 */}
      <line x1="294" y1="50" x2="350" y2="50" stroke="#374151" strokeWidth="1.5" strokeDasharray="5 3" />
      <circle cx="294" cy="50" r="4" fill="#f4b942">
        <animateMotion path="M0,0 L56,0" dur="3s" repeatCount="indefinite" begin="2s" />
        <animate attributeName="opacity" values="1;1;0" dur="3s" repeatCount="indefinite" begin="2s" />
      </circle>

      {/* Step 4 — Done! */}
      <circle cx="370" cy="50" r="28" fill="#1a1a0a" stroke="#f4b942" strokeWidth="1.5" />
      <circle cx="370" cy="50" r="22" fill="#0e0e05" />
      {/* Thumbs up */}
      <text x="358" y="56" fontSize="20">👍</text>
      {/* Stars */}
      <text x="344" y="32" fontSize="8" fill="#f4b942">★★★★★</text>
      <text x="352" y="88" fontSize="8" fill="#f4b942" fontWeight="bold">Access Ready!</text>
      <text x="354" y="97" fontSize="7" fill="#6b7280">Enjoy your AI</text>
    </svg>
  );
}
