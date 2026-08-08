/**
 * Abstract trade graphic.
 *
 * Deliberately NOT a world map. It is a graticule of measurement points with a
 * single marked position — the operational base — and concentric rings
 * suggesting reach.
 *
 * This restraint is a compliance decision as much as a design one: the company
 * has not confirmed destination markets, routes, offices or shipment volumes,
 * so the graphic must not imply any. Rings are static; nothing here animates
 * on a loop.
 *
 * Purely decorative, and hidden from assistive technology — the facts it sits
 * beside are stated in text.
 */
export function TradeField() {
  return (
    <svg
      viewBox="0 0 1000 560"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className="h-auto w-full"
    >
      <defs>
        <pattern
          id="am-dots"
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.4" cy="1.4" r="1.4" fill="currentColor" />
        </pattern>

        <radialGradient id="am-fade" cx="62%" cy="54%" r="62%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="55%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>

        <mask id="am-mask">
          <rect width="1000" height="560" fill="url(#am-fade)" />
        </mask>
      </defs>

      {/* Measurement field */}
      <g mask="url(#am-mask)" className="text-on-dark-muted" opacity="0.45">
        <rect width="1000" height="560" fill="url(#am-dots)" />
      </g>

      {/* Graticule through the marked position */}
      <g
        mask="url(#am-mask)"
        stroke="currentColor"
        className="text-on-dark-muted"
        strokeWidth="1"
        opacity="0.35"
      >
        <line x1="0" y1="298" x2="1000" y2="298" />
        <line x1="622" y1="0" x2="622" y2="560" />
      </g>

      {/* Reach — concentric, static, non-directional */}
      <g
        mask="url(#am-mask)"
        fill="none"
        stroke="currentColor"
        className="text-brand-red-light"
        opacity="0.5"
      >
        <circle cx="622" cy="298" r="62" strokeWidth="1" />
        <circle cx="622" cy="298" r="132" strokeWidth="1" opacity="0.7" />
        <circle cx="622" cy="298" r="215" strokeWidth="1" opacity="0.45" />
        <circle cx="622" cy="298" r="310" strokeWidth="1" opacity="0.25" />
      </g>

      {/* Marked position — the operational base */}
      <g className="text-brand-red-light">
        <circle cx="622" cy="298" r="5" fill="currentColor" />
        <circle
          cx="622"
          cy="298"
          r="13"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}
