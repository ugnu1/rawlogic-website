// Remotion composition: "Digitale Raffinerie" — Horizontal workflow
// Rohdaten + Marktdaten + Archivdaten → RAWLOGIC KERN (Synchronisation) → Autonomer Workflow

import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill } from "remotion";

// ── Canvas ──────────────────────────────────────────────────
const W   = 1260;
const H   = 300;
const INK = "#000000";

// ── Layout zones ────────────────────────────────────────────
const EMIT_X  = 60;                            // Datenquelle (left edge)
const BOX_X   = 350; const BOX_Y = 50;         // Kern box top-left
const BOX_W   = 560; const BOX_H = 172;        // box centered on x=630
const BOX_R   = BOX_X + BOX_W;                 // 910
const SYM_CX  = 1200;                          // single symbol centre x (right edge)
const SYM_CY  = H / 2;                         // 150

// Three refinery tracks inside box
const LANE_Y: [number, number, number] = [
  BOX_Y + 34,   // 84
  BOX_Y + 86,   // 136
  BOX_Y + 138,  // 188
];

// External feeder entry x-positions (Marktdaten top, Archivdaten bottom)
const MARKT_X  = Math.round(BOX_X + BOX_W * 0.35); // 546
const ARCHIV_X = Math.round(BOX_X + BOX_W * 0.66); // 720

// Zone labels
const ZLABEL_Y  = 272;
const ZONE_LBLS = [
  { x: (EMIT_X + BOX_X) / 2,   text: "ROHDATEN"                },  // ≈ 205
  { x: BOX_X + BOX_W / 2,      text: "DATEN-SYNCHRONISATION"   },  // 630
  { x: (BOX_R + W) / 2,        text: "AUTONOMER WORKFLOW"      },  // 1085
];

// ── Colour helpers ──────────────────────────────────────────
const RAW  = { r: 148, g: 148, b: 148 };
const GOLD = { r: 196, g: 150, b: 28  };

function lerpColor(t: number) {
  const r = Math.round(RAW.r + (GOLD.r - RAW.r) * t);
  const g = Math.round(RAW.g + (GOLD.g - RAW.g) * t);
  const b = Math.round(RAW.b + (GOLD.b - RAW.b) * t);
  return `rgb(${r},${g},${b})`;
}

// ── Particle system ─────────────────────────────────────────
const N = 24;

function particle(frame: number, fps: number, i: number) {
  const PERIOD  = fps * 2.6;
  const offset  = (i / N) * PERIOD;
  const t       = ((frame + offset) % PERIOD) / PERIOD;
  const lane    = i % 3 as 0 | 1 | 2;

  const PRE = 0.38, MID = 0.66;

  // ── X ──
  let x: number;
  if (t < PRE) {
    x = EMIT_X + (BOX_X - EMIT_X) * (t / PRE);
  } else if (t < MID) {
    x = BOX_X + BOX_W * ((t - PRE) / (MID - PRE));
  } else {
    const p = (t - MID) / (1 - MID);
    const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
    x = BOX_R + (SYM_CX - BOX_R) * e;
  }

  // ── Y ── scatter → align to lane inside box → converge to symbol centre
  const scatter = (i * 37 % 80) - 40;
  const entryY  = LANE_Y[1] + scatter;
  const laneY   = LANE_Y[lane];
  let y: number;
  if (t < 0.33) {
    y = entryY + Math.sin(frame * 0.07 + i * 1.4) * 4;
  } else if (t < MID) {
    const p = (t - 0.33) / (MID - 0.33);
    const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
    y = entryY + (laneY - entryY) * e;
  } else {
    const p2 = (t - MID) / (1 - MID);
    const e2 = p2 < 0.5 ? 2 * p2 * p2 : 1 - (-2 * p2 + 2) ** 2 / 2;
    y = laneY + (SYM_CY - laneY) * e2;
  }

  const ct      = t < PRE ? 0 : t < MID ? (t - PRE) / (MID - PRE) : 1;
  const opacity = t < 0.04 ? t / 0.04 : t > 0.96 ? (1 - t) / 0.04 : 0.93;

  return { x, y, color: lerpColor(ct), opacity, r: 2.4 + ct * 1.6, ct };
}

