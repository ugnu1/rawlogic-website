"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// ── Grid geometry ──────────────────────────────────────────
const COLS = 9;
const ROWS = 4;
const VW   = 880;
const VH   = 200;
const PX   = 60;
const PY   = 30;

const gridPoints = Array.from({ length: ROWS * COLS }, (_, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const gx  = PX + (col / (COLS - 1)) * (VW - PX * 2);
  const gy  = PY + (row / (ROWS - 1)) * (VH - PY * 2);
  const angle = (i * 2.3999) % (Math.PI * 2);
  const dist  = 50 + (i % 7) * 16;
  return { id: i, x: gx, y: gy, sx: gx + Math.cos(angle) * dist, sy: gy + Math.sin(angle) * dist };
});

const edges: [number, number][] = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    if (c < COLS - 1) edges.push([r * COLS + c, r * COLS + c + 1]);
    if (r < ROWS - 1) edges.push([r * COLS + c, (r + 1) * COLS + c]);
  }
}
// 59 edges total

type PointType = typeof gridPoints[0];

// ── Timing constants ───────────────────────────────────────
// Animation completes by scroll = 0.75 — finished lattice visible
// while still scrolling through the section.
const DOT_END   = 0.36;  // all dots locked in by 36% scroll
const LINE_START = 0.28;  // lines begin before last dot lands
const LINE_END   = 0.75;  // all lines drawn by 75% scroll

// ── Sub-components ─────────────────────────────────────────

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
  const opacity = useTransform(progress, [startAt, Math.min(1, startAt + 0.025)], [0, 1]);
  return <motion.circle r="2.5" fill="#1a1a1a" style={{ cx, cy, opacity }} />;
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
  const opacity    = useTransform(progress, [startAt, Math.min(1, startAt + 0.012)], [0, 1]);
  return (
    <motion.path
      d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`}
      stroke="#1a1a1a"
      strokeWidth="1.5"
      strokeLinecap="square"
      fill="none"
      style={{ pathLength, opacity }}
    />
  );
}

// ── Main section ───────────────────────────────────────────

export default function LatticeSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll range: starts when section top hits viewport top (sticky begins),
  // ends when section bottom exits. With h-[130vh] that's ~30vh of scroll travel.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const N = gridPoints.length; // 36
  const E = edges.length;      // 59

  return (
    // 130vh = 30vh of animation scroll travel — snappy, no dead zone
    <div ref={containerRef} className="relative h-[130vh] border-b border-zinc-300">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-[#e8e8e8] overflow-hidden">

        {/* Label */}
        <p className="font-mono text-xs tracking-[0.2em] text-zinc-700 font-medium uppercase mb-6 select-none">
          Selbstorganisierende Infrastruktur
        </p>

        {/* SVG canvas */}
        <div className="w-full max-w-3xl px-6 sm:px-8">
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            className="w-full h-auto"
            style={{ overflow: "visible" }}
          >
            {/* Lines (behind dots) */}
            {edges.map((edge, i) => {
              const startAt = LINE_START + (i / E) * (LINE_END - LINE_START - 0.08);
              const endAt   = Math.min(LINE_END, startAt + 0.07);
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

            {/* Dots */}
            {gridPoints.map((pt, i) => {
              const startAt = (i / N) * DOT_END * 0.8;
              const endAt   = Math.min(DOT_END, startAt + 0.09);
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

        {/* Scroll cue — vanishes as soon as animation begins */}
        <motion.p
          className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase mt-8 select-none"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}
        >
          ↓ Scrollen
        </motion.p>

      </div>
    </div>
  );
}
