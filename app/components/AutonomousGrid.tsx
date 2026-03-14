// Remotion composition — rendered by @remotion/player in the browser
// No "use client" needed: Remotion handles the React context internally

import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from "remotion";

// ── Static grid geometry (pre-computed at module level) ────────────────
const W = 1280;
const H = 420;
const COLS = 10;
const ROWS = 5;
const PX = 80;  // horizontal padding
const PY = 58;  // vertical padding — leaves room for labels above top row

const NODES = Array.from({ length: COLS * ROWS }, (_, i) => {
  const c = i % COLS;
  const r = Math.floor(i / COLS);
  return {
    x: PX + (c / (COLS - 1)) * (W - PX * 2),
    y: PY + (r / (ROWS - 1)) * (H - PY * 2),
  };
});

// Separate horizontal / vertical edges for different styling
const H_EDGES: [number, number][] = [];
const V_EDGES: [number, number][] = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    if (c < COLS - 1) H_EDGES.push([r * COLS + c, r * COLS + c + 1]);
    if (r < ROWS - 1) V_EDGES.push([r * COLS + c, (r + 1) * COLS + c]);
  }
}
const ALL_EDGES = [...H_EDGES, ...V_EDGES];

// Pre-compute edge lengths for strokeDasharray
const EDGE_LENS = ALL_EDGES.map(([i1, i2]) => {
  const p1 = NODES[i1], p2 = NODES[i2];
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
});

// Labels appear at strategic intersections
const LABELS = [
  { idx: 1 * COLS + 2, text: "NODE_ALPHA: ACTIVE"     },
  { idx: 2 * COLS + 6, text: "NEURAL_ROUTING: OK"     },
  { idx: 3 * COLS + 4, text: "AUTONOMY: 98%"          },
];

// Nodes that emit periodic pulse rings
const PULSE_IDX = [1 * COLS + 2, 2 * COLS + 6, 0 * COLS + 8];

