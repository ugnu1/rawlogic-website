// Remotion composition: "Digitale Raffinerie" — Vertical mobile workflow
// Rohdaten + Marktdaten + Archivdaten → RAWLOGIC KERN (Synchronisation) → Autonomer Workflow

import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill } from "remotion";

// ── Canvas ──────────────────────────────────────────────────
const MW  = 300;
const MH  = 600;
const INK = "#000000";

// ── Layout zones ────────────────────────────────────────────
const EMIT_CX = MW / 2;   // 150
const EMIT_CY = 75;

const BOX_X_M = 35;       const BOX_Y_M = 125;
const BOX_W_M = 230;      const BOX_H_M = 200;
const BOX_BOT = BOX_Y_M + BOX_H_M;   // 325
const BOX_R_M = BOX_X_M + BOX_W_M;   // 265

const SYM_CX_M = MW / 2;
const SYM_CY_M = 508;

const LANE_X_M: [number, number, number] = [
  Math.round(BOX_X_M + BOX_W_M * 0.25),
  Math.round(BOX_X_M + BOX_W_M * 0.5),
  Math.round(BOX_X_M + BOX_W_M * 0.75),
];

// Feeder entry y-positions (Marktdaten left, Archivdaten right)
const MARKT_Y_M  = Math.round(BOX_Y_M + BOX_H_M * 0.33); // ≈ 191
const ARCHIV_Y_M = Math.round(BOX_Y_M + BOX_H_M * 0.67); // ≈ 259

// Feeder pipe extents
const MARKT_PIPE_LEFT   = 3;
const ARCHIV_PIPE_RIGHT = MW - 3;