// ── Eased interpolate shorthand ─────────────────────────────
function ei(frame: number, a: number, b: number) {
  return interpolate(frame, [a, b], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

// ── Main composition ────────────────────────────────────────
export const AutonomousGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const parts     = Array.from({ length: N }, (_, i) => particle(frame, fps, i));
  const boxBuild  = ei(frame, 0, 28);
  const partFade  = ei(frame, 18, 55);
  const symEntry  = ei(frame, 38, 62);
  const lblFade   = ei(frame, 45, 62);

  // Symbol rotation & pulse
  const rot   = (frame * 0.5) * Math.PI / 180;
  const pulse = 0.85 + 0.15 * Math.sin(frame * 0.12);

  // Flash when a golden particle reaches the symbol
  const hitFlash = parts.reduce((max, p) => {
    const dx = p.x - SYM_CX;
    const dy = p.y - SYM_CY;
    if (Math.sqrt(dx * dx + dy * dy) < 32 && p.ct > 0.75) {
      return Math.max(max, p.opacity);
    }
    return max;
  }, 0);

  const PERIM   = 2 * (BOX_W + BOX_H);
  const boxPath = `M ${BOX_X},${BOX_Y} h ${BOX_W} v ${BOX_H} h ${-BOX_W} Z`;

  const SCAN_P = fps * 2.4;
  const scanT  = (frame % SCAN_P) / SCAN_P;
  const scanX  = BOX_X + scanT * BOX_W;
  const scanOp = scanT < 0.03 ? 0 : scanT > 0.97 ? 0 : 0.08;

  // Feeder opacity — fades in after box is drawn
  const feedOp = Math.max(0, (boxBuild - 0.35) / 0.65) * 0.52;

  const CL      = 14;
  const goldRGB = "rgb(196,150,28)";

  return (
    <AbsoluteFill style={{ backgroundColor: "#ebebeb" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        style={{ width: "100%", height: "100%" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="fg" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="2.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Zone separator dashed lines ─────────────────── */}
        {[BOX_X, BOX_R].map((lx, i) => (
          <line key={i} x1={lx} y1={14} x2={lx} y2={245}
            stroke={`rgba(0,0,0,${0.1 * boxBuild})`}
            strokeWidth={1} strokeDasharray="4 5" />
        ))}

        {/* ── RAWLOGIC KERN box (perimeter draw) ──────────── */}
        <path
          d={boxPath}
          fill="rgba(0,0,0,0.02)"
          stroke={INK}
          strokeWidth={2}
          strokeDasharray={PERIM}
          strokeDashoffset={PERIM * (1 - boxBuild)}
        />

        {/* Corner marks */}
        {boxBuild > 0.85 && [
          { x: BOX_X, y: BOX_Y,          dx:  1, dy:  1 },
          { x: BOX_R, y: BOX_Y,          dx: -1, dy:  1 },
          { x: BOX_X, y: BOX_Y + BOX_H,  dx:  1, dy: -1 },
          { x: BOX_R, y: BOX_Y + BOX_H,  dx: -1, dy: -1 },
        ].map(({ x, y, dx, dy }, k) => (
          <path key={k}
            d={`M ${x + dx * CL},${y} L ${x},${y} L ${x},${y + dy * CL}`}
            fill="none" stroke={INK} strokeWidth={1.5}
          />
        ))}

        {/* Box title */}
        <text x={BOX_X + BOX_W / 2} y={BOX_Y + 15}
          textAnchor="middle" fill={INK} fontSize={9}
          fontFamily="ui-monospace, monospace" letterSpacing={2.5}
          opacity={boxBuild}
        >
          RAWLOGIC KERN
        </text>

        {/* Lane guide lines (three refinery tracks) */}
        {LANE_Y.map((ly, k) => (
          <line key={k} x1={BOX_X + 6} y1={ly} x2={BOX_R - 6} y2={ly}
            stroke={`rgba(0,0,0,${0.06 * boxBuild})`}
            strokeWidth={1} strokeDasharray="6 6" />
        ))}

        {/* Scanning vertical line */}
        <line x1={scanX} y1={BOX_Y + 2} x2={scanX} y2={BOX_Y + BOX_H - 2}
          stroke={`rgba(196,150,28,${scanOp})`} strokeWidth={1} />

        {/* Status indicator */}
        <text x={BOX_R - 8} y={BOX_Y + BOX_H - 6}
          textAnchor="end"
          fill={`rgba(0,0,0,${0.3 * boxBuild})`}
          fontSize={7} fontFamily="ui-monospace, monospace" letterSpacing={0.5}
        >
          STATUS: AKTIV
        </text>

        {/* ── External data feeders ──────────────────────────
             Marktdaten enters from top, Archivdaten from bottom.
             Both merge into RAWLOGIC KERN — showing Daten-Synchronisation. */}
        {feedOp > 0 && (
          <g opacity={feedOp}>
            {/* Marktdaten — top feeder */}
            <line x1={MARKT_X} y1={6} x2={MARKT_X} y2={BOX_Y - 1}
              stroke={INK} strokeWidth={1} strokeDasharray="3 4" />
            <circle cx={MARKT_X} cy={BOX_Y} r={2.5} fill={INK} />
            <text x={MARKT_X} y={12}
              textAnchor="middle" fill={INK}
              fontSize={6.5} fontFamily="ui-monospace, monospace" letterSpacing={1}
            >
              MARKTDATEN
            </text>

            {/* Archivdaten — bottom feeder */}
            <line x1={ARCHIV_X} y1={BOX_Y + BOX_H + 1} x2={ARCHIV_X} y2={251}
              stroke={INK} strokeWidth={1} strokeDasharray="3 4" />
            <circle cx={ARCHIV_X} cy={BOX_Y + BOX_H} r={2.5} fill={INK} />
            <text x={ARCHIV_X} y={261}
              textAnchor="middle" fill={INK}
              fontSize={6.5} fontFamily="ui-monospace, monospace" letterSpacing={1}
            >
              ARCHIVDATEN
            </text>
          </g>
        )}

        {/* ── Emitter (Datenquelle) ────────────────────────── */}
        <circle cx={EMIT_X} cy={LANE_Y[1]} r={6}
          fill="none" stroke={INK} strokeWidth={1.5}
          opacity={boxBuild} />
        <circle cx={EMIT_X} cy={LANE_Y[1]} r={2.2}
          fill={INK} opacity={boxBuild} />
        <text x={EMIT_X} y={BOX_Y - 12}
          textAnchor="middle" fill={INK}
          fontSize={10} fontWeight="700"
          fontFamily="ui-monospace, monospace"
          opacity={0.9 * boxBuild}
        >
          DATENQUELLE
        </text>

        {/* Flow arrows */}
        {[BOX_X - 14, BOX_R + 14].map((ax, k) => (
          <text key={k} x={ax} y={LANE_Y[1] + 5}
            textAnchor="middle" fill={INK} fontSize={13}
            opacity={0.22 * boxBuild}
          >→</text>
        ))}

        {/* ── Particles ──────────────────────────────────── */}
        {parts.map((p, i) => (
          <circle
            key={i}
            cx={p.x} cy={p.y} r={p.r}
            fill={p.color}
            opacity={p.opacity * partFade}
            filter={p.ct > 0.45 ? "url(#fg)" : undefined}
          />
        ))}

        {/* ── Autonomer Workflow Symbol ─────────────────────
             Outer hexagon rotates slowly. Inner hexagon counter-rotates
             and pulses. Flashes gold when refined particles arrive. */}
        {(() => {
          const outerPts = Array.from({ length: 6 }, (_, k) => {
            const a = k * Math.PI / 3 + rot;
            return `${SYM_CX + Math.cos(a) * 26 * symEntry},${SYM_CY + Math.sin(a) * 26 * symEntry}`;
          }).join(" ");
          const innerPts = Array.from({ length: 6 }, (_, k) => {
            const a = k * Math.PI / 3 - rot * 0.6;
            return `${SYM_CX + Math.cos(a) * 15 * symEntry * pulse},${SYM_CY + Math.sin(a) * 15 * symEntry * pulse}`;
          }).join(" ");
          const isHit      = hitFlash > 0.3;
          const strokeCol  = isHit ? goldRGB : INK;
          const flashAlpha = symEntry * (0.85 + hitFlash * 0.4);
          return (
            <g filter={hitFlash > 0.5 ? "url(#fg)" : undefined}>
              <polygon points={outerPts} fill="none"
                stroke={strokeCol} strokeWidth={isHit ? 2.5 : 1.5}
                opacity={flashAlpha} />
              <polygon points={innerPts} fill="none"
                stroke={goldRGB} strokeWidth={1}
                opacity={symEntry * (0.4 + hitFlash * 0.4)} />
              <circle cx={SYM_CX} cy={SYM_CY} r={5 * symEntry}
                fill={isHit ? goldRGB : INK}
                opacity={flashAlpha} />
            </g>
          );
        })()}

        {/* ── Zone labels at bottom ────────────────────────── */}
        {ZONE_LBLS.map(({ x, text }, k) => (
          <text key={k} x={x} y={ZLABEL_Y}
            textAnchor="middle"
            fill="#000000"
            fontSize={8} fontFamily="ui-monospace, monospace" letterSpacing={1}
            opacity={0.78 * lblFade}
          >
            {text}
          </text>
        ))}

        {/* Arrows between zone labels */}
        {[BOX_X - 18, BOX_R + 18].map((ax, k) => (
          <text key={k} x={ax + (k === 0 ? 0 : 24)} y={ZLABEL_Y}
            textAnchor="middle" fill={`rgba(0,0,0,${0.3 * lblFade})`}
            fontSize={9}
          >→</text>
        ))}
      </svg>
    </AbsoluteFill>
  );
};
