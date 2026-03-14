"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  animate as fmAnimate,
  useTransform,
  MotionValue,
} from "framer-motion";

// ── Geometry ───────────────────────────────────────────────
const COLS = 8;
const ROWS = 4;
const VW   = 880;
const VH   = 280;
const PX   = 70;  // horizontal padding inside viewBox
const PY   = 62;  // vertical padding — leaves room for labels above nodes

const gridPoints = Array.from({ length: ROWS * COLS }, (_, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const gx  = PX + (col / (COLS - 1)) * (VW - PX * 2);
  const gy  = PY + (row / (ROWS - 1)) * (VH - PY * 2);
  const angle = (i * 2.3999) % (Math.PI * 2); // golden-angle scatter
  const dist  = 50 + (i % 7) * 16;
  return { id: i, x: gx, y: gy, sx: gx + Math.cos(angle) * dist, sy: gy + Math.sin(angle) * dist };
});

const edges: [number, number][] = [];
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    if (c < COLS - 1) edges.push([r * COLS + c, r * COLS + c + 1]); // →
    if (r < ROWS - 1) edges.push([r * COLS + c, (r + 1) * COLS + c]); // ↓
  }
// 59 edges total

// ── Animation timing (0 – 1) ───────────────────────────────
const DOT_END    = 0.36;
const LINE_START = 0.26;
const LINE_END   = 0.78;
const LIVE_START = 0.80; // flow dots + labels fade in after grid is complete

// ── Strategic node labels ──────────────────────────────────
// Row × COLS + col  →  pick visually distinct intersections
const NODE_LABELS = [
  { idx: 1 * COLS + 1, text: "NODE_ALPHA: ACTIVE"      },
  { idx: 1 * COLS + 5, text: "NEURAL_ROUTING: OK"      },
  { idx: 2 * COLS + 3, text: "AUTONOMY: 98%"           },
];

// Horizontal segments where data flows: [row, colStart, colEnd, loopDelay]
const FLOW_SEGS: [number, number, number, number][] = [
  [0, 0, 7, 0.0],   // top row, full width
  [2, 1, 5, 0.7],   // row 2, middle
  [3, 0, 7, 1.3],   // bottom row, full width
];

// ── Sub-components ─────────────────────────────────────────

type Pt = typeof gridPoints[0];

function LatticeDot({
  pt, progress, startAt, endAt,
}: { pt: Pt; progress: MotionValue<number>; startAt: number; endAt: number }) {
  const cx = useTransform(progress, [startAt, endAt], [pt.sx, pt.x]);
  const cy = useTransform(progress, [startAt, endAt], [pt.sy, pt.y]);
  const op = useTransform(progress, [startAt, Math.min(1, startAt + 0.025)], [0, 1]);
  return <motion.circle r={2.5} fill="#111111" style={{ cx, cy, opacity: op }} />;
}

function LatticeLine({
  edge, progress, startAt, endAt,
}: { edge: [number, number]; progress: MotionValue<number>; startAt: number; endAt: number }) {
  const p1 = gridPoints[edge[0]], p2 = gridPoints[edge[1]];
  const pl = useTransform(progress, [startAt, endAt], [0, 1]);
  const op = useTransform(progress, [startAt, Math.min(1, startAt + 0.01)], [0, 1]);
  return (
    <motion.path
      d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`}
      stroke="#111111"
      strokeWidth="2"
      strokeLinecap="square"
      fill="none"
      style={{ pathLength: pl, opacity: op }}
    />
  );
}

function FlowDot({
  x1, y, x2, progress, delay,
}: { x1: number; y: number; x2: number; progress: MotionValue<number>; delay: number }) {
  const op = useTransform(progress, [LIVE_START, Math.min(1, LIVE_START + 0.07)], [0, 1]);
  return (
    <motion.circle
      r={3.5}
      fill="#16a34a"
      cy={y}
      initial={{ cx: x1 }}
      animate={{ cx: [x1, x2] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay }}
      style={{ opacity: op }}
    />
  );
}

function NodeLabel({
  idx, text, progress,
}: { idx: number; text: string; progress: MotionValue<number> }) {
  const pt = gridPoints[idx];
  const op = useTransform(progress, [LIVE_START, Math.min(1, LIVE_START + 0.09)], [0, 1]);
  return (
    <motion.text
      x={pt.x}
      y={pt.y - 17}
      textAnchor="middle"
      fill="#111111"
      fontSize={9}
      fontFamily="ui-monospace, 'Cascadia Code', monospace"
      letterSpacing={0.8}
      style={{ opacity: op }}
    >
      [ {text} ]
    </motion.text>
  );
}

// ── Main section ───────────────────────────────────────────

export default function LatticeSection() {
  const ref      = useRef<HTMLDivElement>(null);
  const inView   = useInView(ref, { once: false, amount: 0.01 });
  const progress = useMotionValue(0);

  useEffect(() => {
    if (inView) {
      fmAnimate(progress, 1, { duration: 2.8, ease: "linear" });
    } else {
      fmAnimate(progress, 0, { duration: 0.3, ease: "linear" });
    }
  }, [inView, progress]);

  const N = gridPoints.length; // 32
  const E = edges.length;      // 59

  return (
    <div ref={ref} className="border-b border-zinc-300 w-full overflow-hidden bg-[#e8e8e8]">
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="w-full h-auto block"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* 1. Lines — draw in left→right, top→bottom */}
        {edges.map((edge, i) => {
          const startAt = LINE_START + (i / E) * (LINE_END - LINE_START - 0.06);
          const endAt   = Math.min(LINE_END, startAt + 0.055);
          return <LatticeLine key={`e${i}`} edge={edge} progress={progress} startAt={startAt} endAt={endAt} />;
        })}

        {/* 2. Lattice nodes — snap from scatter */}
        {gridPoints.map((pt, i) => {
          const startAt = (i / N) * DOT_END * 0.8;
          const endAt   = Math.min(DOT_END, startAt + 0.09);
          return <LatticeDot key={`d${pt.id}`} pt={pt} progress={progress} startAt={startAt} endAt={endAt} />;
        })}

        {/* 3. Data flow — green dots racing along horizontal lines */}
        {FLOW_SEGS.map(([r, cStart, cEnd, delay], i) => {
          const p1 = gridPoints[r * COLS + cStart];
          const p2 = gridPoints[r * COLS + cEnd];
          return (
            <FlowDot key={`f${i}`} x1={p1.x} y={p1.y} x2={p2.x} progress={progress} delay={delay} />
          );
        })}

        {/* 4. Node labels — appear when grid is complete */}
        {NODE_LABELS.map(({ idx, text }) => (
          <NodeLabel key={text} idx={idx} text={text} progress={progress} />
        ))}
      </svg>
    </div>
  );
}
