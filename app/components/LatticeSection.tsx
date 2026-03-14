"use client";

import dynamic from "next/dynamic";

// SSR disabled — @remotion/player requires a browser environment
const RemotionPlayerWrapper = dynamic(
  () => import("./RemotionPlayerWrapper"),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full bg-[#04040a]"
        style={{ aspectRatio: "1280 / 420" }}
      />
    ),
  }
);

export default function LatticeSection() {
  return (
    <div className="border-b border-zinc-300 w-full overflow-hidden">
      {/* Section label — matches other section headers */}
      <div className="border-b border-zinc-300 bg-zinc-200/50 px-8 py-4 sm:px-12">
        <p className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
          Live Render &nbsp;·&nbsp; Autonome Infrastruktur
        </p>
      </div>

      {/* Remotion player — fills full width, dark background */}
      <RemotionPlayerWrapper />
    </div>
  );
}
