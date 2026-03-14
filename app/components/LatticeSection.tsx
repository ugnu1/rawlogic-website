"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// ── Grid geometry ─────────────────────────────────────────
const COLS = 9;
const ROWS = 4;
const VW   = 880;
const VH   = 200;
const PX   = 60;   // horizontal padding inside viewBox
const PY   = 30;   // vertical padding

const gridPoints = Array.from({ length: ROWS * COLS }, (_, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const gx  = PX + (col / (COLS - 1)) * (VW - PX * 2);
  const gy  = PY + (row / (ROWS - 1)) * (VH - PY * 2);
  // Deterministic scatter: golden-angle spiral per dot
  const angle = (i * 2.3999) % (Math.PI * 2);  // ≈ 137.5° – fills space evenly
  const dist  = 55 + (i % 7) * 18;
  return { id: i, x: gx, y: gy, sx: gx + Math.cos(angle) * dist, sy: gy + Math.sin(angle) * dist };
});

// Horizontal + vertical edges only — strict grid, no diagonals
const edges: [number, number][] = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    if (c < COLS - 1) edges.push([r * COLS + c, r * COLS + c + 1]); // →
    if (r < ROWS - 1) edges.push([r * COLS + c, (r + 1) * COLS + c]); // ↓
  }
}
// Total: (COLS-1)*ROWS + COLS*(ROWS-1) = 8×4 + 9×3 = 32 + 27 = 59 edges

// ── Sub-components (hooks must live at component level, not in loops) ──

type PointType = typeof gridPoints[0];

function LatticeDot({
  point, progress, startAt, endAt,
}: {
  point: PointType;
  progress: MotionValue<number>;
  startAt: number;
  endAt: number;
}) {
  const cx      = useTransform(progress, [startAt, endAt], [point.sx, point.x]);
  const cy      = useTransform(progress, [startAt, endAt], [point.sy, point.y]);
  const opacity = useTransform(progress, [startAt, Math.min(1, startAt + 0.03)], [0, 1]);
  return <motion.circle r="2" fill="#1a1a1a" style={{ cx, cy, opacity }} />;
}

function LatticeLine({
  edge, progress, startAt, endAt,
}: {
  edge: [number, number];
  progress: MotionValue<number>;
  startAt: number;
  endAt: number;
}) {
  const p1         = gridPoints[edge[0]];
  const p2         = gridPoints[edge[1]];
  const pathLength = useTransform(progress, [startAt, endAt], [0, 1]);
  const opacity    = useTransform(progress, [startAt, Math.min(1, startAt + 0.015)], [0, 1]);
  return (
    <motion.path
      d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`}
      stroke="#1a1a1a"
      strokeWidth="1"
      fill="none"
      style={{ pathLength, opacity }}
    />
  );
}

// ── Main section ──────────────────────────────────────────

export default function LatticeSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const N = gridPoints.length; // 36
  const E = edges.length;      // 59

  // Phase 1  [0.00 → 0.45]: dots converge to grid
  // Phase 2  [0.38 → 1.00]: lines draw in left→right, top→bottom
  const dotPhaseEnd  = 0.45;
  const linePhaseStart = 0.38;

  return (
    <div ref={containerRef} className="relative h-[150vh] border-b border-zinc-300">
      {/* Sticky canvas */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-[#e8e8e8] overflow-hidden">

        {/* Label */}
        <p className="font-mono text-[10px] tracking-[0.22em] text-zinc-400 uppercase mb-8 select-none">
          Selbstorganisierende Infrastruktur
        </p>

        {/* SVG */}
        <div className="w-full max-w-3xl px-6">
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            className="w-full h-auto"
            style={{ overflow: "visible" }}
          >
            {/* Lines first (behind dots) */}
            {edges.map((edge, i) => {
              const startAt = linePhaseStart + (i / E) * 0.52;
              const endAt   = Math.min(0.99, startAt + 0.09);
              return (
                <LatticeLine
                  key={`e${i}`}
                  edge={edge}
                  progress={scrollYProgress}
                  startAt={startAt}
                  endAt={endAt}
                />
              );
            })}

            {/* Dots on top */}
            {gridPoints.map((pt, i) => {
              const startAt = (i / N) * dotPhaseEnd * 0.85;
              const endAt   = Math.min(dotPhaseEnd, startAt + 0.10);
              return (
                <LatticeDot
                  key={`d${pt.id}`}
                  point={pt}
                  progress={scrollYProgress}
                  startAt={startAt}
                  endAt={endAt}
                />
              );
            })}
          </svg>
        </div>

        {/* Scroll cue — fades out as animation starts */}
        <motion.p
          className="font-mono text-[10px] tracking-[0.2em] text-zinc-300 uppercase mt-10 select-none"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.12], [1, 0]) }}
        >
          ↓ Scrollen
        </motion.p>

      </div>
    </div>
  );
}
