// Remotion composition: "Digitale Raffinerie" — Horizontal workflow
// Rohdaten + Marktdaten + Archivdaten → RAWLOGIC KERN (Synchronisation) → Autonomer Workflow

import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill } from "remotion";

// ── Canvas ──────────────────────────────────────────────────
const W   = 1260;
const H   = 300;
const INK = "#000000";

// ── Layout zones ────────────────────────────────────────────
const EMIT_X  = 60;
const BOX_X   = 350;  const BOX_Y = 50;
const BOX_W   = 560;  const BOX_H = 172;
const BOX_R   = BOX_X + BOX_W;   // 910
const SYM_CX  = 1200;
const SYM_CY  = H / 2;           // 150

const LANE_Y: [number, number, number] = [
  BOX_Y + 34,   // 84
  BOX_Y + 86,   // 136
  BOX_Y + 138,  // 188
];

// ── Process badges (top strip) ───────────────────────────────
// Centered over each zone; widths tuned to fit the label text.
const BADGE_Y  = 6;    // rect top
const BADGE_H  = 20;   // rect height → bottom at y=26
const BADGE_TY = 19.5; // text baseline (vertically centered in rect)

const BADGES = [
  { cx: Math.round((EMIT_X + BOX_X) / 2),  label: "ROHDATEN",              bw: 88  }, // 205
  { cx: BOX_X + BOX_W / 2,                 label: "DATEN-SYNCHRONISATION", bw: 184 }, // 630
  { cx: Math.round((BOX_R + W) / 2),       label: "AUTONOMER WORKFLOW",    bw: 166 }, // 1085
];

// Arrows sit in the gaps between badges
const BADGE_ARROWS = [
  Math.round((BADGES[0].cx + BADGES[0].bw / 2 + BADGES[1].cx - BADGES[1].bw / 2) / 2), // ≈ 394
  Math.round((BADGES[1].cx + BADGES[1].bw / 2 + BADGES[2].cx - BADGES[2].bw / 2) / 2), // ≈ 862
];

// ── External feeder pipe x-positions ────────────────────────
// Deliberately placed in the gap zones between badges so no pipe
// falls beneath a badge background rectangle.
const MARKT_X  = Math.round(BOX_X + BOX_W * 0.20); // 462 — between ROHDATEN & DATEN-SYNC badge
const ARCHIV_X = Math.round(BOX_X + BOX_W * 0.74); // 764 — between DATEN-SYNC & AUTONOMER badge

const MARKT_PIPE_TOP  = BADGE_Y + BADGE_H + 2;   // 28  — starts just below badge strip
const ARCHIV_PIPE_BOT = H - 38;                   // 262 — ends above zone label area

// ── Colour helpers ──────────────────────────────────────────
const RAW  = { r: 148, g: 148, b: 148 };
const GOLD = { r: 196, g: 150, b: 28  };

function lerpColor(t: number) {
  const r = Math.round(RAW.r + (GOLD.r - RAW.r) * t);
  const g = Math.round(RAW.g + (GOLD.g - RAW.g) * t);
  const b = Math.round(RAW.b + (GOLD.b - RAW.b) * t);
  return `rgb(${r},${g},${b})`;
}

// ── Main particle system ─────────────────────────────────────
const N = 24;

