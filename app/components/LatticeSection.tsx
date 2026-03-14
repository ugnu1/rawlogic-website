"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── Cell content ───────────────────────────────────────────
const CODE_FRAGMENTS = [
  "PROC: ACTIVE",
  "OPTIMIZING",
  "CORE: OK",
  "SYNC: LIVE",
  "API: READY",
  "AGENT_01",
  "DATA: IN",
  "NODE: 03",
  "OPT: RUN",
  "STATUS: OK",
  "INIT: DONE",
  "TASK: 07",
  "MEM: CLEAR",
  "EXEC: OK",
];

type CellKind = "empty" | "led" | "code";

// Deterministic assignment — no randomness, no hydration mismatch
function cellKind(i: number): CellKind {
  const v = (i * 37 + i * i * 7) % 100;
  if (v < 15) return "led";
  if (v < 30) return "code";
  return "empty";
}

// ── Individual cell ────────────────────────────────────────
function Cell({ index, inView }: { index: number; inView: boolean }) {
  const kind = cellKind(index);

  // Diagonal wave stagger: left-to-right, top-to-bottom
  const col   = index % 10;
  const row   = Math.floor(index / 10);
  const delay = col * 0.018 + row * 0.055;

  return (
    <motion.div
      className="border-r border-b border-zinc-300 flex items-center justify-center"
      style={{ minHeight: "46px" }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay, duration: 0.2, ease: "linear" }}
    >
      {kind === "led" && (
        <motion.span
          className="block w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 0.75 + (index % 13) / 10,
            delay:    (index * 31 % 22) / 10,
            repeat:   Infinity,
            ease:     "linear",
          }}
        />
      )}
      {kind === "code" && (
        <motion.span
          className="font-mono text-[7px] leading-tight text-zinc-500 px-1 text-center select-none"
          animate={{ opacity: [0.18, 0.65, 0.18] }}
          transition={{
            duration: 1.3 + (index % 11) / 10,
            delay:    (index * 23 % 27) / 10,
            repeat:   Infinity,
            ease:     "linear",
          }}
        >
          {CODE_FRAGMENTS[(index * 13) % CODE_FRAGMENTS.length]}
        </motion.span>
      )}
    </motion.div>
  );
}

// ── Section ────────────────────────────────────────────────
export default function LatticeSection() {
  const ref    = useRef<HTMLDivElement>(null);
  // Triggers the moment 1% of the section enters the viewport
  const inView = useInView(ref, { once: false, amount: 0.01 });

  return (
    <div ref={ref} className="border-b border-zinc-300">

      {/* Section label — same style as other section headers */}
      <div className="border-b border-zinc-300 bg-zinc-200/50 px-8 py-4 sm:px-12">
        <p className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
          Live Agent Grid &nbsp;·&nbsp; Autonome Aktivität
        </p>
      </div>

      {/* Full-width grid — border-t + border-l creates the outer frame */}
      <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-10 border-t border-l border-zinc-300 w-full">
        {Array.from({ length: 60 }, (_, i) => (
          <Cell key={i} index={i} inView={inView} />
        ))}
      </div>

    </div>
  );
}