// ── Main composition ────────────────────────────────────────────────────
export const AutonomousGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Timing (in frames) ─────────────────────────────────────
  const LINE_END    = 52;           // all lines drawn by frame 52
  const PART_START  = 45;           // particles appear
  const LABEL_START = 70;           // labels slide in
  const PART_PERIOD = fps * 2.2;    // particle loop period (2.2 s)
  const E = ALL_EDGES.length;

  // ── Helpers ────────────────────────────────────────────────
  const clamp = (v: number) =>
    interpolate(v, [0, 1], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return (
    <AbsoluteFill style={{ backgroundColor: "#04040a", overflow: "hidden" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        style={{ width: "100%", height: "100%" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Green particle glow */}
          <filter id="glow-g" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* White node glow */}
          <filter id="glow-w" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Vignette — darkens corners */}
          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="25%" stopColor="transparent" />
            <stop offset="100%" stopColor="#04040a" stopOpacity="0.8" />
          </radialGradient>
        </defs>

        {/* ── 1. Background micro-grid (static, always visible) ── */}
        {Array.from({ length: 26 }, (_, i) => (
          <line
            key={`bgv${i}`}
            x1={(i / 25) * W} y1={0}
            x2={(i / 25) * W} y2={H}
            stroke="rgba(255,255,255,0.022)"
            strokeWidth={0.5}
          />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <line
            key={`bgh${i}`}
            x1={0} y1={(i / 11) * H}
            x2={W} y2={(i / 11) * H}
            stroke="rgba(255,255,255,0.022)"
            strokeWidth={0.5}
          />
        ))}

        {/* ── 2. Main lattice lines (staggered draw-in) ──────── */}
        {ALL_EDGES.map(([i1, i2], i) => {
          const p1 = NODES[i1], p2 = NODES[i2];
          const len = EDGE_LENS[i];
          const isH = i < H_EDGES.length;
          const delay = (i / E) * LINE_END;
          const prog = interpolate(frame, [delay, delay + 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <path
              key={`e${i}`}
              d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`}
              stroke={isH ? "rgba(255,255,255,0.42)" : "rgba(255,255,255,0.18)"}
              strokeWidth={isH ? 1.3 : 0.75}
              fill="none"
              strokeDasharray={len}
              strokeDashoffset={len * (1 - prog)}
            />
          );
        })}

        {/* ── 3. Horizontal data particles ───────────────────── */}
        {frame >= PART_START &&
          H_EDGES.map(([i1, i2], i) => {
            const p1 = NODES[i1], p2 = NODES[i2];
            const offset = (i * 17) % PART_PERIOD;
            const t = ((frame - PART_START + offset) % PART_PERIOD) / PART_PERIOD;
            const x = p1.x + (p2.x - p1.x) * t;
            const fadeIn = clamp(
              interpolate(frame, [PART_START, PART_START + 12], [0, 1])
            );
            const edgeFade =
              t < 0.06 ? t / 0.06 : t > 0.94 ? (1 - t) / 0.06 : 1;
            const op = fadeIn * edgeFade;
            if (op < 0.01) return null;
            return (
              <circle
                key={`hp${i}`}
                cx={x}
                cy={p1.y}
                r={2.8}
                fill="#22c55e"
                opacity={op}
                filter="url(#glow-g)"
              />
            );
          })}

        {/* ── 4. Vertical data particles (every 3rd edge) ─────── */}
        {frame >= PART_START + 8 &&
          V_EDGES.filter((_, i) => i % 3 === 1).map(([i1, i2], i) => {
            const p1 = NODES[i1], p2 = NODES[i2];
            const offset = (i * 31) % PART_PERIOD;
            const t =
              ((frame - PART_START - 8 + offset) % PART_PERIOD) / PART_PERIOD;
            const y = p1.y + (p2.y - p1.y) * t;
            const fadeIn = clamp(
              interpolate(frame, [PART_START + 8, PART_START + 22], [0, 1])
            );
            const edgeFade =
              t < 0.1 ? t / 0.1 : t > 0.9 ? (1 - t) / 0.1 : 1;
            const op = fadeIn * edgeFade * 0.65;
            if (op < 0.01) return null;
            return (
              <circle
                key={`vp${i}`}
                cx={p1.x}
                cy={y}
                r={2}
                fill="#16a34a"
                opacity={op}
                filter="url(#glow-g)"
              />
            );
          })}

        {/* ── 5. Nodes — spring pop-in ───────────────────────── */}
        {NODES.map((pt, i) => {
          const s = Math.min(
            1,
            spring({
              frame: Math.max(0, frame - (12 + i * 1.4)),
              fps,
              config: { stiffness: 280, damping: 22, mass: 0.5 },
              durationInFrames: 25,
            })
          );
          return (
            <g key={`n${i}`}>
              <circle
                cx={pt.x} cy={pt.y} r={7 * s}
                fill="none"
                stroke="rgba(34,197,94,0.22)"
                strokeWidth={0.8}
              />
              <circle
                cx={pt.x} cy={pt.y} r={2.8 * s}
                fill="white"
                opacity={0.88 * s}
                filter="url(#glow-w)"
              />
            </g>
          );
        })}

        {/* ── 6. Periodic pulse rings on active nodes ─────────── */}
        {PULSE_IDX.map((ptIdx, i) => {
          const pt = NODES[ptIdx];
          const period = Math.round(fps * 3);
          const pf = (frame + i * Math.round(fps * 1.1)) % period;
          if (pf > Math.round(fps * 1.5)) return null;
          const r  = interpolate(pf, [0, Math.round(fps * 1.5)], [4, 24]);
          const op = interpolate(pf, [0, Math.round(fps * 1.5)], [0.55, 0]);
          return (
            <circle
              key={`pulse${i}`}
              cx={pt.x} cy={pt.y} r={r}
              fill="none"
              stroke="#22c55e"
              strokeWidth={0.7}
              opacity={op}
            />
          );
        })}

        {/* ── 7. Node labels — slide up & fade in ─────────────── */}
        {LABELS.map(({ idx, text }, i) => {
          const pt = NODES[idx];
          const lf = LABEL_START + i * 7;
          const op = clamp(interpolate(frame, [lf, lf + 7], [0, 1]));
          const ty = clamp(
            interpolate(frame, [lf, lf + 7], [pt.y - 10, pt.y - 18])
          );
          return (
            <text
              key={`lbl${i}`}
              x={pt.x}
              y={ty === 0 ? pt.y - 18 : pt.y - 10 + (pt.y - 18 - (pt.y - 10)) * op}
              textAnchor="middle"
              fill="rgba(255,255,255,0.82)"
              fontSize={9}
              fontFamily="ui-monospace, 'Cascadia Code', monospace"
              letterSpacing={0.8}
              opacity={op}
            >
              [ {text} ]
            </text>
          );
        })}

        {/* ── 8. Corner metadata labels ─────────────────────── */}
        <text
          x={PX} y={PY - 24}
          fill="rgba(255,255,255,0.22)"
          fontSize={8}
          fontFamily="ui-monospace, monospace"
          letterSpacing={2}
        >
          RAWLOGIC // AUTONOMOUS_INFRASTRUCTURE
        </text>
        <text
          x={W - PX} y={PY - 24}
          fill="rgba(255,255,255,0.18)"
          fontSize={8}
          fontFamily="ui-monospace, monospace"
          textAnchor="end"
          letterSpacing={1}
        >
          SYS: ONLINE · {COLS}×{ROWS} NODES
        </text>

        {/* ── 9. Vignette overlay ──────────────────────────── */}
        <rect
          x={0} y={0} width={W} height={H}
          fill="url(#vignette)"
          style={{ pointerEvents: "none" }}
        />
      </svg>
    </AbsoluteFill>
  );
};
