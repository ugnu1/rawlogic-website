// Remotion composition: "Digitale Raffinerie" — Horizontal workflow
// Raw particles → RAWLOGIC CORE box (grey→gold) → three division outputs

import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill } from "remotion";

// ── Canvas ──────────────────────────────────────────────────
const W   = 1260;
const H   = 300;
const INK = "#1a1a1a";

// ── Layout zones ────────────────────────────────────────────
const EMIT_X  = 58;                           // emitter dot
const BOX_X   = 230; const BOX_Y = 50;        // core box top-left
const BOX_W   = 510; const BOX_H = 172;       // core box size
const BOX_R   = BOX_X + BOX_W;               // 740
const SYM_CX  = 860;                          // symbol icon centre x
const SYM_LX  = 885;                          // symbol label x

// Lane y-positions (three outputs)
const LANE_Y: [number, number, number] = [
  BOX_Y + 34,   // 84  — Ops
  BOX_Y + 86,   // 136 — Signals
  BOX_Y + 138,  // 188 — Core
];

// Zone label x-positions
const ZLABEL_Y  = 272;
const ZONE_LBLS = [
  { x: (EMIT_X + BOX_X) / 2,       text: "[ RAW_INPUT ]"            },
  { x: BOX_X + BOX_W / 2,          text: "[ ALGORITHMIC_REFINERY ]" },
  { x: (BOX_R + W - 20) / 2,       text: "[ AUTONOMOUS_OUTPUT ]"    },
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
  const t       = ((frame + offset) % PERIOD) / PERIOD; // 0–1 travel progress
  const lane    = i % 3 as 0 | 1 | 2;

  // ── X ──
  const PRE = 0.38, MID = 0.66; // phase boundaries
  let x: number;
  if (t < PRE) {
    x = EMIT_X + (BOX_X - EMIT_X) * (t / PRE);
  } else if (t < MID) {
    x = BOX_X + BOX_W * ((t - PRE) / (MID - PRE));
  } else {
    const p = (t - MID) / (1 - MID);
    const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2; // ease-in-out
    x = BOX_R + (SYM_CX - BOX_R) * e;
  }

  // ── Y ── random entry → aligns to lane inside box
  const scatter = (i * 37 % 80) - 40; // deterministic, –40..+40
  const entryY  = LANE_Y[1] + scatter;
  const laneY   = LANE_Y[lane];
  let y: number;
  if (t < 0.33) {
    y = entryY + Math.sin(frame * 0.07 + i * 1.4) * 4; // subtle wander
  } else if (t < MID) {
    const p = (t - 0.33) / (MID - 0.33);
    const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
    y = entryY + (laneY - entryY) * e;
  } else {
    y = laneY;
  }

  // ── Color progress ──
  const ct = t < PRE ? 0 : t < MID ? (t - PRE) / (MID - PRE) : 1;

  // ── Fade at endpoints ──
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
  const boxBuild  = ei(frame, 0, 28);            // box draws in over 28 frames
  const partFade  = ei(frame, 18, 55);           // particles fade in
  const symS      = (i: number) => ei(frame, 38 + i * 6, 54 + i * 6); // symbol scale
  const lblFade   = ei(frame, 45, 62);

  // Box perimeter draw animation
  const PERIM = 2 * (BOX_W + BOX_H);
  const boxPath = `M ${BOX_X},${BOX_Y} h ${BOX_W} v ${BOX_H} h ${-BOX_W} Z`;

  // Scanning line inside box
  const SCAN_P = fps * 2.4;
  const scanT  = (frame % SCAN_P) / SCAN_P;
  const scanX  = BOX_X + scanT * BOX_W;
  const scanOp = scanT < 0.03 ? 0 : scanT > 0.97 ? 0 : 0.08;

  // Counter
  const proc = ((frame * 2) % 9999) | 0;

  const CL = 14; // corner arm length

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
            stroke={`rgba(26,26,26,${0.1 * boxBuild})`}
            strokeWidth={1} strokeDasharray="4 5" />
        ))}

        {/* ── RAWLOGIC CORE box (perimeter draw) ─────────── */}
        <path
          d={boxPath}
          fill="rgba(26,26,26,0.02)"
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
          RAWLOGIC CORE
        </text>

        {/* Lane guide lines (faint dashes) */}
        {LANE_Y.map((ly, k) => (
          <line key={k} x1={BOX_X + 6} y1={ly} x2={BOX_R - 6} y2={ly}
            stroke={`rgba(26,26,26,${0.055 * boxBuild})`}
            strokeWidth={1} strokeDasharray="6 6" />
        ))}

        {/* Scanning vertical line */}
        <line x1={scanX} y1={BOX_Y + 2} x2={scanX} y2={BOX_Y + BOX_H - 2}
          stroke={`rgba(196,150,28,${scanOp})`} strokeWidth={1} />

        {/* Process counter */}
        <text x={BOX_R - 8} y={BOX_Y + BOX_H - 6}
          textAnchor="end"
          fill={`rgba(26,26,26,${0.22 * boxBuild})`}
          fontSize={7} fontFamily="ui-monospace, monospace"
        >
          {`PROC: ${proc.toString().padStart(4, "0")}`}
        </text>

        {/* ── Emitter ─────────────────────────────────────── */}
        <circle cx={EMIT_X} cy={LANE_Y[1]} r={6}
          fill="none" stroke={INK} strokeWidth={1.5}
          opacity={boxBuild} />
        <circle cx={EMIT_X} cy={LANE_Y[1]} r={2.2}
          fill={INK} opacity={boxBuild} />
        <text x={EMIT_X} y={BOX_Y - 10}
          textAnchor="middle" fill={`rgba(26,26,26,0.45)`}
          fontSize={7} fontFamily="ui-monospace, monospace"
          opacity={boxBuild}
        >
          EMIT
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

        {/* ── Output symbols ─────────────────────────────── */}

        {/* Ops — Hexagon */}
        {(() => {
          const s = symS(0);
          const pts = Array.from({ length: 6 }, (_, k) => {
            const a = (k * 60 - 30) * Math.PI / 180;
            return `${SYM_CX + Math.cos(a) * 13 * s},${LANE_Y[0] + Math.sin(a) * 13 * s}`;
          }).join(" ");
          return <polygon points={pts} fill="none" stroke={INK} strokeWidth={1.5} opacity={s} />;
        })()}

        {/* Signals — ascending bars */}
        {(() => {
          const s = symS(1);
          const cy = LANE_Y[1];
          return (
            <g opacity={s}>
              {[{ x: -9, h: 8 }, { x: -3, h: 13 }, { x: 3, h: 18 }].map((b, k) => (
                <rect key={k}
                  x={SYM_CX + b.x} y={cy - b.h * s / 2}
                  width={4.5} height={b.h * s}
                  fill={INK} rx={0.5}
                />
              ))}
            </g>
          );
        })()}

        {/* Core — circle + centre dot */}
        {(() => {
          const s = symS(2);
          const cy = LANE_Y[2];
          return (
            <g opacity={s}>
              <circle cx={SYM_CX} cy={cy} r={13 * s}
                fill="none" stroke={INK} strokeWidth={1.5} />
              <circle cx={SYM_CX} cy={cy} r={3.5 * s} fill={INK} />
            </g>
          );
        })()}

        {/* Division labels */}
        {(["OPS", "SIGNALS", "CORE"] as const).map((lbl, k) => (
          <text key={k} x={SYM_LX + 18} y={LANE_Y[k] + 4}
            fill={INK} fontSize={8}
            fontFamily="ui-monospace, monospace" letterSpacing={1}
            opacity={symS(k) * 0.55}
          >
            {lbl}
          </text>
        ))}

        {/* ── Zone labels + arrows at bottom ─────────────── */}
        {ZONE_LBLS.map(({ x, text }, k) => (
          <text key={k} x={x} y={ZLABEL_Y}
            textAnchor="middle"
            fill={`rgba(26,26,26,${0.42 * lblFade})`}
            fontSize={8} fontFamily="ui-monospace, monospace" letterSpacing={1}
          >
            {text}
          </text>
        ))}

        {/* Arrows between zone labels */}
        {[BOX_X - 18, BOX_R + 18].map((ax, k) => (
          <text key={k} x={ax + (k === 0 ? 0 : 24)} y={ZLABEL_Y}
            textAnchor="middle" fill={`rgba(26,26,26,${0.22 * lblFade})`}
            fontSize={9}
          >→</text>
        ))}
      </svg>
    </AbsoluteFill>
  );
};
