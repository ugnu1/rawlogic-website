"use client";

import { Player } from "@remotion/player";
import { MobileRefinery } from "./MobileRefinery";
import { useRef, useState, useEffect } from "react";

const COMP_W = 300;
const COMP_H = 600;

export default function MobileRefineryPlayer() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setW(Math.round(entry.contentRect.width));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const h = w > 0 ? Math.round(w * COMP_H / COMP_W) : 0;

  return (
    <div ref={ref} style={{ width: "100%", lineHeight: 0, backgroundColor: "#ebebeb" }}>
      {w > 0 && (
        <Player
          component={MobileRefinery}
          durationInFrames={180}
          fps={30}
          compositionWidth={COMP_W}
          compositionHeight={COMP_H}
          style={{ width: w, height: h, display: "block" }}
          autoPlay
          loop
          controls={false}
          initiallyShowControls={false}
        />
      )}
    </div>
  );
}