// Zone labels — "DATEN-SYNCHRONISATION" pushed well below box bottom
const ZONE_LBLS_M = [
  { x: MW / 2, y: 370, text: "DATEN-SYNCHRONISATION" },
  { x: MW / 2, y: 580, text: "AUTONOMER WORKFLOW"    },
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

// ── Main particle system ─────────────────────────────────────
const N = 24;

function particleMobile(frame: number, fps: number, i: number) {
  const PERIOD = fps * 2.6;
  const offset = (i / N) * PERIOD;
  const t      = ((frame + offset) % PERIOD) / PERIOD;
  const lane   = i % 3 as 0 | 1 | 2;

  const PRE = 0.38, MID = 0.66;

  let y: number;
  if (t < PRE) {
    y = EMIT_CY + (BOX_Y_M - EMIT_CY) * (t / PRE);
  } else if (t < MID) {
    y = BOX_Y_M + BOX_H_M * ((t - PRE) / (MID - PRE));
  } else {
    const p = (t - MID) / (1 - MID);
    const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
    y = BOX_BOT + (SYM_CY_M - BOX_BOT) * e;
  }

  const scatter = (i * 37 % 60) - 30;
  const entryX  = EMIT_CX + scatter;
  const laneX   = LANE_X_M[lane];
  let x: number;
  if (t < 0.33) {
    x = entryX + Math.sin(frame * 0.07 + i * 1.4) * 4;
  } else if (t < MID) {
    const p = (t - 0.33) / (MID - 0.33);
    const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
    x = entryX + (laneX - entryX) * e;
  } else {
    const p2 = (t - MID) / (1 - MID);
    const e2 = p2 < 0.5 ? 2 * p2 * p2 : 1 - (-2 * p2 + 2) ** 2 / 2;
    x = laneX + (SYM_CX_M - laneX) * e2;
  }

  const ct      = t < PRE ? 0 : t < MID ? (t - PRE) / (MID - PRE) : 1;
  const opacity = t < 0.04 ? t / 0.04 : t > 0.96 ? (1 - t) / 0.04 : 0.93;
  return { x, y, color: lerpColor(ct), opacity, r: 2.4 + ct * 1.6, ct };
}

// ── Feeder particles (horizontal) ───────────────────────────
const N_FEED = 4;

function feederParticlesH(
  frame: number, fps: number,
  startX: number, endX: number,
  y: number,
): Array<{ x: number; op: number; y: number }> {
  const PERIOD = fps * 1.8;
  return Array.from({ length: N_FEED }, (_, i) => {
    const t = ((frame + (i / N_FEED) * PERIOD) % PERIOD) / PERIOD;
    return {
      x:  startX + (endX - startX) * t,
      y,
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
export const MobileRefinery: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const parts    = Array.from({ length: N }, (_, i) => particleMobile(frame, fps, i));
  const boxBuild = ei(frame, 0, 28);
  const partFade = ei(frame, 18, 55);
  const symEntry = ei(frame, 38, 62);
  const lblFade  = ei(frame, 45, 62);

  const rot   = (frame * 0.5) * Math.PI / 180;
  const pulse = 0.85 + 0.15 * Math.sin(frame * 0.12);

  const hitFlash = parts.reduce((max, p) => {
    const dx = p.x - SYM_CX_M, dy = p.y - SYM_CY_M;
    return Math.sqrt(dx * dx + dy * dy) < 32 && p.ct > 0.75
      ? Math.max(max, p.opacity) : max;
  }, 0);

  const PERIM_M = 2 * (BOX_W_M + BOX_H_M);
  const boxPath = `M ${BOX_X_M},${BOX_Y_M} h ${BOX_W_M} v ${BOX_H_M} h ${-BOX_W_M} Z`;

  const SCAN_P = fps * 2.4;
  const scanT  = (frame % SCAN_P) / SCAN_P;
  const scanY  = BOX_Y_M + scanT * BOX_H_M;
  const scanOp = scanT < 0.03 ? 0 : scanT > 0.97 ? 0 : 0.08;

  const feedOp     = Math.max(0, (boxBuild - 0.35) / 0.65);
  const marktFeed  = feederParticlesH(frame, fps, MARKT_PIPE_LEFT,   BOX_X_M, MARKT_Y_M);
  const archivFeed = feederParticlesH(frame, fps, ARCHIV_PIPE_RIGHT, BOX_R_M, ARCHIV_Y_M);

  const CL      = 12;
  const goldRGB = "rgb(196,150,28)";
  const PORT_R  = 4;

  // Center x of left and right margins for rotated labels
  const MARGIN_LEFT_CX  = BOX_X_M / 2;                   // 17.5
  const MARGIN_RIGHT_CX = BOX_R_M + (MW - BOX_R_M) / 2;  // 282.5

  return (
    <AbsoluteFill style={{ backgroundColor: "#ebebeb" }}>
      <svg
        viewBox={`0 0 ${MW} ${MH}`}
        width={MW}
        height={MH}
        style={{ width: "100%", height: "100%" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="fg-m" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="2.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Main process title (replaces ROHDATEN) ─────────
             Centered at top, explains the full process.        */}
        <text
          x={MW / 2} y={18}
          textAnchor="middle"
          fill="#000000"
          fontSize={9} fontWeight="700"
          fontFamily="ui-monospace, monospace" letterSpacing={0.8}
          opacity={lblFade}
        >DATEN-VEREDELUNGS-PROZESS</text>

        {/* Zone separator dashed lines */}
        {[BOX_Y_M, BOX_BOT].map((ly, i) => (
          <line key={i} x1={14} y1={ly} x2={MW - 14} y2={ly}
            stroke={`rgba(0,0,0,${0.1 * boxBuild})`}
            strokeWidth={1} strokeDasharray="4 5" />
        ))}

        {/* RAWLOGIC KERN box */}
        <path d={boxPath}
          fill="rgba(0,0,0,0.02)" stroke={INK} strokeWidth={2}
          strokeDasharray={PERIM_M} strokeDashoffset={PERIM_M * (1 - boxBuild)} />

        {boxBuild > 0.85 && [
          { x: BOX_X_M,   y: BOX_Y_M,  dx:  1, dy:  1 },
          { x: BOX_R_M,   y: BOX_Y_M,  dx: -1, dy:  1 },
          { x: BOX_X_M,   y: BOX_BOT,  dx:  1, dy: -1 },
          { x: BOX_R_M,   y: BOX_BOT,  dx: -1, dy: -1 },
        ].map(({ x, y, dx, dy }, k) => (
          <path key={k}
            d={`M ${x + dx * CL},${y} L ${x},${y} L ${x},${y + dy * CL}`}
            fill="none" stroke={INK} strokeWidth={1.5} />
        ))}

        <text x={MW / 2} y={BOX_Y_M + 16}
          textAnchor="middle" fill={INK} fontSize={9}
          fontFamily="ui-monospace, monospace" letterSpacing={2.5}
          opacity={boxBuild}
        >RAWLOGIC KERN</text>

        {LANE_X_M.map((lx, k) => (
          <line key={k} x1={lx} y1={BOX_Y_M + 6} x2={lx} y2={BOX_BOT - 6}
            stroke={`rgba(0,0,0,${0.06 * boxBuild})`}
            strokeWidth={1} strokeDasharray="6 6" />
        ))}

        <line x1={BOX_X_M + 2} y1={scanY} x2={BOX_R_M - 2} y2={scanY}
          stroke={`rgba(196,150,28,${scanOp})`} strokeWidth={1} />

        <text x={BOX_R_M - 6} y={BOX_BOT - 6}
          textAnchor="end" fill={`rgba(0,0,0,${0.3 * boxBuild})`}
          fontSize={7} fontFamily="ui-monospace, monospace" letterSpacing={0.5}
        >STATUS: AKTIV</text>

        {/* ══════════════════════════════════════════════════════
            MARKTDATEN — horizontal pipe from left
            Label rotated -90° sits cleanly in the left margin.
            ══════════════════════════════════════════════════ */}
        <g opacity={feedOp}>
          <line x1={MARKT_PIPE_LEFT} y1={MARKT_Y_M} x2={BOX_X_M} y2={MARKT_Y_M}
            stroke={INK} strokeWidth={2} />
          <rect x={BOX_X_M - PORT_R} y={MARKT_Y_M - PORT_R}
            width={PORT_R * 2} height={PORT_R * 2} fill={INK} />
          {/* Rotated label in left margin — no overlap with pipe or box */}
          <text
            x={MARGIN_LEFT_CX} y={MARKT_Y_M}
            textAnchor="middle" fill={INK}
            fontSize={7} fontFamily="ui-monospace, monospace" letterSpacing={0.5}
            transform={`rotate(-90, ${MARGIN_LEFT_CX}, ${MARKT_Y_M})`}
          >MARKTDATEN</text>
          {marktFeed.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={2.2}
              fill="rgb(148,148,148)" opacity={p.op} />
          ))}
        </g>

        {/* ══════════════════════════════════════════════════════
            ARCHIVDATEN — horizontal pipe from right
            Label rotated +90° sits cleanly in the right margin.
            ══════════════════════════════════════════════════ */}
        <g opacity={feedOp}>
          <line x1={BOX_R_M} y1={ARCHIV_Y_M} x2={ARCHIV_PIPE_RIGHT} y2={ARCHIV_Y_M}
            stroke={INK} strokeWidth={2} />
          <rect x={BOX_R_M - PORT_R} y={ARCHIV_Y_M - PORT_R}
            width={PORT_R * 2} height={PORT_R * 2} fill={INK} />
          {/* Rotated label in right margin */}
          <text
            x={MARGIN_RIGHT_CX} y={ARCHIV_Y_M}
            textAnchor="middle" fill={INK}
            fontSize={7} fontFamily="ui-monospace, monospace" letterSpacing={0.5}
            transform={`rotate(90, ${MARGIN_RIGHT_CX}, ${ARCHIV_Y_M})`}
          >ARCHIVDATEN</text>
          {archivFeed.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={2.2}
              fill="rgb(148,148,148)" opacity={p.op} />
          ))}
        </g>

        {/* Emitter (Datenquelle) */}
        <circle cx={EMIT_CX} cy={EMIT_CY} r={6}
          fill="none" stroke={INK} strokeWidth={1.5} opacity={boxBuild} />
        <circle cx={EMIT_CX} cy={EMIT_CY} r={2.2}
          fill={INK} opacity={boxBuild} />
        <text x={EMIT_CX + 14} y={EMIT_CY + 5}
          fill={INK} fontSize={9} fontWeight="700"
          fontFamily="ui-monospace, monospace"
          opacity={0.9 * boxBuild}
        >DATENQUELLE</text>

        {[BOX_Y_M - 14, BOX_BOT + 14].map((ay, k) => (
          <text key={k} x={EMIT_CX} y={ay}
            textAnchor="middle" fill={INK} fontSize={13}
            opacity={0.25 * boxBuild}
          >↓</text>
        ))}

        {/* Main particles */}
        {parts.map((p, i) => (
          <circle key={i}
            cx={p.x} cy={p.y} r={p.r}
            fill={p.color} opacity={p.opacity * partFade}
            filter={p.ct > 0.45 ? "url(#fg-m)" : undefined}
          />
        ))}

        {/* Autonomer Workflow Symbol */}
        {(() => {
          const outerPts = Array.from({ length: 6 }, (_, k) => {
            const a = k * Math.PI / 3 + rot;
            return `${SYM_CX_M + Math.cos(a) * 34 * symEntry},${SYM_CY_M + Math.sin(a) * 34 * symEntry}`;
          }).join(" ");
          const innerPts = Array.from({ length: 6 }, (_, k) => {
            const a = k * Math.PI / 3 - rot * 0.6;
            return `${SYM_CX_M + Math.cos(a) * 20 * symEntry * pulse},${SYM_CY_M + Math.sin(a) * 20 * symEntry * pulse}`;
          }).join(" ");
          const isHit      = hitFlash > 0.3;
          const flashAlpha = symEntry * (0.85 + hitFlash * 0.4);
          return (
            <g filter={hitFlash > 0.5 ? "url(#fg-m)" : undefined}>
              <polygon points={outerPts} fill="none"
                stroke={isHit ? goldRGB : INK}
                strokeWidth={isHit ? 3 : 2}
                opacity={flashAlpha} />
              <polygon points={innerPts} fill="none"
                stroke={goldRGB} strokeWidth={1.5}
                opacity={symEntry * (0.4 + hitFlash * 0.4)} />
              <circle cx={SYM_CX_M} cy={SYM_CY_M} r={6 * symEntry}
                fill={isHit ? goldRGB : INK} opacity={flashAlpha} />
            </g>
          );
        })()}

        {/* Zone labels */}
        {ZONE_LBLS_M.map(({ x, y, text }, k) => (
          <text key={k} x={x} y={y}
            textAnchor="middle" fill="#000000"
            fontSize={7} fontFamily="ui-monospace, monospace" letterSpacing={1}
            opacity={0.78 * lblFade}
          >{text}</text>
        ))}
      </svg>
    </AbsoluteFill>
  );
};
