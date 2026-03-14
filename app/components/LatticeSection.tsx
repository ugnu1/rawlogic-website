"use client";

import dynamic from "next/dynamic";

// SSR disabled — @remotion/player requires a browser environment
const RemotionPlayerWrapper = dynamic(
  () => import("./RemotionPlayerWrapper"),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full bg-[#ebebeb]"
        style={{ aspectRatio: "1260 / 300" }}
      />
    ),
  }
);

const MobileRefineryPlayer = dynamic(
  () => import("./MobileRefineryPlayer"),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full bg-[#ebebeb]"
        style={{ aspectRatio: "300 / 600" }}
      />
    ),
  }
);

export default function LatticeSection() {
  return (
    <div className="border-b border-zinc-300 w-full overflow-hidden">
      {/* Section label */}
      <div className="border-b border-zinc-300 bg-zinc-200/50 px-8 py-4 sm:px-12">
        <p className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
          Live Render &nbsp;·&nbsp; Autonome Infrastruktur
        </p>
      </div>

      {/* Desktop: panorama centered, max 1260 px, background fills full width (≥ md) */}
      <div className="hidden md:block w-full bg-[#ebebeb]">
        <div className="mx-auto" style={{ maxWidth: "1260px" }}>
          <RemotionPlayerWrapper />
        </div>
      </div>

      {/* Mobile: vertical gravity drop, full width (< md) */}
      <div className="block md:hidden w-full bg-[#ebebeb]">
        <MobileRefineryPlayer />
      </div>
    </div>
  );
}