function particle(frame: number, fps: number, i: number) {
  const PERIOD  = fps * 2.6;
  const offset  = (i / N) * PERIOD;
  const t       = ((frame + offset) % PERIOD) / PERIOD;
  const lane    = i % 3 as 0 | 1 | 2;

  const PRE = 0.38, MID = 0.66;
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

// ── Feeder particles ─────────────────────────────────────────
const N_FEED = 4;

function feederParticles(
  frame: number, fps: number, startY: number, endY: number,
): Array<{ y: number; op: number }> {
  const PERIOD = fps * 1.8;
  return Array.from({ length: N_FEED }, (_, i) => {
    const t = ((frame + (i / N_FEED) * PERIOD) % PERIOD) / PERIOD;
    return {
      y:  startY + (endY - startY) * t,
      op: t < 0.07 ? t / 0.07 : t > 0.93 ? (1 - t) / 0.07 : 1,
    };
  });
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

  const rot   = (frame * 0.5) * Math.PI / 180;
  const pulse = 0.85 + 0.15 * Math.sin(frame * 0.12);

  const hitFlash = parts.reduce((max, p) => {
    const dx = p.x - SYM_CX, dy = p.y - SYM_CY;
    return Math.sqrt(dx * dx + dy * dy) < 32 && p.ct > 0.75
      ? Math.max(max, p.opacity) : max;
  }, 0);

  const PERIM   = 2 * (BOX_W + BOX_H);
  const boxPath = `M ${BOX_X},${BOX_Y} h ${BOX_W} v ${BOX_H} h ${-BOX_W} Z`;

  const SCAN_P = fps * 2.4;
  const scanT  = (frame % SCAN_P) / SCAN_P;
  const scanX  = BOX_X + scanT * BOX_W;
  const scanOp = scanT < 0.03 ? 0 : scanT > 0.97 ? 0 : 0.08;

  const feedOp     = Math.max(0, (boxBuild - 0.35) / 0.65);
  const marktFeed  = feederParticles(frame, fps, MARKT_PIPE_TOP,  BOX_Y);
  const archivFeed = feederParticles(frame, fps, ARCHIV_PIPE_BOT, BOX_Y + BOX_H);

  const CL      = 14;
  const goldRGB = "rgb(196,150,28)";
  const PORT_R  = 4;

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

        {/* ── Process badges (top strip) ────────────────────
             Rendered first so feeder pipes can emerge below them. */}
        <g opacity={lblFade}>
          {BADGES.map(({ cx, label, bw }) => (
            <g key={label}>
              <rect
                x={cx - bw / 2} y={BADGE_Y}
                width={bw} height={BADGE_H}
                rx={3}
                fill="#f2f2f2"
                stroke="#333333"
                strokeWidth={0.8}
              />
              <text
                x={cx} y={BADGE_TY}
                textAnchor="middle"
                fill="#000000"
                fontSize={7.5} fontWeight="700"
                fontFamily="ui-monospace, monospace"
                letterSpacing={0.8}
              >{label}</text>
            </g>
          ))}
          {/* Arrows between badges */}
          {BADGE_ARROWS.map((ax, k) => (
            <text key={k} x={ax} y={BADGE_TY}
              textAnchor="middle"
              fill="rgba(0,0,0,0.35)"
              fontSize={9}
            >→</text>
          ))}
        </g>

        {/* ── Zone separator dashed lines ─────────────────── */}
        {[BOX_X, BOX_R].map((lx, i) => (
          <line key={i} x1={lx} y1={30} x2={lx} y2={245}
            stroke={`rgba(0,0,0,${0.1 * boxBuild})`}
            strokeWidth={1} strokeDasharray="4 5" />
        ))}

        {/* ── RAWLOGIC KERN box ────────────────────────────── */}
        <path d={boxPath}
          fill="rgba(0,0,0,0.02)" stroke={INK} strokeWidth={2}
          strokeDasharray={PERIM} strokeDashoffset={PERIM * (1 - boxBuild)} />

        {boxBuild > 0.85 && [
          { x: BOX_X, y: BOX_Y,          dx:  1, dy:  1 },
          { x: BOX_R, y: BOX_Y,          dx: -1, dy:  1 },
          { x: BOX_X, y: BOX_Y + BOX_H,  dx:  1, dy: -1 },
          { x: BOX_R, y: BOX_Y + BOX_H,  dx: -1, dy: -1 },
        ].map(({ x, y, dx, dy }, k) => (
          <path key={k}
            d={`M ${x + dx * CL},${y} L ${x},${y} L ${x},${y + dy * CL}`}
            fill="none" stroke={INK} strokeWidth={1.5} />
        ))}

        <text x={BOX_X + BOX_W / 2} y={BOX_Y + 15}
          textAnchor="middle" fill={INK} fontSize={9}
          fontFamily="ui-monospace, monospace" letterSpacing={2.5}
          opacity={boxBuild}
        >RAWLOGIC KERN</text>

        {LANE_Y.map((ly, k) => (
          <line key={k} x1={BOX_X + 6} y1={ly} x2={BOX_R - 6} y2={ly}
            stroke={`rgba(0,0,0,${0.06 * boxBuild})`}
            strokeWidth={1} strokeDasharray="6 6" />
        ))}

        <line x1={scanX} y1={BOX_Y + 2} x2={scanX} y2={BOX_Y + BOX_H - 2}
          stroke={`rgba(196,150,28,${scanOp})`} strokeWidth={1} />

        <text x={BOX_R - 8} y={BOX_Y + BOX_H - 6}
          textAnchor="end" fill={`rgba(0,0,0,${0.3 * boxBuild})`}
          fontSize={7} fontFamily="ui-monospace, monospace" letterSpacing={0.5}
        >STATUS: AKTIV</text>

        {/* ══════════════════════════════════════════════════════
            MARKTDATEN — solid injection pipe from top
            Pipe starts just below the badge strip (y=28).
            Label sits to the right, in the gap between badges.
            ══════════════════════════════════════════════════ */}
        <g opacity={feedOp}>
          <line x1={MARKT_X} y1={MARKT_PIPE_TOP} x2={MARKT_X} y2={BOX_Y}
            stroke={INK} strokeWidth={2} />
          <rect x={MARKT_X - PORT_R} y={BOX_Y - PORT_R}
            width={PORT_R * 2} height={PORT_R * 2} fill={INK} />
          <text x={MARKT_X + 8} y={42}
            textAnchor="start" fill={INK}
            fontSize={6.5} fontFamily="ui-monospace, monospace" letterSpacing={1}
          >MARKTDATEN</text>
          {marktFeed.map((p, i) => (
            <circle key={i} cx={MARKT_X} cy={p.y} r={2.2}
              fill="rgb(148,148,148)" opacity={p.op} />
          ))}
        </g>

        {/* ══════════════════════════════════════════════════════
            ARCHIVDATEN — solid injection pipe from bottom
            Label sits to the right, in the gap between badges.
            ══════════════════════════════════════════════════ */}
        <g opacity={feedOp}>
          <line x1={ARCHIV_X} y1={BOX_Y + BOX_H} x2={ARCHIV_X} y2={ARCHIV_PIPE_BOT}
            stroke={INK} strokeWidth={2} />
          <rect x={ARCHIV_X - PORT_R} y={BOX_Y + BOX_H - PORT_R}
            width={PORT_R * 2} height={PORT_R * 2} fill={INK} />
          <text x={ARCHIV_X + 8} y={244}
            textAnchor="start" fill={INK}
            fontSize={6.5} fontFamily="ui-monospace, monospace" letterSpacing={1}
          >ARCHIVDATEN</text>
          {archivFeed.map((p, i) => (
            <circle key={i} cx={ARCHIV_X} cy={p.y} r={2.2}
              fill="rgb(148,148,148)" opacity={p.op} />
          ))}
        </g>

        {/* ── Emitter (Datenquelle) ────────────────────────── */}
        <circle cx={EMIT_X} cy={LANE_Y[1]} r={6}
          fill="none" stroke={INK} strokeWidth={1.5} opacity={boxBuild} />
        <circle cx={EMIT_X} cy={LANE_Y[1]} r={2.2}
          fill={INK} opacity={boxBuild} />
        <text x={EMIT_X} y={BOX_Y - 12}
          textAnchor="middle" fill={INK}
          fontSize={10} fontWeight="700"
          fontFamily="ui-monospace, monospace"
          opacity={0.9 * boxBuild}
        >DATENQUELLE</text>

        {[BOX_X - 14, BOX_R + 14].map((ax, k) => (
          <text key={k} x={ax} y={LANE_Y[1] + 5}
            textAnchor="middle" fill={INK} fontSize={13}
            opacity={0.22 * boxBuild}
          >→</text>
        ))}

        {/* ── Main particles ──────────────────────────────── */}
        {parts.map((p, i) => (
          <circle key={i}
            cx={p.x} cy={p.y} r={p.r}
            fill={p.color} opacity={p.opacity * partFade}
            filter={p.ct > 0.45 ? "url(#fg)" : undefined}
          />
        ))}

        {/* ── Autonomer Workflow Symbol ─────────────────────
             Outer hex rotates, inner counter-rotates + pulses.
             Flashes gold when a refined particle arrives.    */}
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
          const flashAlpha = symEntry * (0.85 + hitFlash * 0.4);
          return (
            <g filter={hitFlash > 0.5 ? "url(#fg)" : undefined}>
              <polygon points={outerPts} fill="none"
                stroke={isHit ? goldRGB : INK}
                strokeWidth={isHit ? 2.5 : 1.5}
                opacity={flashAlpha} />
              <polygon points={innerPts} fill="none"
                stroke={goldRGB} strokeWidth={1}
                opacity={symEntry * (0.4 + hitFlash * 0.4)} />
              <circle cx={SYM_CX} cy={SYM_CY} r={5 * symEntry}
                fill={isHit ? goldRGB : INK} opacity={flashAlpha} />
            </g>
          );
        })()}
      </svg>
    </AbsoluteFill>
  );
};
